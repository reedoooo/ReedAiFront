import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { debounce } from 'lodash';
import { chatApi } from 'api/Ai/chat-sessions';
import { clearLocalDataAtStore, getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'chatSessionStore';
const REDUX_NAME = 'chatSessions';
const FETCH_INTERVAL = 30000; // 30 seconds
const SYNC_INTERVAL = 5000; // 5 seconds
let lastFetchTime = 0;
let syncTimeout = null;

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

const setLocalSessionData = data => setLocalData(LOCAL_NAME, data);
const clearLocalSessionData = () =>
  clearLocalDataAtStore(LOCAL_NAME, REDUX_NAME);

const createAsyncThunkWithErrorHandling = (type, asyncFunction) =>
  createAsyncThunk(type, async (arg, thunkAPI) => {
    try {
      return await asyncFunction(arg, thunkAPI);
    } catch (error) {
      console.error(`Error in ${type}:`, error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });

export const createChatSession = createAsyncThunkWithErrorHandling(
  `${REDUX_NAME}/create`,
  async (newSessionData, { dispatch }) => {
    const data = await chatApi.create(newSessionData);
    dispatch(setSessionId(data._id));
    return data;
  }
);

export const fetchSessions = createAsyncThunkWithErrorHandling(
  `${REDUX_NAME}/fetchAll`,
  async () => await chatApi.getAll()
);

export const updateSessions = createAsyncThunkWithErrorHandling(
  `${REDUX_NAME}/update`,
  async ({ sessionId, sessionData }) =>
    await chatApi.update(sessionId, sessionData)
);

export const syncChatMessages = createAsyncThunkWithErrorHandling(
  `${REDUX_NAME}/syncMessages`,
  async (_, { getState, dispatch }) => {
    const state = getState().chatSessions;
    const { sessionId, chatMessages, pendingSync } = state;

    if (!sessionId || !pendingSync) return;

    const response = await chatApi.updateMessages(sessionId, chatMessages);
    dispatch(setSyncStatus(false));
    return response;
  }
);

const scheduleSyncMessages = dispatch => {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => dispatch(syncChatMessages()), SYNC_INTERVAL);
};

export const fetchLatestMessages = createAsyncThunkWithErrorHandling(
  `${REDUX_NAME}/fetchLatestMessages`,
  async (_, { getState, dispatch }) => {
    const state = getState().chatSessions;
    const { sessionId } = state;

    if (!sessionId) return;

    const currentTime = Date.now();
    if (currentTime - lastFetchTime < FETCH_INTERVAL) return;

    lastFetchTime = currentTime;
    const response = await chatApi.getChatSessionMessages(sessionId);

    if (
      JSON.stringify(state.chatMessages) !== JSON.stringify(response.messages)
    ) {
      dispatch(setChatMessages(response.messages));
    }

    return response;
  }
);

const debouncedUpdateChatMessages = debounce(
  (dispatch, sessionId, messages) => {
    dispatch(updateChatMessages({ sessionId, messages }));
  },
  500
);
export const updateChatMessages = createAsyncThunk(
  `${REDUX_NAME}/updateChatMessages`,
  async ({ sessionId, messages }, { rejectWithValue }) => {
    try {
      const data = await chatApi.updateMessages(sessionId, messages);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// export const syncChatMessages = createAsyncThunk(
//   `${REDUX_NAME}/session/messages`,
//   async (_, { dispatch, getState }) => {
//     const sessionId = sessionStorage.getItem('sessionId');
//     if (!sessionId) return;

//     const currentTime = Date.now();
//     // Only fetch if it's been more than 30 seconds since the last fetch
//     if (currentTime - lastFetchTime < FETCH_INTERVAL) {
//       console.log('Skipping fetch, too soon since last fetch');
//       return;
//     }

//     lastFetchTime = currentTime; // Update the last fetch time
//     const response = await chatApi.getChatSessionMessages(sessionId);

//     const state = getState();
//     // Check if the messages have changed to avoid unnecessary dispatch
//     if (
//       JSON.stringify(state.baseChat.chatMessages) !==
//       JSON.stringify(response.messages)
//     ) {
//       dispatch(setChatMessages(response.messages));
//     }

//     return response;
//   }
// );

export const debouncedSetChatMessages = (sessionId, messages) => dispatch => {
  debouncedUpdateChatMessages(dispatch, sessionId, messages);
};
export const chatSessionsSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      console.log('setSessionId action payload', action.payload);
      state.sessionId = action.payload;
      sessionStorage.setItem('sessionId', action.payload);
      setLocalSessionData({ ...state, sessionId: action.payload });
    },
    setApiKey: (state, action) => {
      console.log('SETTING API KEY', action.payload);
      state.apiKey = action.payload;
      state.isApiKeySet = action.payload.length > 0 ? true : false;
      sessionStorage.setItem('apiKey', action.payload);
      setLocalSessionData({ ...state, apiKey: action.payload });
    },
    setChatSessions: (state, action) => {
      console.log('SETTING CHAT SESSIONS', action.payload);
      state.chatSessions = action.payload;
      setLocalSessionData({ ...state, chatSessions: action.payload });
    },
    setSelectedChatSession: (state, action) => {
      console.log('SETTING SELECTED CHAT', action.payload);
      state.selectedChatSession = action.payload;
      setLocalSessionData({
        ...state,
        selectedChatSession: action.payload,
      });
    },
    setSessionHeader: (state, action) => {
      console.log('SETTING SESSION HEAD', action.payload);
      state.sessionHeader = action.payload;
      setLocalSessionData({ ...state, sessionHeader: action.payload });
    },
    setChatMessages: (state, action) => {
      console.log('SETTING CHAT MESSAGES:', action.payload);
      state.chatMessages = action.payload;
      state.pendingSync = true;
      setLocalSessionData({ ...state, chatMessages: action.payload });
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
      state.pendingSync = true;
      setLocalSessionData({ ...state, chatMessages: state.chatMessages });
    },
    updateChatMessage: (state, action) => {
      const { index, message } = action.payload;
      if (state.chatMessages[index]) {
        state.chatMessages[index] = message;
        state.pendingSync = true;
        setLocalSessionData({ ...state, chatMessages: state.chatMessages });
      }
    },
    updateLastMessage: (state, action) => {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        lastMessage.content += action.payload;
      }
    },
    setSyncStatus: (state, action) => {
      state.pendingSync = action.payload;
    },
    setChatSettings: (state, action) => {
      state.chatSettings = action.payload;
      setLocalSessionData({ ...state, chatSettings: action.payload });
    },
    setChatFileItems: (state, action) => {
      state.chatFileItems = action.payload;
      setLocalSessionData({ ...state, chatFileItems: action.payload });
    },
    clearChatSessions: state => {
      clearLocalSessionData();
      return { ...initialState };
    },
    extraReducers: builder => {
      builder
        .addCase(createChatSession.fulfilled, (state, action) => {
          const newSession = action.payload;
          state.chatSessions.push(newSession);
          state.activeSession = newSession;
          state.selectedSession = newSession;
          state.sessionId = newSession._id;
          setLocalSessionData({
            ...state,
            chatSessions: state.chatSessions,
            activeSession: newSession,
            sessionId: newSession._id,
          });
        })
        .addCase(createChatSession.rejected, (state, action) => {
          console.error('Failed to create chat session:', action.payload);
        })
        .addCase(syncChatMessages.fulfilled, (state, action) => {
          if (action.payload) {
            state.pendingSync = false;
          }
        })
        .addCase(syncChatMessages.rejected, (state, action) => {
          console.error('Failed to sync chat messages:', action.payload);
        })
        .addCase(fetchLatestMessages.fulfilled, (state, action) => {
          if (action.payload) {
            state.chatMessages = action.payload.messages;
            state.pendingSync = false;
            setLocalSessionData({ ...state, chatMessages: state.chatMessages });
          }
        });
      // .addCase(updateChatMessages.fulfilled, (state, action) => {
      //   const { sessionId, messages } = action.payload;
      //   const session = state.chatSessions.find(s => s._id === sessionId);
      //   if (session) {
      //     session.messages = messages;
      //   }
      //   if (
      //     state.selectedChatSession &&
      //     state.selectedChatSession._id === sessionId
      //   ) {
      //     state.selectedChatSession.messages = messages;
      //   }
      //   setLocalSessionData(state);
      // })
      // .addCase(updateChatMessages.rejected, (state, action) => {
      //   console.error('Failed to update chat messages:', action.payload);
      // });
    },
  },
});

export { initialState as chatSessionsInitialState };

export const {
  setSessionId,
  setApiKey,
  setChatSessions,
  setSelectedChatSession,
  setSessionHeader,
  setChatMessages,
  addChatMessage,
  updateChatMessage,
  setSyncStatus,
  setChatSettings,
  setChatFileItems,
  clearChatSessions,
  updateLastMessage,
} = chatSessionsSlice.actions;

export const updateLocalChatMessages =
  (message, index = -1) =>
  (dispatch, getState) => {
    if (index === -1) {
      dispatch(addChatMessage(message));
    } else {
      dispatch(updateChatMessage({ index, message }));
    }
    scheduleSyncMessages(dispatch);
  };

export default chatSessionsSlice.reducer;
