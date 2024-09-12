// settings.js
import { apiUtils } from '@/lib/apiUtils';

export const settingsApi = {
  // Collections
  getAllCollections: async () => {
    try {
      const data = await apiUtils.get('/collections');
      return data;
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  },
  getCollectionById: async id => {
    try {
      const data = await apiUtils.get(`/collections/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching collection with id ${id}:`, error);
      throw error;
    }
  },
  createCollection: async collectionData => {
    try {
      const data = await apiUtils.post('/collections', collectionData);
      return data;
    } catch (error) {
      console.error('Error creating collection:', error);
      throw error;
    }
  },
  updateCollection: async (id, collectionData) => {
    try {
      const data = await apiUtils.put(`/collections/${id}`, collectionData);
      return data;
    } catch (error) {
      console.error(`Error updating collection with id ${id}:`, error);
      throw error;
    }
  },
  deleteCollection: async id => {
    try {
      const data = await apiUtils.delete(`/collections/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting collection with id ${id}:`, error);
      throw error;
    }
  },

  // Models
  getAllModels: async () => {
    try {
      const data = await apiUtils.get('/models');
      return data;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },
  getModelById: async id => {
    try {
      const data = await apiUtils.get(`/models/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching model with id ${id}:`, error);
      throw error;
    }
  },
  createModel: async modelData => {
    try {
      const data = await apiUtils.post('/models', modelData);
      return data;
    } catch (error) {
      console.error('Error creating model:', error);
      throw error;
    }
  },
  updateModel: async (id, modelData) => {
    try {
      const data = await apiUtils.put(`/models/${id}`, modelData);
      return data;
    } catch (error) {
      console.error(`Error updating model with id ${id}:`, error);
      throw error;
    }
  },
  deleteModel: async id => {
    try {
      const data = await apiUtils.delete(`/models/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting model with id ${id}:`, error);
      throw error;
    }
  },

  // Presets
  getAllPresets: async () => {
    try {
      const data = await apiUtils.get('/presets');
      return data;
    } catch (error) {
      console.error('Error fetching presets:', error);
      throw error;
    }
  },
  getPresetById: async id => {
    try {
      const data = await apiUtils.get(`/presets/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching preset with id ${id}:`, error);
      throw error;
    }
  },
  createPreset: async presetData => {
    try {
      const data = await apiUtils.post('/presets', presetData);
      return data;
    } catch (error) {
      console.error('Error creating preset:', error);
      throw error;
    }
  },
  updatePreset: async (id, presetData) => {
    try {
      const data = await apiUtils.put(`/presets/${id}`, presetData);
      return data;
    } catch (error) {
      console.error(`Error updating preset with id ${id}:`, error);
      throw error;
    }
  },
  deletePreset: async id => {
    try {
      const data = await apiUtils.delete(`/presets/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting preset with id ${id}:`, error);
      throw error;
    }
  },

  // Prompts
  getPromptFiles: async () => {
    try {
      const response = await apiUtils.get('/chat/prompts?name=prompt_files');
      // const response = await apiUtils.get('/chat/prompts');
      console.log(response);
      // const data = await apiUtils.get('/chat/prompts/prompt-files');
      return response.prompts;
    } catch (error) {
      console.error('Error fetching chat prompts:', error);
      throw error;
    }
  },
  getAllPrompts: async () => {
    try {
      const data = await apiUtils.get('/chat/prompts');
      return data;
    } catch (error) {
      console.error('Error fetching chat prompts:', error);
      throw error;
    }
  },
  getPromptById: async id => {
    try {
      const data = await apiUtils.get(`/chat/prompts/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat prompt with id ${id}:`, error);
      throw error;
    }
  },
  createPrompt: async props => {
    const { promptData } = props;
    try {
      console.log('Creating chat prompt:', promptData);
      const data = await apiUtils.post('/chat/prompts', promptData);
      return data;
    } catch (error) {
      console.error('Error creating chat prompt:', error);
      throw error;
    }
  },
  updatePrompt: async props => {
    const { id, promptData } = props;
    try {
      const data = await apiUtils.put(`/chat/prompts/${id}`, promptData);
      return data;
    } catch (error) {
      console.error(`Error updating chat prompt with id ${id}:`, error);
      throw error;
    }
  },
  deletePrompt: async id => {
    try {
      const data = await apiUtils.delete(`/chat/prompts/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat prompt with id ${id}:`, error);
      throw error;
    }
  },
  downloadPromptTemplate: async downloadURL => {
    try {
      const response = await fetch(downloadURL);

      const blob = await response.blob();
      const file = new File([blob], 'prompt_template.txt', { type: blob.type });
      return file;
    } catch (error) {
      console.error('Error downloading prompt template:', error);
      throw error;
    }
  },
  addPromptTemplate: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiUtils.post(
        `/chat/prompts/${id}/template`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding prompt template:', error);
      throw error;
    }
  },
  modifyPromptTemplate: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiUtils.put(
        `/chat/prompts/${id}/template`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error modifying prompt template:', error);
      throw error;
    }
  },

  // Tools
  getAllTools: async () => {
    try {
      const data = await apiUtils.get('/chat/tools');
      return data;
    } catch (error) {
      console.error('Error fetching chat tools:', error);
      throw error;
    }
  },
  getToolById: async id => {
    try {
      const data = await apiUtils.get(`/chat/tools/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat tool with id ${id}:`, error);
      throw error;
    }
  },
  createTool: async toolData => {
    try {
      const data = await apiUtils.post('/chat/tools', toolData);
      return data;
    } catch (error) {
      console.error('Error creating chat tool:', error);
      throw error;
    }
  },
  updateTool: async (id, toolData) => {
    try {
      const data = await apiUtils.put(`/chat/tools/${id}`, toolData);
      return data;
    } catch (error) {
      console.error(`Error updating chat tool with id ${id}:`, error);
      throw error;
    }
  },
  deleteTool: async id => {
    try {
      const data = await apiUtils.delete(`/chat/tools/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat tool with id ${id}:`, error);
      throw error;
    }
  },
};

export default settingsApi;
