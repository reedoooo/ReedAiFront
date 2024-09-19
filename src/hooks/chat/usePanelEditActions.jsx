import { useState } from 'react';

export const usePanelEditActions = () => {
  const [editingFile, setEditingFile] = useState(null);

  const openFileInEditor = file => {
    setEditingFile(file);
  };

  const closeEditor = () => {
    setEditingFile(null);
  };

  return { editingFile, openFileInEditor, closeEditor };
};
