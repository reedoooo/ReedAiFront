// /* eslint-disable no-empty */
// /* eslint-disable no-constant-condition */
// import { align } from '@mdit/plugin-align';
// // import { attrs } from '@mdit/plugin-attrs';
// // import { mark } from '@mdit/plugin-mark';
// // import { snippet } from '@mdit/plugin-snippet';
// // import { tab } from '@mdit/plugin-tab';
// // import { tasklist } from '@mdit/plugin-tasklist';
// import {
//   Box,
//   CircularProgress,
//   Typography,
//   Avatar,
//   Button,
// } from '@mui/material';
// import hljs from 'highlight.js';
// import { debounce, uniqueId } from 'lodash';
// import MarkdownIt from 'markdown-it';
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { FaUser, FaRobot } from 'react-icons/fa';
// import { Navigate } from 'react-router-dom';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
// import { CheckCircleIcon, DownloadIcon, FileCopyIcon } from 'assets/humanIcons';
// import TipTapEditor from 'components/TipTapEditor';
// import { programmingLanguages } from 'config/data-configs';
// import { useCopyToClipboard } from 'hooks/useCopyToClipboard';
// import useMode from 'hooks/useMode';
// import { extractJSXFromMarkdown, validateProps } from './helpers';
// import MessageInput from './MessageInput';
// import 'highlight.js/styles/github.css'; // Import a highlight.js theme
// import 'styles/ChatStyles.css';
// import { useAuthStore } from 'contexts/AuthProvider';
// import { useChatStore } from 'contexts/ChatProvider';

// const StyledAvatar = styled(Avatar)(({ theme, isUser }) => ({
//   width: 40,
//   height: 40,
//   marginRight: 2,
//   backgroundColor: isUser
//     ? theme.palette.primary.main
//     : theme.palette.secondary.main,
// }));

// const StyledContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   backgroundColor: '#1C1C1C',
//   color: 'white',
//   width: '100%',
//   height: '100%',
//   borderRadius: '14px',
//   overflow: 'hidden', // Disable scrolling
// }));
// const MessageBubble = styled('div')(({ sender }) => ({
//   margin: '10px',
//   padding: '10px',
//   borderRadius: '12px',
//   // backgroundColor: sender === 'user' ? '#dcf8c6' : '#e0e0e0',
//   alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
//   display: 'flex',
//   alignItems: 'flex-start',
//   justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
//   flexDirection: sender === 'user' ? 'row-reverse' : 'row',
//   mb: 2,
//   maxWidth: '90%',
// }));
// // Function to determine the content type
// const getContentType = content => {
//   if (typeof content !== 'string') return 'text';
//   if (/```[\s\S]*```/.test(content)) {
//     return 'markdownWithCode';
//   } else if (/[*_~`]/.test(content)) {
//     return 'markdown';
//   } else {
//     return 'text';
//   }
// };
// const md = new MarkdownIt({
//   html: true,
//   linkify: true,
//   typographer: true,
//   breaks: true,
//   highlight: function (str, lang) {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return (
//           '<pre class="hljs"><code>' +
//           hljs.highlight(lang, str, true).value +
//           '</code></pre>'
//         );
//       } catch (__) {}
//     }
//     return (
//       '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
//     );
//   },
// }).use(align);

// // Function to extract code blocks from markdown content
// const extractCodeBlocks = content => {
//   const codeBlocks = [];
//   const regex = /```([\s\S]*?)```/g;
//   let match;
//   while ((match = regex.exec(content)) !== null) {
//     codeBlocks.push(match[1]);
//   }
//   const remainingContent = content.replace(regex, '');
//   return { codeBlocks, remainingContent };
// };
// const generateRandomString = (length, lowercase = false) => {
//   const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'; // excluding similar looking characters like Z, 2, I, 1, O, 0
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return lowercase ? result.toLowerCase() : result;
// };

// const splitContent = content => {
//   const parts = [];
//   const regex = /(```[\s\S]*?```|[^`]+|```)/g;
//   let match;

//   while ((match = regex.exec(content)) !== null) {
//     if (match[0].startsWith('```')) {
//       parts.push({
//         type: 'code',
//         content: match[0].replace(/```/g, ''),
//       });
//     } else if (/[*_~`]/.test(match[0])) {
//       parts.push({
//         type: 'markdown',
//         content: match[0],
//       });
//     } else {
//       parts.push({
//         type: 'text',
//         content: match[0],
//       });
//     }
//   }

//   return parts;
// };
// const getCodeLanguage = content => {
//   const regex = /```([a-z]*)\n/;
//   const match = regex.exec(content);
//   return match ? match[1] : 'javascript';
// };

// const renderContent = (content, isCopied, copyToClipboard) => {
//   const parts = splitContent(content);
//   const language = getCodeLanguage(content);
//   const value = parts[0].type === 'code' ? [parts[0].content] : [content];

//   const downloadAsFile = () => {
//     if (typeof window === 'undefined') {
//       return;
//     }
//     const fileExtension = programmingLanguages[language] || '.file';
//     const suggestedFileName = `file-${uuidv4().slice(0, 3).toLowerCase()}${fileExtension}`;
//     const fileName = window.prompt('Enter file name', suggestedFileName);

//     if (!fileName) {
//       return;
//     }

//     const blob = new Blob(value);
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.download = fileName;
//     link.href = url;
//     link.style.display = 'none';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   const onCopy = () => {
//     if (isCopied) return;
//     copyToClipboard(value);
//   };

//   return parts.map((part, index) => {
//     switch (part.type) {
//       case 'code':
//         return (
//           <div
//             className="codeblock relative w-full bg-zinc-950 font-sans"
//             key={index}
//           >
//             <SyntaxHighlighter language={language} style={darcula}>
//               {part.content}
//             </SyntaxHighlighter>
//             <div className="flex w-full items-center justify-between bg-zinc-700 px-4 text-white">
//               <span className="text-xs lowercase">{language}</span>
//               <div className="flex items-center space-x-1">
//                 <Button onClick={downloadAsFile}>
//                   <DownloadIcon size={16} />
//                 </Button>
//                 <Button onClick={onCopy}>
//                   {isCopied ? (
//                     <CheckCircleIcon size={16} />
//                   ) : (
//                     <FileCopyIcon size={16} />
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         );
//       case 'markdown':
//         return (
//           <Typography
//             key={index}
//             variant="body1"
//             dangerouslySetInnerHTML={{ __html: md.render(part.content) }}
//           />
//         );
//       default:
//         return (
//           <Typography
//             key={index}
//             variant="body2"
//             dangerouslySetInnerHTML={{ __html: md.render(part.content) }}
//             sx={{ color: 'white' }}
//           />
//         );
//     }
//   });
// };

// export const ChatApp = () => {
//   const { theme } = useMode();
//   const authStore = useAuthStore();
//   const chatStore = useChatStore();
//   // const [apiKey, setApiKey] = useState(chatStore.state.apiKey);
//   // const [userId, setUserId] = useState(authStore.state.userId);
//   // const [sessionId, setSessionId] = useState(null);
//   // const [chatId, setChatId] = useState(null);
//   const {
//     userId,
//     isRedirectToSignin
//   } = authStore.state;
//   const {
//     setIsRedirectToSignin,
//   } = authStore.actions;
//   const {
//     // STATE
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
//     apiKey,
//     chatId,
//     sessionId,
//   } = chatStore.state;

//   const {
//     // ACTIONS
//     setUserInput,
//     setNewMessageImages,
//     setChatMessages,
//     setFirstTokenReceived,
//     setSelectedChat,
//     setChats,
//     setSelectedTools,
//     setAbortController,
//     setChatImages,
//     setChatFiles,
//     setNewMessageFiles,
//     setShowFilesDisplay,
//     setChatFileItems,
//     setToolInUse,
//     setChatSettings,

//     setIsPromptPickerOpen,
//     setIsFilePickerOpen,
//     setIsGenerating,

//     // NEW
//     currentMessage,
//     setCurrentMessage,
//     isChatLoading,
//     setIsChatLoading,
//     chatError,
//     setChatError,
//     response,
//     setResponse,
//     isChatDisabled,
//     setIsChatDisabled,
//     isStreamingDone,
//     setIsStreamingDone,
//     streamedMessageContent,
//     setStreamedMessageContent
//   } = chatStore.actions;
//   const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
//   const editor = TipTapEditor({ setCurrentMessage });
//   const controllerRef = useRef(null);
//   // const handleNewChat = async () => {
//   //   if (!selectedWorkspace) return

//   //   setUserInput("")
//   //   setChatMessages([])
//   //   setSelectedChat(null)
//   //   setChatFileItems([])

//   //   setIsGenerating(false)
//   //   setFirstTokenReceived(false)

//   //   setChatFiles([])
//   //   setChatImages([])
//   //   setNewMessageFiles([])
//   //   setNewMessageImages([])
//   //   setShowFilesDisplay(false)
//   //   setIsPromptPickerOpen(false)
//   //   setIsFilePickerOpen(false)

//   //   setSelectedTools([])
//   //   setToolInUse("none")

//   //   if (selectedAssistant) {
//   //     setChatSettings({
//   //       model: selectedAssistant.model as LLMID,
//   //       prompt: selectedAssistant.prompt,
//   //       temperature: selectedAssistant.temperature,
//   //       contextLength: selectedAssistant.context_length,
//   //       includeProfileContext: selectedAssistant.include_profile_context,
//   //       includeWorkspaceInstructions:
//   //         selectedAssistant.include_workspace_instructions,
//   //       embeddingsProvider: selectedAssistant.embeddings_provider as
//   //         | "openai"
//   //         | "local"
//   //     })

//   //     let allFiles = []

//   //     const assistantFiles = (
//   //       await getAssistantFilesByAssistantId(selectedAssistant.id)
//   //     ).files
//   //     allFiles = [...assistantFiles]
//   //     const assistantCollections = (
//   //       await getAssistantCollectionsByAssistantId(selectedAssistant.id)
//   //     ).collections
//   //     for (const collection of assistantCollections) {
//   //       const collectionFiles = (
//   //         await getCollectionFilesByCollectionId(collection.id)
//   //       ).files
//   //       allFiles = [...allFiles, ...collectionFiles]
//   //     }
//   //     const assistantTools = (
//   //       await getAssistantToolsByAssistantId(selectedAssistant.id)
//   //     ).tools

//   //     setSelectedTools(assistantTools)
//   //     setChatFiles(
//   //       allFiles.map(file => ({
//   //         id: file.id,
//   //         name: file.name,
//   //         type: file.type,
//   //         file: null
//   //       }))
//   //     )

//   //     if (allFiles.length > 0) setShowFilesDisplay(true)
//   //   } else if (selectedPreset) {
//   //     setChatSettings({
//   //       model: selectedPreset.model as LLMID,
//   //       prompt: selectedPreset.prompt,
//   //       temperature: selectedPreset.temperature,
//   //       contextLength: selectedPreset.context_length,
//   //       includeProfileContext: selectedPreset.include_profile_context,
//   //       includeWorkspaceInstructions:
//   //         selectedPreset.include_workspace_instructions,
//   //       embeddingsProvider: selectedPreset.embeddings_provider as
//   //         | "openai"
//   //         | "local"
//   //     })
//   //   } else if (selectedWorkspace) {
//   //     // setChatSettings({
//   //     //   model: (selectedWorkspace.default_model ||
//   //     //     "gpt-4-1106-preview") as LLMID,
//   //     //   prompt:
//   //     //     selectedWorkspace.default_prompt ||
//   //     //     "You are a friendly, helpful AI assistant.",
//   //     //   temperature: selectedWorkspace.default_temperature || 0.5,
//   //     //   contextLength: selectedWorkspace.default_context_length || 4096,
//   //     //   includeProfileContext:
//   //     //     selectedWorkspace.include_profile_context || true,
//   //     //   includeWorkspaceInstructions:
//   //     //     selectedWorkspace.include_workspace_instructions || true,
//   //     //   embeddingsProvider:
//   //     //     (selectedWorkspace.embeddings_provider as "openai" | "local") ||
//   //     //     "openai"
//   //     // })
//   //   }

//   //   return router.push(`/${selectedWorkspace.id}/chat`)
//   // }
//   // const debounceAppendPartialMessageToFullMessage = useCallback(
//   //   debounce(messagePart => {
//   //     setStreamedMessageContent(
//   //       prevMessageContent => prevMessageContent + messagePart
//   //     );
//   //     setMessages(prevMessages => {
//   //       const newMessages = [...prevMessages];
//   //       const lastMessage = newMessages[newMessages.length - 1];
//   //       if (lastMessage.role === 'assistant') {
//   //         lastMessage.content += messagePart;
//   //       } else {
//   //         newMessages.push({
//   //           id: uuidv4(),
//   //           role: 'assistant',
//   //           content: messagePart,
//   //           userId: userId,
//   //         });
//   //       }
//   //       return newMessages;
//   //     });
//   //   }, 1000),
//   //   []
//   // );
//   const handleSendMessage = async () => {
//   // useCallback(async () => {
//     setUserInput(editor.getHTML());
//     setIsGenerating(true);
//     setIsPromptPickerOpen(false)
//     setIsFilePickerOpen(false)
//     setNewMessageImages([])

//     const newAbortController = new AbortController();
//     setAbortController(newAbortController);
//     const modelData = [
//       ...models.map(model => ({
//         modelId: model.model_id,
//         modelName: model.name,
//         provider: "openai",
//         hostedId: model.id,
//         platformLink: "",
//         imageInput: false
//       })),
//       ...LLM_LIST,
//       ...availableLocalModels,
//       ...availableOpenRouterModels
//     ].find(llm => llm.modelId === chatSettings?.model);
//     // let currentChat = selectedChat ? { ...selectedChat } : null

//     // const b64Images = newMessageImages.map(image => image.base64)

//     let retrievedFileItems = [];

//     // if (
//     //   (newMessageFiles.length > 0 || chatFiles.length > 0) &&
//     //   useRetrieval
//     // ) {
//     //   setToolInUse("retrieval")

//     //   retrievedFileItems = await handleRetrieval(
//     //     userInput,
//     //     newMessageFiles,
//     //     chatFiles,
//     //     // chatSettings!.embeddingsProvider,
//     //     sourceCount
//     //   )
//     // }
//     // const { tempUserChatMessage, tempAssistantChatMessage } =
//     // createTempMessages(
//     //   messageContent,
//     //   chatMessages,
//     //   // chatSettings!,
//     //   b64Images,
//     //   isRegeneration,
//     //   setChatMessages,
//     //   selectedAssistant
//     // )

//   let payload = {
//     // chatSettings: chatSettings!,
//     // workspaceInstructions: selectedWorkspace!.instructions || "",
//     // chatMessages: isRegeneration
//     //   ? [...chatMessages]
//     //   : [...chatMessages, tempUserChatMessage],
//     // assistant: selectedChat?.assistant_id ? selectedAssistant : null,
//     // messageFileItems: retrievedFileItems,
//     // chatFileItems: chatFileItems
//     sessionId: sessionId || uuidv4(),
//     chatId: chatId || uuidv4(),
//     regenerate: isRegeneration,
//     prompt: messageToSend,
//     userId: userId,
//     clientApiKey: apiKey,
//     role: 'user',
//     id: uuidv4(),
//     role: 'user',
//     content: userInput,
//     userId: userId,
//   }

//   let generatedText = "";

//   if (selectedTools.length > 0) {
//     setToolInUse("Tools");
//     setToolInUse("none");

//     // generatedText = await processResponse(
//     //   response,
//     //   isRegeneration
//     //     ? payload.chatMessages[payload.chatMessages.length - 1]
//     //     : tempAssistantChatMessage,
//     //   true,
//     //   newAbortController,
//     //   setFirstTokenReceived,
//     //   setChatMessages,
//     //   setToolInUse
//     // )
//   } else {
//     console.log('No tools selected');
//       // generatedText = await handleHostedChat(
//       //   payload,
//       //   // profile!,
//       //   // modelData!,
//       //   tempAssistantChatMessage,
//       //   isRegeneration,
//       //   newAbortController,
//       //   newMessageImages,
//       //   chatImages,
//       //   setIsGenerating,
//       //   setFirstTokenReceived,
//       //   setChatMessages,
//       //   setToolInUse
//       // )
//     }
//   }

//   if (!currentChat) {
//     console.log('No current chat');
//     // currentChat = await handleCreateChat(
//     //   chatSettings!,
//     //   profile!,
//     //   selectedWorkspace!,
//     //   messageContent,
//     //   selectedAssistant!,
//     //   newMessageFiles,
//     //   setSelectedChat,
//     //   setChats,
//     //   setChatFiles
//     // )
//   } else {
//     // const updatedChat = await updateChat(currentChat.id, {
//     //   updated_at: new Date().toISOString()
//     // })

//     // setChats(prevChats => {
//     //   const updatedChats = prevChats.map(prevChat =>
//     //     prevChat.id === updatedChat.id ? updatedChat : prevChat
//     //   )

//     //   return updatedChats
//     // })
//   }

//   // await handleCreateMessages(
//   //   chatMessages,
//   //   currentChat,
//   //   profile!,
//   //   modelData!,
//   //   messageContent,
//   //   generatedText,
//   //   newMessageImages,
//   //   isRegeneration,
//   //   retrievedFileItems,
//   //   setChatMessages,
//   //   setChatFileItems,
//   //   setChatImages,
//   //   selectedAssistant
//   // )
//     if (
//       !validateProps(
//         apiKey,
//         userId,
//         setRedirectToSignIn,
//         sessionId,
//         setSessionId,
//         chatId,
//         setChatId
//       )
//     ) {
//       return;
//     }

//     // const userMessage = {
//     //   id: uuidv4(),
//     //   role: 'user',
//     //   content: userInput,
//     //   userId: userId,
//     //   // payload,
//     //   // profile!,
//     //   // chatImages
//     // };

//     setChatMessages(prevMessages => [...prevMessages, userMessage]);
//     setLoading(true);
//     setError(null);
//     try {
//       const streamResponse = await fetchMessageStream(payload);
//       const contentType = streamResponse.headers.get('content-type');
//       if (!contentType || !contentType.includes('text/event-stream')) {
//         throw new TypeError(
//           "Oops, we haven't got contentType: text/event-stream!"
//         );
//       }
//       const reader = streamResponse.body.getReader();
//       const decoder = new TextDecoder('utf-8');
//       const newMessage = {
//         id: uuidv4(),
//         role: 'assistant',
//         content: '',
//         userId: userId,
//       };
//       setChatMessages(prevMessages => [...prevMessages, newMessage]);
//       let partialData = '';

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         partialData += decoder.decode(value, { stream: true });
//         const lines = partialData.split('\n');
//         const parsedLines = lines
//           .map(line => line.replace(/^data: /, '').trim())
//           .filter(line => line !== '' && line !== '[DONE]')
//           .map(line => JSON.parse(line));
//         console.log('PARSED LINES', parsedLines);
//         parsedLines.forEach(line => {
//           if (line.content && line.content.trim()) {
//             console.log('LINE CONTENT', streamedMessageContent + line.content);
//             setStreamedMessageContent(prevMessageContent => {
//               return prevMessageContent + line.content;
//             });
//           }
//         });
//       }
//       setIsStreamingDone(true);
//     } catch (error) {
//       setChatError(error.message || 'Error fetching message stream');
//       console.error('Error fetching message stream:', error);
//       setIsGenerating(false)
//       setFirstTokenReceived(false)
//       setUserInput(startingInput)
//     } finally {
//       setLoading(false);
//     }

//     editor.commands.clearContent();
//     setIsGenerating(false);
//     setFirstTokenReceived(false);
//     setUserInput(startingInput);
//   };

//   const handleRegenerateResponse = useCallback(() => {
//     const message = {
//       id: uuidv4(),
//       content: currentMessage,
//       isUser: true,
//       role: activeRole,
//     };
//     setMessages([...messages, message]);
//     setCurrentMessage('');
//   }, [currentMessage, activeRole, messages]);
//   const handleStop = () => {
//     if (controllerRef.current) {
//       controllerRef.current.abort();
//       setIsDisabled(false);
//     }
//   };
//   useEffect(() => {
//     if (isStreamingDone) {
//       setMessages(prevMessages => {
//         const newMessages = [...prevMessages];
//         const lastMessage = newMessages[newMessages.length - 1];
//         if (lastMessage.role === 'assistant') {
//           lastMessage.content = streamedMessageContent;
//         }
//         return newMessages;
//       });
//       setIsStreamingDone(false);
//       setStreamedMessageContent('');
//     }
//   }, [isStreamingDone, streamedMessageContent]);
//   useEffect(() => {
//     if (messages) {
//       console.log('messages', messages);
//     }
//   }, [messages]);
//   if (redirectToSignIn) {
//     return <Navigate to="/auth/sign-in" />;
//   }

//   return (
//     <StyledContainer theme={theme}>
//       <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//         <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//           <Box className="lg:w-1/2 2xl:w-1/3 p-8 rounded-md bg-gray-100">
//             <Box
//               id="resultContainer"
//               className="mt-4 h-48 overflow-y-auto"
//               sx={{
//                 padding: 2,
//               }}
//             >
//               {messages.map((message, index) => (
//                 <MessageBubble
//                   key={uniqueId(message.role)}
//                   className="text-gray-500 text-sm mb-2"
//                   sender={message.role}
//                 >
//                   <Avatar
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       marginRight: message.role === 'assistant' ? 2 : 0,
//                       marginLeft: message.role === 'user' ? 2 : 0,
//                       backgroundColor:
//                         message.role === 'user'
//                           ? theme.palette.primary.main
//                           : theme.palette.secondary.main,
//                     }}
//                   >
//                     {message.role === 'user' ? <FaUser /> : <FaRobot />}
//                   </Avatar>
//                   <Box
//                     sx={{
//                       backgroundColor:
//                         message.role === 'user' ? '#26242C' : '#1C1C1C',
//                       borderRadius: 2,
//                       p: 2,
//                       maxWidth: '90%',
//                       mr: 2,
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       className="text-gray-500 text-sm mb-2"
//                     >
//                       {renderContent(
//                         message.content,
//                         isCopied,
//                         copyToClipboard
//                       )}
//                     </Typography>
//                   </Box>
//                 </MessageBubble>
//               ))}
//               {loading && (
//                 <Typography sx={{ color: 'white', textAlign: 'center' }}>
//                   <CircularProgress size={24} />
//                 </Typography>
//               )}
//               {error && (
//                 <Typography sx={{ color: 'red', textAlign: 'center' }}>
//                   {error}
//                 </Typography>
//               )}
//               {/* </Typography> */}
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//       <MessageInput
//         theme={theme}
//         editor={editor}
//         handleSendMessage={handleSendMessage}
//         setApiKey={setApiKey}
//         setUserId={setUserId}
//         apiKey={apiKey}
//         disabled={isDisabled}
//         inputText={isDisabled ? <CircularProgress size={24} /> : 'Generate'}
//         handleRegenerateResponse={handleRegenerateResponse}
//         handleStop={handleStop}
//       />
//     </StyledContainer>
//   );
// };

// async function fetchMessageStream({
//   sessionId,
//   chatId,
//   regenerate,
//   prompt,
//   userId,
//   clientApiKey,
//   role = 'assistant',
// }) {
//   const response = await fetch('http://localhost:3001/api/chat/stream', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       sessionId,
//       chatId,
//       regenerate,
//       prompt,
//       userId,
//       clientApiKey,
//       role,
//       // chatSettings,
//       // messages,
//       // selectedTools
//     }),
//   });

//   if (!response.ok || !response.body) {
//     throw response.statusText;
//   }
//   console.log('RESPONSE: ', response);
//   return response;
// }
