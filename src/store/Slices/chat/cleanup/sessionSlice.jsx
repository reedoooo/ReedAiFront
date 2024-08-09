import { createSlice } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import { defaultChatSessionData } from '../helpers';

// export const reloadRoute = createAsyncThunk(
//   'chat/reloadRoute',
//   async (id, { dispatch }) => {
//     customHistory.push({ pathname: '/chat', search: `?chatId=${id}` });
//     dispatch(setActiveSession(id));
//   }
// );

// export const syncChatSessions = createAsyncThunk(
//   'chat/syncChatSessions',
//   async (_, { dispatch }) => {
//     const sessions = await getChatSessionsByUser();
//     const historyData = sessions.reverse();
//     if (historyData.length === 0) {
//       const newChatText = 'chat.new';
//       historyData.push(await getChatSessionDefault(newChatText));
//     }
//     const activeSession = await getUserActiveChatSession();
//     const activeSessionId = activeSession
//       ? activeSession.chatSessionId
//       : historyData[0].id;
//     dispatch(setActiveSession(activeSessionId));
//     if (customHistory.location.search.split('=')[1] !== activeSessionId) {
//       await dispatch(reloadRoute(activeSessionId));
//     }
//   }
// );

// export const updateChatSessionAsync = createAsyncThunk(
//   'chat/updateChatSession',
//   async ({ id, edit }) => {
//     await fetchUpdateChatById(id, edit);
//   }
// );

// export const deleteChatSessionAsync = createAsyncThunk(
//   'chat/deleteChatSession',
//   async index => {
//     await deleteChatData(index);
//   }
// );

// export const setActiveAsync = createAsyncThunk(
//   'chat/setActive',
//   async (id, { dispatch }) => {
//     dispatch(setActiveSession(id));
//     await createOrUpdateUserActiveChatSession(id);
//     await dispatch(reloadRoute(id));
//   }
// );

// export const initializeIds = createAsyncThunk(
//   'chat/initializeIds',
//   async (_, { dispatch }) => {
//     let chatId = localStorage.getItem('chatId');
//     let sessionId = localStorage.getItem('sessionId');
//     if (!chatId) {
//       chatId = new mongoose.Types.ObjectId().toString();
//       localStorage.setItem('chatId', chatId);
//     }
//     if (!sessionId) {
//       sessionId = new mongoose.Types.ObjectId().toString();
//       localStorage.setItem('sessionId', sessionId);
//     }
//     dispatch(setChatId(chatId));
//     dispatch(setSessionId(sessionId));
//   }
// );

// export const addChatSessionAsync = createAsyncThunk(
//   'chat/addChatSession',
//   async ({ historyData, chatData = [] }, { dispatch }) => {
//     const newSessionId = new mongoose.Types.ObjectId().toString();
//     await createChatSession(newSessionId, historyData.title, historyData.model);
//     localStorage.setItem('sessionId', newSessionId);
//     dispatch(setSessionId(newSessionId));
//     // dispatch(generalChatSlice.actions.setChat({ [newSessionId]: chatData }));
//     await dispatch(reloadRoute(newSessionId));
//   }
// );
const LOCAL_NAME = 'sessions';
const API_KEY = 'apiKey';
const CHAT_SESSION_ID = 'sessionId';
const CHAT_OTHER = 'chatId';
const DEFAULT_SESSION = 'defaultSession';
const ACTIVE_SESSION = 'activeSession';

function getLocalChatSessionData() {
  const apiKey = localStorage.getItem(API_KEY);
  const chatId = localStorage.getItem(CHAT_OTHER);
  const sessionId = localStorage.getItem(CHAT_SESSION_ID);
  const defaultSession = localStorage.getItem[DEFAULT_SESSION];
  const activeSession = localStorage.getItem[ACTIVE_SESSION];
  const localSessionData = JSON.parse(
    localStorage.getItem(LOCAL_NAME) ||
      JSON.stringify({
        apiKey,
        chatId,
        sessionId,
        defaultSession,
        activeSession,
      })
  );
  return { ...defaultChatSessionData(), ...localSessionData };
}

const initialState = getLocalChatSessionData();

function setLocalSessionData(data) {
  localStorage.setItem(LOCAL_NAME, JSON.stringify(data));
}
export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
      localStorage.setItem('apiKey', action.payload);
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
      localStorage.setItem('chatId', action.payload);
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      localStorage.setItem('sessionId', action.payload);
    },
    setActiveSession: (state, action) => {
      state.activeSession = action.payload;
      localStorage.setItem('activeSession', JSON.stringify(action.payload));
    },
    // other session reducers...
  },
  // extraReducers: builder => {
  //   // builder.addCase(reloadRoute.fulfilled, (state, action) => {
  //   //   console.log('Handling reload route logic...', action.payload);
  //   // });
  //   // .addCase(initializeIds.fulfilled, (state, action) => {
  //   //   console.log('Handling initializeIds logic...', action.payload);
  //   // })
  //   // .addCase(syncChatSessions.fulfilled, (state, action) => {
  //   //   console.log('Handling sync chat sessions logic...', action.payload);
  //   // })
  //   // .addCase(updateChatSessionAsync.fulfilled, (state, action) => {
  //   //   console.log('Handling update chat session logic...', action.payload);
  //   // })
  //   // .addCase(deleteChatSessionAsync.fulfilled, (state, action) => {
  //   //   console.log('Handling delete chat session logic...', action.payload);
  //   // })
  //   // .addCase(setActiveAsync.fulfilled, (state, action) => {
  //   //   console.log('Handling set active session logic...', action.payload);
  //   // })
  //   // .addCase(addChatSessionAsync.fulfilled, (state, action) => {
  //   //   console.log('Handling add chat session logic...', action.payload);
  //   // });
  // },
});

export { initialState as sessionInitialState };

export const { setApiKey, setChatId, setSessionId, setActiveSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;
