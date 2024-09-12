// src/libs/api.js
import axios from 'axios';
import { toast } from 'react-toastify';
import constants from '@/config';
const { BASE_URL } = constants;

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
    const response = await axios.post(
      `http://localhost:3001/api/user/refresh-token`,
      {
        refreshToken,
      }
    );
    const { accessToken, newRefreshToken } = response.data;
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // If refresh token is invalid, log out the user
    sessionStorage.clear();
    window.location.href = `${window.location.origin}/auth/sign-in`;
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  async config => {
    let accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      try {
        // Check if the token is expired
        const tokenExpiration =
          JSON.parse(atob(accessToken.split('.')[1])).exp * 1000;
        if (Date.now() >= tokenExpiration) {
          // Token is expired, try to refresh it
          accessToken = await refreshToken();
        }
        // Set the token in the request headers
        config.headers.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
        console.error('Error decoding token:', error);
        saveErrorToLocalStorage(error);
        sessionStorage.removeItem('accessToken');
        window.location.href = `${window.location.origin}/auth/sign-in`;
        return Promise.reject(error);
      }
    }
    return config;
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
          sessionStorage.clear();
          window.location.href = `${window.location.origin}/auth/sign-in`;
        } else {
          toast.error('Unauthorized access. Please log in again.');
          localStorage.clear();
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
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3001/api',
//   timeout: 40000,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// export const setupInterceptors = () => {

//   axiosInstance.interceptors.request.use(
//     config => {
//       const accessToken = sessionStorage.getItem('accessToken');
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//       console.log(
//         'Request:',
//         config.method,
//         config.url,
//         config.data,
//         config.headers
//       );
//       return config;
//     },
//     error => {
//       console.error('Request Error:', error);
//       return Promise.reject(error);
//     }
//   );
//   axiosInstance.interceptors.response.use(
//     response => {
//       console.log('Response:', response.status, response.data);
//       return response;
//     },
//     error => {
//       // console.error('Response Error:', error.response.data);
//       // showMessage(message, 'error');
//       if (error.response.data.message === 'jwt expired') {
//         window.location.href = `${window.location.origin}/auth/sign-in`;
//       }
//       if (error.response.status === 401) {
//         console.error('Unauthorized access - maybe redirect to login');
//       }
//       if (error.response.status === 404) {
//         console.error('Resource not found');
//       }
//       if (error.response.status === 500) {
//         console.error('Server error');
//       }
//       if (!error.response.data.message) {
//         console.error('Unknown error');
//       }
//       return Promise.reject(error);
//     }
//     // function (error) {
//     //   const originalRequest = error.config;

//     //   if (
//     //     error.response.status === 401 &&
//     //     originalRequest.url === `${API}refresh`
//     //   ) {
//     //     // clear Auth Credentials in localstorage and then return
//     //     return Promise.reject(error);
//     //   }

//     //   // The above code is just to make sure we don't go on an infinite loop and reject if the refreshToken is invalid or expired.
//     //   if (error.response.status === 401 && !originalRequest._retry) {
//     //     originalRequest._retry = true;
//     //     const refreshToken = localStorage.getItem('refreshToken');
//     //     const user = localStorage.getItem('userStore')?.user;
//     //     return axios
//     //       .post(`${API}refresh`, {
//     //         email: user.email,
//     //         refreshToken: refreshToken,
//     //       })
//     //       .then(res => {
//     //         if (res.status === 201) {
//     //           localStorageService.setToken(res.data.accessToken);
//     //           axios.defaults.headers.common['Authorization'] =
//     //             'Bearer ' + localStorageService.getAccessToken();
//     //           return axios(originalRequest);
//     //         }
//     //       });
//     //   }
//     //   return Promise.reject(error);
//     // }
//   );
// };

// export default axiosInstance;
