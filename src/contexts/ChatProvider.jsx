import React, { createContext, useContext, useEffect } from 'react';
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
  fetchAndSetUserData,
  fetchAssistantByThread,
  fetchAssistantList,
  retrieveRun,
  setAbortController,
  setActiveLocal,
  setActiveSessionId,
  setActiveWorkspace,
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
  setPreviewFiles,
  setPreviewUrls,
  setProfile,
  setPrompts,
  setSelectedAssistant,
  setSelectedChatSession,
  setSelectedFiles,
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
  setUploadedFiles,
  setUseRetrieval,
  setUserInput,
  setUserOpenAiSettings,
  setWorkspaceId,
  setWorkspaceImages,
  setWorkspaces,
  updateAssistant,
  updateFolder,
  uploadFile,
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
  };
  const userStore = JSON.parse(localStorage.getItem('userStore'));
  const user = userStore?.user;
  const userInfo = userStore?.userInfo;
  const userProfile = user?.profile;

  const dispatch = useDispatch();
  useEffect(() => {
    const initializeUserData = async () => {
      try {
        await dispatch(fetchAndSetUserData());
      } catch (error) {
        console.error('Error fetching and setting user data:', error);
      }
    };

    initializeUserData();
  }, [dispatch]);

  const reloadRoute = id => {
    console.log(`Dummy reloadRoute called with id: ${id}`);
  };

  const syncChatSessions = () => {
    console.log(`Dummy syncChatSessions called`);
  };

  const addChatSession = (historyData, chatData) => {
    console.log(
      `Dummy addChatSession called with historyData: ${historyData}, chatData: ${chatData}`
    );
  };

  const updateChatSession = (id, edit) => {
    console.log(`Dummy updateChatSession called with id: ${id}, edit: ${edit}`);
  };

  const updateChatSessionIfEdited = (id, edit) => {
    console.log(
      `Dummy updateChatSessionIfEdited called with id: ${id}, edit: ${edit}`
    );
  };

  const deleteChatSession = index => {
    console.log(`Dummy deleteChatSession called with index: ${index}`);
  };

  const syncChatMessages = id => {
    console.log(`Dummy syncChatMessages called with id: ${id}`);
  };

  const addChatById = (id, chat) => {
    console.log(`Dummy addChatById called with id: ${id}, chat: ${chat}`);
  };

  const updateChatById = (id, index, chat) => {
    console.log(
      `Dummy updateChatById called with id: ${id}, index: ${index}, chat: ${chat}`
    );
  };

  const updateChatPartialById = (id, index, chat) => {
    console.log(
      `Dummy updateChatPartialById called with id: ${id}, index: ${index}, chat: ${chat}`
    );
  };

  const deleteChatById = (id, index) => {
    console.log(`Dummy deleteChatById called with id: ${id}, index: ${index}`);
  };

  const clearChatById = id => {
    console.log(`Dummy clearChatById called with id: ${id}`);
  };
  const actions = {
    // ===========================================
    // [WORKSPACE STORE]
    // ===========================================
    setWorkspaces: workspaces => dispatch(setWorkspaces(workspaces)),
    setSelectedWorkspace: workspace =>
      dispatch(setSelectedWorkspace(workspace)),
    setHomeWorkSpace: workspace => dispatch(setHomeWorkSpace(workspace)),
    setActiveWorkspace: session => dispatch(setActiveWorkspace(session)),
    setWorkspaceImages: images => dispatch(setWorkspaceImages(images)),
    setWorkspaceId: workspaceId => dispatch(setWorkspaceId(workspaceId)),
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
    uploadFile: filePath => dispatch(uploadFile(filePath)),
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
    // [ADDED CHAT STORE]
    // ===========================================
    reloadRoute: id => reloadRoute(id),
    syncChatSessions: () => syncChatSessions(),
    addChatSession: (historyData, chatData) =>
      addChatSession(historyData, chatData),
    updateChatSession: (id, edit) => updateChatSession(id, edit),
    updateChatSessionIfEdited: (id, edit) =>
      updateChatSessionIfEdited(id, edit),
    deleteChatSession: index => deleteChatSession(index),
    syncChatMessages: id => syncChatMessages(id),
    addChatById: (id, chat) => addChatById(id, chat),
    updateChatById: (id, index, chat) => updateChatById(id, index, chat),
    updateChatPartialById: (id, index, chat) =>
      updateChatPartialById(id, index, chat),
    deleteChatById: (id, index) => deleteChatById(id, index),
    clearChatById: id => clearChatById(id),
    // ===========================================
    // [FOLDER STORE]
    // ===========================================
    setFolders: folders => dispatch(setFolders(folders)),
    createFolder: folder => dispatch(createFolder(folder)),
    deleteFolder: folder => dispatch(deleteFolder(folder)),
    updateFolder: folder => dispatch(updateFolder(folder)),
    // ===========================================
    // [FILE STORE]
    // ===========================================
    setFiles: files => dispatch(setFiles(files)),
    setSelectedFiles: files => dispatch(setSelectedFiles(files)),
    setUploadedFiles: files => dispatch(setUploadedFiles(files)),
    setPreviewFiles: files => dispatch(setPreviewFiles(files)),
    setPreviewUrls: urls => dispatch(setPreviewUrls(urls)),
    setChatFiles: files => dispatch(setChatFiles(files)),
    setChatImages: images => dispatch(setChatImages(images)),
    setNewMessageFiles: files => dispatch(setNewMessageFiles(files)),
    setNewMessageImages: images => dispatch(setNewMessageImages(images)),
    setShowFilesDisplay: show => dispatch(setShowFilesDisplay(show)),
    // ===========================================
    // [PROFILE STORE]
    // ===========================================
    setProfile: profile => dispatch(setProfile(profile)),
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
    setChatFileItems: items => dispatch(setChatFileItems(items)),
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
    setSlashCommand: command => dispatch(setSlashCommand(command)),
    setIsFilePickerOpen: isOpen => dispatch(setIsFilePickerOpen(isOpen)),
    setHashtagCommand: command => dispatch(setHashtagCommand(command)),
    setIsToolPickerOpen: isOpen => dispatch(setIsToolPickerOpen(isOpen)),
    setToolCommand: command => dispatch(setToolCommand(command)),
    setFocusPrompt: focus => dispatch(setFocusPrompt(focus)),
    setFocusFile: focus => dispatch(setFocusFile(focus)),
    setFocusTool: focus => dispatch(setFocusTool(focus)),
    setFocusAssistant: focus => dispatch(setFocusAssistant(focus)),
    setAtCommand: command => dispatch(setAtCommand(command)),
    setIsAssistantPickerOpen: isOpen =>
      dispatch(setIsAssistantPickerOpen(isOpen)),
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
