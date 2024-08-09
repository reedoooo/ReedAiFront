import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useMode } from 'hooks';
import { MessageInput } from '../chat/inputs';

export const NewSessionDialog = props => {
  const { theme } = useMode();
  const [sessionName, setSessionName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [topic, setTopic] = useState('');
  const {
    open,
    onClose,
    onCreate,
    editor,
    apiKey,
    loading,
    handleRegenerateResponse,
    handleStop,
    handleSendMessage,
    setIsEditorActive,
    editorActiveRef,
    setUserInput,
    setFileInput,
    isFirstMessage,
    setError,
  } = props;
  const handleCreate = () => {
    onCreate({ sessionName, instructions, topic });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        bg: '#1C1C1C',
      }}
    >
      <DialogTitle
        sx={{
          background: '#2C2A32',
          color: '#fff',
        }}
      >
        Start New Session
      </DialogTitle>
      <DialogContent
        sx={{
          background: '#1C1C1C',
        }}
      >
        <MessageInput
          theme={theme}
          editor={editor}
          apiKey={apiKey}
          disabled={loading}
          handleRegenerateResponse={handleRegenerateResponse}
          handleStop={handleStop}
          handleSendMessage={handleSendMessage}
          setIsEditorActive={setIsEditorActive}
          editorRef={editorActiveRef}
          setUserInput={setUserInput}
          setFileInput={setFileInput}
          isFirstMessage={isFirstMessage}
          setError={setError}
        />
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default NewSessionDialog;
