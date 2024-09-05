import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import foldersApi from 'api/workspaces/folders';
import { getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'folderStore';
const REDUX_NAME = 'folders';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalFolderData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const createFolder = createAsyncThunk(
  'folders/create',
  async (folderData, { rejectWithValue }) => {
    try {
      const data = await foldersApi.create(folderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  'folders/delete',
  async (folderData, { rejectWithValue }) => {
    try {
      const data = await foldersApi.delete(folderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFolder = createAsyncThunk(
  'folders/update',
  async (folderData, { rejectWithValue }) => {
    try {
      const data = await foldersApi.update(folderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: builder => {
    builder
      .addCase(updateFolder.fulfilled, (state, action) => {
        state.selectedFolder = action.payload;
        setLocalFolderData({ ...state, selectedFolder: action.payload });
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders.unshift(action.payload);
        setLocalFolderData({ ...state, folders: state.folders });
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter(
          folder => folder.id !== action.payload
        );
        setLocalFolderData({ ...state, folders: state.folders });
      });
  },
});

export { initialState as foldersInitialState };

export const { setFolders, setSelectedFolder } = foldersSlice.actions;

export default foldersSlice.reducer;
