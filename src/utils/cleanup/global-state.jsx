// import React, { useEffect, useState, createContext } from 'react';

// const GlobalState = ({ children }) => {
//   // PROFILE STORE
//   const [profile, setProfile] = useState(null);

//   // ITEMS STORE
//   const [assistants, setAssistants] = useState([]);
//   const [collections, setCollections] = useState([]);
//   const [chats, setChats] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [folders, setFolders] = useState([]);
//   const [models, setModels] = useState([]);
//   const [presets, setPresets] = useState([]);
//   const [prompts, setPrompts] = useState([]);
//   const [tools, setTools] = useState([]);
//   const [workspaces, setWorkspaces] = useState([]);

//   // MODELS STORE
//   const [envKeyMap, setEnvKeyMap] = useState({});
//   const [availableHostedModels, setAvailableHostedModels] = useState([]);
//   const [availableLocalModels, setAvailableLocalModels] = useState([]);
//   const [availableOpenRouterModels, setAvailableOpenRouterModels] = useState(
//     []
//   );

//   // WORKSPACE STORE
//   const [selectedWorkspace, setSelectedWorkspace] = useState(null);
//   const [workspaceImages, setWorkspaceImages] = useState([]);

//   // PRESET STORE
//   const [selectedPreset, setSelectedPreset] = useState(null);

//   // ASSISTANT STORE
//   const [selectedAssistant, setSelectedAssistant] = useState(null);
//   const [assistantImages, setAssistantImages] = useState([]);
//   const [openaiAssistants, setOpenaiAssistants] = useState([]);

//   // PASSIVE CHAT STORE
//   const [userInput, setUserInput] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [chatSettings, setChatSettings] = useState({
//     model: 'gpt-4-turbo-preview',
//     prompt: 'You are a helpful AI assistant.',
//     temperature: 0.5,
//     contextLength: 4000,
//     includeProfileContext: true,
//     includeWorkspaceInstructions: true,
//     embeddingsProvider: 'openai',
//   });
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [chatFileItems, setChatFileItems] = useState([]);

//   // ACTIVE CHAT STORE
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [firstTokenReceived, setFirstTokenReceived] = useState(false);
//   const [abortController, setAbortController] = useState(null);

//   // CHAT INPUT COMMAND STORE
//   const [isPromptPickerOpen, setIsPromptPickerOpen] = useState(false);
//   const [slashCommand, setSlashCommand] = useState('');
//   const [isFilePickerOpen, setIsFilePickerOpen] = useState(false);
//   const [hashtagCommand, setHashtagCommand] = useState('');
//   const [isToolPickerOpen, setIsToolPickerOpen] = useState(false);
//   const [toolCommand, setToolCommand] = useState('');
//   const [focusPrompt, setFocusPrompt] = useState(false);
//   const [focusFile, setFocusFile] = useState(false);
//   const [focusTool, setFocusTool] = useState(false);
//   const [focusAssistant, setFocusAssistant] = useState(false);
//   const [atCommand, setAtCommand] = useState('');
//   const [isAssistantPickerOpen, setIsAssistantPickerOpen] = useState(false);

//   // ATTACHMENTS STORE
//   const [chatFiles, setChatFiles] = useState([]);
//   const [chatImages, setChatImages] = useState([]);
//   const [newMessageFiles, setNewMessageFiles] = useState([]);
//   const [newMessageImages, setNewMessageImages] = useState([]);
//   const [showFilesDisplay, setShowFilesDisplay] = useState(false);

//   // RETIEVAL STORE
//   const [useRetrieval, setUseRetrieval] = useState(true);
//   const [sourceCount, setSourceCount] = useState(4);

//   // TOOL STORE
//   const [selectedTools, setSelectedTools] = useState([]);
//   const [toolInUse, setToolInUse] = useState('none');
//   const fetchStartingData = async () => {
//     const session = (await supabase.auth.getSession()).data.session;

//     if (session) {
//       const user = session.user;

//       const profile = await getProfileByUserId(user.id);
//       setProfile(profile);

//       if (!profile.has_onboarded) {
//         return router.push('/setup');
//       }

//       const workspaces = await getWorkspacesByUserId(user.id);
//       setWorkspaces(workspaces);

//       for (const workspace of workspaces) {
//         let workspaceImageUrl = '';

//         if (workspace.image_path) {
//           workspaceImageUrl =
//             (await getWorkspaceImageFromStorage(workspace.image_path)) || '';
//         }

//         if (workspaceImageUrl) {
//           const response = await fetch(workspaceImageUrl);
//           const blob = await response.blob();
//           const base64 = await convertBlobToBase64(blob);

//           setWorkspaceImages(prev => [
//             ...prev,
//             {
//               workspaceId: workspace.id,
//               path: workspace.image_path,
//               base64: base64,
//               url: workspaceImageUrl,
//             },
//           ]);
//         }
//       }

//       return profile;
//     }
//   };

//   return (
//     <ChatbotUIContext.Provider
//       value={{
//         // PROFILE STORE
//         profile,
//         setProfile,

//         // ITEMS STORE
//         assistants,
//         setAssistants,
//         collections,
//         setCollections,
//         chats,
//         setChats,
//         files,
//         setFiles,
//         folders,
//         setFolders,
//         models,
//         setModels,
//         presets,
//         setPresets,
//         prompts,
//         setPrompts,
//         tools,
//         setTools,
//         workspaces,
//         setWorkspaces,

//         // MODELS STORE
//         envKeyMap,
//         setEnvKeyMap,
//         availableHostedModels,
//         setAvailableHostedModels,
//         availableLocalModels,
//         setAvailableLocalModels,
//         availableOpenRouterModels,
//         setAvailableOpenRouterModels,

//         // WORKSPACE STORE
//         selectedWorkspace,
//         setSelectedWorkspace,
//         workspaceImages,
//         setWorkspaceImages,

//         // PRESET STORE
//         selectedPreset,
//         setSelectedPreset,

//         // ASSISTANT STORE
//         selectedAssistant,
//         setSelectedAssistant,
//         assistantImages,
//         setAssistantImages,
//         openaiAssistants,
//         setOpenaiAssistants,

//         // PASSIVE CHAT STORE
//         userInput,
//         setUserInput,
//         chatMessages,
//         setChatMessages,
//         chatSettings,
//         setChatSettings,
//         selectedChat,
//         setSelectedChat,
//         chatFileItems,
//         setChatFileItems,

//         // ACTIVE CHAT STORE
//         isGenerating,
//         setIsGenerating,
//         firstTokenReceived,
//         setFirstTokenReceived,
//         abortController,
//         setAbortController,

//         // CHAT INPUT COMMAND STORE
//         isPromptPickerOpen,
//         setIsPromptPickerOpen,
//         slashCommand,
//         setSlashCommand,
//         isFilePickerOpen,
//         setIsFilePickerOpen,
//         hashtagCommand,
//         setHashtagCommand,
//         isToolPickerOpen,
//         setIsToolPickerOpen,
//         toolCommand,
//         setToolCommand,
//         focusPrompt,
//         setFocusPrompt,
//         focusFile,
//         setFocusFile,
//         focusTool,
//         setFocusTool,
//         focusAssistant,
//         setFocusAssistant,
//         atCommand,
//         setAtCommand,
//         isAssistantPickerOpen,
//         setIsAssistantPickerOpen,

//         // ATTACHMENT STORE
//         chatFiles,
//         setChatFiles,
//         chatImages,
//         setChatImages,
//         newMessageFiles,
//         setNewMessageFiles,
//         newMessageImages,
//         setNewMessageImages,
//         showFilesDisplay,
//         setShowFilesDisplay,

//         // RETRIEVAL STORE
//         useRetrieval,
//         setUseRetrieval,
//         sourceCount,
//         setSourceCount,

//         // TOOL STORE
//         selectedTools,
//         setSelectedTools,
//         toolInUse,
//         setToolInUse,
//       }}
//     >
//       {children}
//     </ChatbotUIContext.Provider>
//   );
// };

// export { GlobalState, ChatbotUIContext };
