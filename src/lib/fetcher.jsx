// src/libs/fetcher.js
import api from './api';

export const fetcher = url => api.get(url).then(res => res.data);
export const poster = (url, data) => api.post(url, data).then(res => res.data);
export const deleter = url => api.delete(url).then(res => res.data);
export const putter = (url, data) => api.put(url, data).then(res => res.data);
