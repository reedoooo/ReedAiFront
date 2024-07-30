import request from '@/utils/request/axios';

export const deleteChatPrompt = async promptId => {
  try {
    const response = await request.delete(`/chat_prompts/${promptId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateChatPrompt = async chat => {
  try {
    const response = await request.put(`/chat_prompts/${chat._id}`, chat);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createChatPrompt = async chat => {
  try {
    const response = await request.post('/chat_prompts', chat);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatPromptById = async promptId => {
  try {
    const response = await request.get(`/chat/chat_prompts/${promptId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserChatPrompts = async userId => {
  try {
    const response = await request.get(`/chat/chat_prompts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPromptWorkspacesByWorkspaceId = async workspaceId => {
  const response = await fetch(`/chat/chat_prompts/${workspaceId}`);
  const data = await response.json();

  if (!data.workspace) {
    throw new Error(data.error);
  }

  return data.workspace;
};
