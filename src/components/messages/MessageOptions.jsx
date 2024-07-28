import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import StarIcon from '@mui/icons-material/Star';
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';

const MessageOptions = ({ message, onRegenerate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSaveClick = () => {
    setDialogOpen(true);
  };

  const handleRegenerateClick = () => {
    onRegenerate(message);
  };

  const handleRatingClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleRatingClose = () => {
    setAnchorEl(null);
  };

  const handleRatingSelect = rating => {
    console.log(`Rated ${rating} stars`);
    handleRatingClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
      <IconButton onClick={handleSaveClick} color="primary">
        <SaveIcon />
      </IconButton>
      <IconButton onClick={handleRegenerateClick} color="primary">
        <RefreshIcon />
      </IconButton>
      <IconButton onClick={handleRatingClick} color="primary">
        <StarIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleRatingClose}
      >
        {[5, 4, 3, 2, 1].map(rating => (
          <MenuItem key={rating} onClick={() => handleRatingSelect(rating)}>
            {Array.from({ length: rating }).map((_, index) => (
              <StarIcon key={index} />
            ))}
          </MenuItem>
        ))}
      </Menu>
      <SaveMessageDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        message={message}
      />
    </Box>
  );
};

const SaveMessageDialog = ({ open, onClose, message }) => {
  const [fileName, setFileName] = useState('');

  const handleSave = () => {
    const blob = new Blob([message.content], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, `${fileName || 'assistant_message'}.txt`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Message</DialogTitle>
      <DialogContent>
        <TextField
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          margin="dense"
          label="File Name"
          fullWidth
          variant="outlined"
          value={fileName}
          onChange={e => setFileName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageOptions;
