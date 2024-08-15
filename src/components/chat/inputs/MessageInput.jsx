import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
} from '@mui/material';
import { EditorContent } from '@tiptap/react';
import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SendIcon, StopCircleIcon } from 'assets/humanIcons';
import { DarkIconBox } from 'assets/humanIcons/utils';
import { useChatStore } from 'contexts';
import { useChatHistoryHandler, useDialog, useTipTapEditor } from 'hooks';
import { File, FileDisplay, FileUploadButton } from '../files';
import {
  ChatMessageActionsContainer,
  ChatMessageEditorContentsContainer,
} from '../styled';
import { InputActions } from './toolbar';

export const MessageInput = ({
  theme,
  handleSendMessage,
  disabled,
  setIsEditorActive,
  editorRef,
  setFileInput,
  isFirstMessage,
  onContentChange,
}) => {
  const apiKeyDialog = useDialog();
  const chatStore = useChatStore();
  const {
    state: { files, showFilesDisplay, userInput },
    actions: { setShowFilesDisplay },
  } = chatStore;
  const {
    setNewMessageContentToNextUserMessage,
    setNewMessageContentToPreviousUserMessage,
  } = useChatHistoryHandler();
  const handleSendMessageWrapper = async () => {
    await handleSendMessage();
    editor.commands.clearContent(); // Clear the editor content
  };
  const { editor } = useTipTapEditor(userInput);

  useEffect(() => {
    if (editor) {
      editor.on('focus', () => {
        setIsEditorActive(true);
        editorRef.current = true;
      });
      editor.on('blur', () => {
        setIsEditorActive(false);
        editorRef.current = false;
      });
    }

    return () => {
      if (editor) {
        editor.off('focus', () => {
          setIsEditorActive(true);
          editorRef.current = true;
        });
        editor.off('blur', () => {
          setIsEditorActive(false);
          editorRef.current = false;
        });
      }
    };
  }, [editor, setIsEditorActive, editorRef]);

  return (
    <Card sx={{ backgroundColor: '#26242C', borderRadius: 2, mt: 2, mb: 2 }}>
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
            display: !showFilesDisplay || files.length === 0 ? 'none' : 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <FileDisplay
            files={files}
            hidden={!showFilesDisplay || files.length === 0}
          />
        </Box>
        <ChatMessageActionsContainer>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
              {showFilesDisplay && files.length > 0 ? (
                <FaChevronLeft />
              ) : (
                <FaChevronRight />
              )}
            </IconButton>
            <InputActions
              editor={editor}
              handleOpenApiModal={apiKeyDialog.handleOpen}
              setUserInput={onContentChange}
              setFileInput={setFileInput}
              isFirstMessage={isFirstMessage}
            />
          </Box>
        </ChatMessageActionsContainer>
      </CardActions>
      <CardContent>
        <ChatMessageActionsContainer>
          <ChatMessageEditorContentsContainer>
            <Box
              sx={{
                px: 2,
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <FileUploadButton />
            </Box>
            <Box
              sx={{
                px: 2,
                alignItems: 'center',
                flexGrow: 1,
                justifyContent: 'flex-start',
                width: '100%',
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
                      if (
                        !JSON.parse(localStorage.getItem('baseChatStore'))
                          .apiKey
                      ) {
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
