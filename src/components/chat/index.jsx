/* eslint-disable no-constant-condition */
import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { MessageBox } from 'components/chat/messages';
import {
  ChatWindow,
  MessageContainer,
  StyledChatContainer,
} from 'components/chat/styled';
import { useMode, useChatLogic } from 'hooks';
import { ChatHeader } from './ChatHeader';
import 'styles/ChatStyles.css';

const MessageInput = React.lazy(() => import('./inputs/MessageInput'));

export const ChatApp = () => {
  const { theme } = useMode();
  const {
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
    newSessionDialog,
    apiKey,
    userInput,
    isFirstMessageReceived,
    setError,
    handleNewSession,
  } = useChatLogic();

  return (
    <ChatWindow theme={theme} elevation={3}>
      <StyledChatContainer
        theme={theme}
        ref={chatContainerRef}
        component={Grid}
        item
        xs={12}
      >
        <ChatHeader
          name={sessionHeader || 'Chat Session'}
          handleOpen={newSessionDialog.handleOpen}
        />
        <MessageContainer>
          <div ref={messagesStartRef} />
          <MessageBox messages={messages} />
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
