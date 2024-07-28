import { useAuthStore } from 'contexts/AuthProvider';
import request, { setAuthToken } from './axios';

const useHttp = () => {
  const { state: authState, actions: authActions } = useAuthStore();

  const updateAuthToken = () => {
    const token = authState.token;
    const expiresIn = authState.expiresIn;
    setAuthToken(token, expiresIn);
  };

  const http = async ({
    url,
    data,
    method = 'GET',
    headers = {},
    onDownloadProgress = ProgressEvent => {},
    signal = null,
    beforeRequest: beforeRequest = () => {},
    afterRequest: afterRequest = () => {},
  }) => {
    const successHandler = res => {
      afterRequest?.();
      if (res.data.status === 'Success' || typeof res.data === 'string') {
        return res.data;
      }

      if (res.data.status === 'Unauthorized') {
        authActions.removeToken();
        window.location.reload();
      }

      return Promise.reject(res.data);
    };

    const failHandler = error => {
      afterRequest?.();
      throw new Error(error?.message || 'Error');
    };

    beforeRequest?.();
    updateAuthToken();

    // Append userId and apiKey from localStorage to the data object
    const userId = localStorage.getItem('userId');
    const apiKey = localStorage.getItem('apiKey');

    const params = {
      ...((typeof data === 'function' ? data() : data) ?? {}),
      ...(userId && { userId }),
      ...(apiKey && { apiKey }),
    };

    try {
      if (method.toUpperCase() === 'GET') {
        const response = await request.get(url, {
          params,
          headers,
          signal,
          onDownloadProgress,
        });
        return successHandler(response);
      } else {
        const response = await request({
          method,
          url,
          data: params,
          headers,
          signal,
          onDownloadProgress,
        });
        return successHandler(response);
      }
    } catch (error) {
      return failHandler(error);
    }
  };

  const get = options => {
    return http({ ...options, method: 'GET' });
  };

  const post = options => {
    return http({ ...options, method: 'POST' });
  };

  return { get, post };
};

export default useHttp;
