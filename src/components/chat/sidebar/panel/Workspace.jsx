import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Tab,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useRef, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from 'assets/humanIcons';
import { PanelHeaderRow, StyledMotionTabs } from 'components/chat/styled';
import { RCTabs } from 'components/themed';
import { useChatStore } from 'contexts';
import { useMenu, useMode } from 'hooks';
import {
  WorkspaceCreatorForm,
  WorkspaceFolders,
  WorkspaceItemValues,
} from './items';
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

const ReusableMenu = ({
  anchorEl = null,
  open = false,
  handleClose = () => {},
  handleOpen = () => {},
  handleSelect = () => {},
  buttonText = '',
  items = [],
  selectedItem = '',
}) => {
  return (
    <Box
      sx={{
        fontFamily: 'IBM Plex Sans, sans-serif',
        // fontSize: '0.875rem',
        // boxSizing: 'border-box',
        // padding: '6px',
        // margin: '12px 0',
        // minWidth: '200px',
        // borderRadius: '12px',
        // overflow: 'auto',
        // outline: 0,
        // background: alpha(grey[900], 0.95),
        // border: '1px solid',
        // borderColor: grey[700],
        // color: grey[300],
        // boxShadow: `0px 4px 30px ${grey[900]}`,
        // zIndex: 1,
      }}
    >
      <Button
        onClick={handleOpen}
        sx={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 600,
          fontSize: '0.875rem',
          lineHeight: 1.5,
          padding: '8px 16px',
          borderRadius: '8px',
          color: grey[200],
          transition: 'all 150ms ease',
          cursor: 'pointer',
          background: grey[900],
          border: '1px solid',
          borderColor: grey[700],
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          '&:hover': {
            background: grey[800],
            borderColor: grey[600],
          },
          '&:active': {
            background: grey[700],
          },
          '&:focus-visible': {
            boxShadow: `0 0 0 4px ${blue[300]}`,
            outline: 'none',
          },
        }}
      >
        {selectedItem || buttonText}
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          component: styled(MenuList)({ variant: 'sidebarList' }),
          sx: {
            padding: '0',
            boxShadow: 'none',
            border: 'none',
          },
        }}
      >
        {items?.map(item => (
          <MenuItem
            key={item.name}
            onClick={() => handleSelect(item._id)}
            sx={{
              listStyle: 'none',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'default',
              userSelect: 'none',
              '&:last-of-type': {
                borderBottom: 'none',
              },
              '&:focus': {
                outline: '3px solid',
                backgroundColor: grey[800],
                color: grey[300],
              },
              '&.Mui-disabled': {
                color: grey[700],
              },
              '& .Mui-selected': {
                background: grey[700],
                color: grey[300],
              },
            }}
          >
            <HomeIcon fontSize="small" />
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export const Workspace = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const { theme } = useMode();
  const { state: chatState, actions: chatActions } = useChatStore();
  const {
    workspaces,
    chatSessions,
    modelNames,
    presets,
    prompts,
    models,
    collections,
    files,
    assistants,
    tools,
    selectedWorkspace,
  } = chatState;
  const { setSelectedWorkspace } = chatActions;
  const itemRef = useRef(null);
  const customMenu = useMenu();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleWorkspaceOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleWorkspaceClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = workspaceId => {
    const workspace = workspaces.find(
      workspace => workspace._id === workspaceId
    );
    if (!workspace) return;
    setSelectedWorkspace(workspace);
    navigate(`/admin/${workspace._id}/chat`);
    handleWorkspaceClose();
  };

  const tabs = [{ label: 'Main' }, { label: 'Defaults' }, { label: 'Folders' }];
  return (
    <>
      <PanelHeaderRow theme={theme}>
        <Box display="flex" alignItems="center">
          <ReusableMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            handleClose={handleWorkspaceClose}
            handleOpen={handleWorkspaceOpen}
            handleSelect={handleSelect}
            buttonText={'Select Workspace'}
            items={workspaces}
            selectedItem={selectedWorkspace.name}
          />
        </Box>
        <IconButton>
          <FiSettings />
        </IconButton>
      </PanelHeaderRow>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0.5rem',
          color: 'white',
          borderRadius: '14px',
          background: '#1c1c1c', // Slightly different background for the panel to distinguish it
        }}
      > */}
      {/* <Box
        sx={{
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          padding: '0.5rem',
          // color: 'white',
          // borderRadius: '14px',
          // background: '#1c1c1c', // Slightly different background for the panel to distinguish it
        }}
      > */}
      <RCTabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        tabs={tabs}
        variant="darkMode"
      />
      {/* </Box> */}
      {/* <StyledMotionTabs
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
      </Box> */}
      {tab === 0 && <WorkspaceCreatorForm />}
      {tab === 1 && (
        <WorkspaceItemValues
          workspaces={workspaces}
          chatSessions={chatSessions}
          modelNames={modelNames}
          presets={presets}
          prompts={prompts}
          models={models}
          collections={collections}
          files={[]}
          assistants={assistants}
          tools={tools}
        />
      )}
      {tab === 2 && <WorkspaceFolders />}
    </>
  );
};

export default Workspace;
