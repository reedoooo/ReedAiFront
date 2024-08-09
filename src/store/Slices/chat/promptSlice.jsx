import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { getLocalData, setLocalData } from './helpers';

const LOCAL_NAME = 'promptStore';
const REDUX_NAME = 'prompts';

export const addStaticPrompt = createAsyncThunk(
  'files/addPrompt',
  async (payload, { rejectWithValue }) => {
    const { name, content } = payload;
    const url = 'http://localhost:3001/api/files/add/prompt'; // Replace with your actual endpoint

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Prompt added successfully:', result);
      return result;
    } catch (error) {
      console.error('Error adding custom prompt:', error);
      // Return a custom error message or the original error
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalPromptData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const promptSlice = createSlice({
  name: LOCAL_NAME,
  initialState,
  reducers: {
    setPrompts: (state, action) => {
      console.log('Setting prompts:', action.payload);
      state.prompts = action.payload;
      setLocalPromptData({ ...state, prompts: action.payload });
    },
    setSelectedPrompt: (state, action) => {
      state.selectedPrompt = action.payload;
      setLocalPromptData({ ...state, selectedPrompt: action.payload });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addStaticPrompt.fulfilled, (state, action) => {
        state.prompts.unshift(action.payload);
        setLocalPromptData({
          ...state,
          prompts: state.prompts,
          promptRequest: { status: 'succeeded' },
        });
      })
      .addCase(addStaticPrompt.pending, (state, action) => {
        state.promptRequest.status = 'loading';
      })
      .addCase(addStaticPrompt.rejected, (state, action) => {
        state.promptRequest.status = 'failed';
        state.promptRequest.error = action.payload;
        useSnackbar().enqueueSnackbar('Failed to add prompt', {
          variant: 'error',
        });
      });
  },
});

export { initialState as promptInitialState };

export const { setPrompts, setSelectedPrompt } = promptSlice.actions;

export default promptSlice.reducer;
// The corresponding value for the key

// function getLocalPromptList() {
//   const promptStore = JSON.parse(localStorage.getItem(LOCAL_NAME) || '{}');
//   if (promptStore && promptStore.promptList?.length > 0) {
//     return promptStore;
//   } else {
//     setLocalPromptList({ promptList: defaultPromptList() });
//     return { promptList: defaultPromptList() };
//   }
// }

// function setLocalPromptList(promptStore) {
//   localStorage.setItem(LOCAL_NAME, JSON.stringify(promptStore));
// }
// const initialState = {
//   prompts: getLocalPromptList().promptList,
//   selectedPrompt: null,
//   promptRequest: {
//     status: 'idle',
//     error: null,
//   },
//   newPrompt: {
//     // folderId: new mongoose.Types.ObjectId(), // A new ObjectId for the folder
//     // userId: new mongoose.Types.ObjectId(), // A new ObjectId for the user
//     content: 'This is a sample prompt content.',
//     name: 'Sample Prompt',
//     sharing: 'private', // Could be 'private', 'public', etc.
//     key: 'sampleKey', // A unique key for identifying the prompt
//     value: 'sampleValue', // The corresponding value for the key
//     metadata: {
//       label: 'default prompt',
//       text: 'A default prompt.',
//       createdBy: 'default',
//       description: 'This is a sample description for the default prompt.',
//       type: 'defaultType', // Specify the type of prompt, e.g., 'question', 'instruction'
//       style: 'defaultStyle', // Specify the style, e.g., 'formal', 'casual'
//       props: {
//         // Additional properties or attributes
//         exampleProp: 'exampleValue',
//       },
//       tags: ['sample', 'default'], // Tags for categorization
//     },
//   },
// };
// Async thunk for fetching and parsing static files
// export const fetchStaticPrompts = createAsyncThunk(
//   '/api/static-files',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Step 1: Fetch the list of static files
//       const fileListResponse = await axios.get('/static');
// const fileList = fileListResponse.data;
// console.log('fileList', fileList);
// // Step 2: Parse each JSON file
// const parsedPrompts = await Promise.all(
//   fileList.map(async fileName => {
//     if (fileName.endsWith('.json')) {
//       const fileContent = await axios.get(
//         `/api/static-files/${fileName}`
//       );
//       return fileContent.data;
//     }
//     return null;
//   })
// );

// // Filter out any null values and flatten the array
// return parsedPrompts.filter(Boolean).flat();
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// // Thunk for adding a prompt
// export const addPrompt = createAsyncThunk(
//   'prompts/addPrompt',
//   async (prompt, { dispatch }) => {
//     // Add prompt logic (simulated async operation)
//     // Here you can perform any async operation like API calls if needed
//     dispatch(promptSlice.actions.addPromptSync(prompt));
//   }
// );

// // Thunk for modifying a prompt
// export const modifyPrompt = createAsyncThunk(
//   'prompts/modifyPrompt',
//   async ({ key, value, newKey, newValue }, { dispatch }) => {
//     // Modify prompt logic (simulated async operation)
//     dispatch(
//       promptSlice.actions.modifyPromptSync({ key, value, newKey, newValue })
//     );
//   }
// );

// // Thunk for deleting a prompt
// export const deletePrompt = createAsyncThunk(
//   'prompts/deletePrompt',
//   async (key, { dispatch }) => {
//     // Delete prompt logic (simulated async operation)
//     dispatch(promptSlice.actions.deletePromptSync(key));
//   }
// );

// // Thunk for clearing all prompts
// export const clearPrompts = createAsyncThunk(
//   'prompts/clearPrompts',
//   async (_, { dispatch }) => {
//     // Clear prompts logic (simulated async operation)
//     dispatch(promptSlice.actions.clearPromptsSync());
//   }
// );

// // Thunk for importing prompts
// export const importPrompts = createAsyncThunk(
//   'prompts/importPrompts',
//   async (newPrompts, { dispatch }) => {
//     // Import prompts logic (simulated async operation)
//     dispatch(promptSlice.actions.importPromptsSync(newPrompts));
//   }
// );

// // Thunk for exporting prompts
// export const exportPrompts = createAsyncThunk(
//   'prompts/exportPrompts',
//   async (_, { getState }) => {
//     const state = getState();
//     const jsonDataStr = JSON.stringify(state.promptList);
//     const blob = new Blob([jsonDataStr], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'ChatGPTPromptTemplate.json';
//     link.click();
//     URL.revokeObjectURL(url);
//   }
// );

// // Thunk for downloading prompts
// export const downloadPrompts = createAsyncThunk(
//   'prompts/downloadPrompts',
//   async (downloadURL, { dispatch }) => {
//     try {
//       const response = await fetch(downloadURL);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const jsonData = await response.json();
//       dispatch(importPrompts(jsonData));
//     } catch (error) {
//       enqueueSnackbar('Network error or invalid JSON file', {
//         variant: 'error',
//       });
//     }
//   }
// );
