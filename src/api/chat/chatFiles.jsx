import apiUtils from '@/lib/apiUtils';

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

  getFile: async id => {
    try {
      const data = await apiUtils.get(`/chat/files/${id}`);
      return data;
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  },

  uploadFile: async (file, onUploadProgress, reqType) => {
    const formData = new FormData();
    formData.append('file', file);
    const additionalData = {
      filename: file.name,
      filesize: file.size,
      filetype: file.type,
    };
    // Append additional data if provided
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });
    const url =
      reqType === 'chat' ? '/chat/files/single' : '/files/upload/single';
    try {
      const data = await apiUtils.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: event => {
          const progress = Math.round((100 * event.loaded) / event.total);
          onUploadProgress(progress);
        },
      });
      return data;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
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
};
