import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sessions as sessionsApi } from 'api/chat';
import user from 'api/user/user';
import { getLocalData, setLocalData } from '../helpers';
import { setUserOpenAiSettings } from '../user/userSlice';

const LOCAL_NAME = 'baseChatStore';
const REDUX_NAME = 'baseChat';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalBaseChatData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const syncChatMessages = createAsyncThunk(
  `${REDUX_NAME}/session/messages`,
  async (id, { dispatch }) => {
    if (id) {
      const response = await sessionsApi.getMessages(id);
      dispatch(
        baseChatSlice.actions.setChatMessages({
          id,
          messages: response,
        })
      );
    }
  }
);

export const addEnvToUser = createAsyncThunk(
  `${REDUX_NAME}/addEnvToUser`,
  async ({ apiKey }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading());
    try {
      console.log('Adding API key:', apiKey);
      const response = await user.addEnvToUser(
        sessionStorage.getItem('userId'),
        apiKey
      );
      // dispatch(setApiKey(apiKey));
      // dispatch(setChatRequestData(response.message));
      return response;
      // await dispatch(addApiKey(apiKey));
      // dispatch(setChatRequestData({ message: 'Added API key successfully' }));
    } catch (error) {
      dispatch(setError(error));
      rejectWithValue(error.response.data);
    }
  }
);

export const baseChatSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setLoading: (state, action) => {
      state.baseChatRequest.status = 'loading';
      state.baseChatRequest.error = null;
    },
    setError: (state, action) => {
      state.baseChatRequest.status = 'failed';
      state.baseChatRequest.error = action.payload;
      state.baseChatRequest.message =
        action.payload.message || 'An error occurred';
    },
    setChatRequestData: (state, action) => {
      state.baseChatRequest.status = 'succeeded';
      state.baseChatRequest.success = action.payload;
      state.baseChatRequest.message =
        action.payload.message || 'Chat request successful';
    },
    setApiKey: (state, action) => {
      console.log('Setting API key:', action.payload);
      state.apiKey = action.payload;
      state.isApiKeySet = action.payload.length > 0 ? true : false;
      sessionStorage.setItem('apiKey', action.payload);
      setUserOpenAiSettings({ apiKey: action.payload });
      setLocalBaseChatData({ ...state, apiKey: action.payload });
    },
    setIsGenerating: (state, action) => {
      state.isGenerating = action.payload;
    },
    setIsDisabled: (state, action) => {
      state.isDisabled = action.payload;
    },
    setFirstTokenReceived: (state, action) => {
      state.firstTokenReceived = action.payload;
    },
    setFirstMessageReceived: (state, action) => {
      state.isFirstMessageReceived = action.payload;
    },
    setAbortController: (state, action) => {
      state.abortController = action.payload;
    },
    setActiveLocal: (state, action) => {
      state.active = action.payload;
    },
    setIsMessagesUpdated: (state, action) => {
      state.isMessagesUpdated = action.payload;
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
      setLocalBaseChatData({ ...state, chatMessages: action.payload });
    },
    setChatSettings: (state, action) => {
      state.chatSettings = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setChatFileItems: (state, action) => {
      state.chatFileItems = action.payload;
    },
    setPayload: (state, action) => {
      state.payload = action.payload;
    },
    setIsPromptPickerOpen: (state, action) => {
      state.isPromptPickerOpen = action.payload;
    },
    setSlashCommand: (state, action) => {
      state.slashCommand = action.payload;
    },
    setIsFilePickerOpen: (state, action) => {
      state.isFilePickerOpen = action.payload;
    },
    setHashtagCommand: (state, action) => {
      state.hashtagCommand = action.payload;
    },
    setIsToolPickerOpen: (state, action) => {
      state.isToolPickerOpen = action.payload;
    },
    setToolCommand: (state, action) => {
      state.toolCommand = action.payload;
    },
    setFocusPrompt: (state, action) => {
      state.focusPrompt = action.payload;
    },
    setFocusFile: (state, action) => {
      state.focusFile = action.payload;
    },
    setFocusTool: (state, action) => {
      state.focusTool = action.payload;
    },
    setFocusAssistant: (state, action) => {
      state.focusAssistant = action.payload;
    },
    setAtCommand: (state, action) => {
      state.atCommand = action.payload;
    },
    setIsAssistantPickerOpen: (state, action) => {
      state.isAssistantPickerOpen = action.payload;
    },
    setUseRetrieval: (state, action) => {
      state.useRetrieval = action.payload;
    },
    setSourceCount: (state, action) => {
      state.sourceCount = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(syncChatMessages.pending, state => {
      //   state.baseChatRequest.status = 'loading';
      // })
      // .addCase(syncChatMessages.fulfilled, (state, action) => {
      //   state.baseChatRequest.status = 'succeeded';
      //   state.chatMessages = action.payload.messages;
      // })
      // .addCase(syncChatMessages.rejected, (state, action) => {
      //   state.baseChatRequest.status = 'failed';
      //   state.baseChatRequest.error = action.error.message;
      // })
      .addCase(addEnvToUser.pending, state => {
        state.baseChatRequest.status = 'loading';
      })
      .addCase(addEnvToUser.fulfilled, (state, action) => {
        console.log('addEnvToUser.fulfilled:', action.payload);
        state.baseChatRequest.status = 'succeeded';
        state.baseChatRequest.success = action.payload;
        state.baseChatRequest.message = 'Added API key successfully';
      })
      .addCase(addEnvToUser.rejected, (state, action) => {
        state.baseChatRequest.status = 'failed';
        state.baseChatRequest.error = action.error.message;
      });
  },
});

export const {
  setMode,
  setLoading,
  setError,
  setChatRequestData,
  setApiKey,
  setIsPromptPickerOpen,
  setSlashCommand,
  setIsFilePickerOpen,
  setHashtagCommand,
  setIsToolPickerOpen,
  setToolCommand,
  setFocusPrompt,
  setFocusFile,
  setFocusTool,
  setFocusAssistant,
  setAtCommand,
  setIsAssistantPickerOpen,
  setIsGenerating,
  setFirstTokenReceived,
  setAbortController,
  setIsDisabled,
  setActiveLocal,
  setIsMessagesUpdated,
  setFirstMessageReceived,
  setUserInput,
  setChatMessages,
  setChatSettings,
  setSelectedChat,
  setChatFileItems,
  setPayload,
  setUseRetrieval,
  setSourceCount,
} = baseChatSlice.actions;

export default baseChatSlice.reducer;
//     addChatSessionReducer: (state, action) => {
//       state.history = [action.payload.history, ...state.history];
//       state.chats = {
//         ...state.chats,
//         [action.payload.history.id]: action.payload.chatData,
//       };
//       state.active = action.payload.history.id;
//     },
//     updateChatSessionReducer: (state, action) => {
//       state.history = state.history.map(item =>
//         item.id === action.payload.id
//           ? { ...item, ...action.payload.edit }
//           : item
//       );
//     },
//     deleteChatSessionReducer: (state, action) => {
//       const updatedHistory = [...state.history];
//       const deletedSession = updatedHistory.splice(action.payload.index, 1)[0];
//       const newActive =
//         updatedHistory.length === 0
//           ? null
//           : updatedHistory[
//               Math.min(action.payload.index, updatedHistory.length - 1)
//             ].id;
//       state.history = updatedHistory;
//       state.chats = Object.keys(state.chats)
//         .filter(key => key !== deletedSession.id)
//         .reduce((res, key) => ((res[key] = state.chats[key]), res), {});
//       state.active = newActive;
//     },
//     addChatById: (state, action) => {
//       const newChatState = { ...state.chats };
//       if (!newChatState[action.payload.id]) {
//         newChatState[action.payload.id] = [];
//       }
//       newChatState[action.payload.id].push(action.payload.chat);
//       state.chats = newChatState;
//     },
//     updateChatById: (state, action) => {
//       const { id, index, chat } = action.payload;
//       state.chats = {
//         ...state.chats,
//         [id]: state.chats[id].map((item, i) => (i === index ? chat : item)),
//       };
//     },
//     getChatByIdAndIndex: (state, action) => {
//       state.chats = {
//         ...state.chats,
//         [action.payload.id]: state.chats[action.payload.id].map((item, i) =>
//           i === action.payload.index ? action.payload.chat : item
//         ),
//       };
//     },
//     clearChatById: (state, action) => {
//       state.chats = {
//         ...state.chats,
//         [action.payload.id]: [],
//       };
//     },
//     updateChatPartialById: (state, action) => {
//       const { id, index, chat } = action.payload;
//       state.chats = {
//         ...state.chats,
//         [id]: state.chats[id].map((item, i) => (i === index ? chat : item)),
//       };
//     },
//     deleteChatById: async (state, action) => {
//       const { id, index } = action.payload;
//       const [keys, keys_length] = Object.entries(state.chats);
//       if (!id) {
//         if (keys_length) {
//           const chatData = state.chats[keys[0]];
//           const chat = chatData[index];
//           chatData.splice(index, 1);
//           if (chat) await deleteChatData(chat);
//         }
//         return;
//       }

//       if (keys.includes(id)) {
//         const chatData = state.chats[id];
//         const chat = chatData[index];
//         chatData.splice(index, 1);
//         if (chat) await deleteChatData(chat);
//       }
//     },
//     updateChatSessionIfEdited: async (state, action) => {
//       const { id, edit } = action.payload;
//       const session = state.history.find(item => item.id === id);
//       if (session) {
//         const updatedSession = { ...session, ...edit };
//         state.history = state.history.map(item =>
//           item.id === id ? updatedSession : item
//         );
//         await fetchUpdateChatById(id, edit);
//       }
//     },
//     clearState: state => {
//       state.history = [];
//       state.active = null;
//       state.chats = {};
//     },
