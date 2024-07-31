import { combineReducers } from '@reduxjs/toolkit';
// user/index.js

// Importing actions and thunks from authSlice
import authReducer, {
  handleAuthSubmit,
  logout,
  clearError,
  disableForm,
  enableForm,
  updateAuthStateFromLocalStorage,
  setIsRedirectToSignin,
  refreshAccessToken,
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
  setUserId,
  setAuthTokens,
  setIsAuthenticated,
} from './userSlice';

// Exporting all actions and thunks
export {
  // Auth actions and thunks
  handleAuthSubmit,
  logout,
  clearError,
  disableForm,
  enableForm,
  updateAuthStateFromLocalStorage,
  setIsRedirectToSignin,
  refreshAccessToken,
  // Profile actions
  setProfile,
  setSelectedProfileImage,

  // User actions and thunks
  fetchUserProfileImage,
  updateUserInfo,
  resetUserInfo,
  setUser,
  setUserId,
  setAuthTokens,
  setIsAuthenticated,
};

// Exporting reducers
export { authReducer, profileReducer, userReducer };

// const rootReducer = combineReducers({
//   auth: authReducer,
//   profile: profileReducer,
//   user: userReducer,
// });

// export default rootReducer;
