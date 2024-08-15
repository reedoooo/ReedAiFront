// src/libs/apiUtils.js
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from './api';
import { toast } from 'sonner';

export const apiUtils = {
  async get(url) {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('GET request error:', error);
      toast.error(
        `GET request failed: ${error.message} ${error.response.status}` +
          ': ' +
          error.response.statusText,
        { className: 'error-toast' }
      );

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
      const response = await axiosInstance.post(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error('POST request error:', error);
      toast.error(
        `POST request failed: ${error.message} ${error.response.status}` +
          ': ' +
          error.response.statusText,
        { className: 'error-toast' }
      );
      throw error;
    }
  },

  async put(url, data, config) {
    const headers = {
      'Content-Type': 'application/json',
      ...config?.headers,
    };
    try {
      const response = await axiosInstance.put(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error('PUT request error:', error);
      toast.error(
        `PUT request failed: ${error.message} ${error.response.status}` +
          ': ' +
          error.response.statusText,
        { className: 'error-toast' }
      );
      throw error;
    }
  },

  async delete(url, config) {
    const headers = {
      'Content-Type': 'application/json',
      ...config?.headers,
    };
    try {
      const response = await axiosInstance.delete(url, { headers });
      return response.data;
    } catch (error) {
      console.error('DELETE request error:', error);
      toast.error(
        `DELETE request failed: ${error.message} ${error.response.status}` +
          ': ' +
          error.response.statusText,
        { className: 'error-toast' }
      );
      throw error;
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
