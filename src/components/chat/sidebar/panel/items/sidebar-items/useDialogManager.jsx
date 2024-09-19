import { useState, useCallback } from 'react';

export const useDialogManager = () => {
  const [newFileDialogOpen, setNewFileDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);

  const openNewFileDialog = useCallback(() => {
    setNewFileDialogOpen(true);
  }, []);

  const closeNewFileDialog = useCallback(() => {
    setNewFileDialogOpen(false);
  }, []);

  const openNewFolderDialog = useCallback(() => {
    setNewFolderDialogOpen(true);
  }, []);

  const closeNewFolderDialog = useCallback(() => {
    setNewFolderDialogOpen(false);
  }, []);

  return {
    newFileDialogOpen,
    newFolderDialogOpen,
    openNewFileDialog,
    closeNewFileDialog,
    openNewFolderDialog,
    closeNewFolderDialog,
  };
};
