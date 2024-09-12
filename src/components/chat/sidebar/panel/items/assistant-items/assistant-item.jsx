import TextField from '@mui/material/TextField';
import { IconRobotFace } from '@tabler/icons-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import constants from 'config/constants';
import { useChatStore } from 'contexts/ChatProvider';
import { SidebarItem } from '../all/sidebar-display-item';
import AssistantRetrievalSelect from './assistant-retrieval-select';
import AssistantToolSelect from './assistant-tool-select';
import ChatSettingsForm from '@/components/ui/chat-settings-form';
import ImagePicker from '@/components/ui/image-picker';
const { ASSISTANT_DESCRIPTION_MAX, ASSISTANT_NAME_MAX } = constants;

const AssistantItem = ({ assistant }) => {
  const { selectedWorkspace, assistantImages } = useChatStore();

  const [name, setName] = useState(assistant.name);
  const [isTyping, setIsTyping] = useState(false);
  const [description, setDescription] = useState(assistant.description);
  const [assistantChatSettings, setAssistantChatSettings] = useState({
    model: assistant.model,
    prompt: assistant.prompt,
    temperature: assistant.temperature,
    contextLength: assistant.context_length,
    includeProfileContext: assistant.include_profile_context,
    includeWorkspaceInstructions: assistant.include_workspace_instructions,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLink, setImageLink] = useState('');

  useEffect(() => {
    const assistantImage =
      assistantImages.find(image => image.path === assistant.image_path)
        ?.base64 || '';
    setImageLink(assistantImage);
  }, [assistant, assistantImages]);

  if (!selectedWorkspace) return null;

  return (
    <SidebarItem
      item={assistant}
      contentType="assistants"
      isTyping={isTyping}
      icon={
        imageLink ? (
          <Image
            style={{ width: '30px', height: '30px' }}
            className="rounded"
            src={imageLink}
            alt={assistant.name}
            width={30}
            height={30}
          />
        ) : (
          <IconRobotFace className="rounded p-1" size={30} />
        )
      }
      updateState={{
        image: selectedImage,
        user_id: assistant.user_id,
        name,
        description,
        include_profile_context: assistantChatSettings.includeProfileContext,
        include_workspace_instructions:
          assistantChatSettings.includeWorkspaceInstructions,
        context_length: assistantChatSettings.contextLength,
        model: assistantChatSettings.model,
        image_path: assistant.image_path,
        prompt: assistantChatSettings.prompt,
        temperature: assistantChatSettings.temperature,
      }}
      renderInputs={renderState => (
        <>
          <TextField
            fullWidth
            label="Name"
            placeholder="Assistant name..."
            value={name}
            onChange={e => setName(e.target.value)}
            inputProps={{ maxLength: ASSISTANT_NAME_MAX }}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            placeholder="Assistant description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            inputProps={{ maxLength: ASSISTANT_DESCRIPTION_MAX }}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            margin="normal"
          />
          <ImagePicker
            src={imageLink}
            image={selectedImage}
            onSrcChange={setImageLink}
            onImageChange={setSelectedImage}
            width={100}
            height={100}
          />
          <ChatSettingsForm
            chatSettings={assistantChatSettings}
            onChangeChatSettings={setAssistantChatSettings}
            useAdvancedDropdown
          />
          <AssistantRetrievalSelect
            selectedAssistantRetrievalItems={[
              ...renderState.selectedAssistantFiles,
              ...renderState.selectedAssistantCollections,
            ]}
            onAssistantRetrievalItemsSelect={item =>
              'type' in item
                ? handleFileSelect(item, renderState.setSelectedAssistantFiles)
                : handleCollectionSelect(
                    item,
                    renderState.setSelectedAssistantCollections
                  )
            }
          />
          <AssistantToolSelect
            selectedAssistantTools={renderState.selectedAssistantTools}
            onAssistantToolsSelect={tool =>
              handleToolSelect(tool, renderState.setSelectedAssistantTools)
            }
          />
        </>
      )}
    />
  );
};

export default AssistantItem;
