'use client';
import { Box, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useActionData } from 'react-router-dom';
import { ChatApp } from 'components/chat';
import MessageProvider from 'contexts/MessageProvider';
import useMenu from 'hooks/useMenu';
import useMode from 'hooks/useMode';

// =========================================================
// [CHAT BOT] | ...
// =========================================================
export const ChatInterface = () => {
  const { theme } = useMode();
  const actionData = useActionData();
  const [open, setOpen] = useState(!actionData);
  const promptsMenu = useMenu();
  const dialogVariants = {
    hidden: { width: 0 },
    visible: { width: '60vw', transition: { duration: 1 } },
  };

  const dialogRef = useRef(null);
  const sidebarItemRef = useRef(null);
  const chatContainerRef = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (promptsMenu.isOpen && sidebarItemRef.current) {
      const sidebarItemRect = sidebarItemRef.current.getBoundingClientRect();
      const dialogRect = dialogRef.current.getBoundingClientRect();

      const leftPosition = sidebarItemRect.right + 32; // 2rem margin
      const topPosition =
        sidebarItemRect.top -
        dialogRect.height / 2 +
        sidebarItemRect.height / 2;

      dialogRef.current.style.left = `${leftPosition}px`;
      dialogRef.current.style.top = `${topPosition}px`;
    }
  }, [promptsMenu.isOpen]);

  if (!open) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          width: '100%',
        }}
      >
        <MessageProvider>
          <ChatApp />
        </MessageProvider>
      </Box>
    </Box>
  );
};

export default ChatInterface;
