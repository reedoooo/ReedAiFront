import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // chatInput: '',
  // chatInputHistory: [],
  // chatInputCommand: {
  isPromptPickerOpen: false,
  slashCommand: '',
  isFilePickerOpen: false,
  hashtagCommand: '',
  isToolPickerOpen: false,
  toolCommand: '',
  focusPrompt: false,
  focusFile: false,
  focusTool: false,
  focusAssistant: false,
  atCommand: '',
  isAssistantPickerOpen: false,
  // },
};
export const chatInputCommandSlice = createSlice({
  name: 'chatInputCommand',
  initialState,
  reducers: {
    setIsPromptPickerOpen: (state, action) => {
      state.isPromptPickerOpen = action.payload;
    },
    setSlashCommand: (state, action) => {
      state.slashCommand = action.payload;
    },
    setIsFilePickerOpen: (state, action) => {
      state.isFilePickerOpen = action.payload;
    },
    setHashtagCommand: (state, action) => {
      state.hashtagCommand = action.payload;
    },
    setIsToolPickerOpen: (state, action) => {
      state.isToolPickerOpen = action.payload;
    },
    setToolCommand: (state, action) => {
      state.toolCommand = action.payload;
    },
    setFocusPrompt: (state, action) => {
      state.focusPrompt = action.payload;
    },
    setFocusFile: (state, action) => {
      state.focusFile = action.payload;
    },
    setFocusTool: (state, action) => {
      state.focusTool = action.payload;
    },
    setFocusAssistant: (state, action) => {
      state.focusAssistant = action.payload;
    },
    setAtCommand: (state, action) => {
      state.atCommand = action.payload;
    },
    setIsAssistantPickerOpen: (state, action) => {
      state.isAssistantPickerOpen = action.payload;
    },
  },
});

export { initialState as chatInputCommandInitialState };

export const {
  setIsPromptPickerOpen,
  setSlashCommand,
  setIsFilePickerOpen,
  setHashtagCommand,
  setIsToolPickerOpen,
  setToolCommand,
  setFocusPrompt,
  setFocusFile,
  setFocusTool,
  setFocusAssistant,
  setAtCommand,
  setIsAssistantPickerOpen,
} = chatInputCommandSlice.actions;

export default chatInputCommandSlice.reducer;
