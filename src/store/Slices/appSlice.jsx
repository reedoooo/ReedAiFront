import { createSlice } from '@reduxjs/toolkit';
import { getLocalData, setLocalData } from './helpers';

const LOCAL_NAME = 'appStore';
const REDUX_NAME = 'app';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalAppData(data) {
  setLocalData(LOCAL_NAME, data);
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSidebarOpen: (state, action) => {
      setLocalAppData({ ...state, isSidebarOpen: action.payload });
      state.isSidebarOpen = action.payload;
    },
    setTheme: (state, action) => {
      setLocalAppData({ ...state, theme: action.payload });
      state.theme = action.payload;
    },
  },
});
export const { setSidebarOpen, setTheme } = appSlice.actions;

export default appSlice.reducer;
