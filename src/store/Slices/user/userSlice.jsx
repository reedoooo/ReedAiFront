import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import avatar5 from 'assets/img/avatars/avatar5.png'; // Fallback avatar

const LOCAL_NAME = 'userStorage';

function defaultSetting() {
  return {
    user: {},
    userId: null,
    token: null,
    profileImage: avatar5, // Add default profile image to state
    userInfo: {
      name: '',
      email: '',
      profileImage: avatar5, // Add default profile image to state
      isImageRetrieved: false,
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
      setLocalState({ ...state, user: action.payload });
      state.user = action.payload;
    },
    setUserToken: (state, action) => {
      localStorage.setItem('userToken', JSON.stringify(action.payload));
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      localStorage.setItem('userId', action.payload);
      state.userId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfileImage.fulfilled, (state, action) => {
        state.userInfo.profileImage = action.payload;
        state.profileImage = action.payload;
        state.userInfo.isImageRetrieved = true;
        setLocalState(state);
      })
      .addCase(fetchUserProfileImage.rejected, (state, action) => {
        console.error('Failed to fetch profile image:', action.payload);
      });
  },
});

export const {
  updateUserInfo,
  resetUserInfo,
  setUser,
  setUserToken,
  setUserId,
} = userSlice.actions;

export default userSlice.reducer;
