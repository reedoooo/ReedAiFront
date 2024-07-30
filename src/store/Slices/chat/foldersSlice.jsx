import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  folders: [],
  selectedFolder: null,
};

export const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
  },
});

export { initialState as foldersInitialState };

export const { setFolders, setSelectedFolder } = foldersSlice.actions;

export default foldersSlice.reducer;
