import { Box, Card, CardActions, CardContent, IconButton } from '@mui/material';
import { EditorContent } from '@tiptap/react';
import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SendIcon, StopCircleIcon } from 'assets/humanIcons';
import { DarkIconBox } from 'assets/humanIcons/utils';
import { useChatStore } from 'contexts';
import {
  useChatHistoryHandler,
  useDialog,
  useMode,
  useTipTapEditor,
} from 'hooks';
import { FileDisplay, FileUploadButton } from '../files';
import {
  ChatMessageActionsContainer,
  ChatMessageEditorContentsContainer,
} from '../styled';
import { ToolDial } from './ToolDial';

export const MessageInput = ({
  disabled, // loading state for the send button
  setIsEditorActive,
  editorRef,
  onSend,
  onChange,
}) => {
  const apiKeyDialog = useDialog();
  const chatStore = useChatStore();
  const { theme } = useMode();
  const {
    state: { showFilesDisplay, isFirstMessage, chatFiles },
    actions: { setShowFilesDisplay, setUserInput },
  } = chatStore;
  const {
    setNewMessageContentToNextUserMessage,
    setNewMessageContentToPreviousUserMessage,
  } = useChatHistoryHandler();
  const { editor } = useTipTapEditor(
    isFirstMessage ? 'begin session' : 'continue session'
  );
  const handleSendMessageWrapper = async () => {
    if (!JSON.parse(localStorage.getItem('baseChatStore')).apiKey) {
      apiKeyDialog.handleOpen();
      return;
    }

    if (disabled) {
      console.log('Already Sending');
      return;
    }

    console.log('Sending');
    editor.commands.clearContent(); // Clear the editor content
    await onSend();
  };

  return (
    <Card
      sx={{
        backgroundColor: '#26242C',
        borderRadius: 2,
        mt: 2,
        mb: 2,
      }}
    >
      <CardActions
        sx={{
          backgroundColor: '#26242C',
          borderTop: '1px solid #444',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
        }}
      >
        <Box
          sx={{
            display:
              !showFilesDisplay || chatFiles?.length === 0 ? 'none' : 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <FileDisplay files={chatFiles} hidden={!showFilesDisplay} />
        </Box>
        <ChatMessageActionsContainer>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ToolDial editor={editor} />
          </Box>
        </ChatMessageActionsContainer>
      </CardActions>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '8px',
          paddingBottom: '8px !important',
        }}
      >
        <ChatMessageActionsContainer>
          <ChatMessageEditorContentsContainer>
            <Box
              sx={{
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <IconButton
                onClick={() => setShowFilesDisplay(!showFilesDisplay)}
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  my: 'auto',
                  py: 'auto',
                }}
                aria-expanded={showFilesDisplay}
                aria-label={showFilesDisplay ? 'Hide files' : 'Show files'}
              >
                {showFilesDisplay && chatFiles.length > 0 ? (
                  <FaChevronLeft />
                ) : (
                  <FaChevronRight />
                )}
              </IconButton>
            </Box>
            <Box
              sx={{
                px: 2,
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <FileUploadButton files={chatFiles} />
            </Box>
            <Box
              sx={{
                px: 2,
                flexGrow: 1,
                display: 'flex',
                width: '100%',
                '& > div': {
                  flexGrow: 1,
                },
                '& > div:nth-of-type(1)': {
                  flexGrow: 1,
                },
              }}
            >
              {' '}
              <EditorContent editor={editor} />
            </Box>{' '}
            <Box
              sx={{
                px: 2,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <DarkIconBox
                icon={
                  <IconButton
                    onClick={() => {
                      if (!sessionStorage.getItem('apiKey')) {
                        console.log('No API Key');
                        apiKeyDialog.handleOpen();
                      } else if (disabled) {
                        console.log('Already Sending');
                      } else {
                        console.log('Sending');
                        handleSendMessageWrapper();
                      }
                    }}
                  >
                    {!disabled ? (
                      <SendIcon
                        style={{
                          color: theme.palette.primary.main,
                          fontSize: 20,
                        }}
                      />
                    ) : (
                      <StopCircleIcon
                        style={{
                          color: theme.palette.primary.main,
                          fontSize: 20,
                        }}
                      />
                    )}
                  </IconButton>
                }
              />
            </Box>
          </ChatMessageEditorContentsContainer>
        </ChatMessageActionsContainer>
      </CardContent>
    </Card>
  );
};

export default MessageInput;
