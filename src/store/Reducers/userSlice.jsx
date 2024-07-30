import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: null,
  isAuthenticated: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    toggleAuthentication: state => {
      state.isAuthenticated = !state.isAuthenticated;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logoutUser: state => {
      state.userToken = null;
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const { setUserToken, toggleAuthentication, setUserInfo, logoutUser } =
  userSlice.actions;
export default userSlice.reducer;
