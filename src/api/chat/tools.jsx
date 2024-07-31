import apiUtils from '@/lib/apiUtils';

export const chatTools = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/tools');
      return data;
    } catch (error) {
      console.error('Error fetching chat tools:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const data = await apiUtils.get(`/chat/tools/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat tool with id ${id}:`, error);
      throw error;
    }
  },

  create: async toolData => {
    try {
      const data = await apiUtils.post('/chat/tools', toolData);
      return data;
    } catch (error) {
      console.error('Error creating chat tool:', error);
      throw error;
    }
  },

  update: async (id, toolData) => {
    try {
      const data = await apiUtils.put(`/chat/tools/${id}`, toolData);
      return data;
    } catch (error) {
      console.error(`Error updating chat tool with id ${id}:`, error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/tools/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat tool with id ${id}:`, error);
      throw error;
    }
  },
};
