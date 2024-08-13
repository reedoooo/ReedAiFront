'use client';
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useActionData } from 'react-router-dom';
import { ChatApp } from 'components/chat';
import { useMenu, useMode } from 'hooks';

// =========================================================
// [CHAT BOT] | ...
// =========================================================
export const ChatInterface = () => {
  const actionData = useActionData();
  const [open, setOpen] = useState(!actionData);
  const promptsMenu = useMenu();
  const dialogRef = useRef(null);
  const sidebarItemRef = useRef(null);

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
      }}
    >
      {/* <Box
        sx={{
          display: 'flex',
          height: '100%',
        }}
      > */}
      <ChatApp />
      {/* </Box> */}
    </Box>
  );
};

export default ChatInterface;
