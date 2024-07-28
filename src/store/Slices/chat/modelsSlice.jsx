import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  models: [],
  availableHostedModels: [],
  availableLocalModels: [],
  availableOpenRouterModels: [],
};

export const modelSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    setModels: (state, action) => {
      state.models = action.payload;
    },
    setAvailableHostedModels: (state, action) => {
      state.availableHostedModels = action.payload;
    },
    setAvailableLocalModels: (state, action) => {
      state.availableLocalModels = action.payload;
    },
    setAvailableOpenRouterModels: (state, action) => {
      state.availableOpenRouterModels = action.payload;
    },
  },
});

export { initialState as modelInitialState };

export const {
  setModels,
  setAvailableHostedModels,
  setAvailableLocalModels,
  setAvailableOpenRouterModels,
} = modelSlice.actions;

export default modelSlice.reducer;
