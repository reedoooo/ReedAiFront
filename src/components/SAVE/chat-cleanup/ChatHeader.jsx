import {
  Menu as MenuIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Button,
  useMediaQuery,
  useTheme,
  SvgIcon,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useAppStore } from 'contexts/AppProvider';
import { useChatStore } from 'contexts/ChatProvider';

const HeaderComponent = ({ onSnapshot, onExport, onToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appStore = useAppStore();
  const chatStore = useChatStore();

  const [collapsed, setCollapsed] = useState(appStore.siderCollapsed);
  const currentChatSession = chatStore.getChatSessionByCurrentActive;

  useEffect(() => {
    setCollapsed(appStore.siderCollapsed);
  }, [appStore.siderCollapsed]);

  const handleUpdateCollapsed = () => {
    appStore.setSiderCollapsed(!collapsed);
  };

  const onScrollToTop = () => {
    const scrollRef = document.querySelector('#scrollRef');
    if (scrollRef) {
      scrollRef.scrollTop = 0;
    }
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      className="border-b bg-white dark:bg-black backdrop-blur"
    >
      <Toolbar className="relative flex items-center justify-between min-w-0 overflow-hidden h-14">
        <div className="flex items-center">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleUpdateCollapsed}
          >
            <SvgIcon>{collapsed ? <MenuIcon /> : <MenuIcon />}</SvgIcon>
          </IconButton>
        </div>
        <Typography
          variant="h6"
          noWrap
          className="flex-1 px-4 pr-6 overflow-hidden cursor-pointer select-none text-ellipsis"
          onDoubleClick={onScrollToTop}
        >
          {currentChatSession?.title ?? ''}
        </Typography>
        <div className="flex items-center space-x-2">
          <Tooltip title="Adjust Parameters">
            <IconButton color="inherit" onClick={onToggle}>
              <TuneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Image">
            <IconButton color="inherit" onClick={onExport}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chat Snapshot">
            <IconButton color="inherit" onClick={onSnapshot}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
