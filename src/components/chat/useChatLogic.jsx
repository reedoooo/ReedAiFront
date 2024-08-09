/* eslint-disable no-constant-condition */
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { apiUtils } from '@/lib/apiUtils';
import {
  completions as completionsApi,
  sessions as sessionApi,
  workspaces as workspaceApi,
} from 'api/chat';
import { useChatStore } from 'contexts/ChatProvider';
import { useDialog } from 'hooks/useDialog';
import { organizeMessages, safeParse } from 'utils/format';
import 'styles/ChatStyles.css';

export async function createNewSession({ sessionName, instructions, topic }) {
  try {
    const newSessionData = await apiUtils.post('/chat/chatSessions/session', {
      sessionName,
      instructions,
      topic,
    });
    return newSessionData;
  } catch (error) {
    console.error('Error creating new session:', error);
  }
}

export const useChatLogic = ({
  authActions,
  chatState,
  chatActions,
  userState,
}) => {
  const {
    apiKey,
    workspaceId,
    sessionId,
    activeSession,
    activeWorkspace,
    userInput,
    isMessagesUpdated,
    isFirstMessageReceived,
  } = chatState;
  const { userId } = userState;
  const { setIsRedirectToSignin } = authActions;
  const {
    setWorkspaceId,
    setSessionId,
    setActiveWorkspace,
    setActiveSession,
    setUserInput,
    setIsMessagesUpdated,
    setFirstMessageReceived,
  } = chatActions;
  const chatStore = useChatStore();

  const [messageParts, setMessageParts] = useState([]);
  const [sessionHeader, setSessionHeader] = useState('');
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
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

  const handleContentChange = content => {
    setUserInput(content);
  };

  const clearInput = () => {
    setUserInput('');
  };
  const handleNewSession = useCallback(
    async props => {
      const { sessionName, instructions, topic } = props;
      const data = await sessionApi.create({
        sessionName,
        instructions,
        topic,
      });
      console.log('New session created:', data);
      chatStore.actions.setActiveSession(data.session);
      chatStore.actions.setSessionId(data.session._id);
      localStorage.setItem('activeChatSession', JSON.stringify(data.session));
    },
    [chatStore.actions]
  );

  const handleSaveMessagesToSession = useCallback(async () => {
    try {
      const currentSession = await sessionApi.getById(sessionId);
      console.log('CURRENT SESSION:', currentSession);
      const response = await sessionApi.saveMessage(sessionId, messages);
      console.log('Saved messages to session:', response);
      setActiveWorkspace(response);
    } catch (error) {
      console.error(error);
    }
  }, [sessionId, messages, setActiveWorkspace]);

  const handleUpdateSessionMessages = useCallback(
    async newMessages => {
      try {
        // Ensure we only send new messages that haven't been sent before
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

  useEffect(() => {
    if (!workspaceId) {
      handleGetValidWorkspace();
      setWorkspaceId(activeWorkspace?._id);
    }
  }, [workspaceId, activeWorkspace, handleGetValidWorkspace, setWorkspaceId]);

  useEffect(() => {
    if (!sessionId) {
      handleGetValidSession();
      setSessionId(activeSession?._id);
    }
  }, [sessionId, activeSession, handleGetValidSession, setSessionId]);
  // useEffect(() => {
  //   handleGetValidSession();
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
    if (!localStorage.getItem('userId')) {
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
      clientApiKey: localStorage.getItem('apiKey'),
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
        setMessageParts(prevParts => [...prevParts, decodedValue]);
      }
      localStorage.setItem('chatMessages', JSON.stringify(messages));

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
    apiKey,
    setIsRedirectToSignin,
    setError,
    setLoading,
    clearInput,
    setIsMessagesUpdated,
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
