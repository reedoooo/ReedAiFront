// src/libs/apiUtils.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from './api';
import { toast } from 'sonner';
const saveErrorToLocalStorage = (error, method) => {
  const errors = JSON.parse(localStorage.getItem('apiErrors') || '[]');
  errors.push({
    timestamp: new Date().toISOString(),
    method,
    message: error.message,
    stack: error.stack,
    config: error.config,
    response: error.response ? {
      status: error.response.status,
      data: error.response.data
    } : null
  });
  localStorage.setItem('apiErrors', JSON.stringify(errors.slice(-10))); // Keep only last 10 errors
};

const handleApiError = (error, method) => {
  console.error(`${method} request error:`, error);
  saveErrorToLocalStorage(error, method);
  const errorMessage = error.response?.data?.message || error.message;
  const statusCode = error.response?.status;
  toast.error(
    `${method} request failed: ${errorMessage}${statusCode ? ` (${statusCode})` : ''}`,
    { className: 'error-toast' }
  );
  throw error;
};
export const apiUtils = {
  async get(url, config) {
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error, 'GET');
    }
  },

  async post(url, data, config) {
    try {
      let finalConfig = config;
      if (data instanceof FormData) {
        finalConfig = {
          ...config,
          headers: {
            ...config?.headers,
            'Content-Type': 'multipart/form-data',
          },
        };
      }
      const response = await axiosInstance.post(url, data, finalConfig);
      return response.data;
    } catch (error) {
      handleApiError(error, 'POST');
    }
  },

  async put(url, data, config) {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error, 'PUT');
    }
  },

  async delete(url, config) {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error, 'DELETE');
    }
  },
};
// Utility function for making API requests using apiUtils
const axiosBaseQuery =
  () =>
  async ({ url, method, data }) => {
    try {
      let result;
      switch (method) {
        case 'GET':
          result = await apiUtils.get(url);
          break;
        case 'POST':
          result = await apiUtils.post(url, data);
          break;
        case 'PUT':
          result = await apiUtils.put(url, data);
          break;
        case 'DELETE':
          result = await apiUtils.delete(url);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      return { data: result };
    } catch (error) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

// Create API slice with RESTful endpoints
export const api = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    fetchPosts: builder.query({
      query: () => ({ url: '/posts', method: 'GET' }),
    }),
    addPost: builder.mutation({
      query: newPost => ({ url: '/posts', method: 'POST', data: newPost }),
    }),
    editPost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        data: updatedPost,
      }),
    }),
    removePost: builder.mutation({
      query: id => ({ url: `/posts/${id}`, method: 'DELETE' }),
    }),
  }),
});

export default apiUtils;
