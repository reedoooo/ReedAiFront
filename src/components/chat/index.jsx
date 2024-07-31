/* eslint-disable no-case-declarations */
/* eslint-disable no-empty */
/* eslint-disable no-constant-condition */
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { debounce } from 'lodash';
import mongoose from 'mongoose';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// import { Typewriter } from 'react-simple-typewriter';
import apiUtils from '@/lib/apiUtils';
import {
  chatFiles,
  completions as completionsApi,
  sessions as sessionApi,
  workspaces as workspaceApi,
} from 'api/chat';
import {
  ChatWindow,
  MessageContainer,
  Header,
  StyledChatContainer,
} from 'components/chat/styled';
import { MessageBox } from 'components/messages';
import { useAuthStore, useChatStore, useUserStore } from 'contexts';
import useDialog from 'hooks/useDialog';
import { useMode } from 'hooks/useMode';
import useTipTapEditor from 'hooks/useTipTapEditor';
import { organizeMessages, safeParse } from 'utils/format';
import 'styles/ChatStyles.css';
import NewSessionDialog from './NewSessionDialog';

const MessageInput = React.lazy(() => import('./inputs/MessageInput'));

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

export const ChatApp = () => {
  const { theme } = useMode();
  const { state: authState, actions: authActions } = useAuthStore();
  const { state: chatState, actions: chatActions } = useChatStore();
  const { state: userState, actions: userActions } = useUserStore();
  const {
    apiKey,
    workspaceId,
    sessionId,
    selectedFiles,
    activeSession,
    activeWorkspace,
  } = chatState;
  const {
    user: { chatSessions, workspaces, _id },
    userId,
  } = userState;
  const { setIsRedirectToSignin } = authActions;
  const { setUploadedFiles, setActiveSession, setActiveWorkspace } =
    chatActions;
  // --- state management for new state ---
  const [validSession, setValidSession] = useState(
    chatSessions.find(session => session.active === true) || {}
  );
  const [validSessionId, setValidSessionId] = useState();
  const [validWorkspace, setValidWorkspace] = useState(
    workspaces.find(space => space.isHome === true) || {}
  );
  const [validWorkspaceId, setValidWorkspaceId] = useState();
  const [validSessionMessages, setValidSessionMessages] = useState([]);

  // --- memoized IDs ---
  // const sessionId = useMemo(() => validSession?._id || '', [validSession]);
  // localStorage.setItem('sessionId', sessionId);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  // --- state management for messages ---
  const [messageParts, setMessageParts] = useState([]);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages?.length > 0) {
      setIsFirstMessage(false);
    }
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [userInput, setUserInput] = useState('');
  const [inputOnSubmit, setInputOnSubmit] = useState('');
  const [error, setError] = useState('');
  const [fileInput, setFileInput] = useState(null);

  // --- state management for loading and editor ---
  const [loading, setLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [isMessagesUpdated, setIsMessagesUpdated] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  // --- functions for updating state ---
  const { editor } = useTipTapEditor(
    isFirstMessage,
    setUserInput,
    setFileInput
  );
  const messagesStartRef = useRef(null);
  const messagesEndRef = useRef(null);
  const controllerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const editorActiveRef = useRef(false);
  const newSessionDialog = useDialog();

  // --- functions for handling data ---
  const handleNewSession = async props => {
    const { sessionName, instructions, topic } = props;
    const data = await createNewSession({ sessionName, instructions, topic });
    console.log('New session created:', data);
    setValidSession(data.session);
    setValidSessionId(data.session._id);
    localStorage.setItem('validChatSession', JSON.stringify(data.session));
  };
  const handleSaveMessagesToSession = useCallback(async () => {
    try {
      const response = await sessionApi.saveMessage(sessionId, messages);
      console.log('SavedMessage successfully', response);
      setValidWorkspace(response);
      return;
    } catch (error) {
      console.error(error);
    }
  }, [workspaceId]);
  const handleGetValidWorkspace = useCallback(async () => {
    try {
      const response = await workspaceApi.getById(workspaceId);
      console.log('validWorkspace', response);
      setValidWorkspace(response);
      return;
    } catch (error) {
      console.error(error);
    }
  }, [workspaceId]);
  const handleGetValidSession = useCallback(async () => {
    try {
      const response = await sessionApi.getById(sessionId);
      console.log('validSession', response);
      setValidSession(response);
      return response;
    } catch (error) {
      console.error('Error fetching session data:', error);
      throw error;
    }
  }, [sessionId]);

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
      sessionId: sessionId || new mongoose.Types.ObjectId(),
      workspaceId: workspaceId || new mongoose.Types.ObjectId(),
      regenerate: false,
      prompt: userInput,
      userId: userId,
      clientApiKey: apiKey,
      role: 'user',
      signal: controllerRef.current.signal,
      // filePath: fileInput,
    };
    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', content: userInput },
    ]);

    setInputOnSubmit(userInput);
    setUserInput('');
    const decoder = new TextDecoder('utf-8');

    try {
      const streamResponse = new Response(
        await completionsApi.getStream(payload)
      );
      // console.log('streamResponse', streamResponse.body);
      const reader = streamResponse.body.getReader();
      let assistantMessage = { role: 'assistant', content: '' };
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedValue = decoder.decode(value, { stream: true });
        console.log('decodedValue', decodedValue);
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
        // while (true) {
        //   const { done, value } = await reader.read();
        //   if (done) break;
        //   assistantMessage.content += value;

        //   setMessages(prevMessages => {
        //     const newMessages = [...prevMessages];
        //     const lastMessage = newMessages[newMessages.length - 1];

        //     if (lastMessage && lastMessage.role === 'assistant') {
        //       newMessages[newMessages.length - 1] = assistantMessage;
        //     } else {
        //       newMessages.push(assistantMessage);
        //     }

        //     if (
        //       messageParts &&
        //       typeof messageParts[messageParts.length - 1] === 'object' &&
        //       messageParts[messageParts.length - 1].data
        //     ) {
        //       console.log('JSON PARTS:', messageParts[messageParts.length - 1]);
        //       console.log(
        //         'JSON PARTS DATA:',
        //         messageParts[messageParts.length - 1]
        //       );
        //       newMessages.find(message => {
        //         const lastMessageContent = lastMessage.content;
        //         if (message.content === lastMessageContent) {
        //           lastMessage.content =
        //             messageParts[messageParts.length - 1].data;
        //         }
        //       }).active = false;
        //     }

        //     return newMessages;
        //   });
        //   setMessageParts(prevParts => [...prevParts, value]);
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
    } catch (error) {
      console.error('Error sending message:', error);
      setError('An error occurred while sending the message.');
    } finally {
      editor.commands.clearContent();
      setLoading(false);
    }
  }, [
    userInput,
    editor,
    messages,
    controllerRef,
    sessionId,
    workspaceId,
    apiKey,
  ]);
  // --- function for handling regen message stream ---
  const handleRegenerateResponse = useCallback(async () => {
    console.log('REGEN');
    setIsRegenerating(true);
    setUserInput(messages[messages.length - 2].content);
    await handleSendMessage();
  }, [messages, handleSendMessage]);
  // --- function for handling send abort ---
  const handleStop = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };
  // --- function to handle file input change to trigger file upload ---
  const handleFileInputChange = useCallback(async () => {
    for (const file of selectedFiles) {
      if (!file) {
        console.error('No file selected');
        continue;
      }
      if (file) {
        try {
          const newFile = await chatFiles.uploadFile(
            file,
            progress => setUploadProgress(progress),
            'chat'
          );
          alert('File uploaded successfully');
          setUploadedFiles(prevFiles => [...prevFiles, newFile]);
        } catch (err) {
          setError(err.message);
        }
      }
    }
  }, [selectedFiles]);
  // --- functions for handling user input ---
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
          <Typography variant="h6">
            Current Chat Session Name:
            {validSession?.sessionName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Discuss your queries and get assistance
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => newSessionDialog.handleOpen}
            >
              Start New Session
            </Button>
          </Box>
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
          setFileInput={setFileInput}
          isFirstMessage={isFirstMessage}
        />
        <NewSessionDialog
          open={newSessionDialog.open}
          onClose={newSessionDialog.handleClose}
          onCreate={handleNewSession}
        />
      </StyledChatContainer>
    </ChatWindow>
  );
};
