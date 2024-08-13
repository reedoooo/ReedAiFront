/* eslint-disable no-constant-condition */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChatStore } from 'contexts';
import { useChatHandler, useChatScroll } from 'hooks';
import { organizeMessages } from 'utils/format';
import 'styles/ChatStyles.css';

/**
 * Custom hook for chat logic.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.authActions - The authentication actions.
 * @param {Object} options.chatState - The chat state.
 * @param {Object} options.chatActions - The chat actions.
 * @param {Object} options.userState - The user state.
 * @returns {Object.messages} - The messages object.
 * @returns {Object.error} - The error object.
 * @returns {Object.loading} - The loading object.
 * @returns {Object.sessionHeader} - The session header object.
 * @returns {Object.isEditorActive} - The is editor active object.
 * @returns {Object.setIsEditorActive} - The set is editor active object.
 * @returns {Object.editorActiveRef} - The editor active ref object.
 * @returns {Object.userInput} - The user input object.
 * @returns {Object.isFirstMessageReceived} - The is first message received object.
 * returns {Function.setError} - The set error function.
 *     messages,
    error,
    loading,
    sessionHeader,
    isEditorActive,
    setIsEditorActive,
    editorActiveRef,
    userInput,
    isFirstMessageReceived,
    setError,
 */
export const useChatLogic = () => {
  const params = useParams(); // Extract the dynamic 'id' parameter from the URL
  const {
    state: {
      userInput,
      isMessagesUpdated,
      isFirstMessageReceived,
      chatMessages,
      sessionHeader,
      sessionId,
      workspaceId,
    },
    actions: { setIsMessagesUpdated },
  } = useChatStore();
  const { scrollToBottom, setIsAtBottom } = useChatScroll();
  const { handleGetSessionMessages, handleGetSession } = useChatHandler();
  const [messages, setMessages] = useState(() => {
    const savedMessages = chatMessages ? chatMessages : [];
    return savedMessages;
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const controllerRef = useRef(null);
  const editorActiveRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      await handleGetSessionMessages();
      await handleGetSession();

      scrollToBottom();
      setIsAtBottom(true);
    };

    if (params.workspaceId) {
      fetchData().then(() => {
        // handleFocusChatInput();
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    const filterMessagesWithContent = messages => {
      const seen = new Set();
      return messages.filter(message => {
        if (
          message.content &&
          !seen.has(message.content) &&
          message.type !== 'start' &&
          message.type !== 'end'
        ) {
          seen.add(message.content);
          return true;
        }
        return false;
      });
    };

    const localMessages =
      JSON.parse(localStorage.getItem('chatMessages')) || [];

    const combinedMessages = [...localMessages, ...messages];

    const organizedMessages = organizeMessages(combinedMessages);
    const uniqueMessages = filterMessagesWithContent(organizedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(uniqueMessages));
    // setChatMessages(uniqueMessages);
    if (workspaceId && sessionId && messages.length > 0 && !isMessagesUpdated) {
      // handleSaveMessagesToSession();
      setIsMessagesUpdated(true);
    }
  }, [sessionId, messages, setIsMessagesUpdated]);

  return {
    messages,
    error,
    loading,
    sessionHeader,
    isEditorActive,
    setIsEditorActive,
    editorActiveRef,
    userInput,
    isFirstMessageReceived,
    setError,
    // handleSendMessage,
    // handleRegenerateResponse,
    // handleStop,
    // handleContentChange,
    // handleGetSessionMessages,
    // handleCreateNewSession,
  };
};

export default useChatLogic;
// const handleCreateNewSession = async () => {
//   try {
//     // --- Clear the current session data ---
//     setUserInput('');
//     setChatMessages([]);
//     setSelectedChatSession({
//       _id: null,
//     });
//     setActiveSession({
//       _id: null,
//       messages: [],
//     });
//     setChatFileItems([]);
//     setSessionId(null);
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
//     // --- Create a new session with the entered name ---
//     const newSessionData = {
//       ...defaultChatSessionStoreData(),
//       name: sessionHeader || 'New Chat Session',
//       topic: sessionHeader || 'New Chat Session',
//       prompt: `Starting a new chat session with topic: ${sessionHeader || 'New Chat Session'}.`,
//       userId: userId,
//       workspaceId: workspaceId,
//       summary: '',
//       messages: [],
//       model: 'gpt-4o-mini',
//       active: true,
//       settings: {
//         contextCount: 15,
//         maxTokens: 500,
//         temperature: 0.7,
//         model: 'gpt-4o-mini',
//         topP: 1,
//         n: 4,
//         debug: false,
//         summarizeMode: false,
//       },
//       apiKey: apiKey,
//     };
//     createNewChatSession(newSessionData);
//     navigate(`/admin/${workspaceId}/chat`);
//   } catch (error) {
//     console.error('Failed to create new chat session:', error);
//     // Optionally handle the error with a user notification or similar
//   }
// };
// const handleGetSessionMessages = useCallback(async () => {
//   try {
//     const response = await sessionApi.getMessages(sessionId);
//     console.log('RESPONSE:', response);
//     setMessages([...response]);
//   } catch (error) {
//     console.error(error);
//   }
// }, [sessionId]);
// const handleGetSession = useCallback(async () => {
//   try {
//     const response = await sessionApi.getById(sessionId);
//     console.log('Setting active session:', response);
//     setActiveSession(response);
//     return response;
//   } catch (error) {
//     console.error('Error fetching session data:', error);
//     throw error;
//   }
// }, [sessionId, setActiveSession]);
// const handleSendMessage = useCallback(async () => {
//   if (!userId) {
//     setError('Please login to continue');
//     setIsRedirectToSignin(true);
//     return;
//   }
//   if (!userInput.trim()) {
//     setError('Please enter your message.');
//     return;
//   }
//   setError('');
//   setLoading(true);

//   if (controllerRef.current) {
//     controllerRef.current.abort();
//   }

//   controllerRef.current = new AbortController();
//   const payload = {
//     sessionId: sessionId || 'id not provided',
//     workspaceId: workspaceId || 'id not provided',
//     regenerate: isRegenerating,
//     prompt: userInput,
//     userId: userId,
//     clientApiKey: sessionStorage.getItem('apiKey'),
//     role: 'user',
//     signal: controllerRef.current.signal,
//   };
//   const newMessage = { role: 'user', content: userInput };

//   setMessages(prevMessages => [...prevMessages, newMessage]);

//   clearInput();
//   const decoder = new TextDecoder('utf-8');

//   try {
//     const streamResponse = new Response(
//       await completionsApi.getStream(payload)
//     );
//     const reader = streamResponse.body.getReader();
//     let assistantMessage = { role: 'assistant', content: '' };
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;
//       const decodedValue = decoder.decode(value, { stream: true });
//       assistantMessage.content += decodedValue;
//       setMessages(prevMessages => {
//         const newMessages = [...prevMessages];
//         const lastMessage = newMessages[newMessages.length - 1];
//         if (lastMessage && lastMessage.role === 'assistant') {
//           newMessages[newMessages.length - 1] = assistantMessage;
//         } else {
//           newMessages.push(assistantMessage);
//         }
//         return newMessages;
//       });
//       // setMessageParts(prevParts => [...prevParts, decodedValue]);
//     }
//     // localStorage.setItem('chatMessages', JSON.stringify(messages));
//     setChatMessages(messages);
//     const data = safeParse(
//       assistantMessage.content,
//       assistantMessage.content
//     );
//     assistantMessage.content = data.content;
//     setMessages(prevMessages => {
//       const newMessages = [...prevMessages];
//       newMessages[newMessages.length - 1] = assistantMessage;
//       return newMessages;
//     });
//     setChatMessages(prevMessages => {
//       const newMessages = [...prevMessages];
//       newMessages[newMessages.length - 1] = assistantMessage;
//       return newMessages;
//     });
//     // await handleUpdateSessionMessages([newMessage, assistantMessage]);
//     setIsMessagesUpdated(false);
//     clearInput();
//   } catch (error) {
//     console.error('Error sending message:', error);
//     setError('An error occurred while sending the message.');
//   } finally {
//     clearInput();
//     setLoading(false);
//   }
// }, [
//   userInput,
//   messages,
//   controllerRef,
//   sessionId,
//   workspaceId,
//   isRegenerating,
//   userId,
//   setIsRedirectToSignin,
//   clearInput,
//   setIsMessagesUpdated,
//   setChatMessages,
//   safeParse,
// ]);

// const handleRegenerateResponse = useCallback(async () => {
//   setIsRegenerating(true);
//   handleContentChange(messages[messages.length - 2]?.content || '');
//   await handleSendMessage();
// }, [messages, handleSendMessage]);

// const handleStop = () => {
//   if (controllerRef.current) {
//     controllerRef.current.abort();
//   }
// };
// const handleSaveMessagesToSession = useCallback(async () => {
//   try {
//     const response = await sessionApi.saveMessage(sessionId, messages);
//     setActiveWorkspace(response);
//   } catch (error) {
//     console.error(error);
//   }
// }, [sessionId, messages, setActiveWorkspace]);

// const handleUpdateSessionMessages = useCallback(
//   async newMessages => {
//     try {
//       const uniqueMessages = newMessages.filter(
//         newMessage =>
//           !messages.some(
//             msg =>
//               msg.content === newMessage.content &&
//               msg.role === newMessage.role
//           )
//       );

//       if (uniqueMessages.length > 0) {
//         const updatedMessages = await sessionApi.updateMessages(
//           sessionId,
//           uniqueMessages // Send both the new user message and the assistant message
//         );
//         setMessages(prevMessages => [...prevMessages, ...updatedMessages]);
//       }
//     } catch (error) {
//       console.error('Error updating session messages:', error);
//     }
//   },
//   [sessionId, messages]
// );

// const handleGetValidWorkspace = useCallback(async () => {
//   try {
//     const response = await workspaceApi.getById(workspaceId);
//     console.log('Setting active workspace:', response);
//     setActiveWorkspace(response);
//   } catch (error) {
//     console.error(error);
//   }
// }, [workspaceId, setActiveWorkspace]);

// useEffect(() => {
//   const fetchData = async () => {
//     if (!workspaceId) {
//       await handleGetValidWorkspace();
//       setWorkspaceId(activeWorkspace?._id);
//     }

//     if (!sessionId) {
//       const validSession = await handleGetValidSession();
//       setSessionId(validSession?._id);
//     }
//   };

//   fetchData();
// }, [
//   workspaceId,
//   sessionId,
//   handleGetValidWorkspace,
//   handleGetValidSession,
//   activeWorkspace,
//   activeSession,
// ]);

// useEffect(() => {
//   if (!workspaceId) {
//     handleGetValidWorkspace();
//     setWorkspaceId(activeWorkspace?._id);
//   }
// }, [workspaceId, activeWorkspace, handleGetValidWorkspace, setWorkspaceId]);

// useEffect(() => {
//   if (!sessionId) {
//     handleGetValidSession();
//     setSessionId(activeSession?._id);
//   }
// }, [sessionId, activeSession, handleGetValidSession, setSessionId]);
