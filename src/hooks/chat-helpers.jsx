const React = require('react');
const { toast } = require('sonner');
const { v4: uuidv4 } = require('uuid');
const { ChatContext } = require('@/context/ChatProvider');
const { createChatFiles } = require('@/db/chat-files');
const { createChat } = require('@/db/chats');
const { createMessageFileItems } = require('@/db/message-file-items');
const { createMessages, updateMessage } = require('@/db/messages');
const { uploadMessageImage } = require('@/db/storage/message-images');
const { buildFinalMessages } = require('@/lib/build-prompt');
const { consumeReadableStream } = require('@/lib/consume-stream');

const handleRetrieval = async (
  userInput,
  newMessageFiles,
  chatFiles,
  embeddingsProvider,
  sourceCount
) => {
  const response = await fetch('/api/retrieval/retrieve', {
    method: 'POST',
    body: JSON.stringify({
      userInput,
      fileIds: [...newMessageFiles, ...chatFiles].map(file => file.id),
      embeddingsProvider,
      sourceCount,
    }),
  });

  if (!response.ok) {
    console.error('Error retrieving:', response);
  }

  const { results } = await response.json();

  return results;
};

const handleHostedChat = async (
  payload,
  profile,
  modelData,
  tempAssistantChatMessage,
  isRegeneration,
  newAbortController,
  newMessageImages,
  chatImages,
  setIsGenerating,
  setFirstTokenReceived,
  setChatMessages,
  setToolInUse
) => {
  const provider =
    modelData.provider === 'openai' && profile.use_azure_openai
      ? 'azure'
      : modelData.provider;

  let draftMessages = await buildFinalMessages(payload, profile, chatImages);

  let formattedMessages = [];

  formattedMessages = draftMessages;

  const apiEndpoint =
    provider === 'custom' ? '/chat/custom' : `/chat/${provider}`;

  const requestBody = {
    chatSettings: payload.chatSettings,
    messages: formattedMessages,
    customModelId: provider === 'custom' ? modelData.hostedId : '',
  };

  const response = await fetchChatResponse(
    apiEndpoint,
    requestBody,
    true,
    newAbortController,
    setIsGenerating,
    setChatMessages
  );

  return await processResponse(
    response,
    isRegeneration
      ? payload.chatMessages[payload.chatMessages.length - 1]
      : tempAssistantChatMessage,
    true,
    newAbortController,
    setFirstTokenReceived,
    setChatMessages,
    setToolInUse
  );
};

const fetchChatResponse = async (
  url,
  body,
  isHosted,
  controller,
  setIsGenerating,
  setChatMessages
) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    signal: controller.signal,
  });

  if (!response.ok) {
    if (response.status === 404 && !isHosted) {
      toast.error(
        'Model not found. Make sure you have it downloaded via Ollama.'
      );
    }

    const errorData = await response.json();

    toast.error(errorData.message);

    setIsGenerating(false);
    setChatMessages(prevMessages => prevMessages.slice(0, -2));
  }

  return response;
};

const processResponse = async (
  response,
  lastChatMessage,
  isHosted,
  controller,
  setFirstTokenReceived,
  setChatMessages,
  setToolInUse
) => {
  let fullText = '';
  let contentToAdd = '';

  if (response.body) {
    await consumeReadableStream(
      response.body,
      chunk => {
        setFirstTokenReceived(true);
        setToolInUse('none');

        try {
          contentToAdd = isHosted
            ? chunk
            : chunk
                .trimEnd()
                .split('\n')
                .reduce(
                  (acc, line) => acc + JSON.parse(line).message.content,
                  ''
                );
          fullText += contentToAdd;
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }

        setChatMessages(prev =>
          prev.map(chatMessage => {
            if (chatMessage.message.id === lastChatMessage.message.id) {
              const updatedChatMessage = {
                message: {
                  ...chatMessage.message,
                  content: fullText,
                },
                fileItems: chatMessage.fileItems,
              };

              return updatedChatMessage;
            }

            return chatMessage;
          })
        );
      },
      controller.signal
    );

    return fullText;
  } else {
    throw new Error('Response body is null');
  }
};

const handleCreateChat = async (
  chatSettings,
  profile,
  selectedWorkspace,
  messageContent,
  selectedAssistant,
  newMessageFiles,
  setSelectedChat,
  setChats,
  setChatFiles
) => {
  const createdChat = await createChat({
    user_id: profile.user_id,
    workspace_id: selectedWorkspace.id,
    assistant_id: selectedAssistant?.id || null,
    context_length: chatSettings.contextLength,
    include_profile_context: chatSettings.includeProfileContext,
    include_workspace_instructions: chatSettings.includeWorkspaceInstructions,
    model: chatSettings.model,
    name: messageContent.substring(0, 100),
    prompt: chatSettings.prompt,
    temperature: chatSettings.temperature,
    embeddings_provider: chatSettings.embeddingsProvider,
  });

  setSelectedChat(createdChat);
  setChats(chats => [createdChat, ...chats]);

  await createChatFiles(
    newMessageFiles.map(file => ({
      user_id: profile.user_id,
      chat_id: createdChat.id,
      file_id: file.id,
    }))
  );

  setChatFiles(prev => [...prev, ...newMessageFiles]);

  return createdChat;
};

/**
 * Handles the creation of chat messages.
 *
 * @param {Array} chatMessages - The array of existing chat messages.
 * @param {Object} currentChat - The current chat object.
 * @param {Object} profile - The user's profile object.
 * @param {Object} modelData - The model data object.
 * @param {string} messageContent - The content of the user's message.
 * @param {string} generatedText - The generated text from the assistant.
 * @param {Array} newMessageImages - The array of new message images.
 * @param {boolean} isRegeneration - Indicates if the message is a regeneration.
 * @param {Array} retrievedFileItems - The array of retrieved file items.
 * @param {function} setChatMessages - The function to set the chat messages.
 * @param {function} setChatFileItems - The function to set the chat file items.
 * @param {function} setChatImages - The function to set the chat images.
 * @param {Object} selectedAssistant - The selected assistant object.
 * @returns {Promise<void>} - A promise that resolves when the chat messages are handled.
 */
const handleCreateMessages = async (
  chatMessages,
  currentChat,
  profile,
  modelData,
  messageContent,
  generatedText,
  newMessageImages,
  isRegeneration,
  retrievedFileItems,
  setChatMessages,
  setChatFileItems,
  setChatImages,
  selectedAssistant
) => {
  const finalUserMessage = {
    chat_id: currentChat.id,
    assistant_id: null,
    user_id: profile.user_id,
    content: messageContent,
    model: modelData.modelId,
    role: 'user',
    sequence_number: chatMessages.length,
    image_paths: [],
  };

  const finalAssistantMessage = {
    chat_id: currentChat.id,
    assistant_id: selectedAssistant?.id || null,
    user_id: profile.user_id,
    content: generatedText,
    model: modelData.modelId,
    role: 'assistant',
    sequence_number: chatMessages.length + 1,
    image_paths: [],
  };

  let finalChatMessages = [];

  if (isRegeneration) {
    const lastStartingMessage = chatMessages[chatMessages.length - 1].message;

    const updatedMessage = await updateMessage(lastStartingMessage.id, {
      ...lastStartingMessage,
      content: generatedText,
    });

    chatMessages[chatMessages.length - 1].message = updatedMessage;

    finalChatMessages = [...chatMessages];

    setChatMessages(finalChatMessages);
  } else {
    const createdMessages = await createMessages([
      finalUserMessage,
      finalAssistantMessage,
    ]);

    const uploadPromises = newMessageImages
      .filter(obj => obj.file !== null)
      .map(obj => {
        let filePath = `${profile.user_id}/${currentChat.id}/${createdMessages[0].id}/${uuidv4()}`;

        return uploadMessageImage(filePath, obj.file).catch(error => {
          console.error(`Failed to upload image at ${filePath}:`, error);
          return null;
        });
      });

    const paths = (await Promise.all(uploadPromises)).filter(Boolean);

    setChatImages(prevImages => [
      ...prevImages,
      ...newMessageImages.map((obj, index) => ({
        ...obj,
        messageId: createdMessages[0].id,
        path: paths[index],
      })),
    ]);

    const updatedMessage = await updateMessage(createdMessages[0].id, {
      ...createdMessages[0],
      image_paths: paths,
    });

    const createdMessageFileItems = await createMessageFileItems(
      retrievedFileItems.map(fileItem => {
        return {
          user_id: profile.user_id,
          message_id: createdMessages[1].id,
          file_item_id: fileItem.id,
        };
      })
    );

    finalChatMessages = [
      ...chatMessages,
      {
        message: updatedMessage,
        fileItems: [],
      },
      {
        message: createdMessages[1],
        fileItems: retrievedFileItems.map(fileItem => fileItem.id),
      },
    ];

    setChatFileItems(prevFileItems => {
      const newFileItems = retrievedFileItems.filter(
        fileItem => !prevFileItems.some(prevItem => prevItem.id === fileItem.id)
      );

      return [...prevFileItems, ...newFileItems];
    });

    setChatMessages(finalChatMessages);
  }
};

module.exports = {
  handleRetrieval,
  handleHostedChat,
  processResponse,
  handleCreateChat,
  handleCreateMessages,
};
// const validateChatSettings = (
//   chatSettings,
//   modelData,
//   profile,
//   selectedWorkspace,
//   messageContent
// ) => {
//   if (!chatSettings) {
//     throw new Error('Chat settings not found');
//   }

//   if (!modelData) {
//     throw new Error('Model not found');
//   }

//   if (!profile) {
//     throw new Error('Profile not found');
//   }

//   if (!selectedWorkspace) {
//     throw new Error('Workspace not found');
//   }

//   if (!messageContent) {
//     throw new Error('Message content not found');
//   }
// };

// const createTempMessages = (
//   messageContent,
//   chatMessages,
//   chatSettings,
//   b64Images,
//   isRegeneration,
//   setChatMessages,
//   selectedAssistant
// ) => {
//   let tempUserChatMessage = {
//     message: {
//       chat_id: '',
//       assistant_id: null,
//       content: messageContent,
//       created_at: '',
//       id: uuidv4(),
//       image_paths: b64Images,
//       model: chatSettings.model,
//       role: 'user',
//       sequence_number: chatMessages.length,
//       updated_at: '',
//       user_id: '',
//     },
//     fileItems: [],
//   };

//   let tempAssistantChatMessage = {
//     message: {
//       chat_id: '',
//       assistant_id: selectedAssistant?.id || null,
//       content: '',
//       created_at: '',
//       id: uuidv4(),
//       image_paths: [],
//       model: chatSettings.model,
//       role: 'assistant',
//       sequence_number: chatMessages.length + 1,
//       updated_at: '',
//       user_id: '',
//     },
//     fileItems: [],
//   };

//   let newMessages = [];

//   if (isRegeneration) {
//     const lastMessageIndex = chatMessages.length - 1;
//     chatMessages[lastMessageIndex].message.content = '';
//     newMessages = [...chatMessages];
//   } else {
//     newMessages = [
//       ...chatMessages,
//       tempUserChatMessage,
//       tempAssistantChatMessage,
//     ];
//   }

//   setChatMessages(newMessages);

//   return {
//     tempUserChatMessage,
//     tempAssistantChatMessage,
//   };
// };
