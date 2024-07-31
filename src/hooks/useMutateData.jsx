// src/hooks/useMutateData.js
import useSWR, { mutate } from 'swr';
import api from '@/lib/api';
import { fetcher } from '@/lib/fetcher';

export const useMutateData = endpoint => {
  const { data, error, isLoading } = useSWR(endpoint, fetcher);

  const updateData = async newData => {
    await api.put(endpoint, newData);
    mutate(endpoint);
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    updateData,
  };
};
