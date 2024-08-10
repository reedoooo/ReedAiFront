import { createSlice } from '@reduxjs/toolkit';
import { getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'folderStore';
const REDUX_NAME = 'folders';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalFolderData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const foldersSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
      setLocalFolderData({ ...state, folders: action.payload });
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
      setLocalFolderData({ ...state, selectedFolder: action.payload });
    },
  },
});

export { initialState as foldersInitialState };

export const { setFolders, setSelectedFolder } = foldersSlice.actions;

export default foldersSlice.reducer;
