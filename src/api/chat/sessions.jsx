import apiUtils from '@/lib/apiUtils';

export const sessions = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/sessions/users');
      return data;
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
      throw error;
    }
  },

  getById: async sessionId => {
    try {
      const data = await apiUtils.get(`/chat/sessions/${sessionId}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat session with id ${sessionId}:`, error);
      throw error;
    }
  },

  create: async (sessionId, name, model) => {
    try {
      const data = await apiUtils.post('/chat/sessions/create', {
        sessionId,
        topic: name,
        model,
      });
      return data;
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  },

  update: async (sessionId, sessionData) => {
    try {
      const data = await apiUtils.put(
        `/chat/sessions/update/${sessionId}`,
        sessionData,
        {
          'Content-Type': 'application/json',
        }
      );
      return data;
    } catch (error) {
      console.error(`Error updating chat session with id ${sessionId}:`, error);
      throw error;
    }
  },

  delete: async sessionId => {
    try {
      const data = await apiUtils.delete(`/chat/sessions/${sessionId}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat session with id ${sessionId}:`, error);
      throw error;
    }
  },

  rename: async (sessionId, name) => {
    try {
      const data = await apiUtils.put(
        `/chat/sessions/session/${sessionId}/topic`,
        { topic: name }
      );
      return data;
    } catch (error) {
      console.error(`Error renaming chat session with id ${sessionId}:`, error);
      throw error;
    }
  },

  saveMessage: async (sessionId, messages) => {
    try {
      const data = await apiUtils.post(
        `/chat/sessions/${sessionId}/messages/save`,
        {
          messages: messages.map(message => ({
            content: message.content,
            role: message.role,
          })),
        },
        {
          'Content-Type': 'application/json',
        }
      );
      return data;
    } catch (error) {
      console.error(
        `Error saving message for chat session with id ${sessionId}:`,
        error
      );
      throw error;
    }
  },

  clearMessages: async sessionId => {
    try {
      const data = await apiUtils.delete(
        `/chat/chat/messages/sessions/${sessionId}`
      );
      return data;
    } catch (error) {
      console.error(
        `Error clearing messages for chat session with id ${sessionId}:`,
        error
      );
      throw error;
    }
  },
};
