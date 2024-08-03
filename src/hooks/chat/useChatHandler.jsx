/* eslint-disable no-case-declarations */
/* eslint-disable no-empty */
/* eslint-disable no-constant-condition */

import { useCallback, useEffect, useRef, useState } from 'react';
import { sessions as sessionApi, workspaces as workspaceApi } from 'api/chat';
import { useChatStore } from 'contexts/ChatProvider';
import { useUserStore } from 'contexts/UserProvider';
import useTipTapEditor from './useTipTapEditor';

export const useChatHandler = () => {
  const { state: chatState, actions: chatActions } = useChatStore();
  const { state: userState } = useUserStore();
  const { apiKey, workspaceId, sessionId, chatMessages, selectedWorkspace } =
    chatState;
  const {
    user: { userId },
  } = userState;
  const {
    setWorkspaceId,
    setSessionId,
    setActiveWorkspace,
    setActiveSession,
    setChatMessages,
    setSelectedChat,
    setChatFileItems,
    setIsGenerating,
    setFirstTokenReceived,
    setChatFiles,
    setChatImages,
    setNewMessageFiles,
    setShowFilesDisplay,
    setNewMessageImages,
    setIsPromptPickerOpen,
    setIsFilePickerOpen,
    setSelectedTools,
    setToolInUse,
  } = chatActions;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionHeader, setSessionHeader] = useState('');
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const { editor, setUserInput, userInput } = useTipTapEditor();
  const controllerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      setSessionHeader(messages[0]?.content || '');
    } else {
      setSessionHeader(userInput);
    }
  }, [messages, userInput]);

  const handleNewSession = useCallback(
    async props => {
      const { sessionName, instructions, topic } = props;
      const data = await sessionApi.create({
        sessionName,
        instructions,
        topic,
      });
      setActiveSession(data.session);
      setSessionId(data.session._id);
      localStorage.setItem('activeChatSession', JSON.stringify(data.session));
    },
    [setActiveSession, setSessionId]
  );
  const handleNewChat = async () => {
    if (!selectedWorkspace) return;

    setUserInput('');
    setChatMessages([]);
    setSelectedChat(null);
    setChatFileItems([]);

    setIsGenerating(false);
    setFirstTokenReceived(false);

    setChatFiles([]);
    setChatImages([]);
    setNewMessageFiles([]);
    setNewMessageImages([]);
    setShowFilesDisplay(false);
    setIsPromptPickerOpen(false);
    setIsFilePickerOpen(false);

    setSelectedTools([]);
    setToolInUse('none');

    if (selectedWorkspace) {
      // setChatSettings({
      //   model: (selectedWorkspace.default_model ||
      //     "gpt-4-1106-preview") as LLMID,
      //   prompt:
      //     selectedWorkspace.default_prompt ||
      //     "You are a friendly, helpful AI assistant.",
      //   temperature: selectedWorkspace.default_temperature || 0.5,
      //   contextLength: selectedWorkspace.default_context_length || 4096,
      //   includeProfileContext:
      //     selectedWorkspace.include_profile_context || true,
      //   includeWorkspaceInstructions:
      //     selectedWorkspace.include_workspace_instructions || true,
      //   embeddingsProvider:
      //     (selectedWorkspace.embeddings_provider as "openai" | "local") ||
      //     "openai"
      // })
    }

    // return router.push(`/${selectedWorkspace.id}/chat`);
  };

  const handleSaveMessagesToSession = useCallback(async () => {
    try {
      const response = await sessionApi.saveMessage(sessionId, chatMessages);
      setActiveWorkspace(response);
    } catch (error) {
      console.error(error);
    }
  }, [sessionId, chatMessages]);

  const handleGetValidWorkspace = useCallback(async () => {
    try {
      const response = await workspaceApi.getById(workspaceId);
      setActiveWorkspace(response);
    } catch (error) {
      console.error(error);
    }
  }, [workspaceId]);

  const handleGetValidSession = useCallback(async () => {
    try {
      const response = await sessionApi.getById(sessionId);
      setActiveSession(response);
      return response;
    } catch (error) {
      console.error('Error fetching session data:', error);
      throw error;
    }
  }, [sessionId]);

  return {
    handleNewSession,
    handleSaveMessagesToSession,
    handleGetValidWorkspace,
    handleGetValidSession,
    handleNewChat,
  };
};

export default useChatHandler;
