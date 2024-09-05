import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { chatApi } from 'api/Ai/chat-sessions';
import { workspacesApi } from 'api/workspaces';
import { useChatStore, useUserStore } from 'contexts';
import { defaultChatSessionStoreData } from 'store/Slices/helpers';
import { safeParse } from 'utils/format';
import useTipTapEditor from './useTipTapEditor';

export const useChatHandler = (messages, setMessages) => {
  const navigate = useNavigate();
  const {
    state: {
      apiKey,
      userInput,
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
      setActiveSessionId,
      setUserInput,
      setIsMessagesUpdated,
      setFirstMessageReceived,
      setChatMessages,
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
      syncChatMessages,
    },
  } = useChatStore();
  const {
    actions: { setIsRedirectToSignin },
    state: { userId },
  } = useUserStore();

  // const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0); // Initialize message counter
  const controllerRef = useRef(null);

  const { editor, insertContentAndSync } = useTipTapEditor(userInput);

  // const handleContentChange = useCallback(
  //   content => setUserInput(content),
  //   [setUserInput]
  // );
  const clearInput = useCallback(() => setUserInput(''), [setUserInput]);
  const handleGetSessionMessages = useCallback(async () => {
    try {
      // const response = await chatApi.getMessages(sessionId);
      const response = syncChatMessages(sessionId);
      console.log('RESPONSE:', response);
      setMessages([...response]);
    } catch (error) {
      console.error(error);
    }
  }, [sessionId]);
  const handleGetSession = useCallback(async () => {
    try {
      const response = await chatApi.getById(sessionId);
      // response returns an array of sessions so we need to get the first one
      const lastSession = response[0];
      console.log('Setting selected session:', lastSession);
      setSelectedChatSession(lastSession);
      setActiveSessionId(lastSession._id);
      setSessionId(lastSession._id);
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
      setMessageCount(0);
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
          model: 'gpt-4o-mini',
          contextCount: 2,
          maxTokens: 2000,
          temperature: 0.7,
          topP: 1,
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
      toast.error('Please login to continue');
      return;
    }
    if (!userInput.trim()) {
      setError('Please enter your message.');
      toast.error('Please enter your message.');
      return;
    }

    setError('');
    setLoading(true);
    const userMessage = { role: 'user', content: userInput };
    setMessages([...messages, userMessage]);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    const payload = {
      sessionId: sessionId || 'id not provided',
      workspaceId:
        workspaceId ||
        sessionStorage.getItem('workspaceId') ||
        'id not provided',
      prompt: userInput || 'No prompt provided',
      userId: userId || 'id not provided',
      clientApiKey:
        JSON.parse(localStorage.getItem('baseChatStore')).apiKey ||
        'key not provided',
      role: 'user',
      regenerate: isRegenerating,
      signal: controllerRef.current.signal,
      length: messageCount,
    };

    // setMessages(prevMessages => [...prevMessages, userMessage]);
    clearInput();

    const decoder = new TextDecoder('utf-8');
    try {
      const streamResponse = new Response(await chatApi.getStream(payload));
      const reader = streamResponse.body.getReader();
      let assistantMessage = { role: 'assistant', content: '' };

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedValue = decoder.decode(value, { stream: true });
        console.log('Decoded value:', decodedValue);
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

      // Final parsing and formatting of the complete message
      const data = safeParse(
        assistantMessage.content,
        assistantMessage.content
      );
      assistantMessage.content = data.content;
      console.log('Assistant message:', assistantMessage);
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      // setChatMessages(messages);
      // const data = safeParse(
      //   assistantMessage.content,
      //   assistantMessage.content
      // );
      // assistantMessage.content = data.content;
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = assistantMessage;
        return newMessages;
      });
      setMessageCount(prevCount => prevCount + 1);

      setIsMessagesUpdated(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('An error occurred while sending the message.');
    } finally {
      clearInput();
      setLoading(false);
    }
  }, [
    userId,
    userInput,
    setMessages,
    messages,
    sessionId,
    workspaceId,
    isRegenerating,
    messageCount,
    clearInput,
    setIsMessagesUpdated,
  ]);

  const handleRegenerateResponse = useCallback(async () => {
    setIsRegenerating(true);
    insertContentAndSync(messages[messages.length - 2]?.content || '');
    await handleSendMessage();
  }, [messages, handleSendMessage]);

  const handleStop = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return {
    messages,
    chatError: error,
    chatLoading: loading,
    messageCount, // Return messageCount to access it outside
    clearInput,
    handleCreateNewSession,
    handleSendMessage,
    handleRegenerateResponse,
    handleStop,
    handleContentChange: insertContentAndSync, // Use the custom command
    handleGetSessionMessages,
    handleGetSession,
    handleCreateNewWorkspace,
  };
};
