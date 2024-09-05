import { ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import React, { useState, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  FaFolder,
  FaFile,
  FaPlus,
  FaSearch,
  FaHome,
  FaCog,
} from 'react-icons/fa';
import { TextFieldSection } from 'components/themed';

export const ReusableFolder = ({
  folders = [],
  files = {},
  onFolderSelect,
  onItemCreate,
  onItemDelete,
  onFolderUpdate,
  searchPlaceholder = 'Search',
  panelTitle = 'File Explorer',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState('file');
  const [search, setSearch] = useState('');

  const toggleFolder = folderId => {
    setIsExpanded(prev => !prev);
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
    onFolderSelect && onFolderSelect(folderId);
  };

  const onDragEnd = result => {
    if (!result.destination) return;
    // Implement drag and drop reordering logic based on folder and item updates
  };

  const handleNewItem = () => {
    if (!newItemName || !newItemType) {
      // Handle empty fields, maybe show a warning
      return;
    }

    onItemCreate && onItemCreate(newItemName, newItemType);
    setIsDialogOpen(false);
    setNewItemName('');
    setNewItemType('file');
  };

  const renderFiles = folderId => {
    const folder = folders.find(f => f._id === folderId);
    if (!folder) return null;

    return (
      <List component="div" disablePadding>
        {folder.items.map((itemId, index) => {
          const file = files[itemId];
          if (!file) return null; // Safeguard against undefined files

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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <FaHome />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {panelTitle}
          </Typography>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            InputProps={{
              startAdornment: <FaSearch />,
            }}
          />
          <IconButton color="inherit" onClick={() => setIsDialogOpen(true)}>
            <FaPlus />
          </IconButton>
          <IconButton color="inherit">
            <FaCog />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="folders">
          {provided => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {folders.map((folder, index) => (
                <React.Fragment key={folder._id}>
                  <Draggable draggableId={folder._id} index={index}>
                    {provided => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        button
                        onClick={() => toggleFolder(folder._id)}
                      >
                        <ListItemIcon>
                          <FaFolder />
                        </ListItemIcon>
                        <ListItemText primary={folder.name} />
                        {expandedFolders[folder._id] ? (
                          <ExpandLessRounded />
                        ) : (
                          <ExpandMoreRounded />
                        )}
                      </ListItem>
                    )}
                  </Draggable>
                  <Collapse
                    in={expandedFolders[folder._id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {renderFiles(folder._id)}
                  </Collapse>
                </React.Fragment>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextFieldSection
            label="Name"
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            variant="darkMode"
            fullWidth
          />
          <TextFieldSection
            label="Type"
            value={newItemType}
            onChange={e => setNewItemType(e.target.value)}
            variant="darkMode"
            fullWidth
          />
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
