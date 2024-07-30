import { combineReducers } from '@reduxjs/toolkit';
// user/index.js

// Importing actions and thunks from authSlice
import authReducer, {
  handleAuthSubmit,
  validateToken,
  logout,
  clearError,
  disableForm,
  enableForm,
  updateAuthStateFromLocalStorage,
  setIsRedirectToSignin,
} from './authSlice';

// Importing actions from profileSlice
import profileReducer, {
  setProfile,
  setSelectedProfileImage,
} from './profileSlice';

// Importing actions and thunks from userSlice
import userReducer, {
  fetchUserProfileImage,
  updateUserInfo,
  resetUserInfo,
  setUser,
  setUserToken,
  setUserId,
} from './userSlice';

// Exporting all actions and thunks
export {
  // Auth actions and thunks
  handleAuthSubmit,
  validateToken,
  logout,
  clearError,
  disableForm,
  enableForm,
  updateAuthStateFromLocalStorage,
  setIsRedirectToSignin,

  // Profile actions
  setProfile,
  setSelectedProfileImage,

  // User actions and thunks
  fetchUserProfileImage,
  updateUserInfo,
  resetUserInfo,
  setUser,
  setUserToken,
  setUserId,
};

// Exporting reducers
export { authReducer, profileReducer, userReducer };

// const rootReducer = combineReducers({
//   auth: authReducer,
//   profile: profileReducer,
//   user: userReducer,
// });

// export default rootReducer;
