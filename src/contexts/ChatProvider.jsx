import mongoose from 'mongoose';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import avatar5 from 'assets/img/avatars/avatar5.png'; // Fallback avatar
import {
  setAbortController,
  setFirstTokenReceived,
  setIsGenerating,
  setAssistantImages,
  setAssistants,
  setOpenaiAssistants,
  setSelectedAssistant,
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
  setEnvKeyMap,
  setAvailableHostedModels,
  setAvailableLocalModels,
  setAvailableOpenRouterModels,
  setModels,
  setChatFileItems,
  setChatMessages,
  setChatSettings,
  setPrompts,
  setSourceCount,
  setUseRetrieval,
  setApiKey,
  setWorkspaceId,
  setSessionId,
  setSelectedTools,
  setToolInUse,
  setTools,
  setSelectedWorkspace,
  setHomeWorkSpace,
  setWorkspaceImages,
  setWorkspaces,
  setProfile,
  setSelectedPrompt,
  fetchUserProfileImage,
  fetchFileData,
  setPreviewFiles,
  setUserInput,
  setPreviewUrls,
  setSelectedFiles,
  setPayload,
  setUploadedFiles,
  setActiveWorkspace,
  setActiveSession,
  setChatSessions,
} from 'store/Slices'; // Assuming you can import all slices from a single entry point

export const selectActiveChat = createSelector(
  [state => state.activeChat],
  activeChat => activeChat
);

export const selectAssistant = createSelector(
  [state => state.assistant],
  assistant => assistant
);

export const selectChatInputCommand = createSelector(
  [state => state.chatInputCommand],
  chatInputCommand => chatInputCommand
);

export const selectCollection = createSelector(
  [state => state.collection],
  collection => collection
);

export const selectFile = createSelector([state => state.file], file => file);

export const selectFolders = createSelector(
  [state => state.folders],
  folders => folders
);

export const selectGeneralChat = createSelector(
  [state => state.generalChat],
  generalChat => generalChat
);

export const selectModel = createSelector(
  [state => state.model],
  model => model
);

export const selectPassiveChat = createSelector(
  [state => state.passiveChat],
  passiveChat => passiveChat
);

export const selectBaseChat = createSelector(
  [state => state.baseChat],
  baseChat => baseChat
);

export const selectPreset = createSelector(
  [state => state.preset],
  preset => preset
);

export const selectPrompt = createSelector(
  [state => state.prompt],
  prompt => prompt
);

export const selectRetrieval = createSelector(
  [state => state.retrieval],
  retrieval => retrieval
);

export const selectSession = createSelector(
  [state => state.session],
  session => session
);

export const selectWorkspace = createSelector(
  [state => state.workspace],
  workspace => workspace
);

export const ChatContext = createContext(null);
export const ChatProvider = ({ children }) => {
  const activeChat = useSelector(selectActiveChat);
  const assistant = useSelector(selectAssistant);
  const chatInputCommand = useSelector(selectChatInputCommand);
  const collection = useSelector(selectCollection);
  const file = useSelector(selectFile);
  const folders = useSelector(selectFolders);
  const generalChat = useSelector(selectGeneralChat);
  const model = useSelector(selectModel);
  const passiveChat = useSelector(selectPassiveChat);
  const baseChat = useSelector(selectBaseChat);
  const preset = useSelector(selectPreset);
  const prompt = useSelector(selectPrompt);
  const retrieval = useSelector(selectRetrieval);
  const workspace = useSelector(selectWorkspace);

  const state = {
    ...activeChat,
    ...assistant,
    ...chatInputCommand,
    ...collection,
    ...file,
    ...folders,
    ...generalChat,
    ...model,
    ...passiveChat,
    ...baseChat,
    ...preset,
    ...prompt,
    ...retrieval,
    ...workspace,
    chatThing: '',
  };
  const { prompts } = state;
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('userStorage'));
    const user = userStorage?.user;
    const userInfo = userStorage?.userInfo;
    const initializeProfileImage = async () => {
      try {
        const userProfile = user?.profile;
        const imagename = 'avatar1';
        const imgWithExt = imagename.includes('.')
          ? imagename
          : `${imagename}.png`;
        if (user?.username) {
          const action = await dispatch(fetchUserProfileImage(imgWithExt));
          const imageUrl = action.payload || '';
          dispatch(setProfile({ ...userProfile, profileImage: imageUrl }));
        } else {
          dispatch(
            setProfile({
              ...userProfile,
              profileImage: 'assets/img/avatars/avatar5.png',
            })
          );
        }
      } catch (error) {
        console.error('Error initializing profile image:', error);
        dispatch(setProfile({ profileImage: avatar5 }));
      }
    };
    if (!userInfo?.isImageRetrieved) {
      initializeProfileImage();
    }
  }, [dispatch]);

  useEffect(() => {
    const localJsonFiles = JSON.parse(localStorage.getItem('customPrompts'));
    if (localJsonFiles?.length > 0) {
      return;
    }
    dispatch(
      fetchFileData({
        url: 'http://localhost:3001/api/files/list-files',
        fileType: 'png',
      })
    );
    // dispatch(
    //   fetchFileData({
    //     url: 'http://localhost:3001/api/files/static/chatgpt-prompts-custom.json',
    //     fileType: 'json',
    //   })
    // );
  }, [dispatch]);
  const initializeIds = async () => {
    let workspaceId = localStorage.getItem('workspaceId');
    let sessionId = localStorage.getItem('sessionId');
    if (!workspaceId) {
      console.log('No workspaceId');
      return;
    }
    if (!sessionId) {
      console.log('No sessionId');
      return;
    }
    dispatch(setWorkspaceId(workspaceId));
    dispatch(setSessionId(sessionId));
  };
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('userStorage'));
    setUser(userStorage?.user);
    initializeIds();
  }, []);
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

  const setActive = id => {
    console.log(`Dummy setActive called with id: ${id}`);
  };

  const setActiveLocal = id => {
    console.log(`Dummy setActiveLocal called with id: ${id}`);
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
    // [PROMPT STORE]
    // ===========================================
    setSelectedPrompt: prompt => dispatch(setSelectedPrompt(prompt)),
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
    setActive: id => setActive(id),
    setActiveLocal: id => setActiveLocal(id),
    addChatById: (id, chat) => addChatById(id, chat),
    updateChatById: (id, index, chat) => updateChatById(id, index, chat),
    updateChatPartialById: (id, index, chat) =>
      updateChatPartialById(id, index, chat),
    deleteChatById: (id, index) => deleteChatById(id, index),
    clearChatById: id => clearChatById(id),
    // ===========================================
    // [PROFILE STORE]
    // ===========================================
    setProfile: profile => dispatch(setProfile(profile)),
    // ===========================================
    // [ITEMS STORE]
    // ===========================================
    setWorkspaces: workspaces => dispatch(setWorkspaces(workspaces)),
    setAssistants: assistants => dispatch(setAssistants(assistants)),
    setCollections: collections => dispatch(setCollections(collections)),
    setChatSessions: chats => dispatch(setChatSessions(chats)),
    setFiles: files => dispatch(setFiles(files)),
    setFolders: folders => dispatch(setFolders(folders)),
    setModels: models => dispatch(setModels(models)),
    setPrompts: prompts => dispatch(setPrompts(prompts)),
    setTools: tools => dispatch(setTools(tools)),
    // --- Active / Selected ITEMS --- //
    setActiveSession: session => dispatch(setActiveSession(session)),
    setActiveWorkspace: session => dispatch(setActiveWorkspace(session)),

    // ===========================================
    // [MODEL STORE]
    // ===========================================
    setEnvKeyMap: envKeyMap => dispatch(setEnvKeyMap(envKeyMap)),
    setAvailableHostedModels: models =>
      dispatch(setAvailableHostedModels(models)),
    setAvailableLocalModels: models =>
      dispatch(setAvailableLocalModels(models)),
    setAvailableOpenRouterModels: models =>
      dispatch(setAvailableOpenRouterModels(models)),
    // ===========================================
    // [WORKSPACE STORE]
    // ===========================================
    setSelectedWorkspace: workspace =>
      dispatch(setSelectedWorkspace(workspace)),
    setHomeWorkSpace: workspace => dispatch(setHomeWorkSpace(workspace)),
    setWorkspaceImages: images => dispatch(setWorkspaceImages(images)),
    // ===========================================
    // [ASSISTANT STORE]
    // ===========================================
    setSelectedAssistant: assistant =>
      dispatch(setSelectedAssistant(assistant)),
    setAssistantImages: images => dispatch(setAssistantImages(images)),
    setOpenaiAssistants: assistants =>
      dispatch(setOpenaiAssistants(assistants)),
    // PASSIVE CHAT STORE
    setPayload: payload => dispatch(setPayload(payload)),
    setApiKey: apiKey => dispatch(setApiKey(apiKey)),
    setWorkspaceId: workspaceId => dispatch(setWorkspaceId(workspaceId)),
    setSessionId: sessionId => dispatch(setSessionId(sessionId)),
    // setUserInput: setUserInput
    setUserInput: input => setUserInput(input),
    setSelectedChat: () => {},
    setChatMessages: messages => dispatch(setChatMessages(messages)),
    setChatSettings: settings => dispatch(setChatSettings(settings)),
    setChatFileItems: items => dispatch(setChatFileItems(items)),
    // ACTIVE CHAT STORE
    setAbortController: controller => dispatch(setAbortController(controller)),
    setFirstTokenReceived: received =>
      dispatch(setFirstTokenReceived(received)),
    setIsGenerating: generating => dispatch(setIsGenerating(generating)),
    // CHAT INPUT COMMAND STORE
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
    // ATTACHMENTS STORE
    setSelectedFiles: files => dispatch(setSelectedFiles(files)),
    setUploadedFiles: files => dispatch(setUploadedFiles(files)),
    setPreviewFiles: files => dispatch(setPreviewFiles(files)),
    setPreviewUrls: urls => dispatch(setPreviewUrls(urls)),
    setChatFiles: files => dispatch(setChatFiles(files)),
    setChatImages: images => dispatch(setChatImages(images)),
    setNewMessageFiles: files => dispatch(setNewMessageFiles(files)),
    setNewMessageImages: images => dispatch(setNewMessageImages(images)),
    setShowFilesDisplay: show => dispatch(setShowFilesDisplay(show)),
    // RETRIEVAL STORE
    setUseRetrieval: use => dispatch(setUseRetrieval(use)),
    setSourceCount: count => dispatch(setSourceCount(count)),
    // TOOL STORE
    setSelectedTools: tools => dispatch(setSelectedTools(tools)),
    setToolInUse: tool => dispatch(setToolInUse(tool)),
    // RESPONSE STORE
    // setResponse: response => dispatch(setResponse(response)),
    // setIsChatLoading: loading => dispatch(setIsChatLoading(loading)),
    // setChatError: error => dispatch(setChatError(error)),
    // setIsChatDisabled: disabled => dispatch(setIsChatDisabled(disabled)),
    // setIsStreamingDone: done => dispatch(setIsStreamingDone(done)),
    // setStreamedMessageContent: content =>
    //   dispatch(setStreamedMessageContent(content)),
    // // setNewMessageContent: content => dispatch(setNewMessageContent(content)),
    // setCurrentMessage: message => dispatch(setCurrentMessage(message)),
  };

  return (
    <ChatContext.Provider value={{ state, actions }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatStore = () => useContext(ChatContext);
export default ChatProvider;
