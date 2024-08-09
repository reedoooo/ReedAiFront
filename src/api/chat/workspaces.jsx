import { apiUtils } from '@/lib/apiUtils';

export const workspaces = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/chat/workspaces');
      return data;
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      throw error;
    }
  },

  getById: async id => {
    try {
      const data = await apiUtils.get(`/chat/workspaces/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching workspace with id ${id}:`, error);
      throw error;
    }
  },

  /** Create a new workspace.
   * @param {Object} workspaceData - The workspace data to create (includes: name, description, profileContext, defaultSystemPrompt, defaultAssistantPrompt, defaultModel)
   * @returns {Promise<Object>} - The created workspace data
   * @throws {Error} - If an error occurs creating the workspace
   */
  create: async workspaceData => {
    try {
      const data = await apiUtils.post(
        '/chat/workspaces/create',
        workspaceData
      );
      return data;
    } catch (error) {
      console.error('Error creating workspace:', error);
      throw error;
    }
  },

  update: async (id, workspaceData) => {
    try {
      const data = await apiUtils.put(`/chat/workspaces/${id}`, workspaceData);
      return data;
    } catch (error) {
      console.error(`Error updating workspace with id ${id}:`, error);
      throw error;
    }
  },

  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/workspaces/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting workspace with id ${id}:`, error);
      throw error;
    }
  },
};
