import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collections: [],
};

export const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
  },
});

export { initialState as collectionInitialState };

export const { setCollections } = collectionSlice.actions;

export default collectionSlice.reducer;
