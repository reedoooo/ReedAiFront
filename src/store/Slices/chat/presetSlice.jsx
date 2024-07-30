import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  presets: [],
  selectedPreset: null,
};

export const presetSlice = createSlice({
  name: 'presets',
  initialState,
  reducers: {
    setPresets: (state, action) => {
      state.presets = action.payload;
    },
    setSelectedPreset: (state, action) => {
      state.selectedPreset = action.payload;
    },
  },
});

export { initialState as presetInitialState };

export const { setPresets, setSelectedPreset } = presetSlice.actions;

export default presetSlice.reducer;
