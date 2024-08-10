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
  // const navigate = useNavigate();
  api.interceptors.request.use(
    config => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        console.log('[VALID TOKEN BEING PASSED]', accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      if (!accessToken) {
        console.error('[NO TOKEN FOUND FOR REQUEST]', config);
      }
      console.log(
        'Request:',
        config.method,
        config.url,
        config.data,
        config.headers
      );
      return config;
    },
    error => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    response => {
      console.log('Response:', response.status, response.data);
      return response;
    },
    error => {
      console.error('Response Error:', error.response.data);
      if (error.response.data.message === 'jwt expired') {
        // navigate('/auth/sign-in', { replace: true });
        window.location.href = `${window.location.origin}/auth/sign-in`;
      }
      // if (error.response && error.response.status === 401) {
      //   toast.error('Your session has expired. Please log in again.');
      // }
      return Promise.reject(error);
    }
    // function (error) {
    //   const originalRequest = error.config;

    //   if (
    //     error.response.status === 401 &&
    //     originalRequest.url === `${API}refresh`
    //   ) {
    //     // clear Auth Credentials in localstorage and then return
    //     return Promise.reject(error);
    //   }

    //   // The above code is just to make sure we don't go on an infinite loop and reject if the refreshToken is invalid or expired.
    //   if (error.response.status === 401 && !originalRequest._retry) {
    //     originalRequest._retry = true;
    //     const refreshToken = localStorage.getItem('refreshToken');
    //     const user = localStorage.getItem('userStore')?.user;
    //     return axios
    //       .post(`${API}refresh`, {
    //         email: user.email,
    //         refreshToken: refreshToken,
    //       })
    //       .then(res => {
    //         if (res.status === 201) {
    //           localStorageService.setToken(res.data.accessToken);
    //           axios.defaults.headers.common['Authorization'] =
    //             'Bearer ' + localStorageService.getAccessToken();
    //           return axios(originalRequest);
    //         }
    //       });
    //   }
    //   return Promise.reject(error);
    // }
  );
};
export default api;
