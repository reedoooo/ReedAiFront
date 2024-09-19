import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';
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
import ValidationIcon from 'components/themed/ValidationIcon';
import { sidebarIconStyle } from '../styled/styles';

const SidebarTabs = ({
  tab,
  handleSidebarOpen,
  isXs,
  isSidebarOpen,
  isValidApiKey,
  isAuthenticated,
  isMobile,
  sideBarWidthRef,
  theme,
}) => {
  const navigate = useNavigate(); // Initialize navigate for routing

  const SIDEBAR_TABS = [
    {
      id: 0,
      title: 'Workspaces',
      component: 'Workspace',
      icon: HomeIcon,
      onClick: () => handleSidebarOpen(0), // Fixed to use item.id directly
    },
    {
      id: 1,
      title: 'ChatSessions',
      component: 'ChatSession',
      icon: ChatIcon,
      onClick: () => handleSidebarOpen(1),
    },
    {
      id: 2,
      title: 'Assistants',
      component: 'Assistants',
      icon: AssistantIcon,
      onClick: () => handleSidebarOpen(2),
    },
    {
      id: 3,
      title: 'Prompts',
      component: 'Prompts',
      icon: EditIcon,
      onClick: () => handleSidebarOpen(3),
    },
    {
      id: 4,
      title: 'Files',
      component: 'Files',
      icon: FilePresentIcon,
      onClick: () => handleSidebarOpen(4),
    },
    {
      id: 5,
      title: 'User',
      component: 'User',
      icon: AccountCircleRoundedIcon,
      onClick: () => handleSidebarOpen(5),
    },
    {
      id: 6,
      title: 'Home',
      component: 'Home',
      icon: HomeIcon,
      onClick: () => navigate('/admin/dashboard'), // Use navigate for the Home icon
    },
  ];
  const mainTabs = SIDEBAR_TABS.slice(0, 5);
  const bottomTabs = SIDEBAR_TABS.slice(5);
  return (
    <Box
      ref={sideBarWidthRef}
      sx={{
        transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'none',
        transition: 'transform 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0.5rem',
        backgroundColor: '#1C1C1C',
        color: 'white',
        borderRadius: '14px',
        height: 'calc(100vh - 8px)',
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
      {mainTabs.map(item => (
        <Tooltip key={item.id} title={item.title} placement="right">
          <IconButton
            onClick={item.onClick} // Use each item's onClick handler
            sx={{
              mb: 1,
              backgroundColor:
                tab === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
            }}
          >
            <item.icon style={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
      ))}

      {/* Validation icon */}
      {!isXs && (
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
          <ValidationIcon
            isValid={isValidApiKey}
            type="apiKey"
            IconComponent={KeyIcon}
          />
          <ValidationIcon
            isValid={isAuthenticated}
            type="authentication"
            IconComponent={FingerprintIcon}
          />
        </Box>
      )}

      {/* Spacer */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Bottom tabs (User and Home) */}
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
        {bottomTabs.map(item => (
          <Tooltip key={item.id} title={item.title} placement="right">
            <IconButton
              onClick={item.onClick} // Use each item's onClick handler
              sx={{
                mb: 1,
                backgroundColor:
                  tab === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              <item.icon style={sidebarIconStyle} />
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarTabs;
