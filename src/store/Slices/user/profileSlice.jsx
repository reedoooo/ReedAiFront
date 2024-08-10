import { createSlice } from '@reduxjs/toolkit';
import { getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'profileStore';
const REDUX_NAME = 'profile';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalProfileData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      setLocalProfileData(action.payload);
    },
    setSelectedProfileImage: (state, action) => {
      state.selectedProfileImage = action.payload;
      setLocalProfileData({ ...state, selectedProfileImage: action.payload });
    },
  },
});

export { initialState as profileInitialState };

export const { setProfile, setSelectedProfileImage } = profileSlice.actions;

export default profileSlice.reducer;
// const initialState = {
//   profile: {
//     img: '',
//     profileImage: '',
//     bio: '',
//     displayName: '',
//     email: '',
//     username: '',
//     social: {},
//     stats: {},
//     dashboard: {},
//     openai: {
//       apiKey: '',
//       organizationId: '',
//       apiVersion: '',
//       projects: [],
//     },
//     settings: {
//       user: {},
//       chat: {},
//     },
//     // other profile properties and reducers...
//   },
//   selectedProfileImage: '',
// };
