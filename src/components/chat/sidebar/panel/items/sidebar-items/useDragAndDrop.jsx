// useDragAndDrop.js
import { useState } from 'react';

export const useDragAndDrop = onFileDrop => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = event => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = event => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const file = files[0];
    onFileDrop(file);
    setIsDragging(false);
  };

  return {
    isDragging,
    dragProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
  };
};
