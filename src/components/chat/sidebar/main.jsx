import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import {
  AccountCircleRoundedIcon,
  AiIcon,
  AssistantIcon,
  ChatIcon,
  FilePresentIcon,
  FingerprintIcon,
  HomeIcon,
  KeyIcon,
  SettingsIcon,
} from 'assets/humanIcons';

import { ChatBotIcon } from 'assets/humanIcons/custom';
import ValidationIcon from 'components/styled/ValidationIcon';
import { useAppStore, useChatStore, useUserStore } from 'contexts';
import { useMode, useRouter } from 'hooks';
import { SidebarContainer, SidebarPanel } from '../styled';
import Assistants from './panel/Assistants';
import ChatSession from './panel/ChatSession';
import Files from './panel/Files';
import Prompts from './panel/Prompts';
import User from './panel/User';
import Workspace from './panel/Workspace';

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
    state: { apiKey },
  } = useChatStore();
  const {
    state: { isSidebarOpen },
    actions: { setSidebarOpen },
  } = useAppStore();
  const { theme } = useMode();
  const { navigate } = useRouter();
  const [tab, setTab] = useState(null);
  const sideBarWidthRef = React.useRef(null);
  const isValidApiKey = Boolean(apiKey);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile
  // const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

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
    isSidebarOpen(false);
    setTab(null);
  };
  const renderContent = () => {
    switch (tab) {
      case 0:
        return <User />;
      case 1:
        return <Workspace />;
      case 2:
        return <ChatSession />;
      case 3:
        return <Prompts />;
      case 4:
        return <Assistants />;
      case 5:
        return <Files />;
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
        <Tooltip title="User Settings" placement="right">
          <IconButton onClick={() => handleSidebarOpen(0)}>
            <AccountCircleRoundedIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Workspaces" placement="right">
          <IconButton onClick={() => handleSidebarOpen(1)}>
            <SettingsIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chats" placement="right">
          <IconButton onClick={() => handleSidebarOpen(2)}>
            <ChatIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Prompts" placement="right">
          <IconButton onClick={() => handleSidebarOpen(3)}>
            <ChatBotIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Assistants" placement="right">
          <IconButton onClick={() => handleSidebarOpen(4)}>
            <AssistantIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Files" placement="right">
          <IconButton onClick={() => handleSidebarOpen(5)}>
            <FilePresentIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
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
          <Tooltip title="Home" placement="right">
            <IconButton onClick={() => navigate('/admin/dashboard')}>
              <HomeIcon sx={sidebarIconStyle} />
            </IconButton>
          </Tooltip>{' '}
        </Box>
      </SidebarPanel>
      <Drawer
        anchor="left"
        open={tab !== null}
        onClose={() => handleSidebarClose()}
        PaperProps={{
          sx: {
            color: 'white',
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

const DefaultTab = () => <div style={{ color: 'white' }}></div>;

export default ChatSidebar;
