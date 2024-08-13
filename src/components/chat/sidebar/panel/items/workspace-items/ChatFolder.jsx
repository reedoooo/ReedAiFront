/* eslint-disable jsx-a11y/no-autofocus */
import { ChevronRightRounded, ExpandMoreRounded } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  TextField,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useContext, useRef, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { EditIcon } from 'assets/humanIcons';
import { TrashCanIcon } from 'assets/humanIcons/custom';
import { useChatStore } from 'contexts/ChatProvider';

export const UpdateFolder = ({ folder }) => {
  const {
    actions: { setFolders, updateFolder },
  } = useChatStore();
  const buttonRef = useRef(null);
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [name, setName] = useState(folder.name);

  const handleUpdateFolder = async () => {
    const updatedFolder = await updateFolder(folder.id, { name });
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
        <EditIcon />
      </IconButton>
      <Dialog
        open={showFolderDialog}
        onClose={() => setShowFolderDialog(false)}
      >
        <DialogTitle>Edit Folder</DialogTitle>
        <DialogContent onKeyDown={handleKeyDown}>
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFolderDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button ref={buttonRef} onClick={handleUpdateFolder} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const DeleteFolder = ({ folder, contentType }) => {
  const {
    actions: { setFolders, deleteFolder },
  } = useChatStore();

  const buttonRef = useRef(null);
  const [showFolderDialog, setShowFolderDialog] = useState(false);

  const handleDeleteFolderOnly = async () => {
    await deleteFolder(folder.id);
    setFolders(prevState => prevState.filter(c => c.id !== folder.id));
    setShowFolderDialog(false);
  };

  const handleDeleteFolderAndItems = async () => {
    handleDeleteFolderOnly();
  };

  return (
    <div>
      <IconButton onClick={() => setShowFolderDialog(true)}>
        <TrashCanIcon />
      </IconButton>
      <Dialog
        open={showFolderDialog}
        onClose={() => setShowFolderDialog(false)}
      >
        <DialogTitle>Delete {folder.name}</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this folder?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFolderDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            ref={buttonRef}
            onClick={handleDeleteFolderAndItems}
            color="error"
          >
            Delete Folder & Included Items
          </Button>
          <Button
            ref={buttonRef}
            onClick={handleDeleteFolderOnly}
            color="error"
          >
            Delete Folder Only
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// const folderdata = {
//   id: 'folder-1',
//   name: 'Folder 1',
//   items: [
//     { id: 'file-1', name: 'File 1', type: 'file' },
//     { id: 'file-2', name: 'File 2', type: 'file' },
//   ],
//   type: 'folder',
// };
// const sessiondata = {
//   id: 'folder-1',
//   name: 'Folder 1',
//   items: [
//     { id: 'file-1', name: 'File 1', type: 'file' },
//     { id: 'file-2', name: 'File 2', type: 'file' },
//   ],
//   type: 'folder',
// };
// const filedata = {
//   id: 'folder-1',
//   name: 'Folder 1',
//   items: [
//     { id: 'file-1', name: 'File 1', type: 'file' },
//     { id: 'file-2', name: 'File 2', type: 'file' },
//   ],
//   type: 'folder',
// };
// const tooldata = {
//   id: 'folder-1',
//   name: 'Folder 1',
//   items: [
//     { id: 'file-1', name: 'File 1', type: 'file' },
//     { id: 'file-2', name: 'File 2', type: 'file' },
//   ],
//   type: 'folder',
// };

export const getBlankSessionData = () => {
  return {
    stats: {
      tokenUsage: 0,
      messageCount: 0,
    },
    _id: null,
    name: '',
    topic: '',
    userId: null,
    workspaceId: null,
    assistantId: null,
    model: 'gpt-4-turbo-preview',
    prompt: '',
    active: false,
    activeSessionId: null,
    settings: {
      maxTokens: 500,
      temperature: 0.7,
      model: 'gpt-4-turbo-preview',
      topP: 1,
      n: 1,
      debug: false,
      summarizeMode: false,
    },
    messages: [],
    tuning: {
      debug: false,
      summary: '',
      summarizeMode: false,
    },
    createdAt: null,
    updatedAt: null,
    __v: 0,
    files: [],
    tools: [],
  };
};
export const ChatFolders = props => {
  const {
    state: { folders, files },
    actions: {
      setFolders,
      setChats,
      setPresets,
      setPrompts,
      setFiles,
      setCollections,
      setAssistants,
      setTools,
      setModels,
    },
  } = useChatStore();
  const itemRef = useRef(null);

  const [isDragOver, setIsDragOver] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleDragEnter = e => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragOver(false);
    const itemId = e.dataTransfer.getData('text/plain');
    // onUpdateFolder(itemId, folder.id);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      itemRef.current.click();
    }
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  // const [folders, setFolders] = useState([folderdata]);

  const onDragEnd = result => {
    if (!result.destination) return;

    const newFolders = Array.from(folders);
    const [reorderedItem] = newFolders.splice(result.source.index, 1);
    newFolders.splice(result.destination.index, 0, reorderedItem);

    setFolders(newFolders);
  };

  const addFolder = () => {
    const newFolder = {
      id: `folder-${folders.length + 1}`,
      name: `New Folder ${folders.length + 1}`,
      items: [],
      type: 'folder',
    };
    setFolders([...folders, newFolder]);
  };

  const updateFolderName = (id, newName) => {
    const updatedFolders = folders.map(folder =>
      folder.id === id ? { ...folder, name: newName } : folder
    );
    setFolders(updatedFolders);
  };

  const renderFolder = (folder, index) => (
    <Box
      ref={itemRef}
      id="folder"
      sx={{
        borderRadius: 1,
        outline: 'none',
        backgroundColor: isDragOver ? 'primary.light' : 'transparent',
        '&:focus': { outline: 'none' },
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box
        tabIndex={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'primary.light', opacity: 0.5 },
          '&:focus': { backgroundColor: 'primary.light' },
        }}
        onClick={handleClick}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small">
            {isExpanded ? (
              <ExpandMoreRounded
                sx={{
                  color: '#fff',
                }}
              />
            ) : (
              <ChevronRightRounded
                sx={{
                  color: '#fff',
                }}
              />
            )}
          </IconButton>
          <Typography variant="body1">{folder.name}</Typography>
        </Box>
        {isHovering && (
          <Box
            sx={{ display: 'flex', ml: 2 }}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <UpdateFolder folder={folder} />
            <DeleteFolder folder={folder} contentType={props.contentType} />
          </Box>
        )}
      </Box>
      {isExpanded && (
        <Box sx={{ ml: 5, mt: 2, borderLeft: 2, pl: 4 }}>{props.children}</Box>
      )}
    </Box>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="folders" type="FOLDER">
        {provided => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {folders.map((folder, index) => renderFolder(folder, index))}
            {provided.placeholder}
            <ListItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <Box flexGrow={1} />
              <IconButton onClick={addFolder}>
                <AddIcon />
              </IconButton>
            </ListItem>
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChatFolders;
