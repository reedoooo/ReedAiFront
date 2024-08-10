/* eslint-disable no-constant-condition */
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  completions as completionsApi,
  sessions as sessionApi,
  workspaces as workspaceApi,
} from 'api/chat';
import { useChatStore, useAuthStore, useUserStore } from 'contexts';
import { useDialog, useMode } from 'hooks';
import { organizeMessages, safeParse } from 'utils/format';
import 'styles/ChatStyles.css';

/**
 * Custom hook for chat logic.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.authActions - The authentication actions.
 * @param {Object} options.chatState - The chat state.
 * @param {Object} options.chatActions - The chat actions.
 * @param {Object} options.userState - The user state.
 * @returns {Object} - The chat logic object.
 */
export const useChatLogic = () => {
  const { theme } = useMode();
  const {
    state: authState,
    actions: { setIsRedirectToSignin },
  } = useAuthStore();
  const {
    state: {
      apiKey,
      workspaceId,
      sessionId,
      sessionHeader,
      activeSession,
      activeWorkspace,
      userInput,
      isMessagesUpdated,
      isFirstMessageReceived,
      chatMessages,
    },
    actions: {
      setWorkspaceId,
      setSessionId,
      setSessionHeader,
      setActiveWorkspace,
      setActiveSession,
      setUserInput,
      setIsMessagesUpdated,
      setFirstMessageReceived,
      setChatMessages,
    },
  } = useChatStore();
  const {
    state: { userId },
  } = useUserStore();
  const [messages, setMessages] = useState(() => {
    // const savedMessages = localStorage.getItem('chatMessages');
    return chatMessages ? chatMessages : [];
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isEditorActive, setIsEditorActive] = useState(false);

  const messagesStartRef = useRef(null);
  const messagesEndRef = useRef(null);
  const controllerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const editorActiveRef = useRef(false);

  const handleContentChange = useCallback(
    content => setUserInput(content),
    [setUserInput]
  );
  const clearInput = useCallback(() => setUserInput(''), [setUserInput]);

  const handleNewSession = useCallback(
    async props => {
      const { sessionName, instructions, topic } = props;
      const data = await sessionApi.create({
        sessionName,
        instructions,
        topic,
      });
      clearInput('');
      setChatMessages([]);
      // setSelectedChat(null);
      // setChatFileItems([]);

      // setIsGenerating(false);
      // setFirstTokenReceived(false);

      // setChatFiles([]);
      // setChatImages([]);
      // setNewMessageFiles([]);
      // setNewMessageImages([]);
      // setShowFilesDisplay(false);
      // setIsPromptPickerOpen(false);
      // setIsFilePickerOpen(false);

      // setSelectedTools([]);
      // setToolInUse('none');
      console.log('New session created:', data);
      setActiveSession(data.session);
      setSessionId(data.session._id);
      localStorage.setItem('activeChatSession', JSON.stringify(data.session));
    },
    [setChatMessages, setActiveSession, setSessionId, clearInput]
  );
  const handleSaveMessagesToSession = useCallback(async () => {
    try {
      // const currentSession = await sessionApi.getById(sessionId);
      // console.log('CURRENT SESSION:', currentSession);
      const response = await sessionApi.saveMessage(sessionId, messages);
      setActiveWorkspace(response);
    } catch (error) {
      console.error(error);
    }
  }, [sessionId, messages, setActiveWorkspace]);

  const handleUpdateSessionMessages = useCallback(
    async newMessages => {
      try {
        const uniqueMessages = newMessages.filter(
          newMessage =>
            !messages.some(
              msg =>
                msg.content === newMessage.content &&
                msg.role === newMessage.role
            )
        );

        if (uniqueMessages.length > 0) {
          const updatedMessages = await sessionApi.updateMessages(
            sessionId,
            uniqueMessages // Send both the new user message and the assistant message
          );
          setMessages(prevMessages => [...prevMessages, ...updatedMessages]);
        }
      } catch (error) {
        console.error('Error updating session messages:', error);
      }
    },
    [sessionId, messages]
  );

  const handleGetValidWorkspace = useCallback(async () => {
    try {
      const response = await workspaceApi.getById(workspaceId);
      console.log('Setting active workspace:', response);
      setActiveWorkspace(response);
    } catch (error) {
      console.error(error);
    }
  }, [workspaceId, setActiveWorkspace]);

  const handleGetValidSession = useCallback(async () => {
    try {
      const response = await sessionApi.getById(sessionId);
      console.log('Setting active session:', response);
      setActiveSession(response);
      return response;
    } catch (error) {
      console.error('Error fetching session data:', error);
      throw error;
    }
  }, [sessionId, setActiveSession]);
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

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 100);

    const container = chatContainerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!sessionStorage.getItem('userId')) {
      setError('Please login to continue');
      setIsRedirectToSignin(true);
      return;
    }
    if (!userInput.trim()) {
      setError('Please enter your message.');
      return;
    }
    setError('');
    setLoading(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const payload = {
      sessionId: sessionId || 'id not provided',
      workspaceId: workspaceId || 'id not provided',
      regenerate: isRegenerating,
      prompt: userInput,
      userId: userId,
      clientApiKey: sessionStorage.getItem('apiKey'),
      role: 'user',
      signal: controllerRef.current.signal,
    };
    const newMessage = { role: 'user', content: userInput };

    setMessages(prevMessages => [...prevMessages, newMessage]);

    clearInput();
    const decoder = new TextDecoder('utf-8');

    try {
      const streamResponse = new Response(
        await completionsApi.getStream(payload)
      );
      const reader = streamResponse.body.getReader();
      let assistantMessage = { role: 'assistant', content: '' };
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedValue = decoder.decode(value, { stream: true });
        assistantMessage.content += decodedValue;
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            newMessages[newMessages.length - 1] = assistantMessage;
          } else {
            newMessages.push(assistantMessage);
          }
          return newMessages;
        });
        // setMessageParts(prevParts => [...prevParts, decodedValue]);
      }
      // localStorage.setItem('chatMessages', JSON.stringify(messages));
      setChatMessages(messages);
      const data = safeParse(
        assistantMessage.content,
        assistantMessage.content
      );
      assistantMessage.content = data.content;
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = assistantMessage;
        return newMessages;
      });
      await handleUpdateSessionMessages([newMessage, assistantMessage]);
      setIsMessagesUpdated(false);
      clearInput();
    } catch (error) {
      console.error('Error sending message:', error);
      setError('An error occurred while sending the message.');
    } finally {
      clearInput();
      setLoading(false);
    }
  }, [
    userInput,
    messages,
    controllerRef,
    sessionId,
    workspaceId,
    isRegenerating,
    userId,
    setIsRedirectToSignin,
    clearInput,
    handleUpdateSessionMessages,
    setIsMessagesUpdated,
    setChatMessages,
    safeParse,
  ]);

  const handleRegenerateResponse = useCallback(async () => {
    setIsRegenerating(true);
    handleContentChange(messages[messages.length - 2]?.content || '');
    await handleSendMessage();
  }, [messages, handleSendMessage]);

  const handleStop = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

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
      handleSaveMessagesToSession();
      setIsMessagesUpdated(true);
    }
  }, [sessionId, messages, handleSaveMessagesToSession, setIsMessagesUpdated]);

  return {
    messages,
    error,
    loading,
    sessionHeader,
    handleSendMessage,
    handleRegenerateResponse,
    handleStop,
    chatContainerRef,
    messagesStartRef,
    messagesEndRef,
    handleContentChange,
    isEditorActive,
    setIsEditorActive,
    editorActiveRef,
    newSessionDialog: useDialog(),
    handleNewSession,
    apiKey,
    userInput,
    isFirstMessageReceived,
    setError,
  };
};

export default useChatLogic;
