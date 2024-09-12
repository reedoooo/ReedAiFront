import { Box, Menu, MenuItem, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaSignOutAlt } from 'react-icons/fa';
import { chatApi } from 'api/Ai/chat-sessions';
import { workspacesApi } from 'api/workspaces';
import { ExportOptions } from 'components/chat/styled';
import { RCTabs } from 'components/themed';
import { useChatStore } from 'contexts/ChatProvider';
import { useChatHandler } from 'hooks/chat';
import { ConversationTab, SessionSettings } from './items';
import FileManagementSidebar from './items/sidebar-items/FileManager';

export const ChatSession = props => {
  const { folders = [], data = {}, title = '', files = [] } = props;
  const {
    state: { messages, selectedChatSession },
    actions: { setMessages },
  } = useChatStore();
  const { handleGetSessionMessages, handleGetSession } = useChatHandler(
    messages,
    setMessages
  );
  const [tab, setTab] = useState(0);
  const [sessions, setSessions] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const workspaceId = JSON.parse(sessionStorage.getItem('workspaceId'));
  const userId = JSON.parse(sessionStorage.getItem('userId'));
  // Fetch folders and files concurrently
  const fetchSessions = useCallback(async () => {
    try {
      const chatSessions =
        await workspacesApi.getWorkspaceSessionsByWorkspaceId({
          workspaceId,
          userId,
        });
      console.log('chatSessions', chatSessions);
      setSessions(
        chatSessions?.map(session => ({
          ...session,
          name: session.name,
          messages: session.messages,
          summary: session.summary,
          topic: session.topic,
          model: session.model,
          stats: session.stats,
          settings: session.settings,
          langChainSettings: session.langChainSettings,
        }))
      );
      // setSelectedSession(chatSessions[0]);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }, [workspaceId, userId]);
  // const fetchSessionMessages = useCallback(
  //   async sessionId => {
  //     try {
  //       const sessionMessages = await chatApi.getChatSessionMessages(sessionId);
  //       setMessages(sessionMessages);
  //     } catch (error) {
  //       console.error('Error fetching session messages:', error);
  //     }
  //   },
  //   [setMessages]
  // );
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // useEffect(() => {
  //   if (selectedSession) {
  //     fetchSessionMessages(selectedSession.id);
  //   }
  // }, [selectedSession, fetchSessionMessages]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleMenuClick = (event, chat) => {
    setSelectedSession(chat);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteConversation = id => {
    setSessions(sessions?.filter(conv => conv.id !== id));
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
            <FileManagementSidebar
              initialFolders={folders}
              initialFiles={files}
              space={title}
            />
          </ErrorBoundary>
        )}
      </Box>
      {tab === 1 && (
        <ConversationTab
          anchorEl={anchorEl}
          sessions={sessions}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
          handleDeleteConversation={handleDeleteConversation}
        />
      )}
      {tab === 2 && <SessionSettings />}
    </Box>
  );
};

export default ChatSession;
