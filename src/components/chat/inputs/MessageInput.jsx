import StopCircleIcon from '@mui/icons-material/StopCircle';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import { EditorContent } from '@tiptap/react';
import React, { useEffect } from 'react';
import { SendIcon } from 'assets/humanIcons';
import { useChatStore } from 'contexts/ChatProvider';
import { useDialog, useTipTapEditor } from 'hooks';
import { File } from '../files/File';
import { FileUploadButton } from '../files/FileUploadButton';
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

  // Effect for triggering file upload on file input change
  // useEffect(() => {
  //   if (selectedFiles.length) {
  //     handleFileRequestTrigger();
  //   }
  // }, [selectedFiles, handleFileRequestTrigger]);

  return (
    <Card sx={{ backgroundColor: '#26242C', borderRadius: 2, mt: 2, mb: 2 }}>
      <CardActions
        sx={{
          // justifyContent: 'space-between',
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center', // Align items vertically
            width: '100%', // Make sure it takes the full width
          }}
        >
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
            {/* <FileUploadButton setFiles={setFiles} files={files} /> */}
          </Box>
          <IconButton
            onClick={() => {
              if (!localStorage.getItem('apiKey')) {
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
        </Box>
        {/* <IconButton
          onClick={() => {
            if (!localStorage.getItem('apiKey')) {
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
        </IconButton> */}
      </CardActions>
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center', // Align items vertically
            width: '100%', // Make sure it takes the full width
          }}
        >
          <Box
            sx={{
              pr: 2,
              alignItems: 'center',
            }}
          >
            <FileUploadButton setFiles={setFiles} files={files} />
          </Box>
          <Box
            sx={{
              backgroundColor: '#333',
              borderRadius: 1,
              p: 2,
              color: 'white',
              width: '100%',
              // display: 'flex',
              // flexDirection: 'row',
              // justifyContent: 'space-between', // Align items to the space-between
            }}
          >
            <EditorContent editor={editor} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MessageInput;
