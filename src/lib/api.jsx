// src/libs/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const setupInterceptors = () => {
  api.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      console.log('Request:', config.method, config.url, config.data, config.headers);
      return config;
    },
    error => Promise.reject(error)
  );
  api.interceptors.response.use(
    response => {
      console.log('Response:', response.status, response.data);
      return response;
    },
    function (error) {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        originalRequest.url === `${API}refresh`
      ) {
        // clear Auth Credentials in localstorage and then return
        return Promise.reject(error);
      }

      // The above code is just to make sure we don't go on an infinite loop and reject if the refreshToken is invalid or expired.
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('userStorage')?.user;
        return axios
          .post(`${API}refresh`, {
            email: user.email,
            refreshToken: refreshToken,
          })
          .then(res => {
            if (res.status === 201) {
              localStorageService.setToken(res.data.accessToken);
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + localStorageService.getAccessToken();
              return axios(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );
};
export default api;
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// api.interceptors.request.use(
//   async config => {
//     const accessToken = localStorage.getItem('accessToken');
//     const expiresIn = localStorage.getItem('expiresIn');
//     if (accessToken && expiresIn && Date.now() < parseInt(expiresIn, 10)) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     } else {
//       try {
//         const newAccessToken = await handleRefreshAccessToken();
//         config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//       } catch (error) {
//         // Error is already handled in refreshAccessToken
//         console.log('error', error);
//         return Promise.reject(error);
//       }
//     }

//     return config;
//   },
//   error => Promise.reject(error)
// );
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     // if (
//     //   error.response &&
//     //   error.response.status === 401 &&
//     //   !error.config._retry
//     // ) {
//     //   error.config._retry = true;
//     //   try {
//     //     const newAccessToken = await handleRefreshAccessToken();
//     //     error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//     //     return api(error.config);
//     //   } catch (refreshError) {
//     //     // Error is already handled in refreshAccessToken
//     //     return Promise.reject(refreshError);
//     //   }
//     // }
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const { handleRefreshAccessToken } = useAuthStore.getState();
//         await handleRefreshAccessToken();
//         const { accessToken } = useAuthStore.getState();
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         useAuthStore.getState().logout();
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     if (error.response.status === 500) {
//       toast.error('Internal Server Error. Please try again later.');
//     } else if (error.response.status === 404) {
//       toast.error('Requested resource not found.');
//     } else {
//       toast.error(
//         error.response.data.message || 'An error occurred. Please try again.'
//       );
//     }
//     return Promise.reject(error);
//   }
// );
// export const setAuthTokens = (newAccessToken, newRefreshToken, expiresIn) => {
//   console.log('tokenExpiryDate', tokenExpiryDate);
//   sessionStorage.setItem('userToken', newAccessToken);
//   sessionStorage.setItem('accessToken', newAccessToken);
//   sessionStorage.setItem('refreshToken', newRefreshToken);
//   sessionStorage.setItem('tokenExpiryDate', new Date(Date.now() + expiresIn * 1000));
// };

// export const clearAuthTokens = () => {
//   sessionStorage.removeItem('accessToken');
//   sessionStorage.removeItem('refreshToken');
//   sessionStorage.removeItem('tokenExpiryDate');
// };

// Helper function to refresh access token
// export const refreshAccessToken = async () => {
//   try {
//     const refreshToken = sessionStorage.getItem('refreshToken');
//     if (!refreshToken) {
//       throw new Error('No refresh token available');
//     }

//     const { data } = await axios.post(
//       'http://localhost:3001/api/user/refresh-token',
//       { token: refreshToken }
//     );

//     if (!data.accessToken || !data.refreshToken || !data.expiresIn) {
//       throw new Error('Invalid response from refresh token endpoint');
//     }

//     setAuthTokens(data.accessToken, data.refreshToken, data.expiresIn);
//     return data.accessToken;
//   } catch (error) {
//     console.error('Failed to refresh token:', error);
//     // clearAuthTokens();
//     // window.location.href = '/auth/sign-in';
//     throw error;
//   }
// };
// Request interceptor to add authorization token
