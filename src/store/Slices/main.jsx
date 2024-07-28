// import { combineReducers } from '@reduxjs/toolkit';
// import { activeChatSlice } from './chat/activeChatSlice';
// import { assistantSlice } from './chat/assistantSlice';
// import { baseChatSlice } from './chat/baseChatSlice';
// import { chatInputCommandSlice } from './chat/chatInputCommandSlice';
// import { collectionSlice } from './chat/collectionSlice';
// import { fileSlice } from './chat/fileSlice';
// import { foldersSlice } from './chat/foldersSlice';
// import { generalChatSlice } from './chat/generalChatSlice';
// import { modelSlice } from './chat/modelsSlice';
// import { passiveChatSlice } from './chat/passiveChatSlice';
// import { presetSlice } from './chat/presetSlice';
// import { promptSlice } from './chat/promptSlice';
// import { retrievalSlice } from './chat/retrievalSlice';
// import { sessionSlice } from './chat/sessionSlice';
// import { toolSlice } from './chat/toolSlice';
// import { workspaceSlice } from './chat/workspaceSlice';
// import { profileSlice } from './user/profileSlice';

// // const chatSlice = combineSlices({
// //   baseChat: baseChatSlice,
// //   activeChat: activeChatSlice,
// //   assistant: assistantSlice,
// //   chatInputCommand: chatInputCommandSlice,
// //   collection: collectionSlice,
// //   file: fileSlice,
// //   folders: foldersSlice,
// //   generalChat: generalChatSlice,
// //   model: modelSlice,
// //   passiveChat: passiveChatSlice,
// //   preset: presetSlice,
// //   prompt: promptSlice,
// //   retrieval: retrievalSlice,
// //   session: sessionSlice,
// //   tool: toolSlice,
// //   workspace: workspaceSlice,
// //   profile: profileSlice,
// // });

// export const chatReducer = combineReducers({
//   baseChat: baseChatSlice.reducer,
//   activeChat: activeChatSlice.reducer,
//   assistant: assistantSlice.reducer,
//   chatInputCommand: chatInputCommandSlice.reducer,
//   collection: collectionSlice.reducer,
//   file: fileSlice.reducer,
//   folders: foldersSlice.reducer,
//   generalChat: generalChatSlice.reducer,
//   model: modelSlice.reducer,
//   passiveChat: passiveChatSlice.reducer,
//   preset: presetSlice.reducer,
//   prompt: promptSlice.reducer,
//   retrieval: retrievalSlice.reducer,
//   session: sessionSlice.reducer,
//   tool: toolSlice.reducer,
//   workspace: workspaceSlice.reducer,
//   profile: profileSlice.reducer,
// });
// export const chatActions = {
//   ...baseChatSlice.actions,
//   ...profileSlice.actions,
//   ...collectionSlice.actions,
//   ...generalChatSlice.actions,
//   ...modelSlice.actions,
//   ...presetSlice.actions,
//   ...promptSlice.actions,
//   ...retrievalSlice.actions,
//   ...toolSlice.actions,
//   ...workspaceSlice.actions,
//   ...sessionSlice.actions,
//   ...assistantSlice.actions,
//   ...chatInputCommandSlice.actions,
//   ...fileSlice.actions,
//   ...foldersSlice.actions,
//   ...activeChatSlice.actions,
//   ...passiveChatSlice.actions,
// };
// export default chatReducer;

// // import { combineSlices, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import { combineReducers } from '@reduxjs/toolkit';
// // import activeChatReducer from './activeChatSlice';
// // import assistantReducer from './assistantSlice';
// // import baseChatReducer from './baseChatSlice';
// // import chatInputCommandReducer from './chatInputCommandSlice';
// // import collectionReducer from './collectionSlice';
// // import fileReducer from './fileSlice';
// // import foldersReducer from './foldersSlice';
// // import generalChatReducer from './generalChatSlice';
// // import modelsReducer from './modelsSlice';
// // import passiveChatReducer from './passiveChatSlice';
// // import presetReducer from './presetSlice';
// // import promptReducer from './promptSlice';
// // import retrievalReducer from './retrievalSlice';
// // import sessionReducer from './sessionSlice';
// // import toolReducer from './toolSlice';
// // import workspaceReducer from './workspaceSlice';

// // const chatItemsReducer = combineReducers({
// //   activeChat: activeChatReducer,
// //   assistant: assistantReducer,
// //   baseChat: baseChatReducer,
// //   chatInputCommand: chatInputCommandReducer,
// //   collection: collectionReducer,
// //   file: fileReducer,
// //   folders: foldersReducer,
// //   generalChat: generalChatReducer,
// //   models: modelsReducer,
// //   passiveChat: passiveChatReducer,
// //   preset: presetReducer,
// //   prompt: promptReducer,
// //   retrieval: retrievalReducer,
// //   session: sessionReducer,
// //   tool: toolReducer,
// //   workspace: workspaceReducer,
// // });

// // export default chatItemsReducer;
// // Import slices
// // import { profileSlice } from '../../user/profileSlice';
// // import { activeChatSlice } from './activeChatSlice';
// // import { assistantSlice } from './assistantSlice';
// // import { baseChatSlice } from './baseChatSlice';
// // import { chatInputCommandSlice } from './chatInputCommandSlice';
// // import { collectionSlice } from './collectionSlice';
// // import { fileSlice } from './fileSlice';
// // import { foldersSlice } from './foldersSlice';
// // import { generalChatSlice } from './generalChatSlice';
// // import { modelSlice } from './modelsSlice';
// // import { passiveChatSlice } from './passiveChatSlice';
// // import { presetSlice } from './presetSlice';
// // import { promptSlice } from './promptSlice';
// // import { retrievalSlice } from './retrievalSlice';
// // import { sessionSlice } from './sessionSlice';
// // import { toolSlice } from './toolSlice';
// // import { workspaceSlice } from './workspaceSlice';

// // // --- COMBINE SLICES ---
// // const chatSlice = combineSlices({
// //   baseChat: baseChatSlice.reducer,
// //   activeChat: activeChatSlice.reducer,
// //   assistant: assistantSlice.reducer,
// //   chatInputCommand: chatInputCommandSlice.reducer,
// //   collection: collectionSlice.reducer,
// //   file: fileSlice.reducer,
// //   folders: foldersSlice.reducer,
// //   generalChat: generalChatSlice.reducer,
// //   model: modelSlice.reducer,
// //   passiveChat: passiveChatSlice.reducer,
// //   preset: presetSlice.reducer,
// //   prompt: promptSlice.reducer,
// //   retrieval: retrievalSlice.reducer,
// //   session: sessionSlice.reducer,
// //   tool: toolSlice.reducer,
// //   workspace: workspaceSlice.reducer,
// //   profile: profileSlice.reducer,
// // });

// // // --- ACTIONS ---
// // export const chatActions = {
// //   // Base Chat Actions
// //   ...baseChatSlice.actions,

// //   // Profile Actions
// //   ...profileSlice.actions,

// //   // Collection Actions
// //   ...collectionSlice.actions,

// //   // General Chat Actions
// //   ...generalChatSlice.actions,

// //   // Model Actions
// //   ...modelSlice.actions,

// //   // Preset Actions
// //   ...presetSlice.actions,

// //   // Prompt Actions
// //   ...promptSlice.actions,

// //   // Retrieval Actions
// //   ...retrievalSlice.actions,

// //   // Tool Actions
// //   ...toolSlice.actions,

// //   // Workspace Actions
// //   ...workspaceSlice.actions,

// //   // Session Actions
// //   ...sessionSlice.actions,

// //   // Assistant Actions
// //   ...assistantSlice.actions,

// //   // Chat Input Command Actions
// //   ...chatInputCommandSlice.actions,

// //   // File Actions
// //   ...fileSlice.actions,

// //   // Folders Actions
// //   ...foldersSlice.actions,

// //   // Active Chat Actions
// //   ...activeChatSlice.actions,

// //   // Passive Chat Actions
// //   ...passiveChatSlice.actions,
// // };

// // export default chatSlice;
// // // Combine initial states
// // const initialState = {
// //   ...profileSlice.initialState,
// //   ...collectionSlice.initialState,
// //   ...generalChatSlice.initialState,
// //   ...modelSlice.initialState,
// //   ...presetSlice.initialState,
// //   ...promptSlice.initialState,
// //   ...retrievalSlice.initialState,
// //   ...toolSlice.initialState,
// //   ...workspaceSlice.initialState,
// //   ...sessionSlice.initialState,
// //   ...assistantSlice.initialState,
// //   ...chatInputCommandSlice.initialState,
// //   ...fileSlice.initialState,
// //   ...foldersSlice.initialState,
// //   ...activeChatSlice.initialState,
// //   ...passiveChatSlice.initialState,
// // };

// // // Create the main chat slice
// // const chatSlice = createSlice({
// //   name: 'chat',
// //   initialState,
// //   reducers: {
// //     // Active Chat Actions
// //     ...activeChatSlice.actions,
// //     // Passive Chat Actions
// //     ...passiveChatSlice.actions,
// //     // Chat Input Command Actions
// //     ...chatInputCommandSlice.actions,
// //     // Collection Actions
// //     ...collectionSlice.actions,
// //     // File Actions
// //     ...fileSlice.actions,
// //     // Folder Actions
// //     ...foldersSlice.actions,
// //     // General Chat Actions
// //     ...generalChatSlice.actions,
// //     // Model Actions
// //     ...modelSlice.actions,
// //     // Preset Actions
// //     ...presetSlice.actions,
// //     // Profile Actions
// //     ...profileSlice.actions,
// //     // Prompt Actions
// //     ...promptSlice.actions,
// //     // Retrieval Actions
// //     ...retrievalSlice.actions,
// //     // Session Actions
// //     ...sessionSlice.actions,
// //     // Tool Actions
// //     ...toolSlice.actions,
// //     // Workspace Actions
// //     ...workspaceSlice.actions,
// //     // Assistant Actions
// //     ...assistantSlice.actions,
// //     // Extra Reducers
// //     addChatSessionReducer: (state, action) => {
// //       state.history = [action.payload.history, ...state.history];
// //       state.chats = {
// //         ...state.chats,
// //         [action.payload.history.id]: action.payload.chatData,
// //       };
// //       state.active = action.payload.history.id;
// //     },
// //     updateChatSessionReducer: (state, action) => {
// //       state.history = state.history.map(item =>
// //         item.id === action.payload.id
// //           ? { ...item, ...action.payload.edit }
// //           : item
// //       );
// //     },
// //     deleteChatSessionReducer: (state, action) => {
// //       const updatedHistory = [...state.history];
// //       const deletedSession = updatedHistory.splice(action.payload.index, 1)[0];
// //       const newActive =
// //         updatedHistory.length === 0
// //           ? null
// //           : updatedHistory[
// //               Math.min(action.payload.index, updatedHistory.length - 1)
// //             ].id;
// //       state.history = updatedHistory;
// //       state.chats = Object.keys(state.chats)
// //         .filter(key => key !== deletedSession.id)
// //         .reduce((res, key) => ((res[key] = state.chats[key]), res), {});
// //       state.active = newActive;
// //     },
// //     addChatById: (state, action) => {
// //       const newChatState = { ...state.chats };
// //       if (!newChatState[action.payload.id]) {
// //         newChatState[action.payload.id] = [];
// //       }
// //       newChatState[action.payload.id].push(action.payload.chat);
// //       state.chats = newChatState;
// //     },
// //     updateChatById: (state, action) => {
// //       const { id, index, chat } = action.payload;
// //       state.chats = {
// //         ...state.chats,
// //         [id]: state.chats[id].map((item, i) => (i === index ? chat : item)),
// //       };
// //     },
// //     getChatByIdAndIndex: (state, action) => {
// //       state.chats = {
// //         ...state.chats,
// //         [action.payload.id]: state.chats[action.payload.id].map((item, i) =>
// //           i === action.payload.index ? action.payload.chat : item
// //         ),
// //       };
// //     },
// //     clearChatById: (state, action) => {
// //       state.chats = {
// //         ...state.chats,
// //         [action.payload.id]: [],
// //       };
// //     },
// //     updateChatPartialById: (state, action) => {
// //       const { id, index, chat } = action.payload;
// //       state.chats = {
// //         ...state.chats,
// //         [id]: state.chats[id].map((item, i) => (i === index ? chat : item)),
// //       };
// //     },
// //     deleteChatById: async (state, action) => {
// //       const { id, index } = action.payload;
// //       const [keys, keys_length] = Object.entries(state.chats);
// //       if (!id) {
// //         if (keys_length) {
// //           const chatData = state.chats[keys[0]];
// //           const chat = chatData[index];
// //           chatData.splice(index, 1);
// //           if (chat) await deleteChatData(chat);
// //         }
// //         return;
// //       }

// //       if (keys.includes(id)) {
// //         const chatData = state.chats[id];
// //         const chat = chatData[index];
// //         chatData.splice(index, 1);
// //         if (chat) await deleteChatData(chat);
// //       }
// //     },
// //     updateChatSessionIfEdited: async (state, action) => {
// //       const { id, edit } = action.payload;
// //       const session = state.history.find(item => item.id === id);
// //       if (session) {
// //         const updatedSession = { ...session, ...edit };
// //         state.history = state.history.map(item =>
// //           item.id === id ? updatedSession : item
// //         );
// //         await fetchUpdateChatById(id, edit);
// //       }
// //     },
// //     clearState: state => {
// //       state.history = [];
// //       state.active = null;
// //       state.chats = {};
// //     },
// //   },
// // });

// // export { default as profile } from '../../user/profileSlice';
// // export { default as activeChat } from './activeChatSlice';
// // export { default as assistant } from './assistantSlice';
// // export { default as chatInputCommand } from './chatInputCommandSlice';
// // export { default as collection } from './collectionSlice';
// // export { default as file } from './fileSlice';
// // export { default as folders } from './foldersSlice';
// // export { default as generalChat } from './generalChatSlice';
// // export { default as model } from './modelsSlice';
// // export { default as passiveChat } from './passiveChatSlice';
// // export { default as preset } from './presetSlice';
// // export { default as prompt } from './promptSlice';
// // export { default as retrieval } from './retrievalSlice';
// // export { default as session } from './sessionSlice';
// // export { default as tool } from './toolSlice';
// // export { default as workspace } from './workspaceSlice';
