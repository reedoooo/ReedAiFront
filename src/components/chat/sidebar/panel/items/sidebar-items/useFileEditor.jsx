import { useState } from 'react';

export const useFileEditor = () => {
  // File editor state
  const [editingFile, setEditingFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [fileInfo, setFileInfo] = useState({});
  // Hover, focus, and selection state
  const [hoveredItem, setHoveredItem] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  // Drag-and-drop state
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const editFile = file => {
    setEditingFile(file);
    setFileName(file.name);
    setFileContent(file.content);
    setFileInfo({
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    });
  };

  const selectFile = (file, filepath) => {
    console.log('selected file:', file);
    console.log('selected filepath:', filepath);
    setSelectedItem(filepath); // Update the selected file
    editFile(file); // Automatically load the file into the editor when selected
  };

  const hoverFile = file => {
    console.log('hovered file:', file);
    setHoveredItem(file); // Update the hovered file
  };

  const focusFile = file => {
    console.log('focused file:', file);
    setFocusedItem(file); // Update the focused file
  };

  // Handle the start of dragging
  const startDragging = item => {
    console.log('dragging started:', item);
    setIsDragging(true);
    setDraggedItem(item);
  };

  // Handle the end of dragging
  const endDragging = () => {
    console.log('dragging ended');
    setIsDragging(false);
    setDraggedItem(null);
  };

  // Handle the dropping of the item
  const dropItem = targetItem => {
    console.log('dropped item:', draggedItem, 'onto:', targetItem);
    setIsDragging(false);
    setDraggedItem(null);
    // Handle the logic for moving or performing an action with the dropped item
  };

  return {
    fileName,
    fileContent,
    fileInfo,
    editingFile,
    fileDescription,
    hoveredItem,
    focusedItem,
    selectedItem,
    isDragging,
    draggedItem,
    // Methods to update state
    setHoveredItem,
    setFocusedItem,
    setSelectedItem,
    setFileDescription,
    setEditingFile,
    setFileName,
    setFileContent,
    setFileInfo,
    // ---- methods to interact with the file editor ----
    onSelectFile: selectFile, // Expose the method to select a file
    onEditFile: editFile, // Expose the method to handle file editing
    onHoverFile: hoverFile, // Expose the method to handle file hovering
    onFocusFile: focusFile, // Expose the method to handle file focusing
    // ---- drag-and-drop methods ----
    onStartDragging: startDragging,
    onEndDragging: endDragging,
    onDropItem: dropItem,
  };
};

export default useFileEditor;
