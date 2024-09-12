import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

const SidebarDeleteItem = ({
  isOpen,
  onOpenChange,
  item,
  contentType,
  handleDelete,
}) => {
  const handleConfirmDelete = () => {
    handleDelete(item);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => onOpenChange(false)} fullWidth>
      <DialogTitle>Delete {contentType}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this {contentType}?
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onOpenChange(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SidebarDeleteItem;
