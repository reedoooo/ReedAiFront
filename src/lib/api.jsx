// src/libs/api.js
import axios from 'axios';
// import { toast } from 'react-toastify';
import { toast, Toaster } from 'sonner';
import constants from '@/config';
import { jwtDecode } from 'jwt-decode';

const { BASE_URL } = constants;

function safelyDecodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

/**
 * Axios instance for making API requests.
 *
 * @type {import("axios").AxiosInstance}
 */
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Function to save error to localStorage
const saveErrorToLocalStorage = error => {
  const errors = JSON.parse(localStorage.getItem('apiErrors') || '[]');
  errors.push({
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    config: error.config,
    response: error.response
      ? {
          status: error.response.status,
          data: error.response.data,
        }
      : null,
  });
  localStorage.setItem('apiErrors', JSON.stringify(errors.slice(-10))); // Keep only last 10 errors
};

// Function to refresh the token
const refreshToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(
      `${BASE_URL}/user/refresh-token`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.data.accessToken || !response.data.refreshToken) {
      throw new Error('Invalid token response');
    }

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    sessionStorage.clear();
    window.location.href = `${window.location.origin}/auth/sign-in`;
    throw error;
  }
};
const handleTokenExpiration = async config => {
  let accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const decodedToken = safelyDecodeToken(accessToken);
  if (!decodedToken) {
    throw new Error('Invalid token payload');
  }

  if (!decodedToken.exp) {
    throw new Error('Token has no expiration');
  }
  const tokenExpiration = decodedToken.expiresIn * 1000;
  const currentTime = Math.floor(Date.now() / 1000);
  // if (decodedToken.expiresIn && decodedToken.expiresIn < currentTime) {
  //   console.log('Token has expired');
  //   accessToken = await refreshToken();
  // }
  if (Date.now() >= tokenExpiration) {
    console.log('Token has expired');
    accessToken = await refreshToken();
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

axiosInstance.interceptors.request.use(
  async config => {
    try {
      return await handleTokenExpiration(config);
    } catch (error) {
      console.error('Error handling token:', error);
      saveErrorToLocalStorage(error);
      sessionStorage.removeItem('accessToken');
      window.location.href = `${window.location.origin}/auth/sign-in`;
      return Promise.reject(error);
    }
  },
  error => {
    console.error('[AXIOS_REQUEST_ERROR]', error);
    saveErrorToLocalStorage(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  async error => {
    console.error('[AXIOS_RESPONSE_ERROR]', error);
    saveErrorToLocalStorage(error);

    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    switch (status) {
      case 401:
        if (data.message === 'jwt expired') {
          try {
            const newAccessToken = await refreshToken();
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(error.config);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            sessionStorage.clear();
            window.location.href = `${window.location.origin}/auth/sign-in`;
          }
        } else {
          toast.error('Unauthorized access. Please log in again.');
          sessionStorage.clear();
          window.location.href = `${window.location.origin}/auth/sign-in`;
        }
        break;
      case 403:
        toast.error(
          'Access forbidden. You do not have permission to perform this action.'
        );
        break;
      case 404:
        toast.error('Resource not found.');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(data.message || 'An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
