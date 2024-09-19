import { Box, Menu, MenuItem, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaSignOutAlt } from 'react-icons/fa';
import { workspacesApi } from 'api/workspaces';
import { RCTabs } from 'components/themed';
import { useChatStore } from 'contexts/ChatProvider';
import { useChatHandler } from 'hooks/chat';
import { useTabManager } from 'hooks/chat/useTabManager';
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
  const { activeTabs, selectedTab, selectTab } = useTabManager('chatSessions');
  const [sessions, setSessions] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const workspaceId = JSON.parse(sessionStorage.getItem('workspaceId'));
  const userId = JSON.parse(sessionStorage.getItem('userId'));

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
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }, [workspaceId, userId]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

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

  const ErrorFallback = ({ error }) => (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FileManagementSidebar
              initialFolders={folders}
              initialFiles={files}
              space={title}
            />
          </ErrorBoundary>
        );
      case 1:
        return (
          <ConversationTab
            anchorEl={anchorEl}
            sessions={sessions}
            selectedSession={selectedSession}
            setSelectedSession={setSelectedSession}
            handleMenuClick={handleMenuClick}
            handleMenuClose={handleMenuClose}
            handleDeleteConversation={handleDeleteConversation}
          />
        );
      case 2:
        return <SessionSettings />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Typography variant="h6" style={{ color: '#fff' }}>
        Conversation History
        <FaSignOutAlt style={{ float: 'right', cursor: 'pointer' }} />
      </Typography>
      <RCTabs
        value={selectedTab}
        onChange={(e, newValue) => selectTab(newValue)}
        tabs={activeTabs}
        variant="darkMode"
      />
      <Box mt={2} display="flex" alignItems="center">
        {renderContent()}
      </Box>
    </Box>
  );
};

export default ChatSession;
