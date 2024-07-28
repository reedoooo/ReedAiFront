import { Types } from 'mongoose';
import request from '@/utils/request/axios';
import constants from 'config/constants';
import { fetchDefaultChatModel } from './chat_model';

const { API_URL, OPENAI_API_KEY } = constants;

export const getChatSessionDefault = async (
  userId,
  workspaceId,
  assistantId
) => {
  const default_model = await fetchDefaultChatModel();
  const newId = new Types.ObjectId(); // Generate ObjectId
  return {
    name: 'Default Chat Session',
    topic: 'Default Chat Session',

    userId: userId,
    workspaceId: workspaceId,
    assistantId: assistantId,
    model: default_model._id,
    prompt: default_model.prompt,

    active: { type: Boolean, required: false },
    activeSessionId: newId,

    settings: {
      maxTokens: 500, // max length of the completion
      temperature: 0.7,
      model: 'gpt-4-turbo-preview',
      topP: 1,
      n: 4,
      debug: false,
      summarizeMode: false,
    },

    messages: [
      /* Array of chat messages */
    ],

    stats: {
      tokenUsage: 0,
      messageCount: 0,
    },

    tuning: {
      debug: false,
      summary: '',
      summarizeMode: false,
    },
  };
};

export const getChatSessionsByUser = async () => {
  try {
    const response = await request.get('/chat/chat_sessions/users');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteChatSession = async sessionId => {
  try {
    const response = await request.delete(`/chat/chat_sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createChatSession = async (sessionId, name, model) => {
  try {
    const response = await request.post('/chat/chat_sessions/create', {
      sessionId,
      topic: name,
      model,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const renameChatSession = async (sessionId, name) => {
  try {
    const response = await request.put(
      `/chat/chat_sessions/session/${sessionId}/topic`,
      {
        topic: name,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const clearSessionChatMessages = async sessionId => {
  try {
    const response = await request.delete(
      `/chat/chat_messages/chat_sessions/${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateChatSession = async (sessionId, session_data) => {
  try {
    const response = await fetch(
      `/chat/chat_sessions/update/${sessionId}`,
      'PUT',
      JSON.stringify(session_data),
      {
        'Content-Type': 'application/json',
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getChatSessionMessagesByMessagesIds = async messageIds => {
  // const id = encodeURIComponent(sessionId);
  try {
    const response = await fetch(
      `${API_URL}/chat/chat_messages/session/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          messageIds,
        },
      }
    );

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(
        `HTTP error! status: ${response.status} message: ${response.statusText}`
      );
    }

    const messagesData = await response.json();
    return messagesData;
  } catch (error) {
    console.error('Error fetching messages data:', error);
    throw error;
  }
};
export const getChatSessionsByWorkspaceId = async workspaceId => {
  const response = await fetch(`/chat/chat_sessions/${workspaceId}`);
  const data = await response.json();

  if (!data.chatSessions) {
    throw new Error(data.error);
  }

  return data.chatSessions;
};

export const getChatSessionBySessionId = async sessionId => {
  const id = encodeURIComponent(sessionId);
  try {
    const response = await fetch(
      `${API_URL}/chat/chat_sessions/session/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const sessionData = await response.json();
    return sessionData;
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw error;
  }
};
export const getChatSessionMessagesBySessionId = async sessionId => {
  const id = encodeURIComponent(sessionId);
  try {
    const response = await fetch(
      `${API_URL}/chat/chat_messages/session/${id}/messages`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(
        `HTTP error! status: ${response.status} message: ${response.statusText}`
      );
    }

    const messagesData = await response.json();
    return messagesData;
  } catch (error) {
    console.error('Error fetching messages data:', error);
    throw error;
  }
};
export const saveMessagesToSession = async (
  userId,
  workspaceId,
  sessionId,
  messages
) => {
  const id = encodeURIComponent(sessionId);
  try {
    const updatedMessages = messages.map(message => ({
      content: message.content,
      role: message.role,
    }));
    const body = {
      sessionId,
      messages,
      updatedMessages,
    };
    const response = await fetch(
      `/api/chat/chat_sessions/session/${id}/messages/save`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
