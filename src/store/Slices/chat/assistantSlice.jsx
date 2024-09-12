import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { assistantsApi } from 'api/Ai/chat-sessions';
import { getLocalData } from '../helpers';

const LOCAL_NAME = 'assistantStore';
const REDUX_NAME = 'assistants';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

export const fetchAssistantList = createAsyncThunk(
  'assistants/list',
  async ({ threadId }, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.getExistingAssistants();
      console.log('data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createAssistant = createAsyncThunk(
  'assistants/create',
  async (assistantData, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.create(assistantData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAssistant = createAsyncThunk(
  'assistants/delete',
  async (assistantData, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.delete(assistantData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAssistant = createAsyncThunk(
  'assistants/update',
  async (assistantData, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.update(assistantData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadAssistantFile = createAsyncThunk(
  'assistants/uploadAssistantFile',
  async (filePath, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.uploadFile(filePath);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createThread = createAsyncThunk(
  'assistants/createThread',
  async (threadData, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.createThread(threadData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMessage = createAsyncThunk(
  'assistants/createMessage',
  async ({ threadId, messageData }, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.createMessage(threadId, messageData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRun = createAsyncThunk(
  'assistants/createRun',
  async ({ threadId, runData }, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.createRun(threadId, runData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRunStream = createAsyncThunk(
  'assistants/createRunStream',
  async ({ threadId, runData }, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.createRunStream(threadId, runData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRunStreamWithFunctions = createAsyncThunk(
  'assistants/createRunStreamWithFunctions',
  async (runData, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.createRunStreamWithFunctions(runData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const retrieveRun = createAsyncThunk(
  'assistants/retrieveRun',
  async ({ threadId, runId }, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.retrieveRun(threadId, runId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAssistantByThread = createAsyncThunk(
  'assistants/fetchByThread',
  async ({ threadId, prompt }, { rejectWithValue }) => {
    try {
      const data = await assistantsApi.getByThread(threadId, prompt);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const assistantSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setAssistants: (state, action) => {
      console.log('Setting assistants:', action.payload);
      state.assistants = action.payload;
    },
    setSelectedAssistant: (state, action) => {
      state.selectedAssistant = action.payload;
    },
    setAssistantImages: (state, action) => {
      state.assistantImages = action.payload;
    },
    setOpenaiAssistants: (state, action) => {
      state.openaiAssistants = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAssistantList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createAssistant.fulfilled, (state, action) => {
        state.selectedAssistant = action.payload;
      })
      .addCase(deleteAssistant.fulfilled, (state, action) => {
        state.list = state.list.filter(
          assistant => assistant._id !== action.payload
        );
      })
      .addCase(updateAssistant.fulfilled, (state, action) => {
        state.selectedAssistant = action.payload;
      })
      .addCase(uploadAssistantFile.fulfilled, (state, action) => {
        state.files = state.files || [];
        state.files.push(action.payload);
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.threads.push(action.payload);
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        const thread = state.threads.find(
          thread => thread._id === action.meta.arg.threadId
        );
        if (thread) {
          thread.messages.push(action.payload);
        }
      })
      .addCase(createRun.fulfilled, (state, action) => {
        const thread = state.threads.find(
          thread => thread._id === action.meta.arg.threadId
        );
        if (thread) {
          thread.runs.push(action.payload);
        }
      })
      .addCase(createRunStream.fulfilled, (state, action) => {
        const thread = state.threads.find(
          thread => thread._id === action.meta.arg.threadId
        );
        if (thread) {
          thread.runs.push(action.payload);
        }
      })
      .addCase(createRunStreamWithFunctions.fulfilled, (state, action) => {
        const thread = state.threads.find(
          thread => thread._id === action.meta.arg.threadId
        );
        if (thread) {
          thread.runs.push(action.payload);
        }
      })
      .addCase(retrieveRun.fulfilled, (state, action) => {
        const thread = state.threads.find(
          thread => thread._id === action.meta.arg.threadId
        );
        if (thread) {
          const runIndex = thread.runs.findIndex(
            run => run._id === action.meta.arg.runId
          );
          if (runIndex !== -1) {
            thread.runs[runIndex] = action.payload;
          }
        }
      })
      .addCase(fetchAssistantByThread.fulfilled, (state, action) => {
        state.assistantSession.messages = action.payload;
      })
      .addCase(fetchAssistantList.rejected, (state, action) => {
        state.assistantRequest.status = 'failed';
        state.assistantRequest.error = action.payload;
      })
      .addCase(createAssistant.rejected, (state, action) => {
        state.assistantRequest.status = 'failed';
        state.assistantRequest.error = action.payload;
      })
      .addCase(fetchAssistantByThread.rejected, (state, action) => {
        state.assistantRequest.status = 'failed';
        state.assistantRequest.error = action.payload;
      });
  },
});

export { initialState as assistantInitialState };

export const {
  setAssistants,
  setSelectedAssistant,
  setAssistantImages,
  setOpenaiAssistants,
} = assistantSlice.actions;

export default assistantSlice.reducer;
// // Thunk to fetch all assistants
// export const fetchAssistants = createAsyncThunk(
//   'assistants/fetchAssistants',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await assistantsApi.get('/assistants');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Thunk to fetch a single assistant by ID
// export const fetchAssistantById = createAsyncThunk(
//   'assistants/fetchAssistantById',
//   async (assistantId, { rejectWithValue }) => {
//     try {
//       const response = await assistantsApi.get(`/assistants/${assistantId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Thunk to create a new assistant
// export const createAssistant = createAsyncThunk(
//   'assistants/createAssistant',
//   async (assistantData, { rejectWithValue }) => {
//     try {
//       const response = await assistantsApi.post('/assistants', assistantData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Thunk to update an assistant
// export const updateAssistant = createAsyncThunk(
//   'assistants/updateAssistant',
//   async ({ assistantId, assistantData }, { rejectWithValue }) => {
//     try {
//       const response = await assistantsApi.put(
//         `/assistants/${assistantId}`,
//         assistantData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Thunk to delete an assistant
// export const deleteAssistant = createAsyncThunk(
//   'assistants/deleteAssistant',
//   async (assistantId, { rejectWithValue }) => {
//     try {
//       await assistantsApi.delete(`/assistants/${assistantId}`);
//       return assistantId; // Return the ID of the deleted assistant
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
