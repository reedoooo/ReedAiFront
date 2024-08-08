// src/libs/apiUtils.js
import api from './api';

export const apiUtils = {
  async get(url) {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  },

  async post(url, data, config) {
    console.log('config', config);
    const headers = {
      'Content-Type': 'application/json',
      ...config?.headers,
    };
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  },

  async put(url, data) {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  },

  async delete(url) {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  },
};

export default apiUtils;
