import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import avatar5 from 'assets/img/avatars/avatar5.png'; // Fallback avatar

const LOCAL_NAME = 'userStorage';

function defaultSetting() {
  return {
    user: {},
    userId: null,
    token: null,
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    expiresAt: null,
    createdAt: null,
    isAuthenticated: false,
    profileImage: avatar5, // Add default profile image to state
    userInfo: {
      name: '',
      email: '',
      profileImage: avatar5, // Add default profile image to state
      isImageRetrieved: false,
    },
    authSession: {
      token: '',
      tokenType: '',
      accessToken: '',
      refreshToken: '',
      expiresIn: '',
      expiresAt: '',
      createdAt: '',
    },
  };
}
// Async action to fetch user profile image
export const fetchUserProfileImage = createAsyncThunk(
  'user/fetchUserProfileImage',
  async (imgWithExt, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/static/files/${imgWithExt}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.url;
    } catch (error) {
      console.error('Error fetching profile image:', error);
      return rejectWithValue(error.message);
    }
  }
);
function getLocalState() {
  const localSetting = JSON.parse(localStorage.getItem(LOCAL_NAME) || '{}');
  return { ...defaultSetting(), ...localSetting };
}

function setLocalState(setting) {
  localStorage.setItem(LOCAL_NAME, JSON.stringify(setting));
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getLocalState(),
  reducers: {
    updateUserInfo: (state, action) => {
      const updatedUserInfo = { ...state.userInfo, ...action.payload };
      setLocalState({ ...state, userInfo: updatedUserInfo });
      state.userInfo = updatedUserInfo;
    },
    resetUserInfo: state => {
      const defaultUserInfo = defaultSetting().userInfo;
      setLocalState({ ...state, userInfo: defaultUserInfo });
      state.userInfo = defaultUserInfo;
    },
    setUser: (state, action) => {
      const user = action.payload;
      console.log('USER SLICE ACTION PAYLOAD:', user);
      setLocalState({ ...state, ...user });
      state.user = { ...user };
    },
    setAuthTokens: (state, action) => {
      console.log('setAuthTokens', action.payload);
      const accessToken = action.payload;
      localStorage.setItem('userToken', accessToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', accessToken);
      localStorage.setItem('expiresIn', '1d');
      sessionStorage.setItem('userToken', accessToken);
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', accessToken);
      sessionStorage.setItem('expiresIn', '1d');
      state.accessToken = accessToken;
      state.token = accessToken;
      state.refreshToken = accessToken;
      state.expiresIn = '1d';
      state.authSession.accessToken = accessToken;
      state.authSession.refreshToken = accessToken;
      state.authSession.expiresIn = '1d';
    },
    setUserId: (state, action) => {
      localStorage.setItem('userId', action.payload);
      state.userId = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      setLocalState(state);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfileImage.fulfilled, (state, action) => {
      state.userInfo.profileImage = action.payload;
      state.profileImage = action.payload;
      state.userInfo.isImageRetrieved = true;
      setLocalState(state);
    });
  },
});

export const {
  updateUserInfo,
  resetUserInfo,
  setUser,
  setUserToken,
  setUserId,
  setAuthTokens,
  setIsAuthenticated,
} = userSlice.actions;

export default userSlice.reducer;
