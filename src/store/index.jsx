import { configureStore } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import { api } from '../lib';
import rootReducer from './Slices';

offlineConfig.persistOptions = { storage: localforage }; // Configure IndexedDB storage

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
  // .concat(logger),
  // .concat(sessionStorageMiddleware), // Add custom middleware here
  // enhancers: getDefaultEnhancers =>
  //   getDefaultEnhancers().concat(offline(offlineConfig)),
});
export const dispatch = store.dispatch;
export const setField = (field, value) => dispatch(setField({ field, value }));

export default store;
