import { Box, CircularProgress, Portal } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { ChatSidebar } from 'components/chat/sidebar';
import { useAuthStore } from 'contexts/AuthProvider';
import { useChatStore } from 'contexts/ChatProvider';
import { useUserStore } from 'contexts/UserProvider';
import useMode from 'hooks/useMode';
import { getLoadType } from 'utils/navigation';
import LoadingOverlay from './components/LoadingStepsOverlay';

const initialSections = [
  {
    title: 'User Setup',
    steps: [
      { label: 'Checking for active user', completed: false },
      { label: 'Setting user profile', completed: false },
    ],
  },
  {
    title: 'Workspace Setup',
    steps: [
      { label: 'Setting up workspaces', completed: false },
      { label: 'Checking for selected workspace', completed: false },
      { label: 'Setting up assistants', completed: false },
    ],
  },
  {
    title: 'Data Loading',
    steps: [
      { label: 'Setting up collections', completed: false },
      { label: 'Setting workspace folder', completed: false },
      { label: 'Setting workspace files', completed: false },
      { label: 'Setting workspace prompt', completed: false },
      { label: 'Setting tools', completed: false },
    ],
  },
  {
    title: 'Chat Setup',
    steps: [
      { label: 'Checking for active user chat session', completed: false },
      { label: 'Setting active user chat session', completed: false },
      { label: 'Setting chat session messages', completed: false },
      { label: 'Setting chat settings', completed: false },
      { label: 'Saving chat setup settings', completed: false },
    ],
  },
];

const ChatLayout = () => {
  const { theme } = useMode();
  const navigation = useNavigation();
  const loadType = getLoadType(navigation);
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const chatStore = useChatStore();
  const boxRef = useRef(null);
  const topCheckboxRef = useRef(null);

  const [state, setState] = useState({
    isLoggedIn: false,
    isApiKeyValid: false,
    loading: true,
    loadingSections: initialSections,
  });
  const { isLoggedIn, isApiKeyValid, loading, loadingSections } = state;

  const updateStep = useCallback((sectionIndex, stepIndex, completed) => {
    setState(prevState => {
      const newSections = [...prevState.loadingSections];
      if (!newSections[sectionIndex]) return prevState;
      newSections[sectionIndex].steps[stepIndex].completed = completed;
      return { ...prevState, loadingSections: newSections };
    });
  }, []);

  const checkUser = useCallback(() => !!localStorage.getItem('userId'), []);
  const checkApiKey = useCallback(() => !!localStorage.getItem('apiKey'), []);

  useEffect(() => {
    const handleStorageChange = () => {
      setState(prevState => ({
        ...prevState,
        isLoggedIn: checkUser(),
        isApiKeyValid: checkApiKey(),
      }));
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkUser, checkApiKey]);

  const fetchData = useCallback(async () => {
    setState(prevState => ({ ...prevState, loading: true }));

    try {
      updateStep(0, 0, true); // Checking for active user
      updateStep(0, 1, true); // Setting user profile
      const storedUserData = JSON.parse(localStorage.getItem('userStorage'));
      storedUserData.user.profile && updateStep(1, 0, true); // Setting up workspaces
      storedUserData.user.chatSessions && updateStep(1, 1, true); // Checking for selected workspace
      storedUserData.user.assistants && updateStep(1, 2, true); // Setting up assistants
      storedUserData.user.collections && updateStep(2, 0, true); // Setting up collections
      storedUserData.user.folders && updateStep(2, 1, true); // Setting workspace folder
      storedUserData.user.files && updateStep(2, 2, true); // Setting workspace files
      storedUserData.user.presetData && updateStep(2, 3, true); // Setting workspace prompt
      storedUserData.user.toolData && updateStep(2, 4, true); // Setting tools
      storedUserData.user.modelData && updateStep(2, 5, true); // Setting models
      // Set chat settings
      chatStore.actions?.setChatSettings({
        model: 'gpt-4-1106-preview',
        prompt:
          storedUserData.user.workspace?.default_prompt ||
          'You are a friendly, helpful AI assistant.',
        temperature: storedUserData.user.workspace?.default_temperature || 0.5,
        contextLength:
          storedUserData.user.workspace?.default_context_length || 4096,
        includeProfileContext:
          storedUserData.user.workspace?.include_profile_context || true,
        includeWorkspaceInstructions:
          storedUserData.user.workspace?.include_workspace_instructions || true,
        embeddingsProvider:
          storedUserData.user.workspace?.embeddings_provider || 'openai',
      });
      updateStep(3, 3, true); // Setting chat settings

      updateStep(3, 4, true); // Saving chat setup settings
      storedUserData.user.chatSessions[0].active && updateStep(4, 0, true); // Checking for active user chat session
      updateStep(4, 1, true); // Setting active user chat session
      updateStep(4, 2, true); // Setting chat session messages
      updateStep(4, 3, true); // Setting chat settings
      updateStep(4, 4, true); // Saving chat setup settings
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state here
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  }, [chatStore, updateStep]);
  useEffect(() => {
    fetchData();
  }, []);
  if (loadType === 'lazy') {
    console.log('lazy');
  } else if (loadType === 'normal') {
    console.log('normal');
    return <CircularProgress />;
  } else if (loadType === 'redirect') {
    console.log('redirect');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LoadingOverlay loading={loading} sections={loadingSections} />
      <>
        <Portal>
          <Box sx={{ padding: '4px', maxHeight: 'calc(100% - 16px)' }}>
            <ChatSidebar />
          </Box>
        </Portal>
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: '60px', // Adjust to match the sidebar padding
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - 40px)', // Assuming the sidebar width is 240px + 16px padding
          }}
        >
          <Outlet />
        </Box>
      </>
    </Box>
  );
};

export default ChatLayout;
