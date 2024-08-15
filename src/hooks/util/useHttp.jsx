// import { apiUtils } from '@/lib/apiUtils';
// import { useUserStore } from 'contexts';
// // import { setAuthTokens } from 'store/Slices';

// export const useHttp = () => {
//   const { state: authState, actions: authActions } = useUserStore();

//   const updateAuthToken = () => {
//     const token = authState.token;
//     const expiresIn = authState.expiresIn;
//     console.log('UPDATING IN AUTH', token, expiresIn);
//     // setAuthTokens(token, expiresIn);
//   };

//   const http = async ({
//     url,
//     data,
//     method = 'GET',
//     headers = {},
//     onDownloadProgress = ProgressEvent => {},
//     signal = null,
//     beforeRequest: beforeRequest = () => {},
//     afterRequest: afterRequest = () => {},
//   }) => {
//     const successHandler = res => {
//       afterRequest?.();
//       if (res.data.status === 'Success' || typeof res.data === 'string') {
//         return res.data;
//       }

//       if (res.data.status === 'Unauthorized') {
//         authActions.removeToken();
//         window.location.reload();
//       }

//       return Promise.reject(res.data);
//     };

//     const failHandler = error => {
//       afterRequest?.();
//       throw new Error(error?.message || 'Error');
//     };

//     beforeRequest?.();
//     updateAuthToken();

//     // Append userId and apiKey from localStorage to the data object
//     const userId = sessionStorage.getItem('userId');
//     const apiKey = sessionStorage.getItem('apiKey');

//     const params = {
//       ...((typeof data === 'function' ? data() : data) ?? {}),
//       ...(userId && { userId }),
//       ...(apiKey && { apiKey }),
//     };

//     try {
//       if (method.toUpperCase() === 'GET') {
//         const response = await apiUtils.get(url, {
//           params,
//           headers,
//           signal,
//           onDownloadProgress,
//         });
//         return successHandler(response);
//       } else {
//         const response = await apiUtils({
//           method,
//           url,
//           data: params,
//           headers,
//           signal,
//           onDownloadProgress,
//         });
//         return successHandler(response);
//       }
//     } catch (error) {
//       return failHandler(error);
//     }
//   };

//   const get = options => {
//     return http({ ...options, method: 'GET' });
//   };

//   const post = options => {
//     return http({ ...options, method: 'POST' });
//   };

//   return { get, post };
// };

// export default useHttp;
