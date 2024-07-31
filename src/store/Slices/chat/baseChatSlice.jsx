import { createSlice, combineSlices } from '@reduxjs/toolkit';

export const baseChatSlice = createSlice({
  name: 'chat',
  initialState: {
    baseChatRequest: {
      status: 'idle',
      error: null,
      success: null,
      message: '',
    },
    apiKey: localStorage.getItem('apiKey') || '',
    workspaceId: localStorage.getItem('chatId') || '',
    sessionId: localStorage.getItem('sessionId') || '',
    activeSession: {
      id: '',
      title: '',
      summary: '',
      systemPrompt: '',
      messages: [],
      files: [],
      tools: [],
      stats: {},
      setting: {},
    },
  },
  reducers: {
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
      state.apiKey = action.payload;
      localStorage.setItem('apiKey', action.payload);
    },
    setWorkspaceId: (state, action) => {
      state.workspaceId = action.payload;
      localStorage.setItem('workspaceId', action.payload);
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      localStorage.setItem('sessionId', action.payload);
    },
    setActiveSession: (state, action) => {
      const session = action.payload;
      const activeSessionObject = {
        id: session._id,
        title: session.name,
        summary: session.summary,
        systemPrompt: session.systemPrompt || '',
        messages: session.messages || [],
        files: session.files || [],
        tools: session.tools || [],
        stats: {
          tokenUsage: 0,
          messageCount: session.messages.length,
        },
        setting: session.setting || {},
      };
      state.activeSession = activeSessionObject;
      state.sessionId = session._id;
      localStorage.setItem(
        'activeSession',
        JSON.stringify(activeSessionObject)
      ),
        localStorage.setItem('sessionId', session._id);
    },
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
  },
});

export const {
  setLoading,
  setError,
  setChatRequestData,
  setApiKey,
  setWorkspaceId,
  setSessionId,
  setActiveSession,
} = baseChatSlice.actions;

export default baseChatSlice.reducer;
