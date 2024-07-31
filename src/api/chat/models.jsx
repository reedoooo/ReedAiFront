import apiUtils from '@/lib/apiUtils';

export const chatModel = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/models');
      return data;
    } catch (error) {
      console.error('Error fetching chat models:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const data = await apiUtils.get(`/chat/models/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat model with id ${id}:`, error);
      throw error;
    }
  },

  create: async modelData => {
    try {
      const data = await apiUtils.post('/chat/models', modelData);
      return data;
    } catch (error) {
      console.error('Error creating chat model:', error);
      throw error;
    }
  },

  update: async (id, modelData) => {
    try {
      const data = await apiUtils.put(`/chat/models/${id}`, modelData);
      return data;
    } catch (error) {
      console.error(`Error updating chat model with id ${id}:`, error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/models/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat model with id ${id}:`, error);
      throw error;
    }
  },
};
