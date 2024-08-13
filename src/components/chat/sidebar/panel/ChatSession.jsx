import {
  Tab,
  Button,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import { sessions } from 'api/chat';
import {
  ConversationCard,
  ExportOptions,
  StyledButton,
  StyledMuiTabs,
  StyledTextField,
} from 'components/chat/styled';
import { useChatHandler } from 'hooks/chat';
const ConversationMenu = ({
  anchorEl,
  handleMenuClose,
  handleExportJSON,
  handleDeleteConversation,
}) => (
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
    <MenuItem onClick={handleMenuClose}>View Info</MenuItem>
    <MenuItem onClick={handleExportJSON}>Export as JSON</MenuItem>
    <MenuItem onClick={handleDeleteConversation}>Delete</MenuItem>
  </Menu>
);
export const ChatSession = () => {
  const { handleGetSessionMessages } = useChatHandler();
  const [tab, setTab] = useState(0);
  const [conversations, setConversations] = useState(null);
  const [conversationMessages, setConversationMessages] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const userSession = JSON.parse(localStorage.getItem('userStore'));
  const baseChat = JSON.parse(localStorage.getItem('baseChatStore'));
  const chatSessionStore = JSON.parse(localStorage.getItem('chatSessionStore'));
  const activeSessionId = chatSessionStore?.sessionId;
  const chatSessions = userSession?.user?.chatSessions;

  useEffect(() => {
    handleGetSessionMessages();
  }, [handleGetSessionMessages]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleMenuClick = (event, conversation) => {
    setSelectedConversation(conversation);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExportCSV = () => {
    const options = {
      filename: 'conversation_history',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'Conversation History',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    // const csvExporter = new Export(options);
    const csvExporter = new ExportOptions(options);
    csvExporter.generateCsv(conversations);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(conversations, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conversation_history.json';
    a.click();
  };

  const handleDeleteConversation = id => {
    setConversations(conversations?.filter(conv => conv.id !== id));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Typography variant="h6" style={{ color: '#fff' }}>
        Conversation History
        <FaSignOutAlt style={{ float: 'right', cursor: 'pointer' }} />
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          color: 'white',
          borderRadius: '14px',
          background: '#1c1c1c',
        }}
      >
        <StyledMuiTabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="#fff"
        >
          <Tab
            label="Conversations"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab
            label="Settings"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
        </StyledMuiTabs>
      </Box>
      {tab === 0 && (
        <Box sx={{ padding: '1rem', flexGrow: 1, overflowY: 'auto' }}>
          {conversations?.map(conversation => (
            <ConversationCard
              key={conversation._id}
              onClick={() => setSelectedConversation(conversation)}
            >
              <Typography variant="h6">{conversation.name}</Typography>
              <IconButton
                onClick={event => handleMenuClick(event, conversation)}
              >
                <MdInfoOutline style={{ color: '#fff' }} />
              </IconButton>
            </ConversationCard>
          ))}
          <ConversationMenu
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
            handleExportJSON={handleExportJSON}
            handleDeleteConversation={() =>
              handleDeleteConversation(selectedConversation?._id)
            }
          />
          {selectedConversation && (
            <Box>
              <Typography variant="h6" sx={{ color: '#fff' }}>
                {selectedConversation.name}
              </Typography>
              <Box
                sx={{
                  padding: '10px',
                  background: '#000',
                  borderRadius: '5px',
                }}
              >
                {selectedConversation?.messages?.map((message, index) => (
                  <Typography key={index} sx={{ color: '#fff' }}>
                    {message.content}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          <ExportOptions>
            <Button variant="contained" onClick={handleExportJSON}>
              Export All as JSON
            </Button>
          </ExportOptions>
        </Box>
      )}
      {tab === 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '1rem',
          }}
        >
          <StyledTextField label="API Key" variant="outlined" fullWidth />
          <StyledButton variant="outlined">Save Settings</StyledButton>
        </Box>
      )}
    </Box>
  );
};

export default ChatSession;
