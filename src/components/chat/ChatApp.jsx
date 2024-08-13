/* eslint-disable no-constant-condition */
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { MessageBox } from 'components/chat/messages';
import { ChatWindow, StyledChatContainer } from 'components/chat/styled';
import { useMode, useChatLogic, useChatScroll, useChatHandler } from 'hooks';
import { ChatHeader } from './ChatHeader';
import 'styles/ChatStyles.css';

const MessageInput = React.lazy(() => import('./inputs/MessageInput'));

export const ChatApp = () => {
  const { theme } = useMode();
  // const functionCallHandler = async call => {
  //   if (call?.function?.name !== 'get_weather') return;
  //   const args = JSON.parse(call.function.arguments);
  //   const data = getWeather(args.location);
  //   setWeatherData(data);
  //   return JSON.stringify(data);
  // };
  const {
    messages,
    error,
    loading,
    setIsEditorActive,
    editorActiveRef,
    userInput,
    isFirstMessageReceived,
  } = useChatLogic();
  const {
    setError,
    handleSendMessage,
    handleRegenerateResponse,
    handleStop,
    handleContentChange,
  } = useChatHandler();
  const { messagesStartRef, messagesEndRef, chatContainerRef, handleScroll } =
    useChatScroll();
  return (
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
  );
};
