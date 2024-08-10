import { createSlice } from '@reduxjs/toolkit';
import { getLocalData } from '../helpers';

const LOCAL_NAME = 'collectionStore';
const REDUX_NAME = 'collections';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

export const collectionSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setCollections: (state, action) => {
      console.log('Setting collections:', action.payload);
      state.collections = action.payload;
    },
  },
});

export { initialState as collectionInitialState };

export const { setCollections } = collectionSlice.actions;

export default collectionSlice.reducer;
