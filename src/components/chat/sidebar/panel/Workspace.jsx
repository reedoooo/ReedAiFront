import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';

import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Tabs, Tab, Box, IconButton, Typography, Menu } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { FiChevronDown, FiSettings } from 'react-icons/fi';
import { EditIcon, UploadFileIcon } from 'assets/humanIcons';
import {
  PanelHeaderRow,
  StyledButton,
  StyledMotionTabs,
  StyledPanelHeaderButton,
  StyledTextareaAutosize,
  StyledTextField,
} from 'components/chat/styled';
import { useChatStore } from 'contexts/ChatProvider';
import { useUserStore } from 'contexts/UserProvider';
import { useMode } from 'hooks/useMode';
import { ChatFolders } from './ChatFolder';
import { WorkspacesHeader } from './components/WorkspacesHeader';
export const Workspace = () => {
  const [tab, setTab] = useState(0);
  const { theme } = useMode();
  const { state: chatState, actions: chatActions } = useChatStore();
  const { state: userState, actions: userActions } = useUserStore();
  const { workspaceId } = chatState;
  const {
    user: { workspaces, folders },
    userId,
  } = userState;
  const { setWorkspaceId, setFolders, setActiveWorkspace } = chatActions;
  const [selectedTab, setSelectedTab] = useState('main');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const itemRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const createHandleMenuClick = menuItem => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  const handleSave = () => {
    console.log('Workspace updated!');
  };
  const handleWorkspaceClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleWorkspaceClose = workspace => {
    if (workspace) {
      setActiveWorkspace(workspace);
    }
    setAnchorEl(null);
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
      {/* <Box
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
      </Box> */}

      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <select
            onChange={e => setWorkspaceId(e.target.value)}
            value={workspaceId}
          >
            {workspaces.map(workspace => (
              <option key={workspace._id} value={workspace._id}>
                {workspace.name}
              </option>
            ))}
          </select>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            ⚙️
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <button onClick={() => console.log('New Session')}>New Chat</button>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
            }}
            onClick={() => console.log('Open Folder')}
          >
            📁
          </button>
        </div>
      </div> */}
      {/* <WorkspacesHeader /> */}
      <PanelHeaderRow theme={theme}>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              marginLeft: '12px',
            }}
          >
            Workspace:
          </Typography>
          <StyledPanelHeaderButton theme={theme}>
            <Dropdown>
              <MenuButton>My account</MenuButton>
              <Menu slots={{ listbox: AnimatedListbox }}>
                <MenuItem onClick={createHandleMenuClick('Profile')}>
                  Profile
                </MenuItem>
                <MenuItem onClick={createHandleMenuClick('Language settings')}>
                  Language settings
                </MenuItem>
                <MenuItem onClick={createHandleMenuClick('Log out')}>
                  Log out
                </MenuItem>
              </Menu>
            </Dropdown>
          </StyledPanelHeaderButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleWorkspaceClose()}
          >
            {workspaces?.map(workspace => (
              <MenuItem
                key={workspace}
                onClick={() => handleWorkspaceClose(workspace)}
              >
                {workspace}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <IconButton>
          <FiSettings />
        </IconButton>
      </PanelHeaderRow>
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
        <StyledMotionTabs
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
        </StyledMotionTabs>
      </Box>
      {tab === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Name</Typography>
            <StyledTextField
              theme={theme}
              label="Workspace Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Instructions</Typography>

            <StyledTextareaAutosize
              theme={theme}
              minRows={3}
              placeholder="Instructions..."
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              // style={{
              //   width: '100%',
              //   padding: 8,
              //   borderRadius: '5px',
              //   borderColor: '#fff',
              // }}
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

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }

  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);
const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      'The `AnimatedListbox` component cannot be rendered outside a `Popup` component'
    );
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `
);
