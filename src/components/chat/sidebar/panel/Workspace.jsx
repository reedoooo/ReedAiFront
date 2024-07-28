import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Tabs,
  Tab,
  TextField,
  Button,
  TextareaAutosize,
  Box,
  Tooltip,
  IconButton,
  Typography,
  Divider,
  Snackbar,
  Alert,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { EditIcon, UploadFileIcon } from 'assets/humanIcons';
import useMode from 'hooks/useMode';
import ChatFolders from './ChatFolder';

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
const StyledTabs = styled(motion(Tabs))({
  background: '#808080',
  borderRadius: '5px',
  '& .Mui-selected': {
    backgroundColor: '#000',
    color: '#fff',
    // padding: '10px',
    margin: '5px',
  },
});

export const Workspace = () => {
  const [tab, setTab] = useState(0);
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedTab, setSelectedTab] = useState('main');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const itemRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const handleSave = () => {
    console.log('Workspace updated!');
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      itemRef.current?.click();
    }
  };
  return (
    <>
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
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <EditIcon sx={{ fontSize: 30 }} />{' '}
        <Typography
          sx={{
            marginLeft: '12px',
            flex: 1,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Workspaces
        </Typography>
      </Box>
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
          <Tab label="Main" style={{ color: '#fff', borderRadius: '5px' }} />
          <Tab
            label="Defaults"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab label="Folders" style={{ color: '#fff', borderRadius: '5px' }} />
        </StyledTabs>
      </Box>
      {tab === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Name</Typography>
            <StyledTextField
              label="Workspace Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <StyledTextField
              label="Description"
              variant="outlined"
              multiline
              fullWidth
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <TextareaAutosize
              minRows={3}
              placeholder="Instructions..."
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              style={{
                width: '100%',
                padding: 8,
                borderRadius: '5px',
                borderColor: '#fff',
              }}
            />
          </Box>
        </Box>
      )}
      {tab === 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Name</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <StyledButton
                variant="outlined"
                onClick={() => setSelectedTab('main')}
              >
                Cancel
              </StyledButton>
              <StyledButton variant="contained" onClick={handleSave}>
                Save
              </StyledButton>
            </Box>
          </Box>
        </Box>
      )}
      {tab === 2 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Name</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                // alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Name</Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Folder</Typography>
                <ChatFolders />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Workspace;
