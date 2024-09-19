import { createParser } from 'eventsource-parser';
import { useCallback, useMemo, useRef, useState } from 'react';
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
  const controllerRef = useRef(null);

  const {
    state: {
      apiKey,
      userInput,
      sessionHeader,
      sessionId,
      workspaceId,
      isRegenerating,
      workspaces,
      streamingMessageIndex,
      isStreaming,
    },
    actions: {
      setWorkspaceId,
      setSessionId,
      setSessionHeader,
      setUserInput,
      setIsMessagesUpdated,
      setFirstMessageReceived,
      setStreamingMessageIndex,
      setIsStreaming,
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

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0); // Initialize message counter

  const { editor, insertContentAndSync } = useTipTapEditor(userInput);

  const clearInput = useCallback(() => setUserInput(''), [setUserInput]);

  // const handleGetSessionMessages = useCallback(async () => {
  //   try {
  //     if (!sessionId) return;
  //     syncChatMessages(sessionId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [sessionId, syncChatMessages]);
  const handleGetSessionMessages = useCallback(async () => {
    try {
      const response = await chatApi.getMessages(sessionId);
      // const response = await syncChatMessages(sessionId);
      if (!response) {
        return;
      }
      console.log('RESPONSE:', response);
    } catch (error) {
      console.error(error);
    }
  }, [sessionId]);
  const handleGetSession = useCallback(async () => {
    try {
      if (!sessionId) {
        throw new Error('Session ID not provided');
      }
      const response = await chatApi.getById(sessionId);
      const lastSession = response[0];
      console.log('Setting selected session:', lastSession);
      setSelectedChatSession(lastSession);
      setSessionId(lastSession._id);
      return response;
    } catch (error) {
      console.error('Error fetching session data:', error);
      throw error;
    }
  }, [sessionId, setSelectedChatSession, setSessionId]);
  const handleCreateNewWorkspace = useCallback(
    async workspaceData => {
      try {
        const savedWorkspace = await workspacesApi.create(workspaceData);
        setWorkspaces([...workspaces, savedWorkspace]);
        setSelectedWorkspace(savedWorkspace);
        navigate(`/${savedWorkspace._id}/chat`);
      } catch (err) {
        console.error('Error saving workspace:', err);
      }
    },
    [navigate, setSelectedWorkspace, setWorkspaces, workspaces]
  );
  const handleCreateNewSession = useCallback(async () => {
    try {
      setMessageCount(0);
      // --- Clear the current session data ---
      clearInput();
      // setMessages([]);
      setChatMessages([]);
      // remove messages from local storage
      // localStorage.removeItem('chatMessages');
      setSelectedChatSession(null);
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
      // createNewChatSession(newSessionData);
      navigate(`/admin/chat/${workspaceId}`);
    } catch (err) {
      console.error('Failed to create new chat session:', err);
    }
  }, [
    apiKey,
    clearInput,
    // createNewChatSession,
    navigate,
    sessionHeader,
    setChatFileItems,
    setChatFiles,
    setChatImages,
    setChatMessages,
    setFirstTokenReceived,
    setIsFilePickerOpen,
    setIsGenerating,
    setIsPromptPickerOpen,
    // setMessages,
    setNewMessageFiles,
    setNewMessageImages,
    setSelectedChatSession,
    setSelectedTools,
    setSessionId,
    setShowFilesDisplay,
    setToolInUse,
    userId,
    workspaceId,
  ]);

  // const handleSendMessage = useCallback(async () => {
  //   if (!userId) {
  //     setError('Please login to continue');
  //     toast.error('Please login to continue');
  //     return;
  //   }
  //   if (!userInput.trim()) {
  //     setError('Please enter your message.');
  //     toast.error('Please enter your message.');
  //     return;
  //   }

  //   setError('');
  //   setLoading(true);
  //   setIsStreaming(true);

  //   const userMessage = { role: 'user', content: userInput };
  //   setMessages(prev => [...prev, userMessage]);
  //   clearInput();

  //   if (controllerRef.current) controllerRef.current.abort();
  //   controllerRef.current = new AbortController();

  //   const payload = {
  //     sessionId: sessionId || 'id not provided',
  //     workspaceId:
  //       workspaceId ||
  //       sessionStorage.getItem('workspaceId') ||
  //       'id not provided',
  //     prompt: userInput || 'No prompt provided',
  //     userId: userId || 'id not provided',
  //     clientApiKey: sessionStorage.getItem('apiKey') || 'key not provided',
  //     role: 'user',
  //     regenerate: isRegenerating,
  //     signal: controllerRef.current.signal,
  //     length: messageCount,
  //   };

  //   let assistantMessage = {
  //     role: 'assistant',
  //     content: '',
  //     isStreaming: true,
  //   };

  //   let assistantMessageIndex = -1;

  //   try {
  //     const response = await chatApi.getStreamCompletion(payload);
  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder('utf-8');

  //     // Add the assistant message and store its index
  //     setMessages(prevMessages => {
  //       const newMessages = [...prevMessages, assistantMessage];
  //       assistantMessageIndex = newMessages.length - 1; // Save index of assistant message
  //       return newMessages;
  //     });

  //     let done = false;

  //     const parser = createParser(event => {
  //       if (event.type === 'event') {
  //         const data = event.data;
  //         if (data === '[DONE]') {
  //           done = true;
  //           return;
  //         }
  //         try {
  //           const json = JSON.parse(data);
  //           const content = json.content || '';
  //           assistantMessage.content += content;

  //           // Update the assistant message using the local index
  //           setMessages(prevMessages => {
  //             const newMessages = [...prevMessages];
  //             newMessages[assistantMessageIndex] = {
  //               ...newMessages[assistantMessageIndex],
  //               content: assistantMessage.content,
  //               isStreaming: true,
  //             };
  //             return newMessages;
  //           });
  //         } catch (e) {
  //           console.error('Error parsing JSON:', e);
  //         }
  //       }
  //     });

  //     while (!done) {
  //       const { value, done: doneReading } = await reader.read();
  //       if (doneReading) break;
  //       const chunkValue = decoder.decode(value);
  //       parser.feed(chunkValue);
  //     }

  //     assistantMessage.isStreaming = false;
  //     const data = safeParse(
  //       assistantMessage.content,
  //       assistantMessage.content
  //     );
  //     assistantMessage.content = data.content;
  //     setMessages(prevMessages => {
  //       const newMessages = [...prevMessages];
  //       newMessages[assistantMessageIndex] = assistantMessage;
  //       return newMessages;
  //     });

  //     setMessageCount(prev => prev + 1);
  //     setIsMessagesUpdated(false);
  //     setIsStreaming(false);
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     setError('An error occurred while sending the message.');
  //     setIsStreaming(false);
  //   } finally {
  //     clearInput();
  //     setLoading(false);
  //     setIsStreaming(false);
  //   }
  // }, [
  //   clearInput,
  //   isRegenerating,
  //   messageCount,
  //   sessionId,
  //   setIsMessagesUpdated,
  //   setIsStreaming,
  //   setMessages,
  //   userId,
  //   userInput,
  //   workspaceId,
  // ]);
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

    setIsStreaming(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    const payload = {
      sessionId: sessionId || 'id not provided',
      workspaceId:
        workspaceId ||
        JSON.parse(sessionStorage.getItem('workspaceId')) ||
        'id not provided',
      prompt: userInput || 'No prompt provided',
      userId: userId || 'id not provided',
      clientApiKey: sessionStorage.getItem('apiKey') || 'key not provided',
      role: 'user',
      regenerate: isRegenerating,
      signal: controllerRef.current.signal,
      length: messageCount,
    };

    // setMessages(prevMessages => [...prevMessages, userMessage]);
    clearInput();

    const decoder = new TextDecoder('utf-8');
    let assistantMessage = {
      role: 'assistant',
      content: '',
      isStreaming: true,
    };

    try {
      const streamResponse = new Response(
        await chatApi.getStreamCompletion(payload)
      );
      const reader = streamResponse.body.getReader();
      // **1. Add the assistant message with isStreaming: true**
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, assistantMessage];
        setStreamingMessageIndex(newMessages.length - 1); // Save index of streaming message
        return newMessages;
      });
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedValue = decoder.decode(value, { stream: true });
        assistantMessage.content += decodedValue;

        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage?.role === 'assistant') {
            newMessages[newMessages.length - 1] = {
              ...lastMessage,
              content: assistantMessage.content,
              isStreaming: true, // Update the isStreaming property
            };
          } else {
            console.log('Adding new message:', assistantMessage);
            newMessages.push({ ...assistantMessage, isStreaming: true }); // Include isStreaming
          }
          return newMessages;
        });
      }

      // Final parsing and formatting of the complete message
      // Final parsing and formatting of the complete message
      const data = safeParse(
        assistantMessage.content,
        assistantMessage.content
      );
      assistantMessage.content = data.content;

      // Replace streaming message with final content
      // setMessages(prevMessages => {
      //   const newMessages = [...prevMessages];
      //   newMessages[streamingMessageIndex] = assistantMessage;
      //   return newMessages;
      // });
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = {
          ...assistantMessage,
          isStreaming: false, // Set isStreaming to false
        };
        console.log('Updated messages 2:', newMessages);
        return newMessages;
      });
      console.log('Updated messages 3:', messages);
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      console.log('Assistant message:', assistantMessage);
      // localStorage.setItem('chatMessages', JSON.stringify(messages));
      // setMessages(prevMessages => {
      //   const newMessages = [...prevMessages];
      //   newMessages[newMessages.length - 1] = assistantMessage;
      //   return newMessages;
      // });
      setMessageCount(prev => prev + 1);
      setIsMessagesUpdated(false);
      setIsStreaming(false); // Set streaming to false when done
    } catch (error) {
      console.error('Error sending message:', error);
      setError('An error occurred while sending the message.');
      setIsStreaming(false); // Ensure isStreaming is false on error
    } finally {
      clearInput();
      setLoading(false);
      setIsStreaming(false); // Stop streaming
    }
  }, [
    userId,
    userInput,
    setMessages,
    messages,
    setIsStreaming,
    sessionId,
    workspaceId,
    isRegenerating,
    messageCount,
    clearInput,
    setIsMessagesUpdated,
    setStreamingMessageIndex,
  ]);

  const handleRegenerateResponse = useCallback(async () => {
    setIsRegenerating(true);
    const lastUserMessage = messages[messages.length - 2]?.content || '';
    insertContentAndSync(lastUserMessage);
    await handleSendMessage();
  }, [handleSendMessage, insertContentAndSync, messages, setIsRegenerating]);

  const handleStop = useCallback(() => {
    if (controllerRef.current) controllerRef.current.abort();
    setIsStreaming(false);
  }, [setIsStreaming]);

  return useMemo(
    () => ({
      messages,
      chatError: error,
      chatLoading: loading,
      chatStreaming: isStreaming,
      messageCount, // Return messageCount to access it outside
      controllerRef,
      clearInput,
      handleCreateNewSession,
      handleSendMessage,
      handleRegenerateResponse,
      handleStop,
      handleContentChange: insertContentAndSync, // Use the custom command
      handleGetSessionMessages,
      handleGetSession,
      handleCreateNewWorkspace,
    }),
    [
      messages,
      error,
      loading,
      isStreaming,
      messageCount,
      controllerRef,
      clearInput,
      handleCreateNewSession,
      handleSendMessage,
      handleRegenerateResponse,
      handleStop,
      insertContentAndSync,
      handleGetSessionMessages,
      handleGetSession,
      handleCreateNewWorkspace,
    ]
  );
};
