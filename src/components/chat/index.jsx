/* eslint-disable no-constant-condition */
import { CircularProgress, Grid, Typography } from '@mui/material';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { apiUtils } from '@/lib/apiUtils';
import {
  completions as completionsApi,
  sessions as sessionApi,
  workspaces as workspaceApi,
} from 'api/chat';
import { MessageBox } from 'components/chat/messages';
import {
  ChatWindow,
  MessageContainer,
  StyledChatContainer,
} from 'components/chat/styled';
import { useAuthStore, useChatStore, useUserStore } from 'contexts';
import { useDialog } from 'hooks/useDialog';
import { useMode } from 'hooks/useMode';
import { organizeMessages, safeParse } from 'utils/format';
import { ChatHeader } from './ChatHeader';
import 'styles/ChatStyles.css';
import useChatLogic from './useChatLogic';

const MessageInput = React.lazy(() => import('./inputs/MessageInput'));
const NewSessionDialog = React.lazy(() => import('./NewSessionDialog'));

export async function createNewSession({ sessionName, instructions, topic }) {
  try {
    const newSessionData = await apiUtils.post('/chat/chatSessions/session', {
      sessionName,
      instructions,
      topic,
    });
    return newSessionData;
  } catch (error) {
    console.error('Error creating new session:', error);
  }
}

// const useChatLogic = ({
//   theme,
//   authState,
//   authActions,
//   chatState,
//   chatActions,
//   userState,
//   handleNewSession,
// }) => {
//   const {
//     apiKey,
//     workspaceId,
//     sessionId,
//     activeSession,
//     activeWorkspace,
//     userInput,
//     isMessagesUpdated,
//     isFirstMessageReceived,
//   } = chatState;
//   const { userId } = userState;
//   const { setIsRedirectToSignin } = authActions;
//   const {
//     setWorkspaceId,
//     setSessionId,
//     setActiveWorkspace,
//     setActiveSession,
//     setUserInput,
//     setIsMessagesUpdated,
//     setFirstMessageReceived,
//   } = chatActions;

//   const [messageParts, setMessageParts] = useState([]);
//   const [sessionHeader, setSessionHeader] = useState('');
//   const [messages, setMessages] = useState(() => {
//     const savedMessages = localStorage.getItem('chatMessages');
//     return savedMessages ? JSON.parse(savedMessages) : [];
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isRegenerating, setIsRegenerating] = useState(false);
//   const [isEditorActive, setIsEditorActive] = useState(false);

//   const messagesStartRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const controllerRef = useRef(null);
//   const chatContainerRef = useRef(null);
//   const editorActiveRef = useRef(false);

//   const handleContentChange = content => {
//     setUserInput(content);
//   };

//   const clearInput = () => {
//     setUserInput('');
//   };

//   const handleSaveMessagesToSession = useCallback(async () => {
//     try {
//       const response = await sessionApi.saveMessage(sessionId, messages);
//       setActiveWorkspace(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }, [sessionId, messages, setActiveWorkspace]);

//   const handleGetValidWorkspace = useCallback(async () => {
//     try {
//       const response = await workspaceApi.getById(workspaceId);
//       setActiveWorkspace(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }, [workspaceId, setActiveWorkspace]);

//   const handleGetValidSession = useCallback(async () => {
//     try {
//       const response = await sessionApi.getById(sessionId);
//       setActiveSession(response);
//       return response;
//     } catch (error) {
//       console.error('Error fetching session data:', error);
//       throw error;
//     }
//   }, [sessionId, setActiveSession]);

//   useEffect(() => {
//     if (!workspaceId) {
//       handleGetValidWorkspace();
//       setWorkspaceId(activeWorkspace?._id);
//     }
//   }, [workspaceId, activeWorkspace, handleGetValidWorkspace, setWorkspaceId]);

//   useEffect(() => {
//     if (!sessionId) {
//       handleGetValidSession();
//       setSessionId(activeSession?._id);
//     }
//   }, [sessionId, activeSession, handleGetValidSession, setSessionId]);

//   useEffect(() => {
//     const handleScroll = debounce(() => {
//       if (chatContainerRef.current) {
//         chatContainerRef.current.scrollTop =
//           chatContainerRef.current.scrollHeight;
//       }
//     }, 100);

//     const container = chatContainerRef.current;
//     container.addEventListener('scroll', handleScroll);

//     return () => {
//       container.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (controllerRef.current) {
//         controllerRef.current.abort();
//       }
//     };
//   }, []);

//   const handleSendMessage = useCallback(async () => {
//     if (!localStorage.getItem('userId')) {
//       setError('Please login to continue');
//       setIsRedirectToSignin(true);
//       return;
//     }
//     if (!userInput.trim()) {
//       setError('Please enter your message.');
//       return;
//     }
//     setError('');
//     setLoading(true);

//     if (controllerRef.current) {
//       controllerRef.current.abort();
//     }

//     controllerRef.current = new AbortController();
//     const payload = {
//       sessionId: sessionId || 'id not provided',
//       workspaceId: workspaceId || 'id not provided',
//       regenerate: isRegenerating,
//       prompt: userInput,
//       userId: userId,
//       clientApiKey: localStorage.getItem('apiKey'),
//       role: 'user',
//       signal: controllerRef.current.signal,
//     };
//     setMessages(prevMessages => [
//       ...prevMessages,
//       { role: 'user', content: userInput },
//     ]);
//     clearInput();
//     const decoder = new TextDecoder('utf-8');

//     try {
//       const streamResponse = new Response(
//         await completionsApi.getStream(payload)
//       );
//       const reader = streamResponse.body.getReader();
//       let assistantMessage = { role: 'assistant', content: '' };
//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         const decodedValue = decoder.decode(value, { stream: true });
//         assistantMessage.content += decodedValue;
//         setMessages(prevMessages => {
//           const newMessages = [...prevMessages];
//           const lastMessage = newMessages[newMessages.length - 1];
//           if (lastMessage && lastMessage.role === 'assistant') {
//             newMessages[newMessages.length - 1] = assistantMessage;
//           } else {
//             newMessages.push(assistantMessage);
//           }
//           return newMessages;
//         });
//         setMessageParts(prevParts => [...prevParts, decodedValue]);
//       }
//       localStorage.setItem('chatMessages', JSON.stringify(messages));

//       const data = safeParse(
//         assistantMessage.content,
//         assistantMessage.content
//       );
//       assistantMessage.content = data.content;
//       setMessages(prevMessages => {
//         const newMessages = [...prevMessages];
//         newMessages[newMessages.length - 1] = assistantMessage;
//         return newMessages;
//       });
//       setIsMessagesUpdated(false);
//       clearInput();
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setError('An error occurred while sending the message.');
//     } finally {
//       clearInput();
//       setLoading(false);
//     }
//   }, [
//     userInput,
//     messages,
//     controllerRef,
//     sessionId,
//     workspaceId,
//     apiKey,
//     setIsRedirectToSignin,
//     setError,
//     setLoading,
//     clearInput,
//     setIsMessagesUpdated,
//   ]);

//   const handleRegenerateResponse = useCallback(async () => {
//     setIsRegenerating(true);
//     handleContentChange(messages[messages.length - 2]?.content || '');
//     await handleSendMessage();
//   }, [messages, handleSendMessage]);

//   const handleStop = () => {
//     if (controllerRef.current) {
//       controllerRef.current.abort();
//     }
//   };

//   useEffect(() => {
//     const filterMessagesWithContent = messages => {
//       const seen = new Set();
//       return messages.filter(message => {
//         if (
//           message.content &&
//           !seen.has(message.content) &&
//           message.type !== 'start' &&
//           message.type !== 'end'
//         ) {
//           seen.add(message.content);
//           return true;
//         }
//         return false;
//       });
//     };

//     const localMessages =
//       JSON.parse(localStorage.getItem('chatMessages')) || [];

//     const combinedMessages = [...localMessages, ...messages];

//     const organizedMessages = organizeMessages(combinedMessages);
//     const uniqueMessages = filterMessagesWithContent(organizedMessages);
//     localStorage.setItem('chatMessages', JSON.stringify(uniqueMessages));
//     if (workspaceId && sessionId && messages.length > 0 && !isMessagesUpdated) {
//       handleSaveMessagesToSession();
//       setIsMessagesUpdated(true);
//     }
//   }, [sessionId, messages, handleSaveMessagesToSession, setIsMessagesUpdated]);

//   return {
//     messages,
//     error,
//     loading,
//     sessionHeader,
//     handleSendMessage,
//     handleRegenerateResponse,
//     handleStop,
//     chatContainerRef,
//     messagesStartRef,
//     messagesEndRef,
//     handleContentChange,
//     isEditorActive,
//     setIsEditorActive,
//     editorActiveRef,
//     newSessionDialog: useDialog(),
//     handleNewSession,
//     apiKey,
//     userInput,
//     isFirstMessageReceived,
//     setError,
//   };
// };

export const ChatApp = () => {
  const { theme } = useMode();
  const authStore = useAuthStore();
  const chatStore = useChatStore();
  const userStore = useUserStore();
  const {
    messages,
    error,
    loading,
    sessionHeader,
    handleSendMessage,
    handleRegenerateResponse,
    handleStop,
    chatContainerRef,
    messagesStartRef,
    messagesEndRef,
    handleContentChange,
    isEditorActive,
    setIsEditorActive,
    editorActiveRef,
    newSessionDialog,
    apiKey,
    userInput,
    isFirstMessageReceived,
    setError,
    handleNewSession,
  } = useChatLogic({
    theme,
    authState: authStore.state,
    authActions: authStore.actions,
    chatState: chatStore.state,
    chatActions: chatStore.actions,
    userState: userStore.state,
  });

  return (
    <ChatWindow theme={theme} elevation={3}>
      <StyledChatContainer
        theme={theme}
        ref={chatContainerRef}
        component={Grid}
        item
        xs={12}
      >
        <ChatHeader
          name={sessionHeader || 'Chat Session'}
          handleOpen={newSessionDialog.handleOpen}
        />
        <MessageContainer>
          <div ref={messagesStartRef} />
          <MessageBox messages={messages} />
          <div ref={messagesEndRef} />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          {loading && <CircularProgress />}
        </MessageContainer>
        <MessageInput
          theme={theme}
          apiKey={apiKey}
          disabled={loading}
          handleRegenerateResponse={handleRegenerateResponse}
          handleStop={handleStop}
          handleSendMessage={handleSendMessage}
          setIsEditorActive={setIsEditorActive}
          editorRef={editorActiveRef}
          initialContent={userInput}
          onContentChange={handleContentChange}
          isFirstMessage={isFirstMessageReceived}
          setError={setError}
        />
        <NewSessionDialog
          open={newSessionDialog.open}
          onClose={newSessionDialog.handleClose}
          onCreate={handleNewSession}
          apiKey={apiKey}
          disabled={loading}
          handleRegenerateResponse={handleRegenerateResponse}
          handleStop={handleStop}
          handleSendMessage={handleSendMessage}
          setIsEditorActive={setIsEditorActive}
          editorRef={editorActiveRef}
          initialContent={userInput}
          setUserInput={handleContentChange}
          isFirstMessage={isFirstMessageReceived}
          setError={setError}
        />
      </StyledChatContainer>
    </ChatWindow>
  );
};
