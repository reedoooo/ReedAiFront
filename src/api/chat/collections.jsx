import { apiUtils } from '@/lib/apiUtils';

export const chatCollections = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/collections');
      return data;
    } catch (error) {
      console.error('Error fetching chat collections:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const data = await apiUtils.get(`/chat/collections/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat collection with id ${id}:`, error);
      throw error;
    }
  },

  create: async collectionData => {
    try {
      const data = await apiUtils.post('/chat/collections', collectionData);
      return data;
    } catch (error) {
      console.error('Error creating chat collection:', error);
      throw error;
    }
  },

  update: async (id, collectionData) => {
    try {
      const data = await apiUtils.put(
        `/chat/collections/${id}`,
        collectionData
      );
      return data;
    } catch (error) {
      console.error(`Error updating chat collection with id ${id}:`, error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/collections/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat collection with id ${id}:`, error);
      throw error;
    }
  },
};
