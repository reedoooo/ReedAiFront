import { Edit as IconEdit } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useChatStore } from 'contexts/ChatProvider';
import React, { useRef, useState } from 'react';
import { updateFolder } from '../folder-items/Folders';

const UpdateFolder = ({ folder }) => {
  const {
    actions: { setFolders },
  } = useChatStore();

  const buttonRef = useRef(null);

  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [name, setName] = useState(folder.name);

  const handleUpdateFolder = async () => {
    const updatedFolder = await updateFolder(folder.id, {
      name,
    });
    setFolders(prevState =>
      prevState.map(c => (c.id === folder.id ? updatedFolder : c))
    );

    setShowFolderDialog(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      buttonRef.current?.click();
    }
  };

  return (
    <>
      <IconButton onClick={() => setShowFolderDialog(true)}>
        <IconEdit fontSize="small" />
      </IconButton>

      <Dialog
        open={showFolderDialog}
        onClose={() => setShowFolderDialog(false)}
        onKeyDown={handleKeyDown}
      >
        <DialogTitle>Edit Folder</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFolderDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateFolder} ref={buttonRef}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateFolder;
