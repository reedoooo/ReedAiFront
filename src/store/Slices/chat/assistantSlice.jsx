import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assistants: [
    {
      name: 'ChatBot Assistant',
      instructions: 'Provide helpful responses to user queries.',
      description: 'An assistant designed to help with general questions.',
      model: 'gpt-3.5-turbo',
      tools: [
        {
          type: 'text-generator',
        },
      ],
      tool_resources: {
        code_interpreter: {
          file_ids: [],
        },
      },
    },
  ],
  selectedAssistant: null,
  assistantImages: [],
  openaiAssistants: [],
};

export const assistantSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {
    setAssistants: (state, action) => {
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
