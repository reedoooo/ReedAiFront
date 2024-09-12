import { apiUtils } from '@/lib/apiUtils';

export const foldersApi = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/folders');
      return data;
    } catch (error) {
      console.error('Error fetching chat folders:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const data = await apiUtils.get(`/chat/folders/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat folder with id ${id}:`, error);
      throw error;
    }
  },

  getFoldersBySpace: async props => {
    const { space } = props;
    try {
      const response = await apiUtils.get(
        `/chat/folders/space/${encodeURIComponent(space)}`
      );
      console.log('RES', response);
      console.log('FOLDERS', response.folders);
      return response.folders;
      // const data = await apiUtils.get(`/chat/spaces/${space}/folders`);
    } catch (error) {
      console.error(`Error fetching chat folders for space ${space}:`, error);
      throw error;
    }
  },

  getFolderItemsByFolderId: async id => {
    try {
      const data = await apiUtils.get(`/chat/folders/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat folder with id ${id}:`, error);
      throw error;
    }
  },

  create: async folderData => {
    try {
      const data = await apiUtils.post('/chat/folders', folderData);
      return data;
    } catch (error) {
      console.error('Error creating chat folder:', error);
      throw error;
    }
  },

  update: async (id, folderData) => {
    try {
      const data = await apiUtils.put(`/chat/folders/${id}`, folderData);
      return data;
    } catch (error) {
      console.error(`Error updating chat folder with id ${id}:`, error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/folders/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat folder with id ${id}:`, error);
      throw error;
    }
  },
};

export default foldersApi;
