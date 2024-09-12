import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { settingsApi } from 'api/Ai/chat-items';
import { RCTabs } from 'components/themed';
import { useChatStore } from 'contexts/ChatProvider';
import { useCopyToClipboard, useMode } from 'hooks';
import { AddPrompt, PromptSuggest } from './items';
import EditPrompt from './items/prompt-items/prompt-edit';
import FileManagementSidebar from './items/sidebar-items/FileManager';

const addCustomPrompt = async (name, content) => {
  const url = 'http://localhost:3001/api/chat/files/add/prompt'; // Replace with your actual endpoint

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Prompt added successfully:', result);
    // Optionally, you can update your state or local storage here if needed
  } catch (error) {
    console.error('Error adding custom prompt:', error);
  }
};

export const Prompts = props => {
  const { folders = [], folderId = '', title = '', prompts = [] } = props;
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    // state: { prompts },
    actions: { setPrompts, setSelectedPrompt },
  } = useChatStore();
  const [tempPromptKey, setTempPromptKey] = useState('');
  const [tempPromptValue, setTempPromptValue] = useState('');
  const [modalMode, setModalMode] = useState('');
  const [tempModifiedItem, setTempModifiedItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ title: '', content: '' });

  const handleAddPrompt = async () => {
    if (newPrompt.title && newPrompt.content) {
      const updatedPrompts = [...prompts, newPrompt];
      setPrompts(updatedPrompts);
      localStorage.setItem('customPrompts', JSON.stringify(updatedPrompts));
      await addCustomPrompt(newPrompt.title, newPrompt.content);
      setNewPrompt({ title: '', content: '' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonPromptFile =
          await settingsApi.getFileByName('prompt_files.json');
        setPrompts(jsonPromptFile);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [setPrompts]);

  const changeShowModal = (mode, selected = { key: '', value: '' }) => {
    if (mode === 'add') {
      setTempPromptKey('');
      setTempPromptValue('');
    } else if (mode === 'modify') {
      setTempModifiedItem({ ...selected });
      setTempPromptKey(selected.key);
      setTempPromptValue(selected.value);
    } else if (mode === 'local_import') {
      setTempPromptKey('local_import');
      setTempPromptValue('');
    }
    setShowModal(!showModal);
    setModalMode(mode);
  };
  const importPromptTemplate = () => {
    try {
      const jsonData = JSON.parse(tempPromptValue);
      for (const i of jsonData) {
        let safe = true;
        for (const j of prompts) {
          if (j.key === i.key) {
            alert(`Skipped due to duplicate title: ${i.key}`);
            safe = false;
            break;
          }
          if (j.value === i.value) {
            alert(`Skipped due to duplicate content: ${i.key}`);
            safe = false;
            break;
          }
        }
        if (safe) setPrompts([{ key: i.key, value: i.value }, ...prompts]);
      }
      alert('Import successful');
      changeShowModal('');
    } catch {
      alert('Invalid JSON format, please check');
      changeShowModal('');
    }
  };
  const exportPromptTemplate = () => {
    const jsonDataStr = JSON.stringify(prompts);
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
      // const response = await fetch(downloadURL);
      const response = await fetch('/static/chatgpt-prompts-custom.json')
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'chatgpt-prompts-custom.json';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      const jsonData = await response.json();
      setTempPromptValue(JSON.stringify(jsonData));
      importPromptTemplate();
    } catch {
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
        <IconButton>
          <FaSave style={{ float: 'right', cursor: 'pointer' }} />
        </IconButton>
      </Box>

      <RCTabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        tabs={tabs}
        variant="darkMode"
      />
      <Box mt={2} display="flex" alignItems="center">
        {/* <SidebarCreateButtons contentType={'files'} hasData={data.length > 0} /> */}
        {tab === 0 && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FileManagementSidebar folders={folders} files={prompts} />
          </ErrorBoundary>
        )}
        {tab === 1 && (
          <AddPrompt
            fileName={null}
            fileContent={null}
            setFileName={name =>
              setNewPrompt(prev => ({ ...prev, name: name }))
            }
            setFileContent={content =>
              setNewPrompt(prev => ({ ...prev, content }))
            }
          />
        )}
        {tab === 2 && (
          <EditPrompt
            fileName={newPrompt.name}
            fileContent={newPrompt.content}
            setFileName={name =>
              setNewPrompt(prev => ({ ...prev, name: name }))
            }
            setFileContent={content =>
              setNewPrompt(prev => ({ ...prev, content }))
            }
          />
        )}
        {tab === 3 && (
          <PromptSuggest prompts={prompts} setPrompts={setPrompts} />
        )}
      </Box>
    </>
  );
};

export default Prompts;
