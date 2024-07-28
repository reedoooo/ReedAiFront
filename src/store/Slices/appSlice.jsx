import { createSlice } from '@reduxjs/toolkit';

const LOCAL_NAME = 'appSetting';

function defaultSetting() {
  return {
    siderCollapsed: false,
    theme: 'light',
    dialogState: {
      viewDraftsDialogOpen: false,
      profileDialogOpen: false,
      addDraftDialogOpen: false,
      authDialogOpen: false,
    },
    draftsBarVisible: true,
    initAddContentVisible: false,
    formDisabled: true,
  };
}

function getLocalSetting() {
  const localSetting = JSON.parse(localStorage.getItem(LOCAL_NAME) || '{}');
  return { ...defaultSetting(), ...localSetting };
}

function setLocalSetting(setting) {
  localStorage.setItem(LOCAL_NAME, JSON.stringify(setting));
}

const appSlice = createSlice({
  name: 'app',
  initialState: getLocalSetting(),
  reducers: {
    setSiderCollapsed: (state, action) => {
      setLocalSetting({ ...state, siderCollapsed: action.payload });
      state.siderCollapsed = action.payload;
    },
    setTheme: (state, action) => {
      setLocalSetting({ ...state, theme: action.payload });
      state.theme = action.payload;
    },
    // --- Nav Actions ---
    toggleDialogState: (state, action) => {
      const dialog = action.payload;
      state.dialogState[dialog] = !state.dialogState[dialog];
    },
    toggleDraftsBar: state => {
      state.draftsBarVisible = !state.draftsBarVisible;
    },
    toggleInitAddContentVisible: state => {
      state.initAddContentVisible = !state.initAddContentVisible;
    },
    toggleFormDisabled: state => {
      state.formDisabled = !state.formDisabled;
    },
  },
});

export const {
  setSiderCollapsed,
  setTheme,
  toggleDialogState,
  toggleDraftsBar,
  toggleInitAddContentVisible,
  toggleFormDisabled,
} = appSlice.actions;

export default appSlice.reducer;
