import StopCircleIcon from '@mui/icons-material/StopCircle';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import { EditorContent } from '@tiptap/react';
import { useEffect, useState } from 'react';
import { SendIcon } from 'assets/humanIcons';
import { useChatStore } from 'contexts/ChatProvider';
import useDialog from 'hooks/useDialog';
import { InputActions } from './toolbar/InputActions';

export const MessageInput = ({
  theme,
  editor,
  handleSendMessage,
  disabled,
  setIsEditorActive,
  editorRef,
  setUserInput,
  setFileInput,
  isFirstMessage,
}) => {
  const apiKeyDialog = useDialog();
  const chatStore = useChatStore();

  const handleSendMessageWrapper = async () => {
    await handleSendMessage();
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
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            backgroundColor: '#333',
            borderRadius: 1,
            p: 2,
            color: 'white',
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          backgroundColor: '#26242C',
          borderTop: '1px solid #444',
          p: 1,
        }}
      >
        <InputActions
          editor={editor}
          theme={theme}
          setApiKey={chatStore.setApiKey}
          handleOpenApiModal={apiKeyDialog.handleOpen}
          setUserInput={setUserInput}
          setFileInput={setFileInput}
          isFirstMessage={isFirstMessage}
        />

        <IconButton
          onClick={() => {
            if (!chatStore.state.apiKey) {
              console.log('No API Key');
              apiKeyDialog.handleOpen();
            } else if (disabled) {
              console.log('Already Sending');
              // handleStop();
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
      </CardActions>
    </Card>
  );
};

export default MessageInput;
