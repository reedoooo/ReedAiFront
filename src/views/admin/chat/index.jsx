'use client';
/* eslint-disable no-constant-condition */
// =========================================================
// [CHAT BOT] | React Chatbot
// =========================================================
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  useMediaQuery,
} from '@mui/material';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useActionData, useParams } from 'react-router-dom';
import { ChatHeader, MessageInput } from 'components/chat';
import { MessageBox } from 'components/chat/messages';
import { useAppStore } from 'contexts/AppProvider';
import { useChatStore } from 'contexts/ChatProvider';
import { useChatHandler, useChatScroll, useMenu, useMode } from 'hooks';
import 'styles/ChatStyles.css';
import { filterMessagesWithContent, organizeMessages } from 'utils/format';

export const MainChat = () => {
  const { theme } = useMode();
  const {
    state: { isSidebarOpen },
  } = useAppStore();
  const { params } = useParams(); // Extract the dynamic 'id' parameter from the URL

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
  const suggestedPrompts = [
    'What is the weather like today?',
    'Tell me a joke',
    'Help me write a summary',
    'What are some productivity tips?',
  ];
  const {
    chatError,
    chatLoading,
    chatStreaming,
    controllerRef,
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
  const editorActiveRef = useRef(false);
  /* --- fn() to handle the focus of the chat input --- */
  useLayoutEffect(() => {
    if (promptsMenu.isOpen && sidebarItemRef.current) {
      const sidebarItemRect = sidebarItemRef.current.getBoundingClientRect();
      const dialogRect = dialogRef.current.getBoundingClientRect();

      const leftPosition = sidebarItemRect.right + 32;
      const topPosition =
        sidebarItemRect.top -
        dialogRect.height / 2 +
        sidebarItemRect.height / 2;

      dialogRef.current.style.left = `${leftPosition}px`;
      dialogRef.current.style.top = `${topPosition}px`;
    }
  }, [promptsMenu.isOpen]);
  /* -- */
  const initializeSession = useCallback(async () => {
    if (!sessionId) {
      try {
        await handleCreateNewSession();
      } catch (err) {
        console.error('Failed to initialize session:', err);
      }
    }

    const localChatMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if ((!localChatMessages || localChatMessages.length === 0) && sessionId) {
      await handleGetSessionMessages();
    }
  }, [sessionId, handleCreateNewSession, handleGetSessionMessages]);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  /* --- fn() to handle the scroll to bottom --- */
  useEffect(() => {
    const fetchData = async () => {
      await handleGetSessionMessages();
      scrollToBottom();
      setIsAtBottom(true);
    };

    if (params?.workspaceId) {
      fetchData();
    }
  }, [
    params?.workspaceId,
    handleGetSessionMessages,
    scrollToBottom,
    setIsAtBottom,
  ]);

  /* --- fn() to handle the chat abort option --- */
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [controllerRef]);

  /* --- fn() to handle the chat messages --- */
  useEffect(() => {
    const localMessages =
      JSON.parse(localStorage.getItem('chatMessages')) || [];

    const combinedMessages = [...localMessages, ...messages];

    const organizedMessages = organizeMessages(combinedMessages);
    let uniqueMessages = filterMessagesWithContent(organizedMessages);
    console.log('uniqueMessages:', uniqueMessages);

    if (!chatLoading && !chatStreaming) {
      // Check if the second-to-last message needs to be filtered out
      const secondLastIndex = uniqueMessages.length - 2;

      if (
        secondLastIndex >= 0 &&
        uniqueMessages[secondLastIndex].isStreaming === true &&
        uniqueMessages[secondLastIndex].role === 'assistant'
      ) {
        // Remove the second-to-last message
        uniqueMessages.splice(secondLastIndex, 1);
      }

      // After potential removal, set isLastMessage on the last message
      if (uniqueMessages.length > 0) {
        uniqueMessages[uniqueMessages.length - 1].isLastMessage = true;
      }

      localStorage.setItem('chatMessages', JSON.stringify(uniqueMessages));
    }

    if (workspaceId && sessionId && messages.length > 0 && !isMessagesUpdated) {
      setIsMessagesUpdated(true);
    }
  }, [
    sessionId,
    messages,
    setIsMessagesUpdated,
    workspaceId,
    isMessagesUpdated,
  ]);

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
              {messages.length > 0 ? (
                <MessageBox messages={messages} />
              ) : (
                <Box sx={{ textAlign: 'center', margin: '20px' }}>
                  <h3>No messages yet, try one of these prompts:</h3>
                  {suggestedPrompts.map((prompt, index) => (
                    <Paper
                      key={index}
                      elevation={2}
                      sx={{
                        padding: '10px',
                        margin: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        handleContentChange(prompt);
                        handleSendMessage();
                      }}
                    >
                      {prompt}
                    </Paper>
                  ))}
                </Box>
              )}
              {chatLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress />
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>
            <MessageInput
              theme={theme}
              disabled={chatLoading}
              editorRef={editorActiveRef}
              initialContent={userInput}
              isFirstMessage={isFirstMessageReceived}
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
