import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaSave } from 'react-icons/fa';
import { settingsApi } from 'api/Ai/chat-items';
import { attachmentsApi } from 'api/Ai/chat-sessions';
import { RCTabs } from 'components/themed';
import { useChatStore } from 'contexts/ChatProvider';
import { useMode } from 'hooks';
import useFileStructure from 'hooks/chat/useFileStructure';
import { useTabManager } from 'hooks/chat/useTabManager';
import { AddPrompt, EditPrompt, PromptSuggest } from './items';
import FileManagementSidebar from './items/sidebar-items/FileManager';

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
  const {
    fileStructure,
    isLoading: fileStructureLoading = false,
    error,
    refreshFileStructure,
    setFileStructure,
  } = useFileStructure(title.toLowerCase());
  const { activeTabs, selectedTab, selectTab } = useTabManager('prompts');

  const [promptFiles, setPromptFiles] = useState(null);
  const [localPrompts, setLocalPrompts] = useState(data || []);
  const [isLoading, setIsLoading] = useState(fileStructureLoading);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const jsonPrompts = await settingsApi.getPromptFiles();
        setPromptFiles(
          jsonPrompts.map(file => {
            return {
              userId: sessionStorage.getItem('userId'),
              workspaceId: sessionStorage.getItem('workspaceId'),
              folderId: folderId,
              name: file.name,
              content: file.content,
              role: file.role,
              description: file.description,
            };
          })
        );
        setLocalPrompts(jsonPrompts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSavePrompt = async promptData => {
    try {
      let savedPrompt;
      if (editingPrompt) {
        savedPrompt = await settingsApi.updatePrompt({
          id: editingPrompt.id,
          userId: JSON.parse(sessionStorage.getItem('userId')),
          workspaceId: JSON.parse(sessionStorage.getItem('workspaceId')),
          folderId: folderId,
          name: promptData.name,
          content: promptData.content,
          role: promptData.role,
          description: promptData.description,
        });
      } else {
        savedPrompt = await settingsApi.createPrompt({
          // id: editingPrompt.id,
          userId: JSON.parse(sessionStorage.getItem('userId')),
          workspaceId: JSON.parse(sessionStorage.getItem('workspaceId')),
          folderId: folders[0].id,
          name: promptData.name,
          content: promptData.content,
          role: promptData.role,
          description: promptData.description,
        });
      }

      const updatedPrompts = editingPrompt
        ? localPrompts.map(p => (p.id === editingPrompt.id ? savedPrompt : p))
        : [...localPrompts, savedPrompt];

      setLocalPrompts(updatedPrompts);
      setPrompts(updatedPrompts);
      localStorage.setItem('customPrompts', JSON.stringify(updatedPrompts));

      await uploadPromptAsFile(savedPrompt);

      setEditingPrompt(null);
      setTab(0); // Return to list view
    } catch (error) {
      console.error('Failed to save prompt:', error);
    }
  };

  const uploadPromptAsFile = async promptData => {
    try {
      const fileContent = JSON.stringify(promptData);
      const fileName = `${promptData.name}.json`;
      const fileBlob = new Blob([fileContent], { type: 'application/json' });
      const fileToUpload = new File([fileBlob], fileName, {
        type: 'application/json',
      });
      const firstFolder = fileStructure.find(item => item.type === 'folder');
      const promptFolderId = firstFolder ? firstFolder.id : null;
      const uploadedFile = await attachmentsApi.uploadFile(fileToUpload, {
        name: fileName,
        userId: JSON.parse(sessionStorage.getItem('userId')),
        workspaceId: JSON.parse(sessionStorage.getItem('workspaceId')),
        folderId: promptFolderId,
        fileId: 'local',
        space: 'prompts',
        contentType: 'application/json',
        size: fileToUpload.size,
      });

      const newFile = {
        ...uploadedFile,
        id: uploadedFile._id,
        name: fileName,
        type: 'prompts',
        space: 'prompts',
        path: uploadedFile.path,
      };

      const createdFile = await attachmentsApi.createFile(newFile);

      console.log('Prompt uploaded as file:', createdFile);

      // setFileStructure(prev => [...prev, { id: createdFile._id, name: createdFile.name, type: 'file' }]);
      refreshFileStructure();
    } catch (error) {
      console.error('Error uploading prompt as file:', error);
    }
  };

  const handleEditPrompt = prompt => {
    setEditingPrompt(prompt);
    setTab(2); // Switch to edit tab
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

  const ErrorFallback = ({ error }) => (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <FileManagementSidebar
            initialFolders={folders}
            initialFiles={files}
            space={title}
            onEditPrompt={handleEditPrompt}
          />
        );
      case 1:
        return <AddPrompt onSave={handleSavePrompt} />;
      case 2:
        return (
          <EditPrompt prompt={editingPrompt} onUpdate={handleSavePrompt} />
        );
      case 3:
        return (
          <PromptSuggest
            prompts={localPrompts}
            setPrompts={setLocalPrompts}
            onImport={handleImportPromptTemplate}
          />
        );
      default:
        return null;
    }
  };

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
        value={selectedTab}
        onChange={(e, newValue) => selectTab(newValue)}
        tabs={activeTabs}
        variant="darkMode"
      />
      <Box mt={2} display="flex" flexDirection={isMobile ? 'column' : 'row'}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {renderContent()}
        </ErrorBoundary>
      </Box>
    </>
  );
};

export default Prompts;
