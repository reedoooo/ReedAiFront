// src/redux/fileSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import apiUtils from '@/lib/apiUtils';
import { chatFiles } from 'api/chat';
import { createAsyncAction, normalizeArray } from 'utils/redux/main';

// Initial state for file slice
const initialState = {
  byId: {},
  allIds: [],
  files: [],
  chatFiles: [],
  chatImages: [],
  newMessageFiles: [],
  newMessageImages: [],
  previewFiles: [],
  previewUrls: [],
  selectedFiles: [],
  uploadedFiles: [],
  showFilesDisplay: false,
  fileRequest: {
    status: 'idle',
    error: null,
  },
};

// Thunk to fetch all images
export const fetchAllImages = createAsyncThunk(
  'files/fetchAllImages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await chatFiles.getAllImages();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch all files
export const fetchAllFiles = createAsyncThunk(
  'files/fetchAllFiles',
  async (_, { rejectWithValue }) => {
    try {
      const data = await chatFiles.getAllFiles();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching file data using apiUtils
export const fetchFileData = createAsyncThunk(
  'files/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await chatFiles.fetchChatFileData();
      return normalizeArray(data, 'id');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for processing files
// export const processFiles = createAsyncAction(
//   'files/processFiles',
//   async ({ files, fileType }) => {
//     console.log('newFiles:', files);
//     if (fileType === 'png') {
//       const pngFiles = files?.filter(file => file.type === 'png') || [];
//       localStorage.setItem('pngFiles', JSON.stringify(pngFiles));
//       return normalizeArray(pngFiles);
//     } else if (fileType === 'json') {
//       const organizedFiles = files.map(file => ({
//         id: getNewPromptId(file.name),
//         title: file.name,
//         content: file.content,
//         type: 'json',
//       }));
//       localStorage.setItem('customPrompts', JSON.stringify(organizedFiles));
//       return normalizeArray(organizedFiles);
//     }
//     throw new Error('Unsupported file type');
//   }
// );

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
    setPreviewFiles: (state, action) => {
      state.previewFiles = action.payload;
    },
    setPreviewUrls: (state, action) => {
      state.previewUrls = action.payload;
    },
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload;
    },
    setUploadedFiles: (state, action) => {
      state.uploadedFiles = action.payload;
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
      .addCase(fetchFileData.pending, state => {
        state.fileRequest.status = 'loading';
      })
      .addCase(fetchFileData.fulfilled, (state, action) => {
        state.byId = { ...state.byId, ...action.payload.byId };
        state.allIds = [...state.allIds, ...action.payload.allIds];
        state.fileRequest.status = 'succeeded';
      })
      .addCase(fetchFileData.rejected, (state, action) => {
        state.fileRequest.status = 'failed';
        state.fileRequest.error = action.error.message;
      })
      // Handle fetchAllImages
      .addCase(fetchAllImages.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchAllImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetchAllFiles
      .addCase(fetchAllFiles.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = action.payload;
      })
      .addCase(fetchAllFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    // .addCase(processFiles.fulfilled, (state, action) => {
    //   const newFiles = action.payload;
    //   console.log('newFiles:', newFiles);
    //   state.byId = { ...state.byId, ...newFiles.byId };
    //   state.allIds = [...state.allIds, ...newFiles.allIds];
    //   state.fileRequest.status = 'succeeded';
    // })
    // .addCase(processFiles.rejected, (state, action) => {
    //   state.fileRequest.status = 'failed';
    //   state.fileRequest.error = action.error.message;
    // });
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchFileData.pending, state => {
  //       state.fileRequest.status = 'loading';
  //     })
  //     .addCase(fetchFileData.fulfilled, (state, action) => {
  //       state.byId = action.payload.byId;
  //       state.allIds = action.payload.allIds;
  //       state.fileRequest.status = 'succeeded';
  //     })
  //     .addCase(fetchFileData.rejected, (state, action) => {
  //       state.fileRequest.status = 'failed';
  //       state.fileRequest.error = action.error.message;
  //     })
  //     .addCase(processFiles.fulfilled, (state, action) => {
  //       const newFiles = action.payload;
  //       state.byId = { ...state.byId, ...newFiles.byId };
  //       state.allIds = [...state.allIds, ...newFiles.allIds];
  //       state.fileRequest.status = 'succeeded';
  //     })
  //     .addCase(processFiles.rejected, (state, action) => {
  //       state.fileRequest.status = 'failed';
  //       state.fileRequest.error = action.error.message;
  //     });
  // },
});

export const {
  setFiles,
  setChatFiles,
  setChatImages,
  setNewMessageFiles,
  setNewMessageImages,
  setShowFilesDisplay,
  setPreviewFiles,
  setSelectedFiles,
  setPreviewUrls,
  setUploadedFiles,
} = fileSlice.actions;

export default fileSlice.reducer;
