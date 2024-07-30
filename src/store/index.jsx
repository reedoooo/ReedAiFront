import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Slices';

export const store = configureStore({
  reducer: rootReducer,
});
export const dispatch = store.dispatch;
export const setField = (field, value) => dispatch(setField({ field, value }));

export default store;
