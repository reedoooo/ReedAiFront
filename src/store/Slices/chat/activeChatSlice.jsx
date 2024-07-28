import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isGenerating: false,
  firstTokenReceived: false,
  abortController: null,
  isDisabled: false,
  active: null,
};

export const activeChatSlice = createSlice({
  name: 'activeChat',
  initialState,
  reducers: {
    setIsGenerating: (state, action) => {
      state.isGenerating = action.payload;
    },
    setIsDisabled: (state, action) => {
      state.isDisabled = action.payload;
    },
    setFirstTokenReceived: (state, action) => {
      state.firstTokenReceived = action.payload;
    },
    setAbortController: (state, action) => {
      state.abortController = action.payload;
    },
    setActiveLocal: (state, action) => {
      state.active = action.payload;
    },
  },
});

export { initialState as chatActiveInitialState };

export const {
  setIsGenerating,
  setFirstTokenReceived,
  setAbortController,
  setIsDisabled,
  setActiveLocal,
} = activeChatSlice.actions;

export default activeChatSlice.reducer;
