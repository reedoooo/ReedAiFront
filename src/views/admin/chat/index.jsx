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
import { debounce } from 'lodash';
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
import { RANDOM_PROMPTS } from 'config/data-configs';
import { useAppStore } from 'contexts/AppProvider';
import { useChatStore } from 'contexts/ChatProvider';
import {
  useChatHandler,
  useChatScroll,
  useMenu,
  useMode,
  useTipTapEditor,
} from 'hooks';
import 'styles/ChatStyles.css';
import { filterMessagesWithContent, organizeMessages } from 'utils/format';

export const MainChat = () => {
  const { theme } = useMode();
  const {
    state: { isSidebarOpen },
  } = useAppStore();
  const { params } = useParams(); // Extract the dynamic 'id' parameter from the URL
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile
  const [marginLeft, setMarginLeft] = useState(isMobile ? '0px' : '50px');
  useEffect(() => {
    setMarginLeft(isMobile ? '0px' : '50px');
  }, [isMobile, isSidebarOpen]);

  const {
    state: {
      userInput,
      isMessagesUpdated,
      isFirstMessageReceived,
      sessionId,
      workspaceId,
      chatMessages,
    },
    actions: {
      setIsMessagesUpdated,
      setIsFirstMessageReceived,
      setChatMessages,
    },
  } = useChatStore();

  const { insertContentAndSync } = useTipTapEditor(userInput); // Destructure the submitMessage function
  const {
    messages,
    chatError,
    chatLoading,
    chatStreaming,
    controllerRef,
    handleSendMessage,
    handleRegenerateResponse,
    handleStop,
    handleGetSessionMessages,
    handleGetSession,
    handleCreateNewSession,
  } = useChatHandler();
  // const actionData = useActionData();
  // const [open, setOpen] = useState(!actionData);
  const promptsMenu = useMenu();
  const dialogRef = useRef(null);
  const sidebarItemRef = useRef(null);
  const { messagesStartRef, messagesEndRef, chatContainerRef, handleScroll } =
    useChatScroll();
  const { scrollToBottom, setIsAtBottom } = useChatScroll();
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

    if ((!chatMessages || chatMessages.length === 0) && sessionId) {
      await handleGetSessionMessages();
    }
  }, [
    sessionId,
    chatMessages,
    handleCreateNewSession,
    handleGetSessionMessages,
  ]);

  useEffect(() => {
    initializeSession();
  }, []);

  /* --- fn() to handle the scroll to bottom --- */
  useEffect(() => {
    const fetchData = async () => {
      await handleGetSessionMessages();
      scrollToBottom();
      setIsAtBottom(true);
    };

    if (params?.workspaceId && !chatLoading && !chatStreaming) {
      fetchData();
    }
  }, [
    params?.workspaceId,
    handleGetSessionMessages,
    scrollToBottom,
    setIsAtBottom,
    chatLoading,
    chatStreaming,
  ]);

  /* --- fn() to handle the chat abort option --- */
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [controllerRef]);
  // const submitMessage = useCallback(
  //   async content => {
  //     if (content.trim()) {
  //       setChatMessages(prevMessages => [
  //         ...prevMessages,
  //         { role: 'user', content: content.trim() },
  //       ]);
  //       await handleSendMessage(content.trim());
  //     }
  //   },
  //   [setChatMessages, handleSendMessage]
  // );
  const handleUpdateMessages = useCallback(() => {
    const combinedMessages = [...chatMessages];
    const organizedMessages = organizeMessages(combinedMessages);
    let uniqueMessages = filterMessagesWithContent(organizedMessages);

    if (!chatLoading && !chatStreaming) {
      const secondLastIndex = uniqueMessages.length - 2;
      if (
        secondLastIndex >= 0 &&
        uniqueMessages[secondLastIndex].isStreaming === true &&
        uniqueMessages[secondLastIndex].role === 'assistant'
      ) {
        uniqueMessages.splice(secondLastIndex, 1);
      }

      setChatMessages(uniqueMessages);

      if (
        workspaceId &&
        sessionId &&
        uniqueMessages.length > 0 &&
        !isMessagesUpdated
      ) {
        setIsMessagesUpdated(true);
      }
    }
  }, [
    chatMessages,
    chatLoading,
    chatStreaming,
    workspaceId,
    sessionId,
    isMessagesUpdated,
    setChatMessages,
    setIsMessagesUpdated,
  ]);
  /* --- fn() to handle the chat messages --- */
  // useEffect(() => {
  //   if (!chatLoading && !chatStreaming) {
  //     handleUpdateMessages(); // Only update if not loading or streaming
  //   }
  // }, [chatMessages, chatLoading, chatStreaming, handleUpdateMessages]);

  // if (!open) {
  //   return <CircularProgress />;
  // }

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
              {chatMessages?.length > 0 ? (
                <MessageBox messages={chatMessages} />
              ) : (
                <Box sx={{ textAlign: 'center', margin: '20px' }}>
                  <h3>No messages yet, try one of these prompts:</h3>
                  {RANDOM_PROMPTS.map((prompt, index) => (
                    <Paper
                      key={index}
                      elevation={2}
                      sx={{
                        padding: '10px',
                        margin: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={e => {
                        e.preventDefault();
                        // e.stopPropagation();
                        // handleContentChange(prompt);
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
              disabled={chatLoading || chatStreaming || false}
              onSend={handleSendMessage}
              isFirstMessage={isFirstMessageReceived}
              inputContent={userInput}
              onStop={handleStop}
              onRegenerate={handleRegenerateResponse}
              onChange={insertContentAndSync}
              // disabled={chatLoading}
              // onSend={handleSendMessage}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MainChat;
