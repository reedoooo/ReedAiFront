import { createSlice } from '@reduxjs/toolkit';
import { getLocalData, setLocalData } from './helpers';

const LOCAL_NAME = 'chatSessionStore';
const REDUX_NAME = 'chatSessions';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalSessionData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const chatSessionsSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      console.log('setSessionId action payload', action.payload);
      setLocalSessionData({ ...state, sessionId: action.payload });
      state.sessionId = action.payload;
    },
    setSessionHeader: (state, action) => {
      console.log('setSessionHeader action payload', action.payload);
      setLocalSessionData({ ...state, sessionHeader: action.payload });
      state.sessionHeader = action.payload;
    },
    setActiveSession: (state, action) => {
      console.log('setActiveSession action payload', action.payload);
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
      setLocalSessionData({
        ...state,
        activeSession: activeSessionObject,
        sessionId: session._id,
      });
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
        sessionId: action.payload._id,
      });
    },
  },
});

export { initialState as chatSessionsInitialState };

export const {
  setChatSessions,
  setSelectedChatSession,
  setSessionId,
  setActiveSession,
  setSessionHeader,
} = chatSessionsSlice.actions;

export default chatSessionsSlice.reducer;
