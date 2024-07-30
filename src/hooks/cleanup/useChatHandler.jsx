// import { useRouter } from 'next/navigation';
// import { useContext, useEffect, useRef } from 'react';
// import { useChatStore } from 'contexts/ChatProvider';
// import {
//   createTempMessages,
//   handleCreateChat,
//   handleCreateMessages,
//   handleHostedChat,
//   handleLocalChat,
//   handleRetrieval,
//   processResponse,
//   validateChatSettings,
// } from 'api/chat-helpers';
// import {
//   getAssistantCollectionsByAssistantId,
//   getAssistantFilesByAssistantId,
//   getAssistantToolsByAssistantId,
//   updateChat,
//   getCollectionFilesByCollectionId,
//   deleteMessagesIncludingAndAfter,
// } from '@/db'; // Adjust the import paths as needed
// import { buildFinalMessages } from '@/lib/build-prompt';

// const useChatHandler = () => {
//   const router = useRouter();

//   const { state, actions } = useChatStore();
//   const {
//     userInput,
//     chatFiles,
//     profile,
//     selectedChat,
//     selectedWorkspace,
//     availableLocalModels,
//     availableOpenRouterModels,
//     abortController,
//     chatSettings,
//     newMessageImages,
//     selectedAssistant,
//     chatMessages,
//     chatImages,
//     newMessageFiles,
//     chatFileItems,
//     useRetrieval,
//     sourceCount,
//     selectedTools,
//     selectedPreset,
//     models,
//     isPromptPickerOpen,
//     isFilePickerOpen,
//     isToolPickerOpen,
//   } = state;

//   const {
//     setUserInput,
//     setNewMessageImages,
//     setIsGenerating,
//     setChatMessages,
//     setFirstTokenReceived,
//     setSelectedChat,
//     setChats,
//     setSelectedTools,
//     setAbortController,
//     setChatSettings,
//     setChatFiles,
//     setNewMessageFiles,
//     setShowFilesDisplay,
//     setChatFileItems,
//     setToolInUse,
//     setIsPromptPickerOpen,
//     setIsFilePickerOpen,
//     setChatImages,
//   } = actions;

//   const chatInputRef = useRef(null);

//   useEffect(() => {
//     if (!isPromptPickerOpen || !isFilePickerOpen || !isToolPickerOpen) {
//       chatInputRef.current?.focus();
//     }
//   }, [isPromptPickerOpen, isFilePickerOpen, isToolPickerOpen]);

//   const handleNewChat = async () => {
//     if (!selectedWorkspace) return;

//     setUserInput('');
//     setChatMessages([]);
//     setSelectedChat(null);
//     setChatFileItems([]);

//     setIsGenerating(false);
//     setFirstTokenReceived(false);

//     setChatFiles([]);
//     setChatImages([]);
//     setNewMessageFiles([]);
//     setNewMessageImages([]);
//     setShowFilesDisplay(false);
//     setIsPromptPickerOpen(false);
//     setIsFilePickerOpen(false);

//     setSelectedTools([]);
//     setToolInUse('none');

//     if (selectedAssistant) {
//       setChatSettings({
//         model: selectedAssistant.model,
//         prompt: selectedAssistant.prompt,
//         temperature: selectedAssistant.temperature,
//         contextLength: selectedAssistant.context_length,
//         includeProfileContext: selectedAssistant.include_profile_context,
//         includeWorkspaceInstructions:
//           selectedAssistant.include_workspace_instructions,
//         embeddingsProvider: selectedAssistant.embeddings_provider,
//       });

//       let allFiles = [];

//       const assistantFiles = (
//         await getAssistantFilesByAssistantId(selectedAssistant.id)
//       ).files;
//       allFiles = [...assistantFiles];
//       const assistantCollections = (
//         await getAssistantCollectionsByAssistantId(selectedAssistant.id)
//       ).collections;
//       for (const collection of assistantCollections) {
//         const collectionFiles = (
//           await getCollectionFilesByCollectionId(collection.id)
//         ).files;
//         allFiles = [...allFiles, ...collectionFiles];
//       }
//       const assistantTools = (
//         await getAssistantToolsByAssistantId(selectedAssistant.id)
//       ).tools;

//       setSelectedTools(assistantTools);
//       setChatFiles(
//         allFiles.map(file => ({
//           id: file.id,
//           name: file.name,
//           type: file.type,
//           file: null,
//         }))
//       );

//       if (allFiles.length > 0) setShowFilesDisplay(true);
//     } else if (selectedPreset) {
//       setChatSettings({
//         model: selectedPreset.model,
//         prompt: selectedPreset.prompt,
//         temperature: selectedPreset.temperature,
//         contextLength: selectedPreset.context_length,
//         includeProfileContext: selectedPreset.include_profile_context,
//         includeWorkspaceInstructions:
//           selectedPreset.include_workspace_instructions,
//         embeddingsProvider: selectedPreset.embeddings_provider,
//       });
//     }

//     return router.push(`/${selectedWorkspace.id}/chat`);
//   };

//   const handleFocusChatInput = () => {
//     chatInputRef.current?.focus();
//   };

//   const handleStopMessage = () => {
//     if (abortController) {
//       abortController.abort();
//     }
//   };

//   const handleSendMessage = async (
//     messageContent,
//     chatMessages,
//     isRegeneration
//   ) => {
//     const startingInput = messageContent;

//     try {
//       setUserInput('');
//       setIsGenerating(true);
//       setIsPromptPickerOpen(false);
//       setIsFilePickerOpen(false);
//       setNewMessageImages([]);

//       const newAbortController = new AbortController();
//       setAbortController(newAbortController);

//       const modelData = [
//         ...models.map(model => ({
//           modelId: model.model_id,
//           modelName: model.name,
//           provider: 'custom',
//           hostedId: model.id,
//           platformLink: '',
//           imageInput: false,
//         })),
//         ...availableLocalModels,
//         ...availableOpenRouterModels,
//       ].find(llm => llm.modelId === chatSettings?.model);

//       validateChatSettings(
//         chatSettings,
//         modelData,
//         profile,
//         selectedWorkspace,
//         messageContent
//       );

//       let currentChat = selectedChat ? { ...selectedChat } : null;

//       const b64Images = newMessageImages.map(image => image.base64);

//       let retrievedFileItems = [];

//       if (
//         (newMessageFiles.length > 0 || chatFiles.length > 0) &&
//         useRetrieval
//       ) {
//         setToolInUse('retrieval');

//         retrievedFileItems = await handleRetrieval(
//           userInput,
//           newMessageFiles,
//           chatFiles,
//           chatSettings.embeddingsProvider,
//           sourceCount
//         );
//       }

//       const { tempUserChatMessage, tempAssistantChatMessage } =
//         createTempMessages(
//           messageContent,
//           chatMessages,
//           chatSettings,
//           b64Images,
//           isRegeneration,
//           setChatMessages,
//           selectedAssistant
//         );

//       let payload = {
//         chatSettings,
//         workspaceInstructions: selectedWorkspace.instructions || '',
//         chatMessages: isRegeneration
//           ? [...chatMessages]
//           : [...chatMessages, tempUserChatMessage],
//         assistant: selectedChat?.assistant_id ? selectedAssistant : null,
//         messageFileItems: retrievedFileItems,
//         chatFileItems,
//       };

//       let generatedText = '';

//       if (selectedTools.length > 0) {
//         setToolInUse('Tools');

//         const formattedMessages = await buildFinalMessages(
//           payload,
//           profile,
//           chatImages
//         );

//         const response = await fetch('/api/chat/tools', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             chatSettings: payload.chatSettings,
//             messages: formattedMessages,
//             selectedTools,
//           }),
//         });

//         setToolInUse('none');

//         generatedText = await processResponse(
//           response,
//           isRegeneration
//             ? payload.chatMessages[payload.chatMessages.length - 1]
//             : tempAssistantChatMessage,
//           true,
//           newAbortController,
//           setFirstTokenReceived,
//           setChatMessages,
//           setToolInUse
//         );
//       } else {
//         if (modelData.provider === 'ollama') {
//           generatedText = await handleLocalChat(
//             payload,
//             profile,
//             chatSettings,
//             tempAssistantChatMessage,
//             isRegeneration,
//             newAbortController,
//             setIsGenerating,
//             setFirstTokenReceived,
//             setChatMessages,
//             setToolInUse
//           );
//         } else {
//           generatedText = await handleHostedChat(
//             payload,
//             profile,
//             modelData,
//             tempAssistantChatMessage,
//             isRegeneration,
//             newAbortController,
//             newMessageImages,
//             chatImages,
//             setIsGenerating,
//             setFirstTokenReceived,
//             setChatMessages,
//             setToolInUse
//           );
//         }
//       }

//       if (!currentChat) {
//         currentChat = await handleCreateChat(
//           chatSettings,
//           profile,
//           selectedWorkspace,
//           messageContent,
//           selectedAssistant,
//           newMessageFiles,
//           setSelectedChat,
//           setChats,
//           setChatFiles
//         );
//       } else {
//         const updatedChat = await updateChat(currentChat.id, {
//           updated_at: new Date().toISOString(),
//         });

//         setChats(prevChats => {
//           const updatedChats = prevChats.map(prevChat =>
//             prevChat.id === updatedChat.id ? updatedChat : prevChat
//           );

//           return updatedChats;
//         });
//       }

//       await handleCreateMessages(
//         chatMessages,
//         currentChat,
//         profile,
//         modelData,
//         messageContent,
//         generatedText,
//         newMessageImages,
//         isRegeneration,
//         retrievedFileItems,
//         setChatMessages,
//         setChatFileItems,
//         setChatImages,
//         selectedAssistant
//       );

//       setIsGenerating(false);
//       setFirstTokenReceived(false);
//     } catch (error) {
//       setIsGenerating(false);
//       setFirstTokenReceived(false);
//       setUserInput(startingInput);
//     }
//   };

//   const handleSendEdit = async (editedContent, sequenceNumber) => {
//     if (!selectedChat) return;

//     await deleteMessagesIncludingAndAfter(
//       selectedChat.user_id,
//       selectedChat.id,
//       sequenceNumber
//     );

//     const filteredMessages = chatMessages.filter(
//       chatMessage => chatMessage.message.sequence_number < sequenceNumber
//     );

//     setChatMessages(filteredMessages);

//     handleSendMessage(editedContent, filteredMessages, false);
//   };

//   return {
//     chatInputRef,
//     handleNewChat,
//     handleSendMessage,
//     handleFocusChatInput,
//     handleStopMessage,
//     handleSendEdit,
//   };
// };

// export default useChatHandler;
