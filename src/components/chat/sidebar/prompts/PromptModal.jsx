import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  Button,
  TextareaAutosize,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const PromptModal = ({ prompt, onClose, onUpdatePrompt }) => {
  const [name, setName] = useState(prompt.name);
  const [description, setDescription] = useState(prompt.description);
  const [content, setContent] = useState(prompt.content);
  const nameInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        onUpdatePrompt({
          ...prompt,
          name,
          description,
          content: content.trim(),
        });
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [name, description, content, onUpdatePrompt, onClose, prompt]);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <TextField
          margin="dense"
          label={'Name'}
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
          ref={nameInputRef}
        />
        <TextField
          margin="dense"
          label={'Description'}
          type="text"
          fullWidth
          variant="outlined"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={2}
        />
        <TextareaAutosize
          minRows={3}
          style={{ width: '100%' }}
          placeholder={'Enter content here...'}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            onUpdatePrompt({
              ...prompt,
              name,
              description,
              content: content.trim(),
            });
            onClose();
          }}
        >
          {'Save'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PromptModal;
