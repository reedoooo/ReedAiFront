import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sessions } from 'api/chat';
import { getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'chatSessionStore';
const REDUX_NAME = 'chatSessions';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalSessionData(data) {
  setLocalData(LOCAL_NAME, data);
}
// Async thunk for creating a new chat session
export const createChatSession = createAsyncThunk(
  `${REDUX_NAME}/createChatSession`,
  async (newSessionData, { rejectWithValue }) => {
    try {
      const response = await sessions.create(newSessionData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
  setActiveSession,
  setSessionHeader,
} = chatSessionsSlice.actions;

export default chatSessionsSlice.reducer;
