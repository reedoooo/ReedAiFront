import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    img: '',
    profileImage: '',
    bio: '',
    displayName: '',
    email: '',
    username: '',
    social: {},
    stats: {},
    dashboard: {},
    openai: {
      apiKey: '',
      organizationId: '',
      apiVersion: '',
      projects: [],
    },
    settings: {
      user: {},
      chat: {},
    },
    // other profile properties and reducers...
  },
  selectedProfileImage: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setSelectedProfileImage: (state, action) => {
      state.selectedProfileImage = action.payload;
    },
    // other profile image reducers...
  },
});

export { initialState as profileInitialState };

export const { setProfile, setSelectedProfileImage } = profileSlice.actions;

export default profileSlice.reducer;
