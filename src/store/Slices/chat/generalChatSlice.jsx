import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chat: {},
  chats: [],
  envKeyMap: {
    openai: 'OPENAI_API_KEY',
    openai_organization_id: 'OPENAI_ORGANIZATION_ID',
  },
};

export const generalChatSlice = createSlice({
  name: 'generalChat',
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setEnvKeyMap: (state, action) => {
      state.envKeyMap = action.payload;
    },
  },
});

export { initialState as chatGeneralInitialState };

export const { setEnvKeyMap, setChats, setChat } = generalChatSlice.actions;

export default generalChatSlice.reducer;
