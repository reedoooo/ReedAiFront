import { configureStore } from '@reduxjs/toolkit';
import { createAsyncMiddleware } from 'utils/redux/main';
import rootReducer from './Slices';

const errorHandler = error => console.error('Async action error:', error);

export const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  // middleware: (getDefaultMiddleware) =>
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createAsyncMiddleware(errorHandler)),
});
export const dispatch = store.dispatch;
export const setField = (field, value) => dispatch(setField({ field, value }));

export default store;
