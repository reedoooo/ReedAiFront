import { createSlice } from '@reduxjs/toolkit';
import { getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'presetStore';
const REDUX_NAME = 'presets';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalPresetData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const presetSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setPresets: (state, action) => {
      console.log('Setting presets:', action.payload);
      state.presets = action.payload;
      setLocalPresetData({ ...state, presets: action.payload });
    },
    setSelectedPreset: (state, action) => {
      state.selectedPreset = action.payload;
      setLocalPresetData({ ...state, selectedPreset: action.payload });
    },
  },
});

export { initialState as presetInitialState };

export const { setPresets, setSelectedPreset } = presetSlice.actions;

export default presetSlice.reducer;
