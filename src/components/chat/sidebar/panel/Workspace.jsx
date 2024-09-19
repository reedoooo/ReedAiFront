import { Box, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from 'assets/humanIcons';
import { PanelHeaderRow } from 'components/chat/styled';
import { RCTabs, SelectMenu } from 'components/themed';
import { useChatStore } from 'contexts';
import { useMenu, useMode } from 'hooks';
import { useTabManager } from 'hooks/chat/useTabManager';
import { WorkspaceCreatorForm, WorkspaceFolders } from './items';

export const Workspace = props => {
  const { folders = [], data = {}, title = '' } = props;
  const navigate = useNavigate();
  const { theme } = useMode();
  const {
    state: {
      workspaces,
      chatSessions,
      presets,
      prompts,
      files,
      assistants,
      tools,
      selectedWorkspace,
    },
    actions: { setSelectedWorkspace },
  } = useChatStore();
  const [anchorEl, setAnchorEl] = useState(null);

  const { activeTabs, selectedTab, selectTab } = useTabManager('workspace');

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
  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <WorkspaceCreatorForm />;
      case 1:
        return <WorkspaceFolders folders={folders} />;
      default:
        return null;
    }
  };

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
        value={selectedTab}
        onChange={(e, newValue) => selectTab(newValue)}
        tabs={activeTabs}
        variant="darkMode"
      />
      {renderContent()}
    </>
  );
};

export default Workspace;
