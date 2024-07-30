import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

// Initial state for file slice
const initialState = {
  files: [],
  chatFiles: [],
  chatImages: [],
  newMessageFiles: [],
  newMessageImages: [],
  showFilesDisplay: false,
  fileRequest: {
    status: 'idle',
    error: null,
  },
};

// Async thunks for file operations
// export const fetchFileData = createAsyncThunk(
//   'files/fetchData',
//   async ({ url, fileType }, { dispatch }) => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       dispatch(processFiles({ files: data, fileType }));
//       return data;
//     } catch (error) {
//       console.error(
//         `There was a problem with the fetch operation for ${fileType}:`,
//         error
//       );
//       return null;
//     }
//   }
// );
export const fetchFileData = createAsyncThunk(
  'files/fetchData',
  async ({ url, fileType }, { rejectWithValue }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return { files: data, fileType };
    } catch (error) {
      console.error(`Fetch error for ${fileType}:`, error);
      return rejectWithValue(error.message);
    }
  }
);

export const processFiles = createAsyncThunk(
  'files/processFiles',
  async ({ files, fileType }, { dispatch }) => {
    if (fileType === 'png') {
      const pngFiles = files.filter(file => file.type === 'png');
      localStorage.setItem('pngFiles', JSON.stringify(pngFiles));
      dispatch(setChatImages(pngFiles));
    } else if (fileType === 'json') {
      const organizedFiles = files.map(file => ({
        id: getNewPromptId(file.name),
        title: file.name,
        content: file.content,
      }));
      if (
        organizedFiles.length > 0 &&
        organizedFiles[0].title &&
        organizedFiles[0].content
      ) {
        localStorage.setItem('customPrompts', JSON.stringify(organizedFiles));
        dispatch(setFiles(organizedFiles));
      } else {
        console.error('Data structure is not as expected', organizedFiles);
      }
    }
  }
);

const getNewPromptId = file => {
  const id = file.split('/').pop().split('.')[0];
  const idParts = id.split('-');
  return uniqueId(idParts[idParts.length - 1]);
};

// File slice with reducers
export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setChatFiles: (state, action) => {
      state.chatFiles = action.payload;
    },
    setChatImages: (state, action) => {
      state.chatImages = action.payload;
    },
    setNewMessageFiles: (state, action) => {
      state.newMessageFiles = action.payload;
    },
    setNewMessageImages: (state, action) => {
      state.newMessageImages = action.payload;
    },
    setShowFilesDisplay: (state, action) => {
      state.showFilesDisplay = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFileData.pending, (state, action) => {
        console.log('Fetching data...');
        state.fileRequest.status = 'loading';
      })
      .addCase(fetchFileData.fulfilled, (state, action) => {
        console.log('Handling fetch data logic...', action.payload);
        state.fileRequest.status = 'succeeded';
      })
      .addCase(fetchFileData.rejected, (state, action) => {
        console.error('Handling fetch data rejection:', action.payload);
        state.fileRequest.status = 'failed';
        state.fileRequest.error = action.payload;
      })
      .addCase(processFiles.fulfilled, (state, action) => {
        console.log('Handling process files logic...', action.payload);
        state.fileRequest.status = 'succeeded';
        // state.fileRequest.error = action.payload.error;
      });
  },
});

export const {
  setFiles,
  setChatFiles,
  setChatImages,
  setNewMessageFiles,
  setNewMessageImages,
  setShowFilesDisplay,
} = fileSlice.actions;

export default fileSlice.reducer;
