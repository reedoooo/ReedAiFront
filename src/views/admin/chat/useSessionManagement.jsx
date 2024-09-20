import { useCallback } from 'react';
import { useChatStore } from 'contexts/ChatProvider';
import { useChatHandler } from 'hooks/chat';

export const useSessionManagement = () => {
  const {
    state: { sessionId, workspaceId, chatMessages },
    actions: { setSessionId, setWorkspaceId, setChatMessages },
  } = useChatStore();

  const { handleGetSession, handleCreateNewSession, handleGetSessionMessages } =
    useChatHandler();

  const initializeSession = useCallback(async () => {
    if (!sessionId) {
      try {
        await handleCreateNewSession();
      } catch (err) {
        console.error('Failed to initialize session:', err);
      }
    } else if (workspaceId) {
      await handleGetSession();
    }

    await handleGetSessionMessages();
  }, [
    sessionId,
    workspaceId,
    handleCreateNewSession,
    handleGetSession,
    handleGetSessionMessages,
  ]);

  return {
    sessionId,
    workspaceId,
    initializeSession,
    setSessionId,
    setWorkspaceId,
  };
};
