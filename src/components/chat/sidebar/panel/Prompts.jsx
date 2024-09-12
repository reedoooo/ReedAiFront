import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { settingsApi } from 'api/Ai/chat-items';
import { attachmentsApi } from 'api/Ai/chat-sessions';
import { RCTabs } from 'components/themed';
import { useChatStore } from 'contexts/ChatProvider';
import { useCopyToClipboard, useMode } from 'hooks';
import { AddPrompt, EditPrompt, PromptSuggest } from './items';
import FileManagementSidebar from './items/sidebar-items/FileManager';

// const addCustomPrompt = async (name, content) => {
//   const url = 'http://localhost:3001/api/chat/files/add/prompt'; // Replace with your actual endpoint

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, content }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log('Prompt added successfully:', result);
//     // Optionally, you can update your state or local storage here if needed
//   } catch (error) {
//     console.error('Error adding custom prompt:', error);
//   }
// };

export const Prompts = props => {
  const {
    folders = [],
    folderId = '',
    title = '',
    files = [],
    data = [],
  } = props;
  const [tab, setTab] = useState(0);
  const { theme } = useMode();
  const {
    actions: { setPrompts, setSelectedPrompt },
  } = useChatStore();
  const [promptFiles, setPromptFiles] = useState(null);
  const [localPrompts, setLocalPrompts] = useState(data || []);
  const [newPrompt, setNewPrompt] = useState({
    name: '',
    content: '',
    role: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const jsonPrompts = await settingsApi.getPromptFiles();
        setPromptFiles(jsonPrompts);
        setLocalPrompts(jsonPrompts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddPrompt = async () => {
    if (
      newPrompt.name &&
      newPrompt.content &&
      newPrompt.role &&
      newPrompt.description
    ) {
      try {
        const promptData = {
          name: newPrompt.name,
          content: newPrompt.content,
          role: newPrompt.role,
          description: newPrompt.description,
        };
        console.log('Adding prompt:', promptData);
        const savedPrompt = await settingsApi.createPrompt(promptData);
        const updatedPrompts = [...localPrompts, savedPrompt];
        setLocalPrompts(updatedPrompts);
        setPrompts(updatedPrompts);
        localStorage.setItem('customPrompts', JSON.stringify(updatedPrompts));
        setNewPrompt({ name: '', content: '', role: '', description: '' });
      } catch (error) {
        console.error('Failed to add prompt:', error);
      }
    }
  };

  const handleImportPromptTemplate = jsonData => {
    try {
      const parsedData = JSON.parse(jsonData);
      const updatedPrompts = [...localPrompts];
      parsedData.forEach(item => {
        if (
          !localPrompts.some(
            p => p.name === item.name || p.content === item.content
          )
        ) {
          updatedPrompts.push(item);
        } else {
          console.warn(`Skipped duplicate prompt: ${item.name}`);
        }
      });
      setLocalPrompts(updatedPrompts);
      setPrompts(updatedPrompts);
      localStorage.setItem('customPrompts', JSON.stringify(updatedPrompts));
      alert('Import successful');
    } catch (error) {
      console.error('Invalid JSON format:', error);
      alert('Invalid JSON format, please check');
    }
  };

  const exportPromptTemplate = () => {
    const jsonDataStr = JSON.stringify(localPrompts);
    const blob = new Blob([jsonDataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ChatGPTPromptTemplate.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPromptTemplate = async () => {
    try {
      const response = await fetch('/static/chatgpt-prompts-custom.json');
      const jsonData = await response.json();
      handleImportPromptTemplate(jsonData);
    } catch (error) {
      console.error('Error downloading prompt template:', error);
      alert('Network error or invalid JSON file');
    }
  };

  const ErrorFallback = ({ error }) => (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
  const tabs = [
    { label: 'List', value: 0 },
    { label: 'Add Prompt', value: 1 },
    { label: 'Edit Prompt', value: 2 },
    { label: 'Prompt Suggest', value: 3 },
  ];

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ color: 'white', mx: '12px' }}>
          Prompts
        </Typography>
        <IconButton onClick={exportPromptTemplate}>
          <FaSave style={{ float: 'right', cursor: 'pointer' }} />
        </IconButton>
      </Box>

      <RCTabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        tabs={tabs}
        variant="darkMode"
      />
      <Box mt={2} display="flex" flexDirection={isMobile ? 'column' : 'row'}>
        {' '}
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
        {tab === 1 && (
          <AddPrompt
            fileName={newPrompt.name}
            fileContent={newPrompt.content}
            fileRole={newPrompt.role}
            fileDescription={newPrompt.description}
            setFileName={name => setNewPrompt(prev => ({ ...prev, name }))}
            setFileContent={content =>
              setNewPrompt(prev => ({ ...prev, content }))
            }
            setFileRole={role => setNewPrompt(prev => ({ ...prev, role }))}
            setFileDescription={description =>
              setNewPrompt(prev => ({ ...prev, description }))
            }
            onSave={handleAddPrompt}
          />
        )}
        {tab === 2 && (
          <EditPrompt
            fileName={newPrompt.name}
            fileContent={newPrompt.content}
            fileRole={newPrompt.role}
            fileDescription={newPrompt.description}
            setFileName={name => setNewPrompt(prev => ({ ...prev, name }))}
            setFileContent={content =>
              setNewPrompt(prev => ({ ...prev, content }))
            }
            setFileRole={role => setNewPrompt(prev => ({ ...prev, role }))}
            setFileDescription={description =>
              setNewPrompt(prev => ({ ...prev, description }))
            }
            onUpdate={handleAddPrompt}
          />
        )}
        {tab === 3 && (
          <PromptSuggest
            prompts={localPrompts}
            setPrompts={setLocalPrompts}
            onImport={handleImportPromptTemplate}
          />
        )}
      </Box>
    </>
  );
};

export default Prompts;
