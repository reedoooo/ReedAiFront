import request from '@/utils/request/axios';

export const createChatMessage = async message => {
  try {
    const response = await request.post('/chat/chat_messages', message);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatMessageById = async messageId => {
  try {
    const response = await request.get(`/chat/chat_messages/${messageId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateChatMessage = async message => {
  try {
    const response = await request.put(
      `/chat/chat_messages/${message._id}`,
      message
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteChatMessage = async messageId => {
  try {
    const response = await request.delete(`/chat/chat_messages/${messageId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatMessagesBySessionId = async sessionId => {
  try {
    const response = await request.get(
      `/chat/chat_messages/session/${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatHistoryBySessionId = async sessionId => {
  try {
    const response = await request.get(
      `/chat/chat_messages/history/${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteChatMessagesBySessionId = async sessionId => {
  try {
    const response = await request.delete(
      `/chat/chat_messages/session/${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
