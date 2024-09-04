import { Menu, MenuItem } from '@mui/material';
import React from 'react';

export const ConversationMenu = ({
  anchorEl,
  handleMenuClose,
  handleExportJSON,
  handleDeleteConversation,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>View Info</MenuItem>
      <MenuItem onClick={handleExportJSON}>Export as JSON</MenuItem>
      <MenuItem onClick={handleDeleteConversation}>Delete</MenuItem>
    </Menu>
  );
};

export default ConversationMenu;
