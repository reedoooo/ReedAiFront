import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
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
import ValidationIcon from 'components/themed/ValidationIcon';
import { useAppStore, useChatStore, useUserStore } from 'contexts';
import { useMode } from 'hooks';
import {
  Assistants,
  ChatSession,
  Files,
  Prompts,
  User,
  Workspace,
} from './panel';
import SidebarContent from './SidebarContent';
import SidebarTabs from './SidebarTabs';

const sidebarIconStyle = {
  width: '32px',
  height: '32px',
  color: 'white',
};

const SIDEBAR_TABS = [
  { id: 0, title: 'Workspaces', component: 'Workspace', icon: HomeIcon },
  { id: 1, title: 'ChatSessions', component: 'ChatSession', icon: ChatIcon },
  { id: 2, title: 'Assistants', component: 'Assistants', icon: AssistantIcon },
  { id: 3, title: 'Prompts', component: 'Prompts', icon: EditIcon },
  { id: 4, title: 'Files', component: 'Files', icon: FilePresentIcon },
  { id: 5, title: 'User', component: 'User', icon: AccountCircleRoundedIcon },
  { id: 6, title: 'Home', component: 'Home', icon: HomeIcon },
];

export const ChatSidebar = () => {
  const {
    state: { user, isAuthenticated },
  } = useUserStore();
  const {
    state: { apiKey, chatSessions, workspaces, prompts, files, assistants },
  } = useChatStore();

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
  const isXs = useMediaQuery(theme.breakpoints.down('xs')); // Check if the screen size is mobile

  useEffect(() => {
    if (sideBarWidthRef.current) {
      console.log('Sidebar width:', sideBarWidthRef.current.offsetWidth);
    }
  }, []);
  useEffect(() => {
    if (isXs && tab !== null) {
      setSidebarOpen(true); // Keep sidebar open in mobile view when a tab is selected
    }
  }, [isXs, tab, setSidebarOpen]);

  const handleSidebarOpen = index => {
    setTab(index);
    setSidebarOpen(true);
  };
  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setTab(null);
  };

  return (
    <Box
      sx={{
        padding: '4px',
        maxHeight: 'calc(100% - 16px)',
        flexGrow: 1,
      }}
    >
      <div
        style={{
          transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'none',
          transition: 'transform 0.3s ease-in-out',
          color: '#fff',
          display: 'flex',
          fontFamily: 'Inter, Arial, sans-serif',
          borderRadius: '14px',
          maxHeight: 'calc(100% - 16px)',
        }}
      >
        {/* -- SIDEBAR SECTION ICON BUTTONS -- */}
        <SidebarTabs
          tab={tab}
          handleSidebarOpen={index => handleSidebarOpen(index)}
          isXs={isXs}
          isSidebarOpen={isSidebarOpen}
          isValidApiKey={isValidApiKey || user.openai.apiKey ? true : false}
          isAuthenticated={isAuthenticated}
          isMobile={isMobile}
          sideBarWidthRef={sideBarWidthRef}
          theme={theme}
        />

        {/* -- SIDEBAR DRAWER -- */}
        <Drawer
          anchor="left"
          open={tab !== null}
          onClose={() => handleSidebarClose()}
          PaperProps={{
            sx: {
              color: '#fff',
              padding: '20px',
              background: '#000',
              maxWidth: '350px', // Ensure maxWidth is set to 350px
              width: isMobile ? '100vw' : '350px', // Responsive width for mobile
              borderRight: '1px solid #333',
              transform:
                isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'none',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          <SidebarContent
            tab={tab}
            user={user}
            chatSessions={chatSessions}
            workspaces={workspaces}
            prompts={prompts}
            files={files}
            assistants={assistants}
            folders={user.folders}
          />
        </Drawer>
      </div>
    </Box>
  );
};

export const DefaultTab = () => <div style={{ color: 'white' }}></div>;

export default ChatSidebar;
