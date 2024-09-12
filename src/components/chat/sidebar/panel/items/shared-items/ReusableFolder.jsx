import { ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FaFolder, FaFile } from 'react-icons/fa';

export const ReusableFolder = ({
  folder = {},
  files = {},
  onFolderSelect,
  onItemCreate,
  searchPlaceholder = 'Search',
  panelTitle = 'File Explorer',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState('file');
  const [selectedFolder, setSelectedFolder] = useState(null);

  const toggleFolder = () => {
    setIsExpanded(prev => !prev);
    if (onFolderSelect) {
      onFolderSelect(folder._id);
    }
  };

  const onDragEnd = result => {
    if (!result.destination) return;
    // Implement drag and drop reordering logic based on folder and item updates
  };

  const handleNewItem = () => {
    if (!selectedFolder) {
      alert('Please select a folder first');
      setIsDialogOpen(false);
      return;
    }

    if (!newItemName) {
      alert('Please enter a name for the new item');
      return;
    }

    if (newItemType === 'file') {
      const newFileId = Date.now().toString();
      const newFile = {
        _id: newFileId,
        userId: 'newUserId',
        workspaceId: 'newWorkspaceId',
        sessionId: 'newSessionId',
        folderId: selectedFolder,
        name: newItemName,
        size: 0,
        type: 'unknown',
        filePath: `/files/${newFileId}`,
        mimeType: 'application/octet-stream',
        tokens: 0,
      };

      setFiles(prevFiles => ({ ...prevFiles, [newFileId]: newFile }));
      setFolders(prevFolders =>
        prevFolders.map(folder =>
          folder._id === selectedFolder
            ? { ...folder, items: [...folder.items, newFileId] }
            : folder
        )
      );
    } else {
      const newFolderId = Date.now().toString();
      const newFolder = {
        _id: newFolderId,
        userId: 'newUserId',
        workspaceId: 'newWorkspaceId',
        name: newItemName,
        items: [],
        subfolders: [],
        createdAt: new Date().toISOString(),
      };

      setFolders(prevFolders => [...prevFolders, newFolder]);
    }

    setIsDialogOpen(false);
    setNewItemName('');
  };

  const renderFiles = () => {
    if (!folder || !folder.items) return null;

    return (
      <List component="div" disablePadding>
        {folder.items.map((itemId, index) => {
          const file = files[itemId];
          if (!file) return null;

          return (
            <Draggable key={itemId} draggableId={itemId} index={index}>
              {provided => (
                <ListItem
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  button
                >
                  <ListItemIcon>
                    <FaFile />
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
                </ListItem>
              )}
            </Draggable>
          );
        })}
      </List>
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="folder">
          {provided => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              <ListItem button onClick={toggleFolder}>
                <ListItemIcon>
                  <FaFolder />
                </ListItemIcon>
                <ListItemText primary={folder.name} />
                {isExpanded ? <ExpandLessRounded /> : <ExpandMoreRounded />}
              </ListItem>
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                {renderFiles()}
              </Collapse>
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Type"
            select
            value={newItemType}
            onChange={e => setNewItemType(e.target.value)}
            fullWidth
            margin="dense"
            SelectProps={{
              native: true,
            }}
          >
            <option value="file">File</option>
            <option value="folder">Folder</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNewItem} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReusableFolder;
