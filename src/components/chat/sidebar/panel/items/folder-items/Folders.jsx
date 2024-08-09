import {
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CardHeader,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useRef, useState, useContext } from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { EditIcon } from 'assets/humanIcons';
import { RCInput } from 'components/themed';
import constants from 'config/constants';
import { useChatStore } from 'contexts/ChatProvider';

const { API_URL } = constants;

const getHeaders = API_KEY => ({
  'Content-Type': 'application/json',
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
});

export const getFoldersByWorkspaceId = async (workspaceId, API_KEY) => {
  const response = await fetch(
    `${API_URL}/rest/v1/folders?workspace_id=eq.${workspaceId}`,
    {
      method: 'GET',
      headers: getHeaders(API_KEY),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error fetching folders');
  }

  return data;
};

export const createFolder = async (folder, API_KEY) => {
  const response = await fetch(`${API_URL}/rest/v1/folders`, {
    method: 'POST',
    headers: getHeaders(API_KEY),
    body: JSON.stringify(folder),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error creating folder');
  }

  return data;
};

export const updateFolder = async (folderId, folder, API_KEY) => {
  const response = await fetch(`${API_URL}/rest/v1/folders?id=eq.${folderId}`, {
    method: 'PATCH',
    headers: getHeaders(API_KEY),
    body: JSON.stringify(folder),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error updating folder');
  }

  return data;
};

export const deleteFolder = async (folderId, API_KEY) => {
  const response = await fetch(`${API_URL}/rest/v1/folders?id=eq.${folderId}`, {
    method: 'DELETE',
    headers: getHeaders(API_KEY),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error deleting folder');
  }

  return true;
};

const StyledTextField = styled(TextField)({
  margin: '10px 0',
  '& label': {
    color: '#fff',
    '&.Mui-focused': { color: 'grey' },
  },
  '& .MuiInput-underline:after': { borderBottomColor: 'grey' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'grey' },
    '&:hover fieldset': { borderColor: 'grey' },
    '&.Mui-focused fieldset': { borderColor: 'grey' },
  },
  '& .MuiInputBase-input': { color: '#fff', background: '#000' },
});
const StyledButton = styled(Button)({
  color: '#fff',
  borderColor: '#fff',
  margin: '10px 0',
});
const StyledTabs = styled(Tabs)({
  background: '#808080',
  borderRadius: '5px',
  '& .Mui-selected': {
    backgroundColor: '#000',
    color: '#fff',
    // padding: '10px',
    margin: '5px',
  },
});
const StyledBox = styled(Box)({
  '&:hover': {
    backgroundColor: 'accent.main',
    opacity: 0.5,
  },
  display: 'flex',
  width: '100%',
  cursor: 'pointer',
  alignItems: 'center',
  borderRadius: '4px',
  padding: '8px',
  outline: 'none',
  background: '#1c1c1c',
  color: 'white',
});

const Folders = ({ folder, contentType, children, onUpdateFolder }) => {
  const itemRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState(0);
  const {
    setFolders,
    setChats,
    setPresets,
    setPrompts,
    setFiles,
    setCollections,
    setAssistants,
    setTools,
    setModels,
  } = useChatStore();
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [name, setName] = useState(folder.name);
  const buttonRef = useRef(null);
  const API_KEY = localStorage.getItem('apiKey');

  const stateUpdateFunctions = {
    chats: setChats,
    presets: setPresets,
    prompts: setPrompts,
    files: setFiles,
    collections: setCollections,
    assistants: setAssistants,
    tools: setTools,
    models: setModels,
  };

  const handleUpdateFolder = async () => {
    const updatedFolder = await updateFolder(folder.id, { name }, API_KEY);
    setFolders(prevState =>
      prevState.map(c => (c.id === folder.id ? updatedFolder : c))
    );
    setShowFolderDialog(false);
  };

  const handleDeleteFolderOnly = async () => {
    await deleteFolder(folder.id, API_KEY);
    setFolders(prevState => prevState.filter(c => c.id !== folder.id));
    setShowFolderDialog(false);
    const setStateFunction = stateUpdateFunctions[contentType];
    if (!setStateFunction) return;
    setStateFunction(prevItems =>
      prevItems.map(item => {
        if (item.folder_id === folder.id) {
          return { ...item, folder_id: null };
        }
        return item;
      })
    );
  };

  const handleDeleteFolderAndItems = async () => {
    const setStateFunction = stateUpdateFunctions[contentType];
    setStateFunction(prevItems =>
      prevItems.filter(item => item.folder_id !== folder.id)
    );
    handleDeleteFolderOnly();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      itemRef.current?.click();
    }
  };

  return (
    <Box
      ref={itemRef}
      sx={{
        '&:hover': {
          backgroundColor: 'accent.main',
          opacity: 0.5,
        },
        display: 'flex',
        width: '100%',
        cursor: 'pointer',
        alignItems: 'center',
        borderRadius: '4px',
        padding: '8px',
        outline: 'none',
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          color: 'white',
          borderRadius: '14px',
          background: '#1c1c1c', // Slightly different background for the panel to distinguish it
        }}
      >
        <StyledTabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          indicatorColor="#fff"
        >
          <Tab
            label="Folder Info"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab
            label="Edit Folder"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab
            label="Delete Folder"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
        </StyledTabs>
      </Box>
      {tab === 0 && (
        <StyledBox>
          <Typography
            sx={{
              flex: 1,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {folder.name}
          </Typography>
          {children}
        </StyledBox>
      )}
      {tab === 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Name</Typography>
            <TextField
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => setShowFolderDialog(false)}
            >
              Cancel
            </Button>
            <Button
              ref={buttonRef}
              variant="outlined"
              onClick={handleUpdateFolder}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      )}
      {tab === 2 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <DialogContent>
            <CardHeader>
              <DialogTitle>Delete {folder.name}</DialogTitle>
              <Typography>
                Are you sure you want to delete this folder?
              </Typography>
            </CardHeader>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setShowFolderDialog(false)}
              >
                Cancel
              </Button>
              <Button
                ref={buttonRef}
                variant="outlined"
                onClick={handleDeleteFolderAndItems}
              >
                Delete Folder & Included Items
              </Button>
              <Button
                ref={buttonRef}
                variant="outlined"
                onClick={handleDeleteFolderOnly}
              >
                Delete Folder Only
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      )}
    </Box>
  );
};

export default Folders;
