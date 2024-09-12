// src/redux/fileSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { attachmentsApi } from 'api/Ai/chat-sessions';
import { getLocalData, getNewPromptId, setLocalData } from '../helpers';
import { setPrompts } from './promptSlice';

const LOCAL_NAME = 'fileStore';
const REDUX_NAME = 'files';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalFileData(data) {
  setLocalData(LOCAL_NAME, data);
}
// New thunk for uploading a file
export const uploadFile = createAsyncThunk(
  'files/upload',
  async ({ file, payload }, { rejectWithValue }) => {
    try {
      const filePath = await attachmentsApi.uploadFile(file, payload);
      return filePath;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New thunk for getting all stored files
export const getAllStoredFiles = createAsyncThunk(
  'files/getAllStored',
  async (_, { rejectWithValue }) => {
    try {
      const data = await attachmentsApi.getAllStoredFiles();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New thunk for getting stored files by type
export const getStoredFilesByType = createAsyncThunk(
  'files/getStoredByType',
  async (type, { rejectWithValue }) => {
    try {
      const data = await attachmentsApi.getStoredFilesByType(type);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New thunk for getting stored files by space
export const getStoredFilesBySpace = createAsyncThunk(
  'files/getStoredBySpace',
  async (space, { rejectWithValue }) => {
    try {
      const data = await attachmentsApi.getStoredFilesBySpace(space);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New thunk for getting stored file by filename
export const getStoredFileByName = createAsyncThunk(
  'files/getStoredByName',
  async (filename, { rejectWithValue }) => {
    try {
      const data = await attachmentsApi.getStoredFileByName(filename);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New thunk for getting all storage files
export const getAllStorageFiles = createAsyncThunk(
  'files/getAllStorage',
  async (_, { rejectWithValue }) => {
    try {
      const data = await attachmentsApi.getAllStorageFiles();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New thunk for getting a single storage file
export const getStorageFile = createAsyncThunk(
  'files/getStorage',
  async (fileId, { rejectWithValue }) => {
    try {
      const data = await attachmentsApi.getStorageFile(fileId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createFile = createAsyncThunk(
  'files/create',
  async (fileData, { rejectWithValue }) => {
    try {
      const data = await attachmentsApi.createFile(fileData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchAllImages = createAsyncThunk(
  'files/fetchAllImages',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    // Check if images are already in state
    if (state.files.images && state.files.images.length > 0) {
      return state.files.images;
    }
    try {
      const data = await attachmentsApi.getAllImages();
      console.log('[fetchAllImages]', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllFiles = createAsyncThunk(
  'files/fetchAllFiles',
  async (_, { rejectWithValue }) => {
    try {
      const data = await attachmentsApi.getAllFiles();
      console.log('[fetchAllFiles]', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchFileData = createAsyncThunk(
  'files/fetchData',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get the existing prompts from the prompt reducer state
      const state = getState();
      const existingPrompts = state.prompts;
      const fileList = await attachmentsApi.fetchChatFileData();
      console.log('[fetchFileData]', fileList);
      // Step 2: Parse each JSON file
      // Parse each JSON file
      const parsedPrompts = await Promise.all(
        fileList.map(async fileName => {
          if (fileName.endsWith('.json')) {
            const fileContent =
              await attachmentsApi.fetchChatFileDataByType(fileName);
            return fileContent;
          }
          return null;
        })
      );
      console.log('parsedPrompts', parsedPrompts);
      // Filter out any null values and flatten the array
      const newPrompts = parsedPrompts.filter(Boolean).flat();

      // Filter out any already existing prompts by name
      const filteredPrompts = newPrompts.filter(
        newPrompt =>
          !existingPrompts.some(
            existingPrompt => existingPrompt.title === newPrompt.title
          )
      );

      // Map the filtered prompts to the desired format
      const formattedPrompts = filteredPrompts
        .filter(prompt => prompt.content)
        .map(prompt => ({
          id: getNewPromptId(prompt.title),
          title: prompt.title,
          content: prompt.content,
          type: 'json',
        }));

      console.log('parsedPrompts', parsedPrompts);
      setPrompts(prevState => ({
        byId: {
          ...prevState.byId,
          ...formattedPrompts.reduce((acc, prompt) => {
            acc[prompt.id] = prompt;
            return acc;
          }, {}),
        },
        allIds: [
          ...prevState.allIds,
          ...formattedPrompts.map(prompt => prompt.id),
        ],
      }));
      return formattedPrompts;

      // return normalizeArray(data, 'id');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fileSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setFiles: (state, action) => {
      console.log('Setting files:', action.payload);
      state.files = action.payload;
      setLocalFileData({ ...state, files: action.payload });
      // state.files = state.files.filter(file => file.id !== action.payload);
      // setLocalFileData({ ...state, files: state.files });
      // if (Array.isArray(action.payload)) {
      //   state.files = action.payload;
      //   setLocalFileData({ ...state, files: action.payload });
      // } else if (
      //   typeof action.payload === 'object' &&
      //   action.payload !== null
      // ) {
      //   const file = action.payload;
      //   state.files[file.id] = file;
      // }
    },
    setNewMessageFiles: (state, action) => {
      console.log('Setting newMessageFiles:', action.payload);
      state.newMessageFiles = action.payload;
      setLocalFileData({ ...state, newMessageFiles: action.payload });
      // state.newMessageFiles = state.newMessageFiles.filter(
      //   file => file.id !== action.payload
      // );
    },
    setNewMessageImages: (state, action) => {
      console.log('Setting newMessageImages:', action.payload);
      state.newMessageFiles = action.payload;
      setLocalFileData({ ...state, newMessageImages: action.payload });
      // state.newMessageImages = state.newMessageImages.filter(
      //   image => image.messageId !== action.payload
      // );
    },
    setChatFiles: (state, action) => {
      console.log('Setting chatFiles:', action.payload);
      state.chatFiles = action.payload;
      setLocalFileData({ ...state, chatFiles: action.payload });
    },
    setChatImages: (state, action) => {
      state.chatImages = action.payload;
      setLocalFileData({ ...state, chatImages: action.payload });
    },
    addNewMessageFile: (state, action) => {
      console.log('Adding newMessageFile:', action.payload);
      state.newMessageFiles.push(action.payload);
    },
    updateNewMessageFile: (state, action) => {
      const index = state.newMessageFiles.findIndex(
        file => file.id === action.payload.id
      );
      if (index !== -1) {
        state.newMessageFiles[index] = action.payload;
      }
    },
    // setNewMessageFiles: (state, action) => {
    //   state.newMessageFiles = action.payload;
    // },
    // setNewMessageImages: (state, action) => {
    //   state.newMessageImages = action.payload;
    // },
    setShowFilesDisplay: (state, action) => {
      state.showFilesDisplay = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(fetchFileData.pending, state => {
      //   state.fileRequest.status = 'loading';
      // })
      .addCase(fetchFileData.fulfilled, (state, action) => {
        state.byId = { ...state.byId, ...action.payload.byId };
        state.allIds = [...state.allIds, ...action.payload.allIds];
        state.fileRequest.status = 'succeeded';
      })
      .addCase(fetchFileData.rejected, (state, action) => {
        state.fileRequest.status = 'failed';
        state.fileRequest.error = action.error.message;
      })
      // .addCase(fetchAllImages.pending, state => {
      //   state.status = 'loading';
      // })
      .addCase(fetchAllImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchAllImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // .addCase(fetchAllFiles.pending, state => {
      //   state.status = 'loading';
      // })
      .addCase(fetchAllFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = action.payload;
      })
      .addCase(fetchAllFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(uploadFile.pending, state => {
        state.uploadStatus = 'loading';
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded';
        state.files.push(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.uploadError = action.payload;
      })
      .addCase(getAllStoredFiles.fulfilled, (state, action) => {
        state.storedFiles = action.payload;
      })
      .addCase(getStoredFilesByType.fulfilled, (state, action) => {
        state.storedFilesByType = action.payload;
      })
      .addCase(getStoredFilesBySpace.fulfilled, (state, action) => {
        state.storedFilesBySpace = action.payload;
      })
      .addCase(getStoredFileByName.fulfilled, (state, action) => {
        state.storedFileByName = action.payload;
      })
      .addCase(getAllStorageFiles.fulfilled, (state, action) => {
        state.allStorageFiles = action.payload;
      })
      .addCase(getStorageFile.fulfilled, (state, action) => {
        state.currentStorageFile = action.payload;
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
  addNewMessageFile,
  updateNewMessageFile,
} = fileSlice.actions;

export default fileSlice.reducer;
// Initial state for file slice
// const initialState = {
//   byId: {},
//   allIds: [],
//   files: [],
//   chatFiles: [],
//   chatImages: [],
//   newMessageFiles: [],
//   newMessageImages: [],
//   previewFiles: [],
//   previewUrls: [],
//   selectedFiles: [],
//   uploadedFiles: [],
//   showFilesDisplay: false,
//   fileRequest: {
//     status: 'idle',
//     error: null,
//   },
// };
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
