import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react';
import { foldersApi, workspacesApi } from 'api/workspaces';
import { useChatStore } from 'contexts/ChatProvider';
import { useChatHandler } from 'hooks/chat';
import CreateFile from '../file-items/file-create';

const SidebarCreateButtons = ({ contentType, hasData }) => {
  const {
    state: { profile, selectedWorkspace, folders },
    actions: { setFolders },
  } = useChatStore();
  const { handleCreateNewSession } = useChatHandler();

  const [isCreatingPrompt, setIsCreatingPrompt] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingAssistant, setIsCreatingAssistant] = useState(false);
  const [isCreatingTool, setIsCreatingTool] = useState(false);

  const handleCreateFolder = async () => {
    if (!profile || !selectedWorkspace) return;

    const createdFolder = await foldersApi.create({
      user_id: profile.user_id,
      workspace_id: selectedWorkspace.id,
      name: 'New Folder',
      description: '',
      type: contentType,
    });
    setFolders([...folders, createdFolder]);
  };

  const getCreateFunction = () => {
    switch (contentType) {
      case 'chats':
        return () => handleCreateNewSession();
      case 'prompts':
        return () => setIsCreatingPrompt(true);
      case 'files':
        return () => setIsCreatingFile(true);
      case 'assistants':
        return () => setIsCreatingAssistant(true);
      case 'tools':
        return () => setIsCreatingTool(true);
      default:
        return () => {};
    }
  };

  return (
    <Box display="flex" width="100%" gap={2}>
      <Button
        variant="contained"
        startIcon={<AddIcon size={20} />}
        onClick={getCreateFunction()}
        sx={{ height: 36, flexGrow: 1 }}
      >
        New{' '}
        {contentType.charAt(0).toUpperCase() +
          contentType.slice(1, contentType.length - 1)}
      </Button>

      {hasData && (
        <Button
          variant="contained"
          onClick={handleCreateFolder}
          sx={{ minWidth: 36, padding: 1 }}
        >
          <CreateNewFolderIcon size={20} />
        </Button>
      )}

      {/* {isCreatingPrompt && (
        <CreatePrompt
          isOpen={isCreatingPrompt}
          onOpenChange={setIsCreatingPrompt}
        />
      )} */}

      {isCreatingFile && (
        <CreateFile isOpen={isCreatingFile} onOpenChange={setIsCreatingFile} />
      )}

      {/* {isCreatingAssistant && (
        <CreateAssistant
          isOpen={isCreatingAssistant}
          onOpenChange={setIsCreatingAssistant}
        />
      )} */}

      {/* {isCreatingTool && (
        <CreateTool isOpen={isCreatingTool} onOpenChange={setIsCreatingTool} />
      )} */}
    </Box>
  );
};

export default SidebarCreateButtons;
