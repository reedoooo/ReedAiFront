import { createSlice } from '@reduxjs/toolkit';
import { defaultWorkspaceData } from './helpers';

const LOCAL_NAME = 'workspaces';

function getLocalWorkspaceData() {
  const localWorkSpaceData = JSON.parse(
    localStorage.getItem(LOCAL_NAME) || '{}'
  );
  return { ...defaultWorkspaceData(), ...localWorkSpaceData };
}

const initialState = getLocalWorkspaceData();

function setLocalWorkspaceData(data) {
  localStorage.setItem(LOCAL_NAME, JSON.stringify(data));
}

export const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setWorkspaces: (state, action) => {
      setLocalWorkspaceData({ ...state, workspaces: action.payload });
      state.workspaces = action.payload;
    },
    setSelectedWorkspace: (state, action) => {
      setLocalWorkspaceData({ ...state, selectedWorkspace: action.payload });
      state.selectedWorkspace = action.payload;
    },
    setHomeWorkSpace: (state, action) => {
      setLocalWorkspaceData({ ...state, homeWorkSpace: action.payload });
      state.homeWorkSpace = action.payload;
    },
    setWorkspaceImages: (state, action) => {
      state.workspaceImages = action.payload;
    },
  },
});

export { initialState as workspaceInitialState };

export const {
  setWorkspaces,
  setSelectedWorkspace,
  setWorkspaceImages,
  setHomeWorkSpace,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
