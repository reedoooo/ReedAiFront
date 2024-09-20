// user/index.js
import userReducer, {
  fetchUserProfileImage,
  resetUserInfo,
  setUser,
  setIsAuthenticated,
  setUserOpenAiSettings,
  setIsRedirectToSignin,
  setAuthUserData,
  handleAuthSubmit,
  logout,
  refreshAccessToken,
  setProfile,
  setEnvKeyMap,
  setSelectedProfileImage,
  addEnvToUser,
} from './userSlice';

// Exporting all actions and thunks
export {
  // User actions and thunks
  addEnvToUser,
  setProfile,
  setEnvKeyMap,
  setSelectedProfileImage,
  handleAuthSubmit,
  logout,
  refreshAccessToken,
  setIsRedirectToSignin,
  fetchUserProfileImage,
  resetUserInfo,
  setUser,
  setIsAuthenticated,
  setUserOpenAiSettings,
  setAuthUserData,
};

// Exporting reducers
export { userReducer };
