import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
// import chatReducer from './chat/items';
// import { activeChatSlice } from './chat/activeChatSlice';
import {
  activeChatReducer,
  assistantReducer,
  baseChatReducer,
  chatInputCommandReducer,
  collectionReducer,
  fileReducer,
  foldersReducer,
  generalChatReducer,
  modelsReducer,
  passiveChatReducer,
  presetReducer,
  promptReducer,
  retrievalReducer,
  // sessionReducer,
  toolReducer,
  workspaceReducer,
} from './chat';
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
// // import { sessionSlice } from './chat/items/sessionSlice';
// import { toolSlice } from './chat/toolSlice';
// import { workspaceSlice } from './chat/workspaceSlice';
import colorModeSlice from './colorModeSlice';
import { authReducer, profileReducer, userReducer } from './user';

export const rootReducer = combineReducers({
  app: appSlice,
  colorMode: colorModeSlice,
  activeChat: activeChatReducer,
  assistant: assistantReducer,
  baseChat: baseChatReducer,
  chatInputCommand: chatInputCommandReducer,
  collection: collectionReducer,
  file: fileReducer,
  folders: foldersReducer,
  generalChat: generalChatReducer,
  models: modelsReducer,
  passiveChat: passiveChatReducer,
  preset: presetReducer,
  prompt: promptReducer,
  retrieval: retrievalReducer,
  // session: sessionReducer,
  tool: toolReducer,
  workspace: workspaceReducer,
  auth: authReducer,
  profile: profileReducer,
  user: userReducer,
  // // chat: chatReducer,
  // baseChat: baseChatSlice.reducer,
  // activeChat: activeChatSlice.reducer,
  // assistant: assistantSlice.reducer,
  // chatInputCommand: chatInputCommandSlice.reducer,
  // collection: collectionSlice.reducer,
  // file: fileSlice.reducer,
  // folders: foldersSlice.reducer,
  // generalChat: generalChatSlice.reducer,
  // model: modelSlice.reducer,
  // passiveChat: passiveChatSlice.reducer,
  // preset: presetSlice.reducer,
  // prompt: promptSlice.reducer,
  // retrieval: retrievalSlice.reducer,
  // // session: sessionSlice.reducer,
  // tool: toolSlice.reducer,
  // workspace: workspaceSlice.reducer,
  // auth: authReducer,
  // profile: profileReducer,
  // user: userReducer,
});

export default rootReducer;
// // Re-export all actions
// export * from './user';
// export * from './appSlice';
// export * from './colorModeSlice';
// export * from './chat';
