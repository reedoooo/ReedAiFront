import { apiUtils } from '@/lib/apiUtils';

export const attachmentsApi = {
  // Function to download a file from the GridFS bucket
  uploadFile: async (file, payload) => {
    try {
      const { name, userId, fileId, workspaceId, folderId, space } = payload;
      const SIZE_LIMIT = 10 * 1024 * 1024; // 10MB size limit

      // Check if required values are present
      if (!file) {
        throw new Error('File is required');
      }

      if (!name || !userId || !fileId) {
        throw new Error('File name, userId, and fileId are required');
      }

      if (file.size > SIZE_LIMIT) {
        throw new Error(
          `File must be less than ${Math.floor(SIZE_LIMIT / 1000000)}MB`
        );
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('userId', userId);
      formData.append('workspaceId', workspaceId);
      formData.append('folderId', folderId);
      formData.append('fileId', fileId);
      formData.append('space', space);

      // API request
      const response = await apiUtils.post('/chat/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
          // Optional: Update a progress state here if needed for a progress bar
        },
      });

      // Check if the response is valid and contains a file path
      if (!response || !response.data || !response.data.filePath) {
        throw new Error('No response or file path received from the server');
      }
      console.log(`File uploaded successfully: ${response.data}`);
      // Return the file path if the upload is successful
      return response.data;
    } catch (error) {
      // Log and rethrow the error for higher-level handling
      console.error('Error uploading file:', error.message || error);
      throw error;
    }
  },
  getAllStoredFiles: async () => {
    try {
      const response = await apiUtils.get('/chat/files/storage');
      return response.data;
    } catch (error) {
      console.error('Error fetching all stored files:', error);
      throw error;
    }
  },
  getStoredFilesByType: async type => {
    try {
      const response = await apiUtils.get(`/chat/files/storage/type/${type}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stored files of type ${type}:`, error);
      throw error;
    }
  },
  getStoredFilesBySpace: async space => {
    try {
      const response = await apiUtils.get(`/chat/files/storage/space/${space}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stored files for space ${space}:`, error);
      throw error;
    }
  },
  getStoredFileByName: async filename => {
    try {
      const response = await apiUtils.get(
        `/chat/files/storage/filename/${filename}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching stored file ${filename}:`, error);
      throw error;
    }
  },
  getAllStorageFiles: async () => {
    try {
      const response = await apiUtils.get('/chat/files/storage');
      return response.data;
    } catch (error) {
      console.error('Error fetching files:', error.message || error);
      throw error;
    }
  },
  getStorageFile: async fileId => {
    try {
      const response = await apiUtils.get(`/chat/files/storage/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching file:', error.message || error);
      throw error;
    }
  },
  streamStorageFile: async fileId => {
    try {
      const response = await apiUtils.get(
        `/chat/files/storage/stream/${fileId}`,
        {
          responseType: 'blob',
        }
      );
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error('Error streaming file:', error.message || error);
      throw error;
    }
  },
  downloadFileFromStorage: async fileId => {
    try {
      const response = await apiUtils.get(`/bucket/download/${fileId}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = response.headers['content-disposition']
        ? response.headers['content-disposition'].split('filename=')[1]
        : 'downloaded_file';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  },
  deleteFileFromStorage: async fileId => {
    try {
      const response = await apiUtils.delete(`/bucket/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },
  listFilesInStorage: async () => {
    try {
      const response = await apiUtils.get('/bucket/files');
      return response.data;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  },
  // --- OLDER ---
  getAllFiles: async () => {
    try {
      const data = await apiUtils.get('/chat/files/static/list');
      return data;
    } catch (error) {
      console.error('Error fetching chat presets:', error);
      throw error;
    }
  },
  getAllFilesByType: async filetype => {
    try {
      const data = await apiUtils.get(`/chat/files/static/list/${filetype}`);
      return data;
    } catch (error) {
      console.error('Error fetching chat presets:', error);
      throw error;
    }
  },
  getAllImages: async () => {
    try {
      const fileTypes = 'png';
      const data = await apiUtils.get(`/chat/files/static/${fileTypes}`);
      return data;
    } catch (error) {
      console.error('Error fetching chat presets:', error);
      throw error;
    }
  },
  getAllChatFiles: async () => {
    try {
      const fileTypes =
        'json,txt,.jsx,.js,.png,text/jsx,application/javascript';
      const data = await apiUtils.get(`/chat/chatFiles/static/list`);
      return data;
    } catch (error) {
      console.error('Error fetching chat presets:', error);
      throw error;
    }
  },
  fetchChatFileData: async () => {
    try {
      const data = await apiUtils.get(`/files/list-files`);
      return data;
    } catch (error) {
      console.error('Error fetching chat file data:', error);
      throw error;
    }
  },
  getFileByName: async filename => {
    try {
      const data = await apiUtils.get(`/chat/files/static/${filename}`);
      return data;
    } catch (error) {
      console.error('Error fetching chat file data:', error);
      throw error;
    }
  },
  /**
   * Upserts (creates or updates) file data in the database.
   *
   * @param {Object} vectorDocData - The file data to be upserted.
   * @param {string} vectorDocData.fileId - The unique identifier of the file.
   * @param {string} vectorDocData.fileName - The name of the file.
   * @param {string} vectorDocData.fileType - The type of the file.
   * @param {string} vectorDocData.fileContent - The content of the file.
   * @param {string} vectorDocData.userId - The unique identifier of the user who uploaded the file.
   * @param {string} vectorDocData.workspaceId - The unique identifier of the workspace where the file is associated.
   * @param {string} vectorDocData.folderId - The unique identifier of the folder where the file is located.
   *
   * @returns {Promise<Object>} - A promise that resolves to the upserted file data.
   * @throws {Error} - If there is an error fetching or upserting the file data.
   */
  upsertFileData: async vectorDocData => {
    try {
      const data = await apiUtils.post(
        `/chat/files/upsert-docs`,
        vectorDocData
      );
      return data;
    } catch (error) {
      console.error('Error fetching chat file data:', error);
      throw error;
    }
  },
  fetchFileDataByType: async filename => {
    try {
      const data = await apiUtils.get(`/files/static/${filename}`);
      return data;
    } catch (error) {
      console.error('Error fetching chat file data:', error);
      throw error;
    }
  },
  getChatImages: async () => {
    try {
      const fileTypes = 'png';
      const data = await apiUtils.get(
        `/chat/chatFiles/static/list/${fileTypes}`
      );
      return data;
    } catch (error) {
      console.error('Error fetching chat presets:', error);
      throw error;
    }
  },
  createFile: async fileRecord => {
    try {
      const data = await apiUtils.post('/chat/files', fileRecord);
      return data;
    } catch (error) {
      console.error('Error creating file:', error);
      throw error;
    }
  },
  createFileWorkspace: async items => {
    try {
      const data = await apiUtils.post('/chat/file_workspaces', items);
      return data;
    } catch (error) {
      console.error('Error creating file workspace:', error);
      throw error;
    }
  },
  updateFile: async (id, fileRecord) => {
    try {
      const data = await apiUtils.put(`/chat/files/${id}`, fileRecord);
      return data;
    } catch (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  },
  deleteFile: async id => {
    try {
      const data = await apiUtils.delete(`/chat/files/${id}`);
      return data;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },
  deleteFileWorkspace: async id => {
    try {
      const data = await apiUtils.delete(`/chat/file_workspaces/${id}`);
      return data;
    } catch (error) {
      console.error('Error deleting file workspace:', error);
      throw error;
    }
  },
  getFileById: async id => {
    try {
      const data = await apiUtils.get(`/chat/files/${id}`);
      return data;
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  },
  getFileRetrievalProcess: async fileId => {
    try {
      const data = await apiUtils.get(`/chat/file/retrieval/process/${fileId}`);
      return data;
    } catch (error) {
      console.error('Error fetching file retrieval process:', error);
      throw error;
    }
  },
  uploadMessageImage: async (path, image) => {
    const imageSizeLimit = 6000000; // 6MB

    if (image.size > imageSizeLimit) {
      throw new Error(`Image must be less than ${imageSizeLimit / 1000000}MB`);
    }

    const { error } = await apiUtils.post(image, path);

    if (error) {
      throw new Error('Error uploading image');
    }

    return path;
  },
  downloadFile: async (fileId, onDownloadProgress, reqType) => {
    try {
      const reqUrl =
        reqType === 'chat'
          ? `/chat/files/download/${fileId}`
          : `/files/download/${fileId}`;
      const data = await apiUtils.get(reqUrl, {
        responseType: 'blob',
        onDownloadProgress: event => {
          const progress = Math.round((100 * event.loaded) / event.total);
          onDownloadProgress(progress);
        },
      });

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file_name'); // Replace with the actual file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('File download error:', error);
      throw error;
    }
  },

  // Chat Messages Operations
  getAllMessages: async () => {
    try {
      const data = await apiUtils.get('/chat/messages');
      return data;
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      throw error;
    }
  },

  getMessageById: async id => {
    try {
      const data = await apiUtils.get(`/chat/messages/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching chat message with id ${id}:`, error);
      throw error;
    }
  },

  createMessage: async messageData => {
    try {
      const data = await apiUtils.post('/chat/messages', messageData);
      return data;
    } catch (error) {
      console.error('Error creating chat message:', error);
      throw error;
    }
  },

  updateMessage: async (id, messageData) => {
    try {
      const data = await apiUtils.put(`/chat/messages/${id}`, messageData);
      return data;
    } catch (error) {
      console.error(`Error updating chat message with id ${id}:`, error);
      throw error;
    }
  },

  deleteMessage: async id => {
    try {
      const data = await apiUtils.delete(`/chat/messages/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting chat message with id ${id}:`, error);
      throw error;
    }
  },
};

export default attachmentsApi;
