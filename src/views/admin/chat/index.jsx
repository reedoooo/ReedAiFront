/* eslint-disable no-constant-condition */
'use client';
// =========================================================
// [CHAT BOT] | ...
// =========================================================
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useActionData } from 'react-router-dom';
import { ChatHeader } from 'components/chat';
import { MessageBox } from 'components/chat/messages';
import { ChatWindow, StyledChatContainer } from 'components/chat/styled';
import { useChatStore } from 'contexts/ChatProvider';
import { useMode, useMenu, useChatScroll, useChatHandler } from 'hooks';
import { organizeMessages } from 'utils/format';
import 'styles/ChatStyles.css';
const MessageInput = React.lazy(() => import('components/chat'));

export const ChatApp = () => {
  const { theme } = useMode();
  // const functionCallHandler = async call => {
  //   if (call?.function?.name !== 'get_weather') return;
  //   const args = JSON.parse(call.function.arguments);
  //   const data = getWeather(args.location);
  //   setWeatherData(data);
  //   return JSON.stringify(data);
  // };
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
    actions: { setIsMessagesUpdated, setSessionHeader },
  } = useChatStore();
  const { scrollToBottom, setIsAtBottom } = useChatScroll();
  const [error, setError] = useState(chatError);
  const [loading, setLoading] = useState(chatLoading);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const controllerRef = useRef(null);
  const editorActiveRef = useRef(false);
  // --- functions for sending messages ---
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

  useEffect(() => {
    if (messages.length === 0) {
      handleContentChange(
        'Generate a data table component for organizing a list of data, UI library documents, which have been upserted into a vector database'
      );
    }
    if (messages.length > 0) {
      setIsFirstMessage(false);
      setSessionHeader(messages[0]?.content || '');
    }
    if (isFirstMessage) {
      setSessionHeader(userInput);
      setIsFirstMessage(false);
    }
  }, [messages, userInput, isFirstMessage]);

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

  if (!open) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <ChatWindow theme={theme} elevation={3}>
        <StyledChatContainer
          theme={theme}
          ref={chatContainerRef}
          component={Grid}
          item
          xs={12}
        >
          <ChatHeader />
          <Box
            onScroll={handleScroll}
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: theme.spacing(2),
              maxWidth: '100%',
            }}
          >
            <div ref={messagesStartRef} />
            <MessageBox messages={messages} />
            <div ref={messagesEndRef} />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            {loading && <CircularProgress />}
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
          />
        </StyledChatContainer>
      </ChatWindow>
    </Box>
  );
};

export default ChatApp;
