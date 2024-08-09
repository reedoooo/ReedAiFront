// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import mongoose from 'mongoose';
// import { getChatSessionMessagesBySessionId } from 'api/index';
// import { getItem } from 'utils/storage';

// const initialState = {
//   userInput: '',
//   chatMessages: [],
//   chatSettings: {
//     model: 'gpt-4-turbo-preview',
//     prompt: 'You are a helpful AI assistant.',
//     temperature: 0.5,
//     contextLength: 4000,
//     includeProfileContext: true,
//     includeWorkspaceInstructions: true,
//     embeddingsProvider: 'openai',
//   },
//   selectedChat: null,
//   chatFileItems: [],
//   payload: {},
//   // payload: {
//   //   sessionId: getItem('sessionId'),
//   //   chatId: getItem('chatId'),
//   //   regenerate: false,
//   //   prompt: 'Hello, I need help with a project. Can you help me with that?',
//   //   userId: getItem('userId'),
//   //   clientApiKey: getItem('apiKey'),
//   //   role: 'user',
//   //   signal: new AbortController().signal,
//   //   // file: new FormData().append(
//   //   //   'file',
//   //   //   new File(
//   //   //     ['Hello, I need help with a project. Can you help me with that?'],
//   //   //     'test.txt',
//   //   //     { type: 'text/plain' }
//   //   //   )
//   //   // ),
//   // },
// };
// export const syncChatMessages = createAsyncThunk(
//   'chat/syncChatMessages',
//   async (id, { dispatch }) => {
//     if (id) {
//       const response = await getChatSessionMessagesBySessionId(id);
//       dispatch(
//         passiveChatSlice.actions.setChatMessages({
//           id,
//           messages: response,
//         })
//       );
//     }
//   }
// );
// export const passiveChatSlice = createSlice({
//   name: 'passiveChat',
//   initialState,
//   reducers: {
//     setUserInput: (state, action) => {
//       state.userInput = action.payload;
//     },
//     setChatMessages: (state, action) => {
//       state.chatMessages = action.payload;
//     },
//     setChatSettings: (state, action) => {
//       state.chatSettings = action.payload;
//     },
//     setSelectedChat: (state, action) => {
//       state.selectedChat = action.payload;
//     },
//     setChatFileItems: (state, action) => {
//       state.chatFileItems = action.payload;
//     },
//     setPayload: (state, action) => {
//       state.payload = action.payload;
//     },
//   },
//   // extraReducers: builder => {
//   //   builder.addCase(syncChatMessages.fulfilled, (state, action) => {
//   //     const { id, messages } = action.payload;
//   //     if (state.selectedChat && state.selectedChat.id === id) {
//   //       state.chatMessages = messages;
//   //     }
//   //   });
//   // },
// });

// export { initialState as chatPassiveInitialState };

// export const {
//   setUserInput,
//   setChatMessages,
//   setChatSettings,
//   setSelectedChat,
//   setChatFileItems,
//   setPayload,
// } = passiveChatSlice.actions;

// export default passiveChatSlice.reducer;
