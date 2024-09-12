import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  addEnvToUser,
  clearChatSessions,
  createAssistant,
  createChatSession,
  createFolder,
  createMessage,
  createRun,
  createRunStream,
  createRunStreamWithFunctions,
  createThread,
  deleteAssistant,
  deleteFolder,
  setAuthUserData,
  fetchAssistantByThread,
  fetchAssistantList,
  retrieveRun,
  setAbortController,
  setActiveLocal,
  setActiveSessionId,
  setApiKey,
  setAssistantImages,
  setAssistants,
  setAtCommand,
  setAvailableHostedModels,
  setAvailableLocalModels,
  setAvailableOpenRouterModels,
  setChatFileItems,
  setChatFiles,
  setChatImages,
  setChatMessages,
  setChatSessions,
  setChatSettings,
  setCollections,
  setEnvKeyMap,
  setFiles,
  setFirstMessageReceived,
  setFirstTokenReceived,
  setFocusAssistant,
  setFocusFile,
  setFocusPrompt,
  setFocusTool,
  setFolders,
  setHashtagCommand,
  setHomeWorkSpace,
  setIsAssistantPickerOpen,
  setIsFilePickerOpen,
  setIsGenerating,
  setIsMessagesUpdated,
  setIsPromptPickerOpen,
  setIsToolPickerOpen,
  setMode,
  setModels,
  setNewMessageFiles,
  setNewMessageImages,
  setOpenaiAssistants,
  setPayload,
  setPresets,
  setPrompts,
  setSelectedAssistant,
  setSelectedChatSession,
  setSelectedPreset,
  setSelectedPrompt,
  setSelectedTools,
  setSelectedWorkspace,
  setSessionHeader,
  setSessionId,
  setShowFilesDisplay,
  setSlashCommand,
  setSourceCount,
  setToolCommand,
  setToolInUse,
  setTools,
  setUseRetrieval,
  setUserInput,
  setUserOpenAiSettings,
  setWorkspaceId,
  setWorkspaceImages,
  setWorkspaces,
  updateAssistant,
  updateFolder,
  uploadFile,
  getAllStoredFiles,
  getStoredFilesByType,
  getStoredFilesBySpace,
  getStoredFileByName,
  getAllStorageFiles,
  getStorageFile,
  setSelectedFolder,
  syncChatMessages,
  addNewMessageFile,
  updateNewMessageFile,
  uploadAssistantFile,
} from 'store/Slices'; // Assuming you can import all slices from a single entry point

export const selectWorkspace = createSelector(
  [state => state.workspace],
  workspace => workspace
);
export const selectBaseChat = createSelector(
  [state => state.baseChat],
  baseChat => baseChat
);
export const selectChatSession = createSelector(
  [state => state.chatSession],
  session => session
);
export const selectAssistant = createSelector(
  [state => state.assistant],
  assistant => assistant
);
export const selectCollection = createSelector(
  [state => state.collection],
  collection => collection
);
export const selectFile = createSelector([state => state.file], file => file);
export const selectFolders = createSelector(
  [state => state.folder],
  folders => folders
);
export const selectModel = createSelector(
  [state => state.model],
  model => model
);
export const selectPreset = createSelector(
  [state => state.preset],
  preset => preset
);
export const selectPrompt = createSelector(
  [state => state.prompt],
  prompt => prompt
);

export const ChatContext = createContext(null);
export const ChatProvider = ({ children }) => {
  const workspace = useSelector(selectWorkspace);
  const baseChat = useSelector(selectBaseChat);
  const chatSession = useSelector(selectChatSession);
  const assistant = useSelector(selectAssistant);
  const collection = useSelector(selectCollection);
  const file = useSelector(selectFile);
  const folder = useSelector(selectFolders);
  const model = useSelector(selectModel);
  const preset = useSelector(selectPreset);
  const prompt = useSelector(selectPrompt);
  const [messages, setMessages] = useState([]);

  const state = {
    ...workspace,
    ...baseChat,
    ...chatSession,
    ...assistant,
    ...collection,
    ...file,
    ...folder,
    ...model,
    ...preset,
    ...prompt,
    messages,
  };
  const userStore = JSON.parse(localStorage.getItem('userStore'));
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        await dispatch(setAuthUserData());
      } catch (error) {
        console.error('Error fetching and setting user data:', error);
      }
    };

    initializeUserData();
  }, [dispatch]);

  const actions = {
    setMessages: messages => setMessages(messages),
    // ===========================================
    // [WORKSPACE STORE]
    // ===========================================
    setWorkspaces: workspaces => dispatch(setWorkspaces(workspaces)),
    setSelectedWorkspace: workspace =>
      dispatch(setSelectedWorkspace(workspace)),
    setHomeWorkSpace: workspace => dispatch(setHomeWorkSpace(workspace)),
    setWorkspaceImages: images => dispatch(setWorkspaceImages(images)),
    setWorkspaceId: workspaceId => dispatch(setWorkspaceId(workspaceId)),
    // ===========================================
    // [FOLDER STORE]
    // ===========================================
    setFolders: folders => dispatch(setFolders(folders)),
    setSelectedFolder: folder => dispatch(setSelectedFolder(folder)),
    createFolder: folder => dispatch(createFolder(folder)),
    deleteFolder: folder => dispatch(deleteFolder(folder)),
    updateFolder: folder => dispatch(updateFolder(folder)),
    // ===========================================
    // [CHAT SESSION STORE]
    // ===========================================
    setMode: mode => dispatch(setMode(mode)),
    setChatSessions: chats => dispatch(setChatSessions(chats)),
    setActiveSessionId: session => dispatch(setActiveSessionId(session)),
    setSelectedChatSession: session =>
      dispatch(setSelectedChatSession(session)),
    setSessionId: sessionId => dispatch(setSessionId(sessionId)),
    setSessionHeader: header => dispatch(setSessionHeader(header)),
    setActive: id => dispatch(setActiveSessionId(id)),
    setActiveLocal: id => dispatch(setActiveLocal(id)),
    createNewChatSession: sessionData =>
      dispatch(createChatSession(sessionData)),
    clearChatSessions: () => dispatch(clearChatSessions()),
    syncChatMessages: id => dispatch(syncChatMessages(id)),
    // ===========================================
    // [ASSISTANT STORE]
    // ===========================================
    setAssistants: assistants => dispatch(setAssistants(assistants)),
    setSelectedAssistant: assistant =>
      dispatch(setSelectedAssistant(assistant)),
    setAssistantImages: images => dispatch(setAssistantImages(images)),
    setOpenaiAssistants: assistants =>
      dispatch(setOpenaiAssistants(assistants)),
    fetchAssistantList: () => dispatch(fetchAssistantList()),
    fetchAssistantByThread: (threadId, prompt) =>
      dispatch(fetchAssistantByThread({ threadId, prompt })),
    createAssistant: assistantData => dispatch(createAssistant(assistantData)),
    updateAssistant: assistantData => dispatch(updateAssistant(assistantData)),
    deleteAssistant: assistantData => dispatch(deleteAssistant(assistantData)),
    uploadAssistantFile: filePath => dispatch(uploadAssistantFile(filePath)),
    createThread: threadData => dispatch(createThread(threadData)),
    createMessage: (threadId, messageData) =>
      dispatch(createMessage({ threadId, messageData })),
    createRun: (threadId, runData) =>
      dispatch(createRun({ threadId, runData })),
    createRunStream: (threadId, runData) =>
      dispatch(createRunStream({ threadId, runData })),
    createRunStreamWithFunctions: runData =>
      dispatch(createRunStreamWithFunctions(runData)),
    retrieveRun: (threadId, runId) =>
      dispatch(retrieveRun({ threadId, runId })),
    // ===========================================
    // [PRESET STORE]
    // ===========================================
    setPresets: presets => dispatch(setPresets(presets)),
    setSelectedPreset: preset => dispatch(setSelectedPreset(preset)),
    // ===========================================
    // [PROMPT STORE]
    // ===========================================
    setSelectedPrompt: prompt => dispatch(setSelectedPrompt(prompt)),
    setPrompts: prompts => dispatch(setPrompts(prompts)),
    // ===========================================
    // [COLLECTION STORE]
    // ===========================================
    setCollections: collections => dispatch(setCollections(collections)),
    // ===========================================
    // [FILE STORE]
    // ===========================================
    setFiles: files => dispatch(setFiles(files)),
    setChatFiles: files => dispatch(setChatFiles(files)),
    setChatImages: images => dispatch(setChatImages(images)),
    setChatFileItems: items => dispatch(setChatFileItems(items)),
    setNewMessageFiles: files => dispatch(setNewMessageFiles(files)),
    setNewMessageImages: images => dispatch(setNewMessageImages(images)),
    setShowFilesDisplay: show => dispatch(setShowFilesDisplay(show)),
    addNewMessageFile: file => dispatch(addNewMessageFile(file)),
    updateNewMessageFile: file => dispatch(updateNewMessageFile(file)),
    uploadFile: file => dispatch(uploadFile(file)),
    getAllStoredFiles: () => dispatch(getAllStoredFiles()),
    getStoredFilesByType: type => dispatch(getStoredFilesByType(type)),
    getStoredFilesBySpace: space => dispatch(getStoredFilesBySpace(space)),
    getStoredFileByName: name => dispatch(getStoredFileByName(name)),
    getAllStorageFiles: () => dispatch(getAllStorageFiles()),
    getStorageFile: id => dispatch(getStorageFile(id)),
    // ===========================================
    // [PROFILE STORE]
    // ===========================================
    // setProfile: profile => dispatch(setProfile(profile)),
    setUserOpenAiSettings: settings =>
      dispatch(setUserOpenAiSettings(settings)),
    // ===========================================
    // [MODEL STORE]
    // ===========================================
    setModels: models => dispatch(setModels(models)),
    setEnvKeyMap: envKeyMap => dispatch(setEnvKeyMap(envKeyMap)),
    setAvailableHostedModels: models =>
      dispatch(setAvailableHostedModels(models)),
    setAvailableLocalModels: models =>
      dispatch(setAvailableLocalModels(models)),
    setAvailableOpenRouterModels: models =>
      dispatch(setAvailableOpenRouterModels(models)),
    // ===========================================
    // [PASSIVE CHAT STORE]
    // ===========================================
    setPayload: payload => dispatch(setPayload(payload)),
    setApiKey: apiKey => dispatch(setApiKey(apiKey)),
    setNewUserApiKey: apiKey => dispatch(addEnvToUser(apiKey)),
    setUserInput: userInput => dispatch(setUserInput(userInput)),
    setChatMessages: messages => dispatch(setChatMessages(messages)),
    setChatSettings: settings => dispatch(setChatSettings(settings)),
    // ===========================================
    // [TOOL STORE]
    // ===========================================
    setSelectedTools: tools => dispatch(setSelectedTools(tools)),
    setToolInUse: tool => dispatch(setToolInUse(tool)),
    setTools: tools => dispatch(setTools(tools)),
    // ===========================================
    // [ACTIVE CHAT STORE]
    // ===========================================
    setAbortController: controller => dispatch(setAbortController(controller)),
    setFirstTokenReceived: received =>
      dispatch(setFirstTokenReceived(received)),
    setIsGenerating: generating => dispatch(setIsGenerating(generating)),
    setIsMessagesUpdated: updated => dispatch(setIsMessagesUpdated(updated)),
    setFirstMessageReceived: received =>
      dispatch(setFirstMessageReceived(received)),
    // ===========================================
    // [CHAT INPUT COMMAND STORE]
    // ===========================================
    setIsPromptPickerOpen: isOpen => dispatch(setIsPromptPickerOpen(isOpen)),
    setIsToolPickerOpen: isOpen => dispatch(setIsToolPickerOpen(isOpen)),
    setIsFilePickerOpen: isOpen => dispatch(setIsFilePickerOpen(isOpen)),
    setIsAssistantPickerOpen: isOpen =>
      dispatch(setIsAssistantPickerOpen(isOpen)),
    setSlashCommand: command => dispatch(setSlashCommand(command)),
    setHashtagCommand: command => dispatch(setHashtagCommand(command)),
    setToolCommand: command => dispatch(setToolCommand(command)),
    setAtCommand: command => dispatch(setAtCommand(command)),
    setFocusPrompt: focus => dispatch(setFocusPrompt(focus)),
    setFocusFile: focus => dispatch(setFocusFile(focus)),
    setFocusTool: focus => dispatch(setFocusTool(focus)),
    setFocusAssistant: focus => dispatch(setFocusAssistant(focus)),
    // ===========================================
    // [RETRIEVAL STORE]
    // ===========================================
    setUseRetrieval: use => dispatch(setUseRetrieval(use)),
    setSourceCount: count => dispatch(setSourceCount(count)),
  };

  return (
    <ChatContext.Provider value={{ state, actions }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatStore = () => useContext(ChatContext);
export default ChatProvider;
