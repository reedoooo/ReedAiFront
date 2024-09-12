import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Tab,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from 'assets/humanIcons';
import { PanelHeaderRow } from 'components/chat/styled';
import { RCTabs, SelectMenu } from 'components/themed';
import { useChatStore } from 'contexts';
import { useMenu, useMode } from 'hooks';
import { WorkspaceCreatorForm, WorkspaceFolders } from './items';

export const Workspace = props => {
  const { folders = [], data = {}, title = '' } = props;
  console.log('Workspace', { title, data, folders });
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const { theme } = useMode();
  const { state: chatState, actions: chatActions } = useChatStore();
  const {
    workspaces,
    chatSessions,
    presets,
    prompts,
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

  const tabs = [{ label: 'Main' }, { label: 'Folders' }];
  return (
    <>
      <PanelHeaderRow theme={theme}>
        <Box display="flex" alignItems="center">
          <SelectMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            handleClose={handleWorkspaceClose}
            handleOpen={handleWorkspaceOpen}
            handleSelect={handleSelect}
            buttonText={'Select Workspace'}
            items={workspaces}
            selectedItem={selectedWorkspace.name}
            icon={<HomeIcon />}
          />
        </Box>
        <IconButton>
          <FiSettings />
        </IconButton>
      </PanelHeaderRow>
      <RCTabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        tabs={tabs}
        variant="darkMode"
      />
      {tab === 0 && <WorkspaceCreatorForm />}
      {tab === 1 && <WorkspaceFolders folders={folders} />}
    </>
  );
};

export default Workspace;
