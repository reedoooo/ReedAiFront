// src/libs/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

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

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    console.error('[AXIOS_ERROR]', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  error => {
    if (error.response.data.message === 'jwt expired') {
      window.location.href = `${window.location.origin}/auth/sign-in`;
    }
    if (error.response.status === 401) {
      console.error('[AXIOS_ERROR] Unauthorized access - maybe redirect to login');
      // clear local storage and redirect to login
      localStorage.clear();
      window.location.href = `${window.location.origin}/auth/sign-in`;
    }
    if (error.response.status === 404) {
      console.error('[AXIOS_ERROR] Resource not found');
    }
    if (error.response.status === 500) {
      console.error('[AXIOS_ERROR] Server error');
    }
    if (!error.response.data.message) {
      console.error('[AXIOS_ERROR] Unknown error');
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
