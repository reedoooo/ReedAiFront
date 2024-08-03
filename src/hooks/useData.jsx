// src/hooks/useData.js
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const useData = endpoint => {
  const { data, error, isLoading } = useSWR(endpoint, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useData;
