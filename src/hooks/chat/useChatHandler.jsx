import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { chatApi } from 'api/Ai/chat-sessions';
import { workspacesApi } from 'api/workspaces';
import { useChatStore, useUserStore } from 'contexts';
import { defaultChatSessionStoreData } from 'store/Slices/helpers';
import { safeParse } from 'utils/format';
import { useTipTapEditor } from './useTipTapEditor';

export const useChatHandler = () => {
  const navigate = useNavigate();
  const controllerRef = useRef(null);

  const {
    state: {
      apiKey,
      userInput,
      sessionHeader,
      sessionId,
      workspaceId,
      isRegenerating,
      workspaces,
      streamingMessageIndex,
      isStreaming,
      chatMessages,
    },
    actions: {
      setSessionId,
      setSessionHeader,
      setUserInput,
      setIsMessagesUpdated,
      setFirstMessageReceived,
      setStreamingMessageIndex,
      setIsStreaming,
      createNewChatSession,
      setSelectedChatSession,
      setChatFileItems,
      setFirstTokenReceived,
      setChatFiles,
      setChatImages,
      setNewMessageFiles,
      setNewMessageImages,
      setShowFilesDisplay,
      setIsPromptPickerOpen,
      setIsFilePickerOpen,
      setSelectedTools,
      setToolInUse,
      setIsRegenerating,
      setWorkspaces,
      setSelectedWorkspace,
      syncChatMessages,
      setChatMessages,
    },
  } = useChatStore();

  const userId = sessionStorage.getItem('userId');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0); // Initialize message counter

  const { editor, insertContentAndSync, clearInput } =
    useTipTapEditor(userInput);

  const handleGetSessionMessages = useCallback(async () => {
    try {
      if (!sessionId || chatMessages?.length > 0) {
        return;
      }
      // const response = await chatApi.getMessages(sessionId);
      const response = await syncChatMessages(sessionId);
      if (!response) {
        return;
      }
      console.log('RESPONSE:', response);
    } catch (error) {
      console.error(error);
    }
  }, [chatMessages?.length, sessionId, syncChatMessages]);

  const handleGetSession = useCallback(async () => {
    try {
      if (!workspaceId) {
        throw new Error('Workspace ID not provided');
      }
      if (!sessionId) {
        throw new Error('Session ID not provided');
      }
      const response = await chatApi.getChatSessionByChatSessionId(
        workspaceId,
        sessionId
      );
      // const lastSession = response[0];
      console.log('Setting selected session:', response);
      setSelectedChatSession(response);
      setSessionId(response._id);
      return response;
    } catch (error) {
      console.error('Error fetching session data:', error);
      throw error;
    }
  }, [sessionId, setSelectedChatSession, setSessionId, workspaceId]);

  const handleCreateNewWorkspace = useCallback(
    async workspaceData => {
      try {
        const savedWorkspace = await workspacesApi.create(workspaceData);
        setWorkspaces([...workspaces, savedWorkspace]);
        setSelectedWorkspace(savedWorkspace);
        navigate(`/${savedWorkspace._id}/chat`);
      } catch (err) {
        console.error('Error saving workspace:', err);
      }
    },
    [navigate, setSelectedWorkspace, setWorkspaces, workspaces]
  );

  const handleCreateNewSession = useCallback(async () => {
    try {
      setMessageCount(0);
      // --- Clear the current session data ---
      clearInput();
      // setChatMessages([]);
      setSelectedChatSession(null);
      setChatFileItems([]);
      setSessionId(null);
      setIsStreaming(false);
      setFirstTokenReceived(false);
      setChatFiles([]);
      setChatImages([]);
      setNewMessageFiles([]);
      setNewMessageImages([]);
      setShowFilesDisplay(false);
      setIsPromptPickerOpen(false);
      setIsFilePickerOpen(false);
      setSelectedTools([]);
      setToolInUse('none');
      // --- Create a new session with the entered name ---
      const newSessionData = {
        ...defaultChatSessionStoreData(),
        name: sessionHeader || 'New Chat Session',
        topic: sessionHeader || 'New Chat Session',
        prompt: `Starting a new chat session with topic: ${sessionHeader || 'New Chat Session'}.`,
        userId: userId,
        workspaceId: workspaceId,
        summary: '',
        messages: [],
        model: 'gpt-4o-mini',
        active: true,
        settings: {
          model: 'gpt-4o-mini',
          contextCount: 2,
          maxTokens: 2000,
          temperature: 0.7,
          topP: 1,
          debug: false,
          summarizeMode: false,
        },
        apiKey: apiKey,
      };
      // createNewChatSession(newSessionData);
      navigate(`/admin/chat/${workspaceId}`);
    } catch (err) {
      console.error('Failed to create new chat session:', err);
    }
  }, [
    apiKey,
    clearInput,
    navigate,
    sessionHeader,
    setChatFileItems,
    setChatFiles,
    setChatImages,
    // setChatMessages,
    setFirstTokenReceived,
    setIsFilePickerOpen,
    setIsPromptPickerOpen,
    setIsStreaming,
    setNewMessageFiles,
    setNewMessageImages,
    setSelectedChatSession,
    setSelectedTools,
    setSessionId,
    setShowFilesDisplay,
    setToolInUse,
    userId,
    workspaceId,
  ]);

  const handleSendMessage = useCallback(
    async content => {
      if (!userId) {
        setError('Please login to continue');
        toast.error('Please login to continue');
        return;
      }

      if (!content.trim()) {
        setError('Please enter your message.');
        toast.error('Please enter your message.');
        return;
      }

      setError('');
      setLoading(true);
      setIsStreaming(true);

      const userMessage = { role: 'user', content: content.trim() };
      let initialMessages = [...chatMessages, userMessage];
      setChatMessages(initialMessages);

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      const payload = {
        sessionId: sessionId || 'id not provided',
        workspaceId:
          workspaceId ||
          sessionStorage.getItem('workspaceId') ||
          'id not provided',
        prompt: content.trim() || 'No prompt provided',
        userId: userId || 'id not provided',
        clientApiKey: sessionStorage.getItem('apiKey') || 'key not provided',
        role: 'user',
        regenerate: isRegenerating,
        signal: controllerRef.current.signal,
        length: messageCount,
      };

      clearInput();

      const decoder = new TextDecoder('utf-8');
      let assistantMessage = {
        role: 'assistant',
        content: '',
        isStreaming: true,
      };

      try {
        const streamResponse = new Response(
          await chatApi.getStreamCompletion(payload)
        );
        const reader = streamResponse.body.getReader();

        const tempMessages = [...initialMessages, assistantMessage];
        setChatMessages(tempMessages);
        setStreamingMessageIndex(tempMessages.length - 1);

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const decodedValue = decoder.decode(value, { stream: true });
          assistantMessage.content += decodedValue;

          // tempMessages[streamingMessageIndex] = {
          //   ...assistantMessage,
          //   content: assistantMessage.content,
          //   isStreaming: true,
          // };
          // setChatMessages([...currentMessages]);
          setChatMessages(prevMessages => {
            const newMessages = [...prevMessages];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage?.role === 'assistant') {
              newMessages[newMessages.length - 1] = {
                ...lastMessage,
                content: assistantMessage.content,
                isStreaming: true, // Update the isStreaming property
              };
            } else {
              console.log('Adding new message:', assistantMessage);
              newMessages.push({ ...assistantMessage, isStreaming: true }); // Include isStreaming
            }
            return newMessages;
          });
        }

        const data = safeParse(
          assistantMessage.content,
          assistantMessage.content
        );
        assistantMessage.content = data.content;

        tempMessages[streamingMessageIndex] = {
          ...assistantMessage,
          // content: assistantMessage.content,
          isStreaming: false,
        };
        setIsStreaming(false);
        setChatMessages([...tempMessages]);
        // setChatMessages(prevMessages => {
        //   const newMessages = [...prevMessages];
        //   newMessages[newMessages.length - 1] = {
        //     ...assistantMessage,
        //     isStreaming: false, // Set isStreaming to false
        //   };
        //   console.log('Updated messages 2:', newMessages);
        //   return newMessages;
        // });
        // localStorage.setItem('chatMessages', JSON.stringify(currentMessages));
        setMessageCount(prev => prev + 1);
        setIsMessagesUpdated(false);
      } catch (error) {
        console.error('Error sending message:', error);
        setError('An error occurred while sending the message.');
        setIsStreaming(false);
        setLoading(false);
      } finally {
        clearInput();
        setLoading(false);
        setIsStreaming(false);
      }
    },
    [
      userId,
      setIsStreaming,
      chatMessages,
      setChatMessages,
      sessionId,
      workspaceId,
      isRegenerating,
      messageCount,
      clearInput,
      setStreamingMessageIndex,
      streamingMessageIndex,
      setIsMessagesUpdated,
    ]
  );

  const handleRegenerateResponse = useCallback(async () => {
    setIsRegenerating(true);
    const lastUserMessage =
      chatMessages[chatMessages.length - 2]?.content || '';
    insertContentAndSync(lastUserMessage);
    await handleSendMessage();
  }, [
    handleSendMessage,
    insertContentAndSync,
    chatMessages,
    setIsRegenerating,
  ]);

  const handleStop = useCallback(() => {
    if (controllerRef.current) controllerRef.current.abort();
    setIsStreaming(false);
  }, [setIsStreaming]);

  return useMemo(
    () => ({
      messages: chatMessages,
      chatError: error,
      chatLoading: loading,
      chatStreaming: isStreaming,
      messageCount, // Return messageCount to access it outside
      controllerRef,
      clearInput,
      handleCreateNewSession,
      handleSendMessage,
      handleRegenerateResponse,
      handleStop,
      handleGetSessionMessages,
      handleGetSession,
      handleCreateNewWorkspace,
    }),
    [
      chatMessages,
      error,
      loading,
      isStreaming,
      messageCount,
      controllerRef,
      clearInput,
      handleCreateNewSession,
      handleSendMessage,
      handleRegenerateResponse,
      handleStop,
      handleGetSessionMessages,
      handleGetSession,
      handleCreateNewWorkspace,
    ]
  );
};

export default useChatHandler;

//   const handleSendMessage = useCallback(
//     async content => {
//       try {
//         console.log('Sending message:', content);
//         if (!sessionStorage.getItem('userId')) {
//           console.error('User ID not provided');
//           setError('Please login to continue');
//           toast.error('Please login to continue');
//           return;
//         }

//         if (!content.trim()) {
//           console.error('Message content not provided');
//           setError('Please enter your message.');
//           toast.error('Please enter your message.');
//           return;
//         }
//         setError('');
//         setLoading(true);
//         // const userMessage = { role: 'user', content: userInput };

//         // Add the user message to the chat messages immediately
//         // setChatMessages(prevMessages => [...prevMessages, userMessage]);
//         // setChatMessages([...chatMessages, userMessage]);
//         setChatMessages([
//           ...chatMessages,
//           { role: 'user', content: content.trim() },
//         ]);

//         setIsStreaming(true);
//         console.log('Streaming:', isStreaming);
//         if (controllerRef.current) {
//           controllerRef.current.abort();
//         }
//         controllerRef.current = new AbortController();

//         const payload = {
//           sessionId: sessionId || 'id not provided',
//           workspaceId:
//             workspaceId ||
//             sessionStorage.getItem('workspaceId') ||
//             'id not provided',
//           prompt: userInput || 'No prompt provided',
//           userId: userId || 'id not provided',
//           clientApiKey: sessionStorage.getItem('apiKey') || 'key not provided',
//           role: 'user',
//           regenerate: isRegenerating,
//           signal: controllerRef.current.signal,
//           length: messageCount,
//         };
//         console.log('Payload:', payload);
//         // setChatMessages(prevMessages => [...prevMessages, userMessage]);
//         clearInput();

//         const decoder = new TextDecoder('utf-8');
//         let assistantMessage = {
//           role: 'assistant',
//           content: '',
//           isStreaming: true,
//         };

//         const streamResponse = new Response(
//           await chatApi.getStreamCompletion(payload)
//         );
//         const reader = streamResponse.body.getReader();
//         // **1. Add the assistant message with isStreaming: true**
//         setChatMessages(prevMessages => {
//           const newMessages = [...prevMessages, assistantMessage];
//           setStreamingMessageIndex(newMessages.length - 1); // Save index of streaming message
//           return newMessages;
//         });
//         // eslint-disable-next-line no-constant-condition
//         let currentMessages = [...chatMessages];

// while (true) {
//   const { done, value } = await reader.read();
//   if (done) break;
//   const decodedValue = decoder.decode(value, { stream: true });
//   assistantMessage.content += decodedValue;

//   const lastMessage = currentMessages[currentMessages.length - 1];
//   if (lastMessage?.role === 'assistant') {
//     currentMessages[currentMessages.length - 1] = {
//       ...lastMessage,
//       content: assistantMessage.content,
//       isStreaming: true,
//     };
//   } else {
//     currentMessages.push({ ...assistantMessage, isStreaming: true });
//   }

//   setChatMessages([...currentMessages]);
// }
// while (true) {
//   const { done, value } = await reader.read();
//   if (done) break;
//   const decodedValue = decoder.decode(value, { stream: true });
//   assistantMessage.content += decodedValue;
//   setChatMessages([
//     ...chatMessages,

//     const newMessages = [...prevMessages];
//     const lastMessage = newMessages[newMessages.length - 1];
//     if (lastMessage?.role === 'assistant') {
//       return [
//         ...newMessages.slice(0, -1),
//         {
//           ...lastMessage,
//           content: assistantMessage.content,
//           isStreaming: true,
//         },
//       ];
//     } else {
//       return [
//         ...newMessages,
//         { ...assistantMessage, isStreaming: true },
//       ];
//     }
//   ]);
// setChatMessages(prevMessages => {
//   const newMessages = [...prevMessages];
//   const lastMessage = newMessages[newMessages.length - 1];
//   if (lastMessage?.role === 'assistant') {
//     return [
//       ...newMessages.slice(0, -1),
//       {
//         ...lastMessage,
//         content: assistantMessage.content,
//         isStreaming: true,
//       },
//     ];
//   } else {
//     return [
//       ...newMessages,
//       { ...assistantMessage, isStreaming: true },
//     ];
//   }
// });
// setChatMessages(prevMessages => {
//   const newMessages = [...prevMessages];
//   const lastMessage = newMessages[newMessages.length - 1];
//   if (lastMessage?.role === 'assistant') {
//     newMessages[newMessages.length - 1] = {
//       ...lastMessage,
//       content: assistantMessage.content,
//       isStreaming: true, // Update the isStreaming property
//     };
//   } else {
//     console.log('Adding new message:', assistantMessage);
//     newMessages.push({ ...assistantMessage, isStreaming: true }); // Include isStreaming
//   }
//   return newMessages;
// });
// }

// Final parsing and formatting of the complete message
// Final parsing and formatting of the complete message
//         const data = safeParse(
//           assistantMessage.content,
//           assistantMessage.content
//         );
//         assistantMessage.content = data.content;

// setChatMessages(prevMessages => {
//   const newMessages = [...prevMessages];
//   newMessages[newMessages.length - 1] = {
//     ...assistantMessage,
//     isStreaming: false, // Set isStreaming to false
//   };
//   console.log('Updated messages 2:', newMessages);
//   return newMessages;
// });
//         console.log('Updated messages 3:', chatMessages);
//         localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
//         console.log('Assistant message:', assistantMessage);

//         setMessageCount(prev => prev + 1);
//         setIsMessagesUpdated(false);
//         setIsStreaming(false); // Set streaming to false when done
//         // setLoading(false); // Stop loading
//       } catch (error) {
//         console.error('Error sending message:', error);
//         setError('An error occurred while sending the message.');
//         setIsStreaming(false); // Ensure isStreaming is false on error
//       } finally {
//         clearInput();
//         setLoading(false);
//         setIsStreaming(false); // Stop streaming
//       }
//     },
//     [
//       setChatMessages,
//       chatMessages,
//       setIsStreaming,
//       isStreaming,
//       sessionId,
//       workspaceId,
//       userInput,
//       userId,
//       isRegenerating,
//       messageCount,
//       clearInput,
//       setIsMessagesUpdated,
//       setStreamingMessageIndex,
//     ]
//   );
