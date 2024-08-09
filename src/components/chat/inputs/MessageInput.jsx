import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Box, Card, CardActions, CardContent, IconButton } from '@mui/material';
import { EditorContent } from '@tiptap/react';
import React, { useEffect } from 'react';
import { SendIcon } from 'assets/humanIcons';
import { useChatStore } from 'contexts/ChatProvider';
import { useDialog, useTipTapEditor } from 'hooks';
import { File } from '../files/File';
import { FileUploadButton } from '../files/FileUploadButton';
import {
  ChatMessageActionsContainer,
  ChatMessageEditorContentsContainer,
} from '../styled';
import { InputActions } from './toolbar/InputActions';

export const MessageInput = ({
  theme,
  handleSendMessage,
  disabled,
  setIsEditorActive,
  editorRef,
  setFileInput,
  isFirstMessage,
  setError,
  onContentChange,
  initialContent,
}) => {
  const apiKeyDialog = useDialog();
  const chatStore = useChatStore();
  const { editor } = useTipTapEditor();
  const {
    state: { files },
    actions: { setFiles },
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
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {files.map((file, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              // mb={2}
              color={'#BDBDBD'}
            >
              <File file={file} />
            </Box>
          ))}
        </Box>
        <ChatMessageActionsContainer>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InputActions
              editor={editor}
              theme={theme}
              setApiKey={chatStore.setApiKey}
              handleOpenApiModal={apiKeyDialog.handleOpen}
              setUserInput={onContentChange}
              setFileInput={setFileInput}
              isFirstMessage={isFirstMessage}
            />
          </Box>
          <IconButton
            onClick={() => {
              if (!localStorage.getItem('apiKey')) {
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
            <FileUploadButton setFiles={setFiles} files={files} />
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
