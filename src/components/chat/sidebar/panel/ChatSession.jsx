import {
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import { StyledButton, StyledTextField } from 'components/chat/styled';

const StyledTabs = styled(Tabs)({
  background: '#808080',
  borderRadius: '5px',
  '& .Mui-selected': {
    backgroundColor: '#000',
    color: '#fff',
    margin: '5px',
  },
});

const ConversationCard = styled(Card)({
  background: '#1c1c1c',
  color: '#fff',
  margin: '10px 0',
  padding: '10px',
  borderRadius: '5px',
});

const ExportOptions = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  background: '#333',
  borderRadius: '5px',
  margin: '10px 0',
});

const ChatSession = () => {
  const [tab, setTab] = useState(0);
  const [conversations, setConversations] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const userSession = JSON.parse(localStorage.getItem('userStore'));
  const chatSessions = userSession?.user?.chatSessions;
  useEffect(() => {
    // Fetch conversations from an API or local storage
    console.log('chatSessions', chatSessions);
    setConversations(chatSessions);
  }, [chatSessions]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleConversationClick = conversation => {
    setSelectedConversation(conversation);
  };

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInfoMenuClick = event => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleInfoMenuClose = () => {
    setInfoAnchorEl(null);
  };

  // const handleExportCSV = () => {
  //   const options = {
  //     filename: 'conversation_history',
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalSeparator: '.',
  //     showLabels: true,
  //     showTitle: false,
  //     title: 'Conversation History',
  //     useTextFile: false,
  //     useBom: true,
  //     useKeysAsHeaders: true,
  //   };

  //   const csvExporter = new ExportToCsv(options);
  //   csvExporter.generateCsv(conversations);
  // };

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
        <StyledTabs
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
        </StyledTabs>
      </Box>
      {tab === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '1rem',
          }}
        >
          {conversations?.map(conversation => (
            <ConversationCard
              key={conversation._id}
              onClick={() => handleConversationClick(conversation)}
            >
              <Typography variant="h6">{conversation.name}</Typography>
              <IconButton onClick={handleMenuClick}>
                <MdInfoOutline style={{ color: '#fff' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>View Info</MenuItem>
                {/* <MenuItem onClick={handleExportCSV}>Export as CSV</MenuItem> */}
                <MenuItem onClick={handleExportJSON}>Export as JSON</MenuItem>
                <MenuItem
                  onClick={() => handleDeleteConversation(conversation._id)}
                >
                  Delete
                </MenuItem>
              </Menu>
            </ConversationCard>
          ))}
          {selectedConversation && (
            <Box>
              <Typography variant="h6" style={{ color: '#fff' }}>
                {selectedConversation.name}
              </Typography>
              <Box
                sx={{
                  padding: '10px',
                  background: '#000',
                  borderRadius: '5px',
                }}
              >
                {selectedConversation.messages.map((message, index) => (
                  <Typography key={index} style={{ color: '#fff' }}>
                    {message}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          <ExportOptions>
            {/* <Button variant="contained" onClick={handleExportCSV}>
              Export All as CSV
            </Button> */}
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
