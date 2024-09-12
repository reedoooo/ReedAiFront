/* eslint-disable no-constant-condition */
'use client';
// =========================================================
// [CHAT BOT] | React Chatbot
// =========================================================
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useActionData, useParams } from 'react-router-dom';
import { ChatHeader, MessageInput } from 'components/chat';
import { MessageBox } from 'components/chat/messages';
import { useAppStore } from 'contexts/AppProvider';
import { useChatStore } from 'contexts/ChatProvider';
import { useChatHandler, useChatScroll, useMenu, useMode } from 'hooks';
import 'styles/ChatStyles.css';
import { organizeMessages } from 'utils/format';

// const MessageInput = React.lazy(() => import(''));

export const MainChat = () => {
  const { theme } = useMode();
  // const functionCallHandler = async call => {
  //   if (call?.function?.name !== 'get_weather') return;
  //   const args = JSON.parse(call.function.arguments);
  //   const data = getWeather(args.location);
  //   setWeatherData(data);
  //   return JSON.stringify(data);
  // };
  const {
    state: { isSidebarOpen },
    actions: { toggleSidebar },
  } = useAppStore();
  const [marginLeft, setMarginLeft] = useState('50px');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile
  useEffect(() => {
    if (isMobile) {
      console.log('isMobile:', isMobile);
      setMarginLeft('0px');
    } else {
      setMarginLeft('50px');
    }
  }, [isMobile, isSidebarOpen]);

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const {
    chatError,
    chatLoading,
    handleSendMessage,
    handleRegenerateResponse,
    handleStop,
    handleContentChange,
    handleGetSessionMessages,
    handleGetSession,
    handleCreateNewSession,
  } = useChatHandler(messages, setMessages);
  const actionData = useActionData();
  const [open, setOpen] = useState(!actionData);
  const promptsMenu = useMenu();
  const dialogRef = useRef(null);
  const sidebarItemRef = useRef(null);
  const { messagesStartRef, messagesEndRef, chatContainerRef, handleScroll } =
    useChatScroll();
  const params = useParams(); // Extract the dynamic 'id' parameter from the URL
  const {
    state: {
      userInput,
      isMessagesUpdated,
      isFirstMessageReceived,
      sessionId,
      workspaceId,
    },
    actions: { setIsMessagesUpdated, setSessionHeader, setSessionId },
  } = useChatStore();
  const { scrollToBottom, setIsAtBottom } = useChatScroll();
  const [error, setError] = useState(chatError);
  const [loading, setLoading] = useState(chatLoading);
  const [systemMessage, setSystemMessage] = useState(null);
  const initializationAttempted = useRef(false);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const controllerRef = useRef(null);
  const editorActiveRef = useRef(false);
  /* --- fn() to handle the system message --- */
  useEffect(() => {
    if (error) {
      setSystemMessage({
        role: 'system',
        content: `Error: ${error}`,
      });
    } else {
      setSystemMessage(null);
    }
  }, [error]);
  /* --- fn() to handle the focus of the chat input --- */
  useEffect(() => {
    if (promptsMenu.isOpen && sidebarItemRef.current) {
      const sidebarItemRect = sidebarItemRef.current.getBoundingClientRect();
      const dialogRect = dialogRef.current.getBoundingClientRect();

      const leftPosition = sidebarItemRect.right + 32; // 2rem margin
      const topPosition =
        sidebarItemRect.top -
        dialogRect.height / 2 +
        sidebarItemRect.height / 2;

      dialogRef.current.style.left = `${leftPosition}px`;
      dialogRef.current.style.top = `${topPosition}px`;
    }
  }, [promptsMenu.isOpen]);
  /* -- */
  useEffect(() => {
    const initializeSession = async () => {
      let currentSessionId = sessionId || sessionStorage.getItem('sessionId');

      if (!currentSessionId) {
        try {
          console.log('No session found, initializing new session...');
          await handleCreateNewSession();
          // Assuming handleCreateNewSession updates sessionId in context
          currentSessionId = sessionStorage.getItem('sessionId');
        } catch (error) {
          console.error('Failed to initialize session:', error);
        }
      } else {
        console.log('Session found:', currentSessionId);
        // await handleGetSession();
      }
      if (!JSON.parse(localStorage.getItem('chatMessages'))) {
        await handleGetSessionMessages();
      }
      // await handleGetSessionMessages();

      setLoading(false);
    };

    initializeSession();
  }, [
    sessionId,
    workspaceId,
    handleCreateNewSession,
    handleGetSessionMessages,
    handleGetSession,
  ]);
  /* --- fn() to handle the scroll to bottom --- */
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
  /* --- fn() to handle the chat abort option --- */
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);
  /* --- fn() to handle the chat messages --- */
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

  if (!open) {
    return <CircularProgress />;
  }
  return (
    <Box
      id="chat-view-container"
      sx={{
        flexGrow: 1,
        marginLeft: marginLeft, // Use the marginLeft state variable
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: !isMobile ? 'calc(100% - 24px)' : null,
        transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out', // Smooth transition
      }}
    >
      <Box
        id="chat-header-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100%', // Ensure width is 100%
        }}
      >
        <Paper
          theme={theme}
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 8px)',
            width: `calc(100% - 60px)`,
            margin: 'auto',
            [theme.breakpoints.down('sm')]: {
              height: '100vh',
              width: '100%',
            },
          }}
        >
          <Box
            theme={theme}
            ref={chatContainerRef}
            component={Grid}
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#1C1C1C',
              width: '100%',
              height: '100%',
              borderRadius: '14px',
              overflow: 'auto', // Allow scrolling
              flexGrow: 1,
            }}
          >
            <ChatHeader />
            <Box
              onScroll={handleScroll}
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: theme.spacing(2),
                height: '100%',
                width: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            >
              <div ref={messagesStartRef} />
              <MessageBox messages={messages} />
              {systemMessage && (
                <MessageBox
                  message={{
                    role: 'system',
                    content: systemMessage.content,
                  }}
                />
              )}
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress />
                </Box>
              )}
              <div ref={messagesEndRef} />
              {/* {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              {loading && <CircularProgress />} */}
            </Box>
            <MessageInput
              theme={theme}
              disabled={loading}
              editorRef={editorActiveRef}
              initialContent={userInput}
              isFirstMessage={isFirstMessageReceived}
              setIsEditorActive={setIsEditorActive}
              setError={setError}
              onContentChange={handleContentChange}
              handleSendMessage={handleSendMessage}
              handleRegenerateResponse={handleRegenerateResponse}
              handleStop={handleStop}
              value={userInput}
              onChange={handleContentChange} // Use the editor's content change handler
              onSend={handleSendMessage}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MainChat;
