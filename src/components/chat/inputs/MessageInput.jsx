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
import { SendIcon, StopCircleIcon } from 'assets/humanIcons';
import { useChatStore } from 'contexts';
import { useDialog, useTipTapEditor } from 'hooks';
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
  const { editor } = useTipTapEditor();
  const {
    state: { files, showFilesDisplay },
    actions: { setShowFilesDisplay },
  } = chatStore;

  const handleSendMessageWrapper = async () => {
    await handleSendMessage();
    editor.commands.clearContent(); // Clear the editor content
  };

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
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            p: 1,
          }}
        >
          <Button
            onClick={() => setShowFilesDisplay(!showFilesDisplay)}
            sx={{
              mr: 'auto',
            }}
          >
            {!showFilesDisplay || files.length === 0
              ? 'Show Files'
              : 'Hide Files'}
          </Button>
          <FileDisplay
            files={files}
            hidden={!showFilesDisplay || files.length === 0}
          />
        </Box>
        <ChatMessageActionsContainer>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InputActions
              editor={editor}
              handleOpenApiModal={apiKeyDialog.handleOpen}
              setUserInput={onContentChange}
              setFileInput={setFileInput}
              isFirstMessage={isFirstMessage}
            />
          </Box>
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
                style={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            ) : (
              <StopCircleIcon
                style={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            )}
          </IconButton>
        </ChatMessageActionsContainer>
      </CardActions>
      <CardContent sx={{ p: 2 }}>
        <ChatMessageActionsContainer>
          <Box
            sx={{
              pr: 2,
              alignItems: 'center',
            }}
          >
            <FileUploadButton />
          </Box>
          <ChatMessageEditorContentsContainer>
            <EditorContent editor={editor} />
          </ChatMessageEditorContentsContainer>
        </ChatMessageActionsContainer>
      </CardContent>
    </Card>
  );
};

export default MessageInput;
