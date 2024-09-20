import { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useChatStore } from './chatStore';
import { ChatbotUIContext } from './ChatbotUIContext';

export const useSidebarCreateFunctions = (contentType, item) => {
  const createFunctions = {
    chats: createChat,
    presets: createPreset,
    prompts: createPrompt,
    files: async (
      createState: { file: File } & TablesInsert<"files">,
      workspaceId: string
    ) => {
      if (!selectedWorkspace) return

      const { file, ...rest } = createState

      const createdFile = await createFileBasedOnExtension(
        file,
        rest,
        workspaceId,
        selectedWorkspace.embeddings_provider as "openai" | "local"
      )

      return createdFile
    },
    collections: async (
      createState: {
        image: File
        collectionFiles: TablesInsert<"collection_files">[]
      } & Tables<"collections">,
      workspaceId: string
    ) => {
      const { collectionFiles, ...rest } = createState

      const createdCollection = await createCollection(rest, workspaceId)

      const finalCollectionFiles = collectionFiles.map(collectionFile => ({
        ...collectionFile,
        collection_id: createdCollection.id
      }))

      await createCollectionFiles(finalCollectionFiles)

      return createdCollection
    },
    assistants: async (
      createState: {
        image: File
        files: Tables<"files">[]
        collections: Tables<"collections">[]
        tools: Tables<"tools">[]
      } & Tables<"assistants">,
      workspaceId: string
    ) => {
      const { image, files, collections, tools, ...rest } = createState

      const createdAssistant = await createAssistant(rest, workspaceId)

      let updatedAssistant = createdAssistant

      if (image) {
        const filePath = await uploadAssistantImage(createdAssistant, image)

        updatedAssistant = await updateAssistant(createdAssistant.id, {
          image_path: filePath
        })

        const url = (await getAssistantImageFromStorage(filePath)) || ""

        if (url) {
          const response = await fetch(url)
          const blob = await response.blob()
          const base64 = await convertBlobToBase64(blob)

          setAssistantImages(prev => [
            ...prev,
            {
              assistantId: updatedAssistant.id,
              path: filePath,
              base64,
              url
            }
          ])
        }
      }

      const assistantFiles = files.map(file => ({
        user_id: rest.user_id,
        assistant_id: createdAssistant.id,
        file_id: file.id
      }))

      const assistantCollections = collections.map(collection => ({
        user_id: rest.user_id,
        assistant_id: createdAssistant.id,
        collection_id: collection.id
      }))

      const assistantTools = tools.map(tool => ({
        user_id: rest.user_id,
        assistant_id: createdAssistant.id,
        tool_id: tool.id
      }))

      await createAssistantFiles(assistantFiles)
      await createAssistantCollections(assistantCollections)
      await createAssistantTools(assistantTools)

      return updatedAssistant
    },
    tools: createTool,
    models: createModel
  }

  const createFunctions = {
    chats: newItem => {
      const chats = JSON.parse(localStorage.getItem('chats')) || [];
      chats.push(newItem);
      localStorage.setItem('chats', JSON.stringify(chats));
      return newItem;
    },
    prompts: newItem => {
      const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
      prompts.push(newItem);
      localStorage.setItem('prompts', JSON.stringify(prompts));
      return newItem;
    },
    files: newItem => {
      const files = JSON.parse(localStorage.getItem('files')) || [];
      files.push(newItem);
      localStorage.setItem('files', JSON.stringify(files));
      return newItem;
    },
    assistants: newItem => {
      const assistants = JSON.parse(localStorage.getItem('assistants')) || [];
      assistants.push(newItem);
      localStorage.setItem('assistants', JSON.stringify(assistants));
      return newItem;
    },
    tools: newItem => {
      const tools = JSON.parse(localStorage.getItem('tools')) || [];
      tools.push(newItem);
      localStorage.setItem('tools', JSON.stringify(tools));
      return newItem;
    },
  };

  const stateUpdateFunctions = {
    chats: setChatSessions,
    prompts: setPrompts,
    files: setFiles,
    assistants: setAssistants,
    tools: setTools,
  };

  const handleCreate = async () => {
    try {
      if (!selectedWorkspace) return;
      if (isTyping) return; // Prevent creation while typing

      const createFunction = createFunctions[contentType];
      const setStateFunction = stateUpdateFunctions[contentType];

      if (!createFunction || !setStateFunction) return;

      setCreating(true);

      const newItem = await createFunction(createState);

      setStateFunction(prevItems => [...prevItems, newItem]);

      onOpenChange(false);
      setCreating(false);
    } catch (error) {
      toast.error(`Error creating ${contentType.slice(0, -1)}. ${error}.`);
      setCreating(false);
    }
  };
};

export default useSidebarCreateFunctions;