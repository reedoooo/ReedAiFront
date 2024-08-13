import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './app';
import {
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
import { userReducer } from './user';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
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
