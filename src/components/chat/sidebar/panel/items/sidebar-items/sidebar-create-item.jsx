import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useChatStore } from 'contexts/ChatProvider';

const SidebarCreateItem = ({
  isOpen,
  onOpenChange,
  contentType,
  renderInputs,
  createState,
  isTyping,
}) => {
  const {
    state: { selectedWorkspace },
    actions: {
      setChatSessions,
      setPrompts,
      setFiles,
      setAssistants,
      setAssistantImages,
      setTools,
    },
  } = useChatStore();

  const buttonRef = useRef(null);
  const [creating, setCreating] = useState(false);

  const createFunctions = {
    chats: newItem => {
      const chats = JSON.parse(localStorage.getItem('chats')) || [];
      chats.push(newItem);
      localStorage.setItem('chats', JSON.stringify(chats));
      return newItem;
    },
    prompts: newItem => {
      const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
      prompts.push(newItem);
      localStorage.setItem('prompts', JSON.stringify(prompts));
      return newItem;
    },
    files: newItem => {
      const files = JSON.parse(localStorage.getItem('files')) || [];
      files.push(newItem);
      localStorage.setItem('files', JSON.stringify(files));
      return newItem;
    },
    assistants: newItem => {
      const assistants = JSON.parse(localStorage.getItem('assistants')) || [];
      assistants.push(newItem);
      localStorage.setItem('assistants', JSON.stringify(assistants));
      return newItem;
    },
    tools: newItem => {
      const tools = JSON.parse(localStorage.getItem('tools')) || [];
      tools.push(newItem);
      localStorage.setItem('tools', JSON.stringify(tools));
      return newItem;
    },
  };

  const stateUpdateFunctions = {
    chats: setChatSessions,
    prompts: setPrompts,
    files: setFiles,
    assistants: setAssistants,
    tools: setTools,
  };

  const handleCreate = async () => {
    try {
      if (!selectedWorkspace) return;
      if (isTyping) return; // Prevent creation while typing

      const createFunction = createFunctions[contentType];
      const setStateFunction = stateUpdateFunctions[contentType];

      if (!createFunction || !setStateFunction) return;

      setCreating(true);

      const newItem = await createFunction(createState);

      setStateFunction(prevItems => [...prevItems, newItem]);

      onOpenChange(false);
      setCreating(false);
    } catch (error) {
      toast.error(`Error creating ${contentType.slice(0, -1)}. ${error}.`);
      setCreating(false);
    }
  };

  const handleKeyDown = e => {
    if (!isTyping && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => onOpenChange(false)} fullWidth>
      <DialogTitle>
        Create {contentType.charAt(0).toUpperCase() + contentType.slice(1, -1)}
      </DialogTitle>
      <DialogContent onKeyDown={handleKeyDown}>{renderInputs()}</DialogContent>
      <DialogActions>
        <Button
          disabled={creating}
          variant="outlined"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button disabled={creating} ref={buttonRef} onClick={handleCreate}>
          {creating ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SidebarCreateItem;
