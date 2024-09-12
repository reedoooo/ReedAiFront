import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useRef, useState } from 'react';
import { chatApi } from 'api/Ai/chat-sessions';
import { useChatStore } from 'contexts/ChatProvider';

export const UpdateChat = ({ chat }) => {
  const chatStore = useChatStore();
  const { setChatSessions } = chatStore.actions;
  const buttonRef = useRef(null);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [name, setName] = useState(chat.name);

  const handleUpdateChat = async () => {
    const updatedChat = await chatApi.update(chat.id, { name });
    setChatSessions(prevState =>
      prevState.map(c => (c.id === chat.id ? updatedChat : c))
    );
    setShowChatDialog(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      buttonRef.current?.click();
    }
  };

  return (
    <Dialog open={showChatDialog} onClose={() => setShowChatDialog(false)}>
      <DialogTitle>Edit Chat</DialogTitle>
      <DialogContent onKeyDown={handleKeyDown}>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowChatDialog(false)}>Cancel</Button>
        <Button ref={buttonRef} onClick={handleUpdateChat}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateChat;
