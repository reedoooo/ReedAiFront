// Slices/chat/index.js
import { combineReducers, combineSlices } from '@reduxjs/toolkit';
// import { profileSlice } from '../../user/profileSlice';
// import { activeChatSlice } from './activeChatSlice';
// import { assistantSlice } from './assistantSlice';
// import { baseChatSlice } from './baseChatSlice';
// import { chatInputCommandSlice } from './chatInputCommandSlice';
// import { collectionSlice } from './collectionSlice';
// import { fileSlice, fetchFileData } from './fileSlice';
// import { foldersSlice } from './foldersSlice';
// import { generalChatSlice } from './generalChatSlice';
// import { modelSlice } from './modelsSlice';
// import { passiveChatSlice } from './passiveChatSlice';
// import { presetSlice } from './presetSlice';
// import { promptSlice } from './promptSlice';
// import { retrievalSlice } from './retrievalSlice';
// // import { sessionSlice } from './sessionSlice';
// import { toolSlice } from './toolSlice';
// import { workspaceSlice } from './workspaceSlice';
// export default {
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
//   // ...sessionSlice.actions,
//   ...assistantSlice.actions,
//   ...chatInputCommandSlice.actions,
//   ...fileSlice.actions,
//   ...foldersSlice.actions,
//   ...activeChatSlice.actions,
//   ...passiveChatSlice.actions,
//   fetchFileData,
// };
// const chatSlice = combineSlices({
//   baseChat: baseChatSlice,
//   activeChat: activeChatSlice,
//   assistant: assistantSlice,
//   chatInputCommand: chatInputCommandSlice,
//   collection: collectionSlice,
//   file: fileSlice,
//   folders: foldersSlice,
//   generalChat: generalChatSlice,
//   model: modelSlice,
//   passiveChat: passiveChatSlice,
//   preset: presetSlice,
//   prompt: promptSlice,
//   retrieval: retrievalSlice,
//   session: sessionSlice,
//   tool: toolSlice,
//   workspace: workspaceSlice,
//   profile: profileSlice,
// });

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
//   // session: sessionSlice.reducer,
//   tool: toolSlice.reducer,
//   workspace: workspaceSlice.reducer,
//   profile: profileSlice.reducer,
// });

// export default chatReducer;

// export default chatSlice.reducer;

// import { combineReducers } from '@reduxjs/toolkit';
// import { activeChatSlice } from './activeChatSlice';

import activeChatReducer, {
  setIsGenerating,
  setFirstTokenReceived,
  setAbortController,
  setIsDisabled,
  setActiveLocal,
} from './activeChatSlice';
import assistantReducer, {
  setAssistantImages,
  setAssistants,
  setOpenaiAssistants,
  setSelectedAssistant,
} from './assistantSlice';
import baseChatReducer, {
  setLoading,
  setError,
  setChatRequestData,
  setApiKey,
  setChatId,
  setSessionId,
  setActiveSession,
} from './baseChatSlice';
import chatInputCommandReducer, {
  setIsPromptPickerOpen,
  setSlashCommand,
  setFocusPrompt,
  setFocusFile,
  setFocusTool,
  setFocusAssistant,
  setAtCommand,
  setIsAssistantPickerOpen,
  setIsFilePickerOpen,
  setIsToolPickerOpen,
  setToolCommand,
  setHashtagCommand,
} from './chatInputCommandSlice';
import collectionReducer, { setCollections } from './collectionSlice';
import fileReducer, {
  setChatFiles,
  setFiles,
  setChatImages,
  setNewMessageImages,
  setNewMessageFiles,
  setShowFilesDisplay,
  fetchFileData,
} from './fileSlice';
import foldersReducer, { setFolders, setSelectedFolder } from './foldersSlice';
import generalChatReducer, {
  setEnvKeyMap,
  setChats,
  setChat,
} from './generalChatSlice';
import modelsReducer, {
  setAvailableHostedModels,
  setAvailableLocalModels,
  setAvailableOpenRouterModels,
  setModels,
} from './modelsSlice';
import passiveChatReducer, {
  setUserInput,
  setChatMessages,
  setChatSettings,
  setSelectedChat,
  setChatFileItems,
} from './passiveChatSlice';
import presetReducer, { setPresets, setSelectedPreset } from './presetSlice';
import promptReducer, { setPrompts, setSelectedPrompt } from './promptSlice';
import retrievalReducer, {
  setSourceCount,
  setUseRetrieval,
} from './retrievalSlice';
// import sessionReducer, {
//   setApiKey,
//   setChatId,
//   setSessionId,
//   setActiveSession,
// } from './sessionSlice';
import toolReducer, {
  setSelectedTools,
  setToolInUse,
  setTools,
} from './toolSlice';
import workspaceReducer, {
  setWorkspaces,
  setSelectedWorkspace,
  setWorkspaceImages,
  setHomeWorkSpace,
} from './workspaceSlice';

export {
  setPresets,
  setSelectedPreset,
  setAssistantImages,
  setAssistants,
  setOpenaiAssistants,
  setSelectedAssistant,
  setLoading,
  setError,
  setChatRequestData,
  setApiKey,
  setChatId,
  setSessionId,
  setActiveSession,
  setIsGenerating,
  setFirstTokenReceived,
  setAbortController,
  setIsDisabled,
  setActiveLocal,
  setIsPromptPickerOpen,
  setSlashCommand,
  setFocusPrompt,
  setFocusFile,
  setFocusTool,
  setFocusAssistant,
  setAtCommand,
  setIsAssistantPickerOpen,
  setIsFilePickerOpen,
  setIsToolPickerOpen,
  setToolCommand,
  setHashtagCommand,
  setCollections,
  setChatFiles,
  setFiles,
  setChatImages,
  setNewMessageImages,
  setNewMessageFiles,
  setShowFilesDisplay,
  setFolders,
  setSelectedFolder,
  setEnvKeyMap,
  setChats,
  setChat,
  setAvailableHostedModels,
  setAvailableLocalModels,
  setAvailableOpenRouterModels,
  setModels,
  setUserInput,
  setChatMessages,
  setChatSettings,
  setSelectedChat,
  setChatFileItems,
  setPrompts,
  setSelectedPrompt,
  setSourceCount,
  setUseRetrieval,
  setWorkspaces,
  setSelectedWorkspace,
  setWorkspaceImages,
  setHomeWorkSpace,
  setSelectedTools,
  setToolInUse,
  setTools,
  fetchFileData,
};

export {
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
};

// const chatItemsReducer = combineReducers({
//   activeChat: activeChatReducer,
//   assistant: assistantReducer,
//   baseChat: baseChatReducer,
//   chatInputCommand: chatInputCommandReducer,
//   collection: collectionReducer,
//   file: fileReducer,
//   folders: foldersReducer,
//   generalChat: generalChatReducer,
//   models: modelsReducer,
//   passiveChat: passiveChatReducer,
//   preset: presetReducer,
//   prompt: promptReducer,
//   retrieval: retrievalReducer,
//   session: sessionReducer,
//   tool: toolReducer,
//   workspace: workspaceReducer,
// });

// export default chatItemsReducer;

// // Export all actions
// export {
//   setIsGenerating,
//   setFirstTokenReceived,
//   setAbortController,
//   setActiveLocal,
//   setIsDisabled,
//   setPresets,
//   setSelectedPreset,
//   setChat,
//   setUserInput,
//   setSelectedChat,
//   setLoading,
//   setActiveSession,
//   setError,
//   setChatRequestData,
//   setAssistantImages,
//   setAssistants,
//   setOpenaiAssistants,
//   setSelectedAssistant,
//   setIsPromptPickerOpen,
//   setSlashCommand,
//   setFocusPrompt,
//   setFocusFile,
//   setFocusTool,
//   setFocusAssistant,
//   setAtCommand,
//   setIsAssistantPickerOpen,
//   setIsFilePickerOpen,
//   setIsToolPickerOpen,
//   setToolCommand,
//   setHashtagCommand,
//   setCollections,
//   setChatFiles,
//   setFiles,
//   setChatImages,
//   setNewMessageImages,
//   setNewMessageFiles,
//   setShowFilesDisplay,
//   setFolders,
//   setChats,
//   setEnvKeyMap,
//   setAvailableHostedModels,
//   setAvailableLocalModels,
//   setAvailableOpenRouterModels,
//   setModels,
//   setChatFileItems,
//   setChatMessages,
//   setChatSettings,
//   setPrompts,
//   setSelectedPrompt,
//   setSourceCount,
//   setUseRetrieval,
//   setApiKey,
//   setChatId,
//   setSessionId,
//   setSelectedTools,
//   setToolInUse,
//   setTools,
//   setSelectedWorkspace,
//   setHomeWorkSpace,
//   setWorkspaceImages,
//   setWorkspaces,
// };

// // // export * from './activeChatSlice';
// // // export * from './assistantSlice';
// // // export * from './chatInputCommandSlice';
// // // export * from './collectionSlice';
// // // export * from './fileSlice';
// // // export * from './foldersSlice';
// // // export * from './generalChatSlice';
// // // export * from './modelsSlice';
// // // export * from './passiveChatSlice';
// // // export * from './presetSlice';
// // // export * from './promptSlice';
// // // export * from './retrievalSlice';
// // // export * from './sessionSlice';
// // // export * from './toolSlice';
// // // export * from './workspaceSlice';
// // // export * from './main';
// // import { combineReducers, combineSlices } from '@reduxjs/toolkit';
// // // import activeChatSlice from './activeChatSlice';
// // // import assistantSlice from './assistantSlice';
// // // import baseChatSlice from './baseChatSlice';
// // // import chatInputCommandSlice from './chatInputCommandSlice';
// // // import collectionSlice from './collectionSlice';
// // // import fileSlice from './fileSlice';
// // // import foldersSlice from './foldersSlice';
// // // import generalChatSlice from './generalChatSlice';
// // // import modelSlice from './modelsSlice';
// // // import passiveChatSlice from './passiveChatSlice';
// // // import presetSlice from './presetSlice';
// // // import promptSlice from './promptSlice';
// // // import retrievalSlice from './retrievalSlice';
// // // import sessionSlice from './sessionSlice';
// // // import toolSlice from './toolSlice';
// // // import workspaceSlice from './workspaceSlice';
// // // export const chatReducer = combineReducers({
// // //   activeChat: activeChatSlice,
// // //   assistant: assistantSlice,
// // //   baseChat: baseChatSlice,
// // //   chatInputCommand: chatInputCommandSlice,
// // //   collection: collectionSlice,
// // //   file: fileSlice,
// // //   folders: foldersSlice,
// // //   generalChat: generalChatSlice,
// // //   models: modelSlice,
// // //   passiveChat: passiveChatSlice,
// // //   preset: presetSlice,
// // //   prompt: promptSlice,
// // //   retrieval: retrievalSlice,
// // //   session: sessionSlice,
// // //   tool: toolSlice,
// // //   workspace: workspaceSlice,
// // // });
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
// //   name: 'chat',
// //   // initialState: {
// //   //   activeChat: activeChatSlice,
// //   //   assistant: assistantSlice.initialState,
// //   //   baseChat: baseChatSlice.initialState,
// //   //   chatInputCommand: chatInputCommandSlice.initialState,
// //   //   collection: collectionSlice.initialState,
// //   //   file: fileSlice.initialState,
// //   //   folders: foldersSlice.initialState,
// //   //   generalChat: generalChatSlice.initialState,
// //   //   model: modelSlice.initialState,
// //   //   passiveChat: passiveChatSlice.initialState,
// //   //   preset: presetSlice.initialState,
// //   //   prompt: promptSlice.initialState,
// //   //   retrieval: retrievalSlice.initialState,
// //   //   session: sessionSlice.initialState,
// //   //   tool: toolSlice.initialState,
// //   //   workspace: workspaceSlice.initialState,
// //   //   profile: profileSlice.initialState,
// //   // },
// //   reducers: {
// //     baseChat: baseChatSlice.reducer,
// //     activeChat: activeChatSlice.reducer,
// //     assistant: assistantSlice.reducer,
// //     chatInputCommand: chatInputCommandSlice.reducer,
// //     collection: collectionSlice.reducer,
// //     file: fileSlice.reducer,
// //     folders: foldersSlice.reducer,
// //     generalChat: generalChatSlice.reducer,
// //     model: modelSlice.reducer,
// //     passiveChat: passiveChatSlice.reducer,
// //     preset: presetSlice.reducer,
// //     prompt: promptSlice.reducer,
// //     retrieval: retrievalSlice.reducer,
// //     session: sessionSlice.reducer,
// //     tool: toolSlice.reducer,
// //     workspace: workspaceSlice.reducer,
// //     profile: profileSlice.reducer,
// //   },
// // });

// // export {
// //   setAbortController,
// //   setFirstTokenReceived,
// //   setIsGenerating,
// // } from './activeChatSlice';
// // export {
// //   setAssistantImages,
// //   setAssistants,
// //   setOpenaiAssistants,
// //   setSelectedAssistant,
// // } from './assistantSlice';
// // export {
// //   setIsPromptPickerOpen,
// //   setSlashCommand,
// //   setFocusPrompt,
// //   setFocusFile,
// //   setFocusTool,
// //   setFocusAssistant,
// //   setAtCommand,
// //   setIsAssistantPickerOpen,
// //   setIsFilePickerOpen,
// //   setIsToolPickerOpen,
// //   setToolCommand,
// //   setHashtagCommand,
// // } from './chatInputCommandSlice';
// // export { setCollections } from './collectionSlice';
// // export {
// //   setChatFiles,
// //   setFiles,
// //   setChatImages,
// //   setNewMessageImages,
// //   setNewMessageFiles,
// //   setShowFilesDisplay,
// // } from './fileSlice';
// // export { setFolders } from './foldersSlice';
// // export { setChats, setEnvKeyMap } from './generalChatSlice';
// // export {
// //   setAvailableHostedModels,
// //   setAvailableLocalModels,
// //   setAvailableOpenRouterModels,
// //   setModels,
// // } from './modelsSlice';
// // export {
// //   setChatFileItems,
// //   setChatMessages,
// //   setChatSettings,
// // } from './passiveChatSlice';
// // export { setPrompts, setSelectedPrompt } from './promptSlice';
// // export { setSourceCount, setUseRetrieval } from './retrievalSlice';
// // export { setApiKey, setChatId, setSessionId } from './sessionSlice';
// // export { setSelectedTools, setToolInUse, setTools } from './toolSlice';
// // export {
// //   setSelectedWorkspace,
// //   setHomeWorkSpace,
// //   setWorkspaceImages,
// //   setWorkspaces,
// // } from './workspaceSlice';

// // export default chatSlice.reducer;
