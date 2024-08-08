import apiUtils from '@/lib/apiUtils';

export const chatAssistants = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/assistants');
      return data;
    } catch (error) {
      console.error('Error fetching chat assistants:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const data = await apiUtils.get(`/chat/assistants/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat assistant with id ${id}:`, error);
      throw error;
    }
  },

  create: async assistantData => {
    try {
      const data = await apiUtils.post('/chat/assistants', assistantData);
      return data;
    } catch (error) {
      console.error('Error creating chat assistant:', error);
      throw error;
    }
  },

  update: async (id, assistantData) => {
    try {
      const data = await apiUtils.put(`/chat/assistants/${id}`, assistantData);
      return data;
    } catch (error) {
      console.error(`Error updating chat assistant with id ${id}:`, error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/assistants/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat assistant with id ${id}:`, error);
      throw error;
    }
  },
};
