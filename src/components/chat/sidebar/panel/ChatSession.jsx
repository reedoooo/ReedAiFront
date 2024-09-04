import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import {
  ConversationCard,
  ExportOptions,
  StyledButton,
  StyledMuiTabs,
  StyledTextField,
} from 'components/chat/styled';
import { RCTabs } from 'components/themed';
import { useChatStore } from 'contexts/ChatProvider';
import { useChatHandler } from 'hooks/chat';
import { ConversationTab, SessionSettings } from './items';
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
export const ChatSession = props => {
  const { folders = [], data = {}, title = '' } = props;
  const chatStore = useChatStore();
  const {
    state: { messages },
    actions: { setMessages },
  } = chatStore;
  const { handleGetSessionMessages } = useChatHandler(messages, setMessages);
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
  const tabs = [
    { label: 'Conversations', value: 0 },
    { label: 'Settings', value: 1 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Typography variant="h6" style={{ color: '#fff' }}>
        Conversation History
        <FaSignOutAlt style={{ float: 'right', cursor: 'pointer' }} />
      </Typography>
      <RCTabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        tabs={tabs}
        variant="darkMode"
      />
      {tab === 0 && (
        <ConversationTab
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          handleMenuClick={handleMenuClick}
          anchorEl={anchorEl}
          handleMenuClose={handleMenuClose}
          handleExportJSON={handleExportJSON}
          handleDeleteConversation={handleDeleteConversation}
        />
      )}
      {tab === 1 && <SessionSettings />}
    </Box>
  );
};

export default ChatSession;
