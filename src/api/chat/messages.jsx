import apiUtils from '@/lib/apiUtils';

export const chatMessage = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/messages');
      return data;
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const data = await apiUtils.get(`/chat/messages/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat message with id ${id}:`, error);
      throw error;
    }
  },

  create: async messageData => {
    try {
      const data = await apiUtils.post('/chat/messages', messageData);
      return data;
    } catch (error) {
      console.error('Error creating chat message:', error);
      throw error;
    }
  },

  update: async (id, messageData) => {
    try {
      const data = await apiUtils.put(`/chat/messages/${id}`, messageData);
      return data;
    } catch (error) {
      console.error(`Error updating chat message with id ${id}:`, error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/messages/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat message with id ${id}:`, error);
      throw error;
    }
  },
};
