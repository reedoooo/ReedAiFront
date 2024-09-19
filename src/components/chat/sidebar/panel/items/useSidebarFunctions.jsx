import { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useChatStore } from './chatStore';
import { ChatbotUIContext } from './ChatbotUIContext';

export const useSidebarFunctions = (contentType, item) => {
  const router = useRouter();
  const buttonRef = useRef(null);
  const itemRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [startingWorkspaces, setStartingWorkspaces] = useState([]);
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);

  const [startingCollectionFiles, setStartingCollectionFiles] = useState([]);
  const [selectedCollectionFiles, setSelectedCollectionFiles] = useState([]);

  const [startingAssistantFiles, setStartingAssistantFiles] = useState([]);
  const [startingAssistantCollections, setStartingAssistantCollections] = useState([]);
  const [startingAssistantTools, setStartingAssistantTools] = useState([]);
  const [selectedAssistantFiles, setSelectedAssistantFiles] = useState([]);
  const [selectedAssistantCollections, setSelectedAssistantCollections] = useState([]);
  const [selectedAssistantTools, setSelectedAssistantTools] = useState([]);

  const {
    state: { workspaces, selectedWorkspace },
    actions: {
      setChats,
      setPresets,
      setPrompts,
      setFiles,
      setCollections,
      setAssistants,
      setTools,
      setModels,
      setAssistantImages,
    },
  } = useChatStore();

  const { setSelectedAssistant } = useContext(ChatbotUIContext);

  // Fetch data when the sidebar is opened
  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  // Fetch data function
  const fetchData = async () => {
    if (workspaces.length > 1) {
      const workspacesData = await fetchSelectedWorkspaces();
      setStartingWorkspaces(workspacesData);
      setSelectedWorkspaces(workspacesData);
    }

    const fetchDataFunction = fetchDataFunctions[contentType];
    if (fetchDataFunction) {
      await fetchDataFunction(item.id);
    }
  };

  // Fetch data functions for different content types
  const fetchDataFunctions = {
    collections: async (collectionId) => {
      const collectionFiles = await getCollectionFilesByCollectionId(collectionId);
      setStartingCollectionFiles(collectionFiles.files);
      setSelectedCollectionFiles([]);
    },
    assistants: async (assistantId) => {
      const assistantFiles = await getAssistantFilesByAssistantId(assistantId);
      setStartingAssistantFiles(assistantFiles.files);
      const assistantCollections = await getAssistantCollectionsByAssistantId(assistantId);
      setStartingAssistantCollections(assistantCollections.collections);
      const assistantTools = await getAssistantToolsByAssistantId(assistantId);
      setStartingAssistantTools(assistantTools.tools);
      setSelectedAssistantFiles([]);
      setSelectedAssistantCollections([]);
      setSelectedAssistantTools([]);
    },
  };

  // Fetch workspace functions for different content types
  const fetchWorkspaceFunctions = {
    presets: async (presetId) => {
      const item = await getPresetWorkspacesByPresetId(presetId);
      return item.workspaces;
    },
    prompts: async (promptId) => {
      const item = await getPromptWorkspacesByPromptId(promptId);
      return item.workspaces;
    },
    files: async (fileId) => {
      const item = await getFileWorkspacesByFileId(fileId);
      return item.workspaces;
    },
    collections: async (collectionId) => {
      const item = await getCollectionWorkspacesByCollectionId(collectionId);
      return item.workspaces;
    },
    assistants: async (assistantId) => {
      const item = await getAssistantWorkspacesByAssistantId(assistantId);
      return item.workspaces;
    },
    tools: async (toolId) => {
      const item = await getToolWorkspacesByToolId(toolId);
      return item.workspaces;
    },
    models: async (modelId) => {
      const item = await getModelWorkspacesByModelId(modelId);
      return item.workspaces;
    },
  };

  // Fetch selected workspaces
  const fetchSelectedWorkspaces = async () => {
    const fetchFunction = fetchWorkspaceFunctions[contentType];
    if (!fetchFunction) return [];
    return await fetchFunction(item.id);
  };

  // Handle workspace updates
  const handleWorkspaceUpdates = async (
    startingWorkspaces,
    selectedWorkspaces,
    itemId,
    deleteWorkspaceFn,
    createWorkspaceFn,
    itemIdKey
  ) => {
    if (!selectedWorkspace) return;

    const deleteList = startingWorkspaces.filter(
      (startingWorkspace) => !selectedWorkspaces.some(
        (selectedWorkspace) => selectedWorkspace.id === startingWorkspace.id
      )
    );

    for (const workspace of deleteList) {
      await deleteWorkspaceFn(itemId, workspace.id);
    }

    if (deleteList.map(w => w.id).includes(selectedWorkspace.id)) {
      const setStateFunction = stateUpdateFunctions[contentType];
      if (setStateFunction) {
        setStateFunction(prevItems => prevItems.filter(prevItem => prevItem.id !== item.id));
      }
    }

    const createList = selectedWorkspaces.filter(
      (selectedWorkspace) => !startingWorkspaces.some(
        (startingWorkspace) => startingWorkspace.id === selectedWorkspace.id
      )
    );

    await createWorkspaceFn(
      createList.map(workspace => ({
        user_id: workspace.user_id,
        [itemIdKey]: itemId,
        workspace_id: workspace.id,
      }))
    );
  };

  // Update functions for different content types
  const updateFunctions = {
    presets: async (presetId, updateState) => {
      const updatedPreset = await updatePreset(presetId, updateState);
      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        presetId,
        deletePresetWorkspace,
        createPresetWorkspaces,
        'preset_id'
      );
      return updatedPreset;
    },
    prompts: async (promptId, updateState) => {
      const updatedPrompt = await updatePrompt(promptId, updateState);
      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        promptId,
        deletePromptWorkspace,
        createPromptWorkspaces,
        'prompt_id'
      );
      return updatedPrompt;
    },
    files: async (fileId, updateState) => {
      const updatedFile = await updateFile(fileId, updateState);
      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        fileId,
        deleteFileWorkspace,
        createFileWorkspaces,
        'file_id'
      );
      return updatedFile;
    },
    collections: async (collectionId, updateState) => {
      if (!profile) return;
      const { ...rest } = updateState;

      const filesToAdd = selectedCollectionFiles.filter(
        selectedFile => !startingCollectionFiles.some(
          startingFile => startingFile.id === selectedFile.id
        )
      );

      const filesToRemove = startingCollectionFiles.filter(
        startingFile => !selectedCollectionFiles.some(
          selectedFile => selectedFile.id === startingFile.id
        )
      );

      for (const file of filesToAdd) {
        await createCollectionFile({
          user_id: item.user_id,
          collection_id: collectionId,
          file_id: file.id,
        });
      }

      for (const file of filesToRemove) {
        await deleteCollectionFile(collectionId, file.id);
      }

      const updatedCollection = await updateCollection(collectionId, rest);

      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        collectionId,
        deleteCollectionWorkspace,
        createCollectionWorkspaces,
        'collection_id'
      );

      return updatedCollection;
    },
    assistants: async (assistantId, updateState) => {
      const { image, ...rest } = updateState;

      const filesToAdd = selectedAssistantFiles.filter(
        selectedFile => !startingAssistantFiles.some(
          startingFile => startingFile.id === selectedFile.id
        )
      );

      const filesToRemove = startingAssistantFiles.filter(
        startingFile => !selectedAssistantFiles.some(
          selectedFile => selectedFile.id === startingFile.id
        )
      );

      for (const file of filesToAdd) {
        await createAssistantFile({
          user_id: item.user_id,
          assistant_id: assistantId,
          file_id: file.id,
        });
      }

      for (const file of filesToRemove) {
        await deleteAssistantFile(assistantId, file.id);
      }

      const collectionsToAdd = selectedAssistantCollections.filter(
        selectedCollection => !startingAssistantCollections.some(
          startingCollection => startingCollection.id === selectedCollection.id
        )
      );

      const collectionsToRemove = startingAssistantCollections.filter(
        startingCollection => !selectedAssistantCollections.some(
          selectedCollection => selectedCollection.id === startingCollection.id
        )
      );

      for (const collection of collectionsToAdd) {
        await createAssistantCollection({
          user_id: item.user_id,
          assistant_id: assistantId,
          collection_id: collection.id,
        });
      }

      for (const collection of collectionsToRemove) {
        await deleteAssistantCollection(assistantId, collection.id);
      }

      const toolsToAdd = selectedAssistantTools.filter(
        selectedTool => !startingAssistantTools.some(
          startingTool => startingTool.id === selectedTool.id
        )
      );

      const toolsToRemove = startingAssistantTools.filter(
        startingTool => !selectedAssistantTools.some(
          selectedTool => selectedTool.id === startingTool.id
        )
      );

      for (const tool of toolsToAdd) {
        await createAssistantTool({
          user_id: item.user_id,
          assistant_id: assistantId,
          tool_id: tool.id,
        });
      }

      for (const tool of toolsToRemove) {
        await deleteAssistantTool(assistantId, tool.id);
      }

      let updatedAssistant = await updateAssistant(assistantId, rest);

      if (image) {
        const filePath = await uploadAssistantImage(updatedAssistant, image);
        updatedAssistant = await updateAssistant(assistantId, {
          image_path: filePath,
        });

        const url = (await getAssistantImageFromStorage(filePath)) || '';
        if (url) {
          const response = await fetch(url);
          const blob = await response.blob();
          const base64 = await convertBlobToBase64(blob);
          setAssistantImages(prev => [
            ...prev,
            {
              assistantId: updatedAssistant.id,
              path: filePath,
              base64,
              url,
            },
          ]);
        }
      }

      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        assistantId,
        deleteAssistantWorkspace,
        createAssistantWorkspaces,
        'assistant_id'
      );

      return updatedAssistant;
    },
    tools: async (toolId, updateState) => {
      const updatedTool = await updateTool(toolId, updateState);
      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        toolId,
        deleteToolWorkspace,
        createToolWorkspaces,
        'tool_id'
      );
      return updatedTool;
    },
    models: async (modelId, updateState) => {
      const updatedModel = await updateModel(modelId, updateState);
      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        modelId,
        deleteModelWorkspace,
        createModelWorkspaces,
        'model_id'
      );
      return updatedModel;
    },
  };

  // State update functions for different content types
  const stateUpdateFunctions = {
    chats: setChats,
    presets: setPresets,
    prompts: setPrompts,
    files: setFiles,
    collections: setCollections,
    assistants: setAssistants,
    tools: setTools,
    models: setModels,
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      const updateFunction = updateFunctions[contentType];
      const setStateFunction = stateUpdateFunctions[contentType];
      if (!updateFunction || !setStateFunction) return;
      if (isTyping) return; // Prevent update while typing

      const updatedItem = await updateFunction(item.id, updateState);
      setStateFunction(prevItems =>
        prevItems.map(prevItem =>
          prevItem.id === item.id ? updatedItem : prevItem
        )
      );
      setIsOpen(false);
      toast.success(`${contentType.slice(0, -1)} updated successfully`);
    } catch (error) {
      toast.error(`Error updating ${contentType.slice(0, -1)}. ${error}`);
    }
  };

  // Handle workspace selection
  const handleSelectWorkspace = (workspace) => {
    setSelectedWorkspaces(prevState => {
      const isWorkspaceAlreadySelected = prevState.find(
        selectedWorkspace => selectedWorkspace.id === workspace.id
      );
      if (isWorkspaceAlreadySelected) {
        return prevState.filter(
          selectedWorkspace => selectedWorkspace.id !== workspace.id
        );
      } else {
        return [...prevState, workspace];
      }
    });
  };

  // Handle key down events
  const handleKeyDown = (e) => {
    if (!isTyping && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  // Delete functions for different content types
  const deleteFunctions = {
    chats: async (chat) => {
      await deleteChat(chat.id);
    },
    presets: async (preset) => {
      await deletePreset(preset.id);
    },
    prompts: async (prompt) => {
      await deletePrompt(prompt.id);
    },
    files: async (file) => {
      await deleteFileFromStorage(file.file_path);
      await deleteFile(file.id);
    },
    collections: async (collection) => {
      await deleteCollection(collection.id);
    },
    assistants: async (assistant) => {
			await deleteAssistantFiles(assistant.id);
		  await deleteAssistantCollections(assistant.id);
		},
    tools: async (tool) => {
      await deleteTool(tool.id);
    },
    models: async (model) => {
      await deleteModel(model.id);
    },
  };
	const deleteFunction = deleteFunctions[contentType];