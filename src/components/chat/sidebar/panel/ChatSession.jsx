import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { ExportOptions } from 'components/chat/styled';
import { RCTabs } from 'components/themed';
import { useChatStore } from 'contexts/ChatProvider';
import { useChatHandler } from 'hooks/chat';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaSignOutAlt } from 'react-icons/fa';
import { ConversationTab, SessionSettings } from './items';
import FileManagementSidebar from './items/sidebar-items/FileManager';

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
  const { folders = [], data = {}, title = '', files = [] } = props;
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
    { label: 'List', value: 0 },
    { label: 'Conversations', value: 1 },
    { label: 'Settings', value: 2 },
  ];
  const ErrorFallback = ({ error }) => (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
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
      <Box mt={2} display="flex" alignItems="center">
        {/* <SidebarCreateButtons contentType={'files'} hasData={data.length > 0} /> */}
        {tab === 0 && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FileManagementSidebar folders={folders} files={files} />
          </ErrorBoundary>
        )}
      </Box>
      {tab === 1 && (
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
      {tab === 2 && <SessionSettings />}
    </Box>
  );
};

export default ChatSession;
