import { Typography } from '@mui/material';
import axios from 'axios';
import { constants } from 'config/constants';

const { API_URL } = constants;

const service = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let token = null;
let expiresIn = null;

export const setAuthToken = (newToken, newExpiresIn) => {
  token = newToken;
  expiresIn = newExpiresIn;
};

// Request interceptor to add the token to headers
service.interceptors.request.use(
  config => {
    // Retrieve the token from local storage if not already set
    token = token || localStorage.getItem('userToken');
    expiresIn = expiresIn || localStorage.getItem('tokenExpiresIn');

    if (expiresIn && expiresIn < Date.now() / 1000) {
      // Clear token if expired
      token = null;
      expiresIn = null;
      localStorage.removeItem('userToken');
      localStorage.removeItem('tokenExpiresIn');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error.response);
  }
);

// Response interceptor to handle responses and errors
service.interceptors.response.use(
  response => {
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      return response;
    }

    throw new Error(response.status.toString());
  },
  error => {
    if (error.response.status === 401) {
      // Handle unauthorized access (e.g., token expired or invalid)
      localStorage.removeItem('userToken');
      localStorage.removeItem('tokenExpiresIn');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const formatText = text => {
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
    .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italic
    .replace(/`(.*?)`/g, '<code>$1</code>'); // Code

  return <Typography dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export function removeCodeWrapping(str) {
  if (str.startsWith('```') && str.endsWith('```')) {
    return str.slice(3, -3);
  } else {
    return str.replace('```', '');
  }
}

export default service;
