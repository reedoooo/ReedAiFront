import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
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
  toolReducer,
  workspaceReducer,
} from './chat';
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
  tool: toolReducer,
  workspace: workspaceReducer,
  auth: authReducer,
  profile: profileReducer,
  user: userReducer,
});

export default rootReducer;
