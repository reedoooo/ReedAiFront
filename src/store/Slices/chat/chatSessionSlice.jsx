import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chatApi } from 'api/Ai/chat-sessions';
import { clearLocalDataAtStore, getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'chatSessionStore';
const REDUX_NAME = 'chatSessions';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalSessionData(data) {
  setLocalData(LOCAL_NAME, data);
}
// Function to clear local session data
function clearLocalSessionData() {
  clearLocalDataAtStore(LOCAL_NAME, REDUX_NAME);
}
// Async thunk for creating a new chat session
// Async thunk for creating a new chat session
export const createChatSession = createAsyncThunk(
  `${REDUX_NAME}/create`,
  async (newSessionData, { rejectWithValue, dispatch }) => {
    try {
      const data = await chatApi.create(newSessionData);

      // Store the session ID in sessionStorage
      sessionStorage.setItem('sessionId', data._id);

      // Optionally, you can dispatch an action to update the Redux store
      dispatch(setSessionId(data._id));

      return data;
    } catch (error) {
      console.error('Error creating chat session:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Thunks for API calls
export const fetchSessions = createAsyncThunk(
  `${REDUX_NAME}/fetchAll`,

  async (_, { rejectWithValue }) => {
    try {
      const data = await chatApi.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateSessions = createAsyncThunk(
  `${REDUX_NAME}/update`,
  async (sessionId, sessionData, { rejectWithValue }) => {
    try {
      const data = await chatApi.update(sessionId, sessionData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const chatSessionsSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      console.log('setSessionId action payload', action.payload);
      state.sessionId = action.payload;
      sessionStorage.setItem('sessionId', JSON.stringify(action.payload));
      setLocalSessionData({ ...state, sessionId: action.payload });
    },
    setSessionHeader: (state, action) => {
      console.log('setSessionHeader action payload', action.payload);
      state.sessionHeader = action.payload;
      setLocalSessionData({ ...state, sessionHeader: action.payload });
    },
    setChatSessions: (state, action) => {
      state.chatSessions = action.payload;
      setLocalSessionData({ ...state, chatSessions: action.payload });
    },
    setSelectedChatSession: (state, action) => {
      state.selectedChatSession = action.payload;
      setLocalSessionData({
        ...state,
        selectedChatSession: action.payload,
      });
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
        });
    },
  },
});

export { initialState as chatSessionsInitialState };

export const {
  setChatSessions,
  setSelectedChatSession,
  setSessionId,
  setSessionHeader,
  clearChatSessions,
} = chatSessionsSlice.actions;

export default chatSessionsSlice.reducer;
