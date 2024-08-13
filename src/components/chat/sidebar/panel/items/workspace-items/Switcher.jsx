import { IconBuilding, IconHome, IconPlus } from '@mui/icons-material';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useChatLogic } from 'hooks/chat';

const WorkspaceSwitcher = () => {
  useHotkey(';', () => setOpen(prevState => !prevState));
  const navigate = useNavigate();
  const {
    workspaces,
    workspaceImages,
    selectedWorkspace,
    setSelectedWorkspace,
    setWorkspaces,
  } = useChatStore();
  const { handleNewChat } = useChatLogic();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!selectedWorkspace) return;
    setValue(selectedWorkspace.id);
  }, [selectedWorkspace]);

  const handleCreateWorkspace = async () => {
    if (!selectedWorkspace) return;

    const createdWorkspace = await createWorkspace({
      user_id: selectedWorkspace.user_id,
      default_context_length: selectedWorkspace.default_context_length,
      default_model: selectedWorkspace.default_model,
      default_prompt: selectedWorkspace.default_prompt,
      default_temperature: selectedWorkspace.default_temperature,
      description: '',
      embeddings_provider: 'openai',
      include_profile_context: selectedWorkspace.include_profile_context,
      include_workspace_instructions:
        selectedWorkspace.include_workspace_instructions,
      instructions: selectedWorkspace.instructions,
      is_home: false,
      name: 'New Workspace',
    });

    setWorkspaces([...workspaces, createdWorkspace]);
    setSelectedWorkspace(createdWorkspace);
    setOpen(false);
    router.push(`/${createdWorkspace.id}/chat`);
  };

  const getWorkspaceName = workspaceId => {
    const workspace = workspaces.find(
      workspace => workspace.id === workspaceId
    );
    return workspace ? workspace.name : '';
  };

  const handleSelect = workspaceId => {
    const workspace = workspaces.find(
      workspace => workspace.id === workspaceId
    );
    if (!workspace) return;
    setSelectedWorkspace(workspace);
    setOpen(false);
    router.push(`/${workspace.id}/chat`);
  };

  const workspaceImage = workspaceImages.find(
    image => image.workspaceId === selectedWorkspace?.id
  );

  const imageSrc = workspaceImage
    ? workspaceImage.url
    : selectedWorkspace?.is_home
      ? ''
      : '';

  const IconComponent = selectedWorkspace?.is_home ? IconHome : IconBuilding;

  return (
    <Popover open={open} onClose={() => setOpen(false)}>
      <PopoverTrigger>
        <Button onClick={() => setOpen(true)}>
          {selectedWorkspace && <img src={imageSrc} alt="Workspace" />}
          {getWorkspaceName(value) || 'Select workspace...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Button onClick={handleCreateWorkspace}>
          <IconPlus />
          New Workspace
        </Button>
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search workspaces"
        />
        {workspaces
          .filter(workspace => workspace.is_home)
          .map(workspace => {
            const image = workspaceImages.find(
              image => image.workspaceId === workspace.id
            );
            return (
              <Button
                key={workspace.id}
                onClick={() => handleSelect(workspace.id)}
              >
                {image ? (
                  <img src={image.url} alt="Workspace" />
                ) : (
                  <IconComponent />
                )}
                {workspace.name}
              </Button>
            );
          })}
        {workspaces
          .filter(
            workspace =>
              !workspace.is_home &&
              workspace.name.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(workspace => {
            const image = workspaceImages.find(
              image => image.workspaceId === workspace.id
            );
            return (
              <Button
                key={workspace.id}
                onClick={() => handleSelect(workspace.id)}
              >
                {image ? (
                  <img src={image.url} alt="Workspace" />
                ) : (
                  <IconComponent />
                )}
                {workspace.name}
              </Button>
            );
          })}
      </PopoverContent>
    </Popover>
  );
};

export default WorkspaceSwitcher;
