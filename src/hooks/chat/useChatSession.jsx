// hooks/useChatSession.js
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useChatStore } from 'contexts';

export const useChatSession = () => {
  const { state, actions } = useChatStore();
  const [error, setError] = useState(null);

  const handleSelectChatSession = useCallback(
    sessionId => {
      try {
        actions.setSelectedChatSession(sessionId);
        actions.setChatMessages(state.chatSessions[sessionId]?.messages || []);
        setError(null);
      } catch (err) {
        console.error('Error selecting chat session:', err);
        setError('Failed to select chat session. Please try again.');
      }
    },
    [actions, state.chatSessions]
  );

  const handleCreateChatSession = useCallback(() => {
    try {
      const newSessionId = uuidv4();
      const newSession = {
        id: newSessionId,
        name: `Chat ${Object.keys(state.chatSessions).length + 1}`,
        messages: [],
        createdAt: new Date().toISOString(),
      };

      actions.addChatSession(newSession);
      actions.setSelectedChatSession(newSessionId);
      actions.setChatMessages([]);
      setError(null);

      return newSessionId;
    } catch (err) {
      console.error('Error creating chat session:', err);
      setError('Failed to create new chat session. Please try again.');
      return null;
    }
  }, [actions, state.chatSessions]);

  const handleDeleteChatSession = useCallback(
    sessionId => {
      try {
        actions.deleteChatSession(sessionId);

        // If the deleted session was the current one, select another session
        if (state.selectedChatSession === sessionId) {
          const remainingSessions = Object.keys(state.chatSessions).filter(
            id => id !== sessionId
          );
          if (remainingSessions.length > 0) {
            handleSelectChatSession(remainingSessions[0]);
          } else {
            // If no sessions left, create a new one
            handleCreateChatSession();
          }
        }

        setError(null);
      } catch (err) {
        console.error('Error deleting chat session:', err);
        setError('Failed to delete chat session. Please try again.');
      }
    },
    [
      actions,
      state.selectedChatSession,
      state.chatSessions,
      handleSelectChatSession,
      handleCreateChatSession,
    ]
  );

  const handleRenameChatSession = useCallback(
    (sessionId, newName) => {
      try {
        actions.renameChatSession({ sessionId, newName });
        setError(null);
      } catch (err) {
        console.error('Error renaming chat session:', err);
        setError('Failed to rename chat session. Please try again.');
      }
    },
    [actions]
  );

  const handleClearChatSession = useCallback(
    sessionId => {
      try {
        actions.clearChatSession(sessionId);
        if (state.selectedChatSession === sessionId) {
          actions.setChatMessages([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error clearing chat session:', err);
        setError('Failed to clear chat session. Please try again.');
      }
    },
    [actions, state.selectedChatSession]
  );

  return {
    currentChatSession: state.chatSessions[state.selectedChatSession],
    chatSessions: state.chatSessions,
    selectedChatSessionId: state.selectedChatSession,
    handleSelectChatSession,
    handleCreateChatSession,
    handleDeleteChatSession,
    handleRenameChatSession,
    handleClearChatSession,
    error,
  };
};
