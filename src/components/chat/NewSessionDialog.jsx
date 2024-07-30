import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import React, { useState } from 'react';

export const NewSessionDialog = ({ open, onClose, onCreate }) => {
  const [sessionName, setSessionName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [topic, setTopic] = useState('');

  const handleCreate = () => {
    onCreate({ sessionName, instructions, topic });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Start New Session</DialogTitle>
      <DialogContent>
        <TextField
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          margin="dense"
          label="Session Name"
          fullWidth
          value={sessionName}
          onChange={e => setSessionName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Instructions"
          fullWidth
          multiline
          rows={3}
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Topic"
          fullWidth
          value={topic}
          onChange={e => setTopic(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewSessionDialog;
