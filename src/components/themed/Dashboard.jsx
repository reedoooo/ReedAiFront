'use client';

import { ChevronRight as IconChevronCompactRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useSelectFileHandler } from '../chat/chat-hooks/use-select-file-handler';
import { CommandK } from '../utility/command-k';
import { Sidebar } from '@/components/sidebar/sidebar';
import { SidebarSwitcher } from '@/components/sidebar/sidebar-switcher';
import useHotkey from '@/lib/hooks/use-hotkey';
import { ContentType } from '@/types';

export const SIDEBAR_WIDTH = 350;

export const Dashboard = children => {
  useHotkey('s', () => setShowSidebar(prevState => !prevState));

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabValue = searchParams.get('tab') || 'chats';

  const { handleSelectDeviceFile } = useSelectFileHandler();

  const [contentType, setContentType] = useState(tabValue);
  const [showSidebar, setShowSidebar] = useState(
    localStorage.getItem('showSidebar') === 'true'
  );
  const [isDragging, setIsDragging] = useState(false);

  const onFileDrop = event => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const file = files[0];
    handleSelectDeviceFile(file);
    setIsDragging(false);
  };

  const handleDragEnter = event => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = event => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const handleToggleSidebar = () => {
    setShowSidebar(prevState => !prevState);
    localStorage.setItem('showSidebar', prevState => prevState.toString());
  };

  return (
    <Box display="flex" width="100%" height="100vh">
      <CommandK />

      <Drawer
        variant="persistent"
        open={showSidebar}
        sx={{
          width: showSidebar ? SIDEBAR_WIDTH : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {showSidebar && (
          <Tabs
            orientation="vertical"
            value={contentType}
            onChange={(event, newValue) => {
              setContentType(newValue);
              router.replace(`${pathname}?tab=${newValue}`);
            }}
            sx={{ height: '100%' }}
          >
            <SidebarSwitcher onContentTypeChange={setContentType} />
            <Sidebar contentType={contentType} showSidebar={showSidebar} />
          </Tabs>
        )}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          position: 'relative',
          minWidth: showSidebar ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%',
        }}
        onDrop={onFileDrop}
        onDragOver={onDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {isDragging ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            bgcolor="rgba(0, 0, 0, 0.5)"
            color="white"
            fontSize="2rem"
          >
            drop file here
          </Box>
        ) : (
          children
        )}

        <IconButton
          onClick={handleToggleSidebar}
          sx={{
            position: 'absolute',
            top: '50%',
            left: showSidebar ? SIDEBAR_WIDTH - 16 : 0,
            transform: showSidebar ? 'rotate(180deg)' : 'rotate(0deg)',
            zIndex: 10,
          }}
        >
          <IconChevronCompactRight />
        </IconButton>
      </Box>
    </Box>
  );
};
