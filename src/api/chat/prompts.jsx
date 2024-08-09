import { apiUtils } from '@/lib/apiUtils';

export const chatPrompt = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/prompts');
      return data;
    } catch (error) {
      console.error('Error fetching chat prompts:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const data = await apiUtils.get(`/chat/prompts/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat prompt with id ${id}:`, error);
      throw error;
    }
  },

  create: async promptData => {
    try {
      const data = await apiUtils.post('/chat/prompts', promptData);
      return data;
    } catch (error) {
      console.error('Error creating chat prompt:', error);
      throw error;
    }
  },

  update: async (id, promptData) => {
    try {
      const data = await apiUtils.put(`/chat/prompts/${id}`, promptData);
      return data;
    } catch (error) {
      console.error(`Error updating chat prompt with id ${id}:`, error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/prompts/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat prompt with id ${id}:`, error);
      throw error;
    }
  },
};
