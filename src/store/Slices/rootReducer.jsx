import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import {
  // activeChatReducer,
  // passiveChatReducer,
  // generalChatReducer,
  // chatInputCommandReducer,
  assistantReducer,
  baseChatReducer,
  chatSessionReducer,
  collectionReducer,
  fileReducer,
  folderReducer,
  modelReducer,
  presetReducer,
  promptReducer,
  toolReducer,
  workspaceReducer,
} from './chat';
import colorModeSlice from './colorModeSlice';
import { authReducer, profileReducer, userReducer } from './user';

export const rootReducer = combineReducers({
  // passiveChat: passiveChatReducer,
  // generalChat: generalChatReducer,
  // activeChat: activeChatReducer,
  // chatInputCommand: chatInputCommandReducer,
  // retrieval: retrievalReducer,
  app: appSlice,
  colorMode: colorModeSlice,
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  workspace: workspaceReducer,
  baseChat: baseChatReducer,
  chatSession: chatSessionReducer,
  assistant: assistantReducer,
  collection: collectionReducer,
  file: fileReducer,
  folder: folderReducer,
  model: modelReducer,
  preset: presetReducer,
  prompt: promptReducer,
  tool: toolReducer,
});

export default rootReducer;
