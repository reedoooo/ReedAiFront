import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tools: [],
  selectedTools: [],
  toolInUse: '',
};

export const toolSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setTools: (state, action) => {
      state.tools = action.payload;
    },
    setSelectedTools: (state, action) => {
      state.selectedTools = action.payload;
    },
    setToolInUse: (state, action) => {
      state.toolInUse = action.payload;
    },
  },
});

export { initialState as toolInitialState };

export const { setTools, setSelectedTools, setToolInUse } = toolSlice.actions;

export default toolSlice.reducer;
