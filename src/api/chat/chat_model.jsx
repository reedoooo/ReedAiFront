import request from '@/utils/request/axios';

export const fetchChatModel = async () => {
  try {
    const response = await request.get('/chat_model');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateChatModel = async (id, chatModel) => {
  try {
    const response = await request.put(`/chat_model/${id}`, chatModel);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteChatModel = async id => {
  try {
    const response = await request.delete(`/chat_model/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const createChatModel = async chatModel => {
  try {
    const response = await request.post('/chat_model', chatModel);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchDefaultChatModel = async () => {
  try {
    const response = await request.get('/chat_model/default');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getModelWorkspacesByWorkspaceId = async workspaceId => {
  const response = await fetch(`/chat/chat_models/${workspaceId}`);
  const data = await response.json();

  if (!data.workspace) {
    throw new Error(data.error);
  }

  return data.workspace;
};
