import { apiUtils } from '@/lib/apiUtils';

export const chatFiles = {
  getAll: async () => {
    try {
      const data = await apiUtils.get('/files/static/list');
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
  getAllFiles: async () => {
    try {
      const fileTypes =
        'json,txt,.jsx,.js,.png,text/jsx,application/javascript';
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
  fetchChatFileDataByType: async filename => {
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
  getChatFiles: async () => {
    try {
      const fileTypes =
        'json,txt,.jsx,.js,.png,text/jsx,application/javascript';
      const data = await apiUtils.get(`/chat/chatFiles/list/${fileTypes}`);
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
  getFile: async id => {
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
  uploadFile: async (file, payload) => {
    const { name, userId, fileId } = payload;
    const SIZE_LIMIT = parseInt('10000000');

    if (file.size > SIZE_LIMIT) {
      throw new Error(
        `File must be less than ${Math.floor(SIZE_LIMIT / 1000000)}MB`
      );
    }

    const filePath = `${userId}/${Buffer.from(fileId).toString('base64')}`;

    const { error } = await apiUtils.post(file, filePath);

    if (error) {
      throw new Error('Error uploading file');
    }

    return filePath;
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
  // uploadFile: async (file, onUploadProgress, reqType) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   const additionalData = {
  //     filename: file.name,
  //     filesize: file.size,
  //     filetype: file.type,
  //   };
  //   // Append additional data if provided
  //   Object.keys(additionalData).forEach(key => {
  //     formData.append(key, additionalData[key]);
  //   });
  //   const url =
  //     reqType === 'chat' ? '/chat/files/upload/single' : '/files/upload/single';
  //   try {
  //     const data = await apiUtils.post(url, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       onUploadProgress: event => {
  //         const progress = Math.round((100 * event.loaded) / event.total);
  //         console.log('Upload progress:', progress);
  //         onUploadProgress(progress);
  //       },
  //     });
  //     return data;
  //   } catch (error) {
  //     console.error('File upload error:', error);
  //     throw error;
  //   }
  // },

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
};
