import mongoose from 'mongoose';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  setChats,
  setEnvKeyMap,
  setAvailableHostedModels,
  setAvailableLocalModels,
  setAvailableOpenRouterModels,
  setModels,
  setChatFileItems,
  setChatMessages,
  setChatSettings,
  setPrompts,
  // fetchStaticPrompts,
  setSourceCount,
  setUseRetrieval,
  setApiKey,
  setChatId,
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
} from 'store/Slices'; // Assuming you can import all slices from a single entry point

export const ChatContext = createContext(null);
export const ChatProvider = ({ children }) => {
  const state = useSelector(state => {
    return {
      ...state.activeChat,
      ...state.assistant,
      ...state.chatInputCommand,
      ...state.collection,
      ...state.file,
      ...state.folders,
      ...state.generalChat,
      ...state.model,
      ...state.passiveChat,
      ...state.baseChat,
      ...state.preset,
      ...state.profile,
      ...state.prompt,
      ...state.retrieval,
      // ...state.session,
      ...state.tool,
      ...state.workspace,
    };
  });
  const { prompts } = state;
  // const dispatch = useDispatch();
  const [filedata, setFiledata] = useState(null);
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
    const localPngFiles = JSON.parse(localStorage.getItem('pngFiles'));
    const localJsonFiles = JSON.parse(localStorage.getItem('customPrompts'));
    if (localJsonFiles.length > 0) {
      return;
    }
    dispatch(
      fetchFileData({
        url: 'http://localhost:3001/api/files/list-files',
        fileType: 'png',
      })
    );
    dispatch(
      fetchFileData({
        url: 'http://localhost:3001/api/files/static/chatgpt-prompts-custom.json',
        fileType: 'json',
      })
    );
  }, [dispatch]);
  const initializeIds = async () => {
    let chatId = localStorage.getItem('chatId');
    let sessionId = localStorage.getItem('sessionId');
    if (!chatId) {
      chatId = new mongoose.Types.ObjectId();
      localStorage.setItem('chatId', chatId);
    }
    if (!sessionId) {
      sessionId = new mongoose.Types.ObjectId();
      localStorage.setItem('sessionId', sessionId);
    }
    dispatch(setChatId(chatId));
    dispatch(setSessionId(sessionId));
  };
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('userStorage'));
    setUser(userStorage?.user);
    initializeIds();
    // dispatch(initializeIds());
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
    // PROMPTS
    setSelectedPrompt: prompt => dispatch(setSelectedPrompt(prompt)),
    // ===========================================
    // [ADDED CHAT STORE]
    // ===========================================
    // SESSIONS
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
    // [MAIN CHAT STORE]
    // ===========================================
    // PROFILE STORE
    setProfile: profile => dispatch(setProfile(profile)),
    // --- ITEMS STORE ---
    setAssistants: assistants => dispatch(setAssistants(assistants)),
    setCollections: collections => dispatch(setCollections(collections)),
    setChats: chats => dispatch(setChats(chats)),
    setFiles: files => dispatch(setFiles(files)),
    setFolders: folders => dispatch(setFolders(folders)),
    setModels: models => dispatch(setModels(models)),
    setPrompts: prompts => dispatch(setPrompts(prompts)),
    setTools: tools => dispatch(setTools(tools)),
    setWorkspaces: workspaces => dispatch(setWorkspaces(workspaces)),
    // --- MODELS STORE ---
    setEnvKeyMap: envKeyMap => dispatch(setEnvKeyMap(envKeyMap)),
    setAvailableHostedModels: models =>
      dispatch(setAvailableHostedModels(models)),
    setAvailableLocalModels: models =>
      dispatch(setAvailableLocalModels(models)),
    setAvailableOpenRouterModels: models =>
      dispatch(setAvailableOpenRouterModels(models)),
    // --- WORKSPACE STORE / SESSION STORE ---
    setSelectedWorkspace: workspace =>
      dispatch(setSelectedWorkspace(workspace)),
    setHomeWorkSpace: workspace => dispatch(setHomeWorkSpace(workspace)),
    setWorkspaceImages: images => dispatch(setWorkspaceImages(images)),
    // ASSISTANT STORE
    setSelectedAssistant: assistant =>
      dispatch(setSelectedAssistant(assistant)),
    setAssistantImages: images => dispatch(setAssistantImages(images)),
    setOpenaiAssistants: assistants =>
      dispatch(setOpenaiAssistants(assistants)),
    // PASSIVE CHAT STORE
    setApiKey: apiKey => dispatch(setApiKey(apiKey)),
    setChatId: chatId => dispatch(setChatId(chatId)),
    setSessionId: sessionId => dispatch(setSessionId(sessionId)),
    // setUserInput: setUserInput
    // setUserInput: input => setUserInput(input),
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
    // clearState: () => dispatch(clearState()),
    // ATTACHMENTS STORE
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
// const handleAddPrompt = (key, value, prompts) => {
//   const duplicateKey = prompts.some(item => item.key === key);
//   const duplicateValue = prompts.some(item => item.value === value);
//   if (duplicateKey) {
//     enqueueSnackbar('Duplicate title, please re-enter', { variant: 'error' });
//     return;
//   }
//   if (duplicateValue) {
//     enqueueSnackbar(`Duplicate content: ${key}, please re-enter`, {
//       variant: 'error',
//     });
//     return;
//   }
//   dispatch(addPrompt({ key, value }));
//   enqueueSnackbar('Prompt added successfully', { variant: 'success' });
// };

// const handleModifyPrompt = (key, value, newKey, newValue, prompts) => {
//   const duplicateKey = prompts.some(item => item.key === newKey);
//   const duplicateValue = prompts.some(item => item.value === newValue);

//   if (duplicateKey) {
//     enqueueSnackbar('Title conflict detected, please modify again', {
//       variant: 'error',
//     });
//     return;
//   }
//   if (duplicateValue) {
//     enqueueSnackbar(`Content conflict detected: ${key}, please modify again`, {
//       variant: 'error',
//     });
//     return;
//   }
//   dispatch(modifyPrompt({ key, value, newKey, newValue }));
//   enqueueSnackbar('Prompt information modified successfully', {
//     variant: 'success',
//   });
// };

// const handleDeletePrompt = key => {
//   dispatch(deletePrompt({ key }));
//   enqueueSnackbar('Prompt deleted successfully', { variant: 'success' });
// };

// const handleImportPrompts = jsonData => {
//   try {
//     const parsedData = JSON.parse(jsonData);
//     dispatch(importPrompts(parsedData));
//     enqueueSnackbar('Imported successfully', { variant: 'success' });
//   } catch {
//     enqueueSnackbar('JSON format error, please check the JSON format', {
//       variant: 'error',
//     });
//   }
// };

// const handleExportPrompts = () => {
//   dispatch(exportPrompts());
// };
