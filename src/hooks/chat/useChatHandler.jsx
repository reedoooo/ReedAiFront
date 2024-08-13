import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  completions as completionsApi,
  sessions as sessionApi,
  workspaces as workspacesApi,
} from 'api/chat';
import { useChatStore, useUserStore } from 'contexts';
import { defaultChatSessionStoreData } from 'store/Slices/helpers';
import { safeParse } from 'utils/format';

export const useChatHandler = () => {
  const navigate = useNavigate();
  const {
    state: {
      apiKey,
      userInput,
      isMessagesUpdated,
      isFirstMessageReceived,
      chatMessages,
      selectedPreset,
      presets,
      sessionHeader,
      sessionId,
      workspaceId,
      isRegenerating,
      workspaces,
    },
    actions: {
      setWorkspaceId,
      setSessionId,
      setSessionHeader,
      setActiveWorkspace,
      setActiveSessionId,
      setUserInput,
      setIsMessagesUpdated,
      setFirstMessageReceived,
      setChatMessages,
      setSelectedPreset,
      createNewChatSession,
      setSelectedChatSession,
      setIsGenerating,
      setChatFileItems,
      setFirstTokenReceived,
      setChatFiles,
      setChatImages,
      setNewMessageFiles,
      setNewMessageImages,
      setShowFilesDisplay,
      setIsPromptPickerOpen,
      setIsFilePickerOpen,
      setSelectedTools,
      setToolInUse,
      setIsRegenerating,
      setWorkspaces,
      setSelectedWorkspace,
    },
  } = useChatStore();
  const {
    actions: { setIsRedirectToSignin },
    state: { userId },
  } = useUserStore();

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null);

  const handleContentChange = useCallback(
    content => setUserInput(content),
    [setUserInput]
  );
  const clearInput = useCallback(() => setUserInput(''), [setUserInput]);
  const handleGetSessionMessages = useCallback(async () => {
    try {
      const response = await sessionApi.getMessages(sessionId);
      console.log('RESPONSE:', response);
      setMessages([...response]);
    } catch (error) {
      console.error(error);
    }
  }, [sessionId]);
  const handleGetSession = useCallback(async () => {
    try {
      const response = await sessionApi.getById(sessionId);
      console.log('Setting selected session:', response);
      setSelectedChatSession(response);
      setActiveSessionId(response._id);
      return response;
    } catch (error) {
      console.error('Error fetching session data:', error);
      throw error;
    }
  }, [sessionId, setActiveSessionId]);
  const handleCreateNewWorkspace = async workspaceData => {
    try {
      const savedWorkspace = await workspacesApi.create(workspaceData);
      console.log('Workspace settings saved:', savedWorkspace);
      setWorkspaces([...workspaces, savedWorkspace]);
      setSelectedWorkspace(savedWorkspace);
      return navigate(`/${savedWorkspace._id}/chat`);
    } catch (error) {
      console.error('Error saving workspace:', error);
    }
  };
  const handleCreateNewSession = async () => {
    try {
      // --- Clear the current session data ---
      setUserInput('');
      setChatMessages([]);
      setSelectedChatSession({
        _id: null,
      });
      setActiveSessionId({
        _id: null,
        messages: [],
      });
      setChatFileItems([]);
      setSessionId(null);
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
      // --- Create a new session with the entered name ---
      const newSessionData = {
        ...defaultChatSessionStoreData(),
        name: sessionHeader || 'New Chat Session',
        topic: sessionHeader || 'New Chat Session',
        prompt: `Starting a new chat session with topic: ${sessionHeader || 'New Chat Session'}.`,
        userId: userId,
        workspaceId: workspaceId,
        summary: '',
        messages: [],
        model: 'gpt-4o-mini',
        active: true,
        settings: {
          contextCount: 15,
          maxTokens: 500,
          temperature: 0.7,
          model: 'gpt-4o-mini',
          topP: 1,
          n: 4,
          debug: false,
          summarizeMode: false,
        },
        apiKey: apiKey,
      };
      createNewChatSession(newSessionData);
      navigate(`/admin/${workspaceId}/chat`);
    } catch (error) {
      console.error('Failed to create new chat session:', error);
      // Optionally handle the error with a user notification or similar
    }
  };
  const handleSendMessage = useCallback(async () => {
    if (!userId) {
      setError('Please login to continue');
      setIsRedirectToSignin(true);
      return;
    }
    if (!userInput.trim()) {
      setError('Please enter your message.');
      return;
    }

    setError('');
    setLoading(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    const payload = {
      sessionId: sessionId || 'id not provided',
      workspaceId: workspaceId || 'id not provided',
      regenerate: isRegenerating,
      prompt: userInput,
      userId: userId,
      clientApiKey: JSON.parse(localStorage.getItem('baseChatStore')).apiKey,
      role: 'user',
      signal: controllerRef.current.signal,
    };

    const newMessage = { role: 'user', content: userInput };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    clearInput();

    const decoder = new TextDecoder('utf-8');
    try {
      const streamResponse = new Response(
        await completionsApi.getStream(payload)
      );
      const reader = streamResponse.body.getReader();
      let assistantMessage = { role: 'assistant', content: '' };

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedValue = decoder.decode(value, { stream: true });
        assistantMessage.content += decodedValue;
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            newMessages[newMessages.length - 1] = assistantMessage;
          } else {
            newMessages.push(assistantMessage);
          }
          return newMessages;
        });
      }

      setChatMessages(messages);
      const data = safeParse(
        assistantMessage.content,
        assistantMessage.content
      );
      assistantMessage.content = data.content;
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = assistantMessage;
        return newMessages;
      });
      // setChatMessages(prevMessages => {
      //   const newMessages = [...prevMessages];
      //   newMessages[newMessages.length - 1] = assistantMessage;
      //   return newMessages;
      // });
      setIsMessagesUpdated(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('An error occurred while sending the message.');
    } finally {
      clearInput();
      setLoading(false);
    }
  }, [
    userInput,
    messages,
    controllerRef,
    sessionId,
    workspaceId,
    isRegenerating,
    userId,
    setIsRedirectToSignin,
    clearInput,
    setIsMessagesUpdated,
    setChatMessages,
    safeParse,
  ]);

  const handleRegenerateResponse = useCallback(async () => {
    setIsRegenerating(true);
    handleContentChange(messages[messages.length - 2]?.content || '');
    await handleSendMessage();
  }, [messages, handleSendMessage]);

  const handleStop = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return {
    messages,
    error,
    loading,
    clearInput,
    handleCreateNewSession,
    handleSendMessage,
    handleRegenerateResponse,
    handleStop,
    handleContentChange,
    handleGetSessionMessages,
    handleGetSession,
    handleCreateNewWorkspace,
  };
};
