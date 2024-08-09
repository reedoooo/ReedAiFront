import { apiUtils } from '@/lib/apiUtils';

export const chatPresets = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/presets');
      return data;
    } catch (error) {
      console.error('Error fetching chat presets:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const data = await apiUtils.get(`/chat/presets/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat preset with id ${id}:`, error);
      throw error;
    }
  },

  create: async presetData => {
    try {
      const data = await apiUtils.post('/chat/presets', presetData);
      return data;
    } catch (error) {
      console.error('Error creating chat preset:', error);
      throw error;
    }
  },

  update: async (id, presetData) => {
    try {
      const data = await apiUtils.put(`/chat/presets/${id}`, presetData);
      return data;
    } catch (error) {
      console.error(`Error updating chat preset with id ${id}:`, error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/presets/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat preset with id ${id}:`, error);
      throw error;
    }
  },
};
