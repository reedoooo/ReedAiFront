import { apiUtils } from '@/lib/apiUtils';

export const chatAssistants = {
  getExistingAssistants: async () => {
    try {
      const data = await apiUtils.post('/chat/v1/assistants/list');
      return data;
    } catch (error) {
      console.error('Error fetching existing chat assistants:', error);
      throw error;
    }
  },
  getByThread: async (threadId, prompt) => {
    try {
      const data = await apiUtils.post(`/chat/v1/assistants/byThread`, {
        threadId,
        prompt,
      });
      return data;
    } catch (error) {
      console.error(
        `Error fetching chat assistants for thread ${threadId} with prompt "${prompt}":`,
        error
      );
      throw error;
    }
  },
  create: async assistantData => {
    try {
      const data = await apiUtils.post(
        '/chat/v1/assistants/create',
        assistantData
      );
      return data;
    } catch (error) {
      console.error('Error creating chat assistant:', error);
      throw error;
    }
  },
  ddelete: async assistantData => {
    try {
      const data = await apiUtils.post(
        '/chat/v1/assistants/create',
        assistantData
      );
      return data;
    } catch (error) {
      console.error('Error creating chat assistant:', error);
      throw error;
    }
  },
  update: async assistantData => {
    try {
      const data = await apiUtils.post(
        '/chat/v1/assistants/create',
        assistantData
      );
      return data;
    } catch (error) {
      console.error('Error creating chat assistant:', error);
      throw error;
    }
  },
  uploadFile: async filePath => {
    try {
      const data = await apiUtils.post('/chat/v1/assistants/files/upload', {
        filePath,
      });
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
  createThread: async threadData => {
    try {
      const data = await apiUtils.post(
        '/chat/v1/assistants/threads/create',
        threadData
      );
      return data;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  },
  createMessage: async (threadId, messageData) => {
    try {
      const data = await apiUtils.post('/chat/v1/assistants/messages/create', {
        threadId,
        ...messageData,
      });
      return data;
    } catch (error) {
      console.error(`Error creating message for thread ${threadId}:`, error);
      throw error;
    }
  },
  createRun: async (threadId, runData) => {
    try {
      const data = await apiUtils.post('/chat/v1/assistants/runs/create', {
        threadId,
        ...runData,
      });
      return data;
    } catch (error) {
      console.error(`Error creating run for thread ${threadId}:`, error);
      throw error;
    }
  },
  createRunStream: async (threadId, runData) => {
    try {
      const data = await apiUtils.post(
        '/chat/v1/assistants/runs/createStream',
        {
          threadId,
          ...runData,
        }
      );
      return data;
    } catch (error) {
      console.error(`Error creating run stream for thread ${threadId}:`, error);
      throw error;
    }
  },
  createRunStreamWithFunctions: async runData => {
    try {
      const data = await apiUtils.post(
        '/chat/v1/assistants/runs/createStreamWithFunctions',
        runData
      );
      return data;
    } catch (error) {
      console.error('Error creating run stream with functions:', error);
      throw error;
    }
  },
  retrieveRun: async (threadId, runId) => {
    try {
      const data = await apiUtils.post('/chat/v1/assistants/runs/retrieve', {
        threadId,
        runId,
      });
      return data;
    } catch (error) {
      console.error(
        `Error retrieving run ${runId} for thread ${threadId}:`,
        error
      );
      throw error;
    }
  },
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
      const data = await apiUtils.get(`/chat/v1/assistants/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat assistant with id ${id}:`, error);
      throw error;
    }
  },
  // create: async assistantData => {
  //   try {
  //     const data = await apiUtils.post('/chat/assistants', assistantData);
  //     return data;
  //   } catch (error) {
  //     console.error('Error creating chat assistant:', error);
  //     throw error;
  //   }
  // },
  // update: async (id, assistantData) => {
  //   try {
  //     const data = await apiUtils.put(
  //       `/chat/v1/assistants/${id}`,
  //       assistantData
  //     );
  //     return data;
  //   } catch (error) {
  //     console.error(`Error updating chat assistant with id ${id}:`, error);
  //     throw error;
  //   }
  // },
  delete: async id => {
    try {
      const data = await apiUtils.delete(`/chat/v1/assistants/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat assistant with id ${id}:`, error);
      throw error;
    }
  },
};
