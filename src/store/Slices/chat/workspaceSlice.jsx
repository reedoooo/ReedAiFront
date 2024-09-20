import { createSlice } from '@reduxjs/toolkit';
import { getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'workspaceStore';
const REDUX_NAME = 'workspaces';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalWorkspaceData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const workspaceSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setWorkspaceId: (state, action) => {
      state.workspaceId = action.payload;
      sessionStorage.setItem('workspaceId', action.payload);
      setLocalWorkspaceData({ ...state, workspaceId: action.payload });
    },
    setWorkspaces: (state, action) => {
      console.log('WORKSPACES', action.payload);
      setLocalWorkspaceData({ ...state, workspaces: action.payload });
      state.workspaces = action.payload;
    },
    setSelectedWorkspace: (state, action) => {
      console.log('SELECTED_WORKSPACE', action.payload);
      setLocalWorkspaceData({ ...state, selectedWorkspace: action.payload });
      state.selectedWorkspace = action.payload;
    },
    setHomeWorkSpace: (state, action) => {
      console.log('HOME_WORKSPACE', action.payload);
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
  setWorkspaceId,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
// setChatSessions,
// setSelectedChatSession,
// function getLocalWorkspaceData() {
//   console.log(
//     `LOCAL_NAME: ${LOCAL_NAME}`,
//     'stringify' + JSON.stringify(LOCAL_NAME),
//     'regular' + LOCAL_NAME
//   );

//   const localWorkSpaceData = JSON.parse(
//     localStorage.getItem(LOCAL_NAME) || '{}'
//   );
//   return { ...defaultWorkspaceStoreData(), ...localWorkSpaceData };
// }

// const initialState = getLocalWorkspaceData();

// localStorage.setItem(LOCAL_NAME, JSON.stringify(data));
