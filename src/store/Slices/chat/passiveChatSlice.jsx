import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getChatSessionMessagesBySessionId } from 'api/index';

const initialState = {
  userInput: '',
  chatMessages: [],
  chatSettings: {
    model: 'gpt-4-turbo-preview',
    prompt: 'You are a helpful AI assistant.',
    temperature: 0.5,
    contextLength: 4000,
    includeProfileContext: true,
    includeWorkspaceInstructions: true,
    embeddingsProvider: 'openai',
  },
  selectedChat: null,
  chatFileItems: [],
};
export const syncChatMessages = createAsyncThunk(
  'chat/syncChatMessages',
  async (id, { dispatch }) => {
    if (id) {
      const response = await getChatSessionMessagesBySessionId(id);
      dispatch(
        passiveChatSlice.actions.setChatMessages({
          id,
          messages: response,
        })
      );
    }
  }
);
export const passiveChatSlice = createSlice({
  name: 'passiveChat',
  initialState,
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
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
  },
  extraReducers: builder => {
    builder.addCase(syncChatMessages.fulfilled, (state, action) => {
      const { id, messages } = action.payload;
      if (state.selectedChat && state.selectedChat.id === id) {
        state.chatMessages = messages;
      }
    });
  },
});

export { initialState as chatPassiveInitialState };

export const {
  setUserInput,
  setChatMessages,
  setChatSettings,
  setSelectedChat,
  setChatFileItems,
} = passiveChatSlice.actions;

export default passiveChatSlice.reducer;
