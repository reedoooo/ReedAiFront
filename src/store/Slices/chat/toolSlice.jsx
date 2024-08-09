import { createSlice } from '@reduxjs/toolkit';
import { getLocalData, setLocalData } from './helpers';

const LOCAL_NAME = 'toolStore';
const REDUX_NAME = 'tools';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalToolData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const toolSlice = createSlice({
  name: LOCAL_NAME,
  initialState,
  reducers: {
    setTools: (state, action) => {
      console.log('action.payload', action.payload);
      state.tools = action.payload;
      setLocalToolData({ ...state, tools: action.payload });
    },
    setSelectedTools: (state, action) => {
      state.selectedTools = action.payload;
      setLocalToolData({ ...state, selectedTools: action.payload });
    },
    setToolInUse: (state, action) => {
      state.toolInUse = action.payload;
      setLocalToolData({ ...state, toolInUse: action.payload });
    },
  },
});

export { initialState as toolInitialState };

export const { setTools, setSelectedTools, setToolInUse } = toolSlice.actions;

export default toolSlice.reducer;
