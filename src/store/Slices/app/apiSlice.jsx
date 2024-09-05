import { createSlice } from '@reduxjs/toolkit';
// import { getLocalData, setLocalData } from '../helpers';

// const LOCAL_NAME = 'apiStore';
// const REDUX_NAME = 'api';

// const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

// function setLocalApiData(data) {
//   setLocalData(LOCAL_NAME, data);
// }

export const apiLogSlice = createSlice({
  name: 'apiLog',
  initialState: [],
  reducers: {
    logApiRequest: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { logApiRequest } = apiLogSlice.actions;

export default apiLogSlice.reducer;
