import { apiUtils } from '@/lib/apiUtils';

export const workspacesApi = {
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

  getWorkspaceFoldersBySpace: async props => {
    const { workspaceId, space } = props;
    try {
      const response = await apiUtils.get(
        `/chat/workspaces/${encodeURIComponent(workspaceId)}/folders/space/${encodeURIComponent(space)}`
      );
      console.log('RES', response);
      console.log('FOLDERS', response.folders);
      console.log('WORKSPACE', response.workspace);
      return response.folders;
      // const data = await apiUtils.get(`/chat/spaces/${space}/folders`);
    } catch (error) {
      console.error(`Error fetching chat folders for space ${space}:`, error);
      throw error;
    }
  },
  getWorkspaceSessionsByWorkspaceId: async props => {
    const { workspaceId, userId } = props;
    try {
      const response = await apiUtils.get(
        `/chat/workspaces/${encodeURIComponent(workspaceId)}/chatSessions`
      );
      console.log('RES', response);
      console.log('CHATSESSIONS', response.chatSessions);
      console.log('WORKSPACE', response.workspace);
      return response.chatSessions;
    } catch (error) {
      console.error(
        `Error fetching chat sessions for workspace ${workspaceId}:`,
        error
      );
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

export default workspacesApi;
