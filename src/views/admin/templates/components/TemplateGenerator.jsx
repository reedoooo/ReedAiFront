'use client';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useActionData } from 'react-router-dom';
import { ChatApp } from 'components/chat';
import ChatSidebar from 'components/chat/sidebar/ReusableSidebar';
import MessageProvider from 'contexts/MessageProvider';
import useMenu from 'hooks/useMenu';
import useMode from 'hooks/useMode';
import ChatHeader from '../../../../components/chat/ChatHeader';

const dialogVariants = {
  hidden: { width: 0 },
  visible: { width: '60vw', transition: { duration: 1 } },
};

export const TemplateGenerator = () => {
  const { theme } = useMode();
  const actionData = useActionData();
  const [open, setOpen] = useState(!actionData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  const promptsMenu = useMenu();
  const promptsTemplateMenu = useMenu();
  const assistantsMenu = useMenu();
  const workspaceMenu = useMenu();
  const fileMenu = useMenu();
  const foldersMenu = useMenu();
  const collectionsMenu = useMenu();
  const settingsMenu = useMenu();
  const [selectedTab, setSelectedTab] = useState(0);
  const [newPrompt, setNewPrompt] = useState({ name: '', content: '' });
  const [newTemplate, setNewTemplate] = useState({ name: '', content: '' });
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: '',
  });
  const [newFile, setNewFile] = useState({ fileName: '', fileContent: '' });

  const [currentTemplate, setCurrentTemplate] = useState({
    templateName: '',
    templateText: '',
    tags: [],
  });

  const dialogRef = useRef(null);
  const sidebarItemRef = useRef(null);
  const chatContainerRef = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };
  const checkUser = () => {
    return !!localStorage.getItem('userId');
  };

  const checkApiKey = () => {
    return !!localStorage.getItem('apiKey');
  };

  const checkStatusUpdates = () => {
    setIsLoggedIn(checkUser());
    setIsApiKeyValid(checkApiKey());
  };

  useEffect(() => {
    checkStatusUpdates();

    const handleStorageChange = () => {
      checkStatusUpdates();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
        flexGrow: 1,
      }}
    >
      <ChatHeader
        isLoggedIn={isLoggedIn}
        isApiKeyValid={isApiKeyValid}
        title={newWorkspace.name}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <ChatSidebar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              backgroundColor: '#1C1C1C',
              borderRadius: '14px',
              px: 2,
            }}
          >
            <MessageProvider>
              <ChatApp />
            </MessageProvider>
            {/* <Dialog open={open} onClose={handleClose}>
              <form method="post">
                <TextField name="name" label="Workspace Name" required />
                <TextField name="description" label="Description" />
                {/* Include other fields as required by your schema */}
            {/* <Button type="submit">Submit</Button>
              </form>
            </Dialog> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TemplateGenerator;
