import { useEffect, useState } from 'react';
import useApiService from './useApiService';

const useApi = (endpoint, method = 'GET', req = null) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleEndpoint = async () => {
      setLoading(true);
      try {
        let response;
        switch (method.toUpperCase()) {
          case 'GET':
            response = await useApiService.get(endpoint);
            break;
          case 'POST':
            response = await useApiService.post(endpoint, req);
            break;
          case 'PUT':
            response = await useApiService.put(endpoint, req);
            break;
          case 'DELETE':
            response = await useApiService.delete(endpoint);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    handleEndpoint();
  }, [endpoint, method, req]);

  return { loading, data, error };
};

export default useApi;
