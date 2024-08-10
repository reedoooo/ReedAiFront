import { createSlice } from '@reduxjs/toolkit';
import { getLocalData } from '../helpers';

const LOCAL_NAME = 'assistantStore';
const REDUX_NAME = 'assistants';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

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
});

export { initialState as assistantInitialState };

export const {
  setAssistants,
  setSelectedAssistant,
  setAssistantImages,
  setOpenaiAssistants,
} = assistantSlice.actions;

export default assistantSlice.reducer;
// const initialState = {
//   assistants: [
//     {
//       name: 'ChatBot Assistant',
//       instructions: 'Provide helpful responses to user queries.',
//       description: 'An assistant designed to help with general questions.',
//       model: 'gpt-3.5-turbo',
//       tools: [
//         {
//           type: 'text-generator',
//         },
//       ],
//       tool_resources: {
//         code_interpreter: {
//           file_ids: [],
//         },
//       },
//     },
//   ],
//   selectedAssistant: null,
//   assistantImages: [],
//   openaiAssistants: [],
//   assistantRequest: {
//     status: 'idle',
//     error: null,
//     success: null,
//     message: '',
//   },
// };
