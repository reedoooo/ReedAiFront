import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AccountCircleRoundedIcon,
  AiIcon,
  AssistantIcon,
  ChatIcon,
  EditIcon,
  FilePresentIcon,
  FingerprintIcon,
  HomeIcon,
  KeyIcon,
  SettingsIcon,
} from 'assets/humanIcons';
import { IconButtonWithTooltip } from 'components/compositions';
import ValidationIcon from 'components/styled/ValidationIcon';
import { useAppStore, useChatStore, useUserStore } from 'contexts';
import { useMode } from 'hooks';
import { SidebarContainer, SidebarPanel } from '../styled';
import {
  Workspace,
  ChatSession,
  Assistants,
  Files,
  Prompts,
  User,
} from './panel';

const sidebarIconStyle = {
  width: '32px',
  height: '32px',
  color: 'white',
};

export const ChatSidebar = () => {
  const {
    state: { user, isAuthenticated },
  } = useUserStore();
  const {
    state: {
      apiKey,
      folders,
      chatSessions,
      workspaces,
      prompts,
      files,
      assistants,
    },
  } = useChatStore();
  const chatSessionFolders = folders?.filter(
    folder => folder.type === 'chatSessions'
  );
  const promptFolders = folders?.filter(folder => folder.type === 'prompts');
  const fileFolders = folders?.filter(folder => folder.type === 'files');
  const assistantFolders = folders?.filter(
    folder => folder.type === 'assistants'
  );
  const toolFolders = folders?.filter(folder => folder.type === 'tools');
  // const presetFolders = folders.filter(folder => folder.type === 'presets');
  // const collectionFolders = folders.filter(
  //   folder => folder.type === 'collections'
  // );
  // const modelFolders = folders.filter(folder => folder.type === 'models');
  const {
    state: { isSidebarOpen },
    actions: { setSidebarOpen },
  } = useAppStore();
  const { theme } = useMode();
  const navigate = useNavigate();
  const [tab, setTab] = useState(null);
  const sideBarWidthRef = React.useRef(null);
  const isValidApiKey = Boolean(apiKey);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

  React.useEffect(() => {
    if (sideBarWidthRef.current) {
      console.log('Sidebar width:', sideBarWidthRef.current.offsetWidth);
    }
  }, []);
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false); // Close sidebar on mobile view
    }
  }, [isMobile, setSidebarOpen]);

  const handleSidebarOpen = index => {
    setTab(index);
    setSidebarOpen(true);
  };
  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setTab(null);
  };
  const renderContent = () => {
    switch (tab) {
      case 0:
        return (
          <Workspace title="Workspaces" data={workspaces} folders={folders} />
        );
      case 1:
        return (
          <ChatSession
            title="ChatSessions"
            data={chatSessions}
            folders={chatSessionFolders}
          />
        );
      case 2:
        return (
          <Assistants
            title="Assistants"
            data={assistants}
            folders={assistantFolders}
          />
        );
      case 3:
        return (
          <Prompts title="Prompts" data={prompts} folders={promptFolders} />
        );
      case 4:
        return <Files title="Files" data={files} folders={fileFolders} />;
      case 5:
        return <User title="User" data={user} />;
      default:
        return <DefaultTab />;
    }
  };

  return (
    <SidebarContainer
      sx={{
        transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'none', // Slide out if mobile and sidebar is hidden
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <SidebarPanel
        ref={sideBarWidthRef}
        sx={{
          transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'none', // Slide out if mobile and sidebar is hidden
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: theme.palette.primary.main,
            marginBottom: '0.5rem',
          }}
        >
          <AiIcon sx={{ fontSize: 32, color: theme.palette.common.white }} />
        </Avatar>
        <IconButtonWithTooltip
          tooltipTitle="Workspaces"
          placement="right"
          icon={SettingsIcon}
          colorVariant="white"
          sizeVariant="large"
          variant="circle"
          onClick={() => handleSidebarOpen(0)}
        />
        <IconButtonWithTooltip
          tooltipTitle="ChatSessions"
          placement="right"
          icon={ChatIcon}
          colorVariant="white"
          sizeVariant="large"
          variant="circle"
          onClick={() => handleSidebarOpen(1)}
        />
        <IconButtonWithTooltip
          tooltipTitle="Assistants"
          placement="right"
          icon={AssistantIcon}
          colorVariant="white"
          sizeVariant="large"
          variant="circle"
          onClick={() => handleSidebarOpen(2)}
        />
        <IconButtonWithTooltip
          tooltipTitle="Prompts"
          placement="right"
          icon={EditIcon}
          colorVariant="white"
          sizeVariant="large"
          variant="circle"
          onClick={() => handleSidebarOpen(3)}
        />
        <IconButtonWithTooltip
          tooltipTitle="Files"
          placement="right"
          icon={FilePresentIcon}
          colorVariant="white"
          sizeVariant="large"
          variant="circle"
          onClick={() => handleSidebarOpen(4)}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#1C1C1C',
          }}
        >
          <Tooltip title="UserId" placement="right">
            <IconButton onClick={() => handleSidebarOpen(6)}>
              <ValidationIcon
                IconComponent={FingerprintIcon}
                isValid={isAuthenticated}
              />{' '}
            </IconButton>
          </Tooltip>{' '}
          <Tooltip title="Api Key" placement="right">
            <IconButton onClick={() => handleSidebarOpen(6)}>
              <ValidationIcon IconComponent={KeyIcon} isValid={isValidApiKey} />{' '}
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#1C1C1C',
            alignSelf: 'flex-end',
            pt: '100%',
            mt: 'auto',
          }}
        >
          <Tooltip title="User" placement="right">
            <IconButton onClick={() => handleSidebarOpen(5)}>
              <AccountCircleRoundedIcon sx={sidebarIconStyle} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Home" placement="right">
            <IconButton onClick={() => navigate('/admin/dashboard')}>
              <HomeIcon sx={sidebarIconStyle} />
            </IconButton>
          </Tooltip>
        </Box>
      </SidebarPanel>
      <Drawer
        anchor="left"
        open={tab !== null}
        onClose={() => handleSidebarClose()}
        PaperProps={{
          sx: {
            color: '#fff',
            padding: '20px',
            background: '#000',
            minWidth: isSidebarOpen ? (isMobile ? `100vw` : `35vw`) : '0px',
            maxWidth: isSidebarOpen ? (isMobile ? `100vw` : `35vw`) : '0px',
            width: isSidebarOpen ? (isMobile ? `100vw` : `35vw`) : '0px',
            // minWidth: showSidebar ? `35vw` : '0px',
            // maxWidth: showSidebar ? `35vw` : '0px',
            // width: showSidebar ? `35vw` : '0px',
            borderRight: '1px solid #333', // Adds a border to the right side
            transform:
              isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'none',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        {renderContent()}
      </Drawer>
    </SidebarContainer>
  );
};

export const DefaultTab = () => <div style={{ color: 'white' }}></div>;

export default ChatSidebar;
