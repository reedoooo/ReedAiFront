/* eslint-disable no-case-declarations */
/* eslint-disable no-empty */
/* eslint-disable no-constant-condition */
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { debounce } from 'lodash';
import memoizeOne from 'memoize-one';
import mongoose from 'mongoose';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Navigate } from 'react-router-dom';
// import { Typewriter } from 'react-simple-typewriter';
import {
  fetchMessageStream,
  saveMessagesToSession,
  getChatSessionMessagesBySessionId,
} from 'api/chat/chat_main';
import {
  ChatWindow,
  MessageContainer,
  Header,
  StyledChatContainer,
} from 'components/chat/styled';
import { MessageBox } from 'components/messages';
import constants from 'config/constants';
import { useAuthStore, useChatStore } from 'contexts';
import { useMode } from 'hooks/useMode';
import useTipTapEditor from 'hooks/useTipTapEditor';
import { organizeMessages, safeParse } from 'utils/format';
import 'styles/ChatStyles.css';
const { API_URL, OPENAI_API_KEY } = constants;
const MessageInput = React.lazy(() => import('./inputs/MessageInput'));
export async function getChatSessionBySessionId(sessionId) {
  try {
    const response = await fetch(
      'http://localhost:3001/api/chat/chatSessions/session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const sessionData = await response.json();
    return sessionData;
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw error;
  }
}

export async function getWorkspaceByWorkspaceId(workspaceId) {
  try {
    const response = await fetch(
      'http://localhost:3001/api/chat/workspaces/workspace',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workspaceId }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const workspaceData = await response.json();
    return workspaceData;
  } catch (error) {
    console.error('Error fetching workspace data:', error);
    throw error;
  }
}

export const ChatApp = () => {
  const { theme } = useMode();
  const { state: authState, actions: authActions } = useAuthStore();
  const { state: chatState } = useChatStore();
  const { isRedirectToSignin } = authState;
  const { setIsRedirectToSignin } = authActions;
  const { apiKey, chatId } = chatState;

  // --- destructuring user data from local storage ---
  const userData = JSON.parse(localStorage.getItem('userStorage')).user;
  const chatSessions = userData.chatSessions;
  const activeSession = chatSessions.find(session => session.active === true);
  const workspaces = userData.workspaces;
  const activeWorkspace = workspaces.find(space => space.isHome === true);

  // --- state management for new state ---
  const [validSession, setValidSession] = useState(activeSession || {});
  const [validSessionId, setValidSessionId] = useState();
  const [validWorkspace, setValidWorkspace] = useState(activeWorkspace || {});
  const [validWorkspaceId, setValidWorkspaceId] = useState();
  const [validSessionMessages, setValidSessionMessages] = useState([]);

  // --- memoized IDs ---
  const sessionId = useMemo(() => activeSession?._id || '', [activeSession]);
  localStorage.setItem('sessionId', sessionId);
  const workspaceId = useMemo(
    () => activeWorkspace?._id || '',
    [activeWorkspace]
  );
  const userId = useMemo(() => userData?._id || '', [userData]);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  // --- state management for messages ---
  const [messageParts, setMessageParts] = useState([]);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages.length > 0) {
      setIsFirstMessage(false);
    }
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [userInput, setUserInput] = useState('');
  const [inputOnSubmit, setInputOnSubmit] = useState('');
  const [error, setError] = useState('');

  // --- state management for loading and editor ---
  const [loading, setLoading] = useState(false);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [isMessagesUpdated, setIsMessagesUpdated] = useState(false);

  const { editor } = useTipTapEditor(isFirstMessage, setUserInput);
  const messagesStartRef = useRef(null);
  const messagesEndRef = useRef(null);
  const controllerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const editorActiveRef = useRef(false);

  // --- memoized functions for fetching data ---
  const memoizedGetWorkspaceByWorkspaceId = memoizeOne(
    getWorkspaceByWorkspaceId
  );
  const memoizedGetChatSessionBySessionId = memoizeOne(
    getChatSessionBySessionId
  );
  const memoizedGetChatSessionMessagesBySessionId = memoizeOne(
    getChatSessionMessagesBySessionId
  );
  const debouncedFetchMessageStream = useCallback(
    debounce(fetchMessageStream, 500),
    []
  );

  // --- functions for handling data ---
  const handleSaveMessagesToSession = useCallback(async () => {
    const sessionId = localStorage.getItem('sessionId');
    const userId = localStorage.getItem('userId');

    if (!sessionId || !userId) {
      console.error('No sessionId or userId available');
      return;
    }

    console.log('handleSaveMessagesToSession', sessionId);

    const id = encodeURIComponent(sessionId);
    try {
      const updatedMessages = messages.map(message => ({
        content: message.content,
        role: message.role,
      }));

      const body = {
        sessionId: id,
        messages: updatedMessages, // Assuming the server expects 'messages'
      };

      const response = await fetch(
        '/api/chat/chatSessions/session/messages/save',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`Error saving messages: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Messages saved successfully:', result);
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  }, [messages]);

  const handleGetValidWorkspace = useCallback(async () => {
    try {
      const response = await getWorkspaceByWorkspaceId(workspaceId);
      console.log('validWorkspace', response);
      setValidWorkspace(response);
      return;
    } catch (error) {
      console.error(error);
    }
  }, [workspaceId]);

  const handleGetValidSession = useCallback(async () => {
    try {
      const response = await getChatSessionBySessionId(sessionId);
      console.log('validSession', response);
      setValidSession(response);
      return response;
    } catch (error) {
      console.error('Error fetching session data:', error);
      throw error;
    }
  }, [sessionId]);

  const handleGetValidSessionMessages = useCallback(async () => {
    try {
      const response = await memoizedGetChatSessionMessagesBySessionId(
        validSession._id
      );
      console.log('--- validSessionMessages ---', response);
      return;
    } catch (error) {
      console.error(error);
    }
  }, [validSession._id]);

  // --- useEffect for handling data ---
  // useEffect(() => {
  //   if (isMessagesUpdated) {
  //     handleSaveMessagesToSession();
  //     setIsMessagesUpdated(false);
  //   }
  // }, [isMessagesUpdated]);

  useEffect(() => {
    if (!validWorkspaceId) {
      handleGetValidWorkspace();
      setValidWorkspaceId(validWorkspace._id);
    }
  }, [handleGetValidWorkspace, validWorkspace, validWorkspaceId]);

  useEffect(() => {
    if (!validSessionId) {
      handleGetValidSession();
      setValidSessionId(validSession._id);
    }
  }, [handleGetValidSession, validSession, validSessionId]);

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

  const handleSendMessage = async () => {
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

    // Abort any ongoing request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create a new AbortController
    controllerRef.current = new AbortController();
    const payload = {
      sessionId: sessionId || new mongoose.Types.ObjectId(),
      chatId: chatId || new mongoose.Types.ObjectId(),
      regenerate: false,
      prompt: userInput,
      userId: localStorage.getItem('userId'),
      clientApiKey: apiKey,
      role: 'user',
      id: new mongoose.Types.ObjectId(),
      content: userInput,
      signal: controllerRef.current.signal,
    };
    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', content: userInput },
    ]);

    setInputOnSubmit(userInput);
    setUserInput('');

    try {
      const streamResponse = await fetchMessageStream(payload);
      const reader = streamResponse.getReader();
      let assistantMessage = { role: 'assistant', content: '' };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMessage.content += value;

        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];

          if (lastMessage && lastMessage.role === 'assistant') {
            newMessages[newMessages.length - 1] = assistantMessage;
          } else {
            newMessages.push(assistantMessage);
          }

          if (
            messageParts &&
            typeof messageParts[messageParts.length - 1] === 'object' &&
            messageParts[messageParts.length - 1].data
          ) {
            console.log('JSON PARTS:', messageParts[messageParts.length - 1]);
            console.log(
              'JSON PARTS DATA:',
              messageParts[messageParts.length - 1]
            );
            newMessages.find(message => {
              const lastMessageContent = lastMessage.content;
              if (message.content === lastMessageContent) {
                lastMessage.content =
                  messageParts[messageParts.length - 1].data;
              }
            }).active = false;
          }

          return newMessages;
        });
        setMessageParts(prevParts => [...prevParts, value]);
      }
      localStorage.setItem('chatMessages', JSON.stringify(messages));

      const data = safeParse(
        assistantMessage.content,
        assistantMessage.content
      );
      console.log(data);
      const pageLayout = data.content;
      console.log(pageLayout);

      assistantMessage.content = pageLayout;
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = assistantMessage;
        return newMessages;
      });
      setIsMessagesUpdated(false);
      setUserInput('');
    } finally {
      editor.commands.clearContent();
      setLoading(false);
    }
  };

  const handleRegenerateResponse = useCallback(() => {
    console.log('REGEN');
  }, []);

  const handleStop = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  // Inside the ChatApp component
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
    // Only call saveSessionMessages if there are messages and a valid sessionId
    if (sessionId && messages.length > 0 && !isMessagesUpdated) {
      handleSaveMessagesToSession();
      setIsMessagesUpdated(true);
    }
  }, [sessionId, messages, handleSaveMessagesToSession, setIsMessagesUpdated]); // Dependency array includes messages to trigger useEffect when messages change
  if (isRedirectToSignin) {
    setIsRedirectToSignin(false);
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <ChatWindow theme={theme} elevation={3}>
      <StyledChatContainer
        theme={theme}
        ref={chatContainerRef}
        component={Grid}
        item
        xs={12}
      >
        <Header>
          <Typography variant="h6">Chat with Assistant</Typography>
          <Typography variant="body2" color="textSecondary">
            Discuss your queries and get assistance
          </Typography>
        </Header>
        <MessageContainer>
          <div ref={messagesStartRef} />
          <MessageBox messages={messages} />
          {/* <MDXMessageBox streamedResponse={streamedResponse} /> */}
          <div ref={messagesEndRef} />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          {loading && <CircularProgress />}
        </MessageContainer>
        <MessageInput
          theme={theme}
          editor={editor}
          apiKey={apiKey}
          disabled={loading}
          handleRegenerateResponse={handleRegenerateResponse}
          handleStop={handleStop}
          handleSendMessage={handleSendMessage}
          setIsEditorActive={setIsEditorActive}
          editorRef={editorActiveRef}
          setUserInput={setUserInput}
          isFirstMessage={isFirstMessage}
        />
      </StyledChatContainer>
    </ChatWindow>
  );
};
