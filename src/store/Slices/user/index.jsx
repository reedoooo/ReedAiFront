// user/index.js
import userReducer, {
  fetchUserProfileImage,
  updateUserInfo,
  resetUserInfo,
  setUser,
  setUserId,
  setAuthTokens,
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
  updateUserInfo,
  resetUserInfo,
  setUser,
  setUserId,
  setAuthTokens,
  setIsAuthenticated,
  setUserOpenAiSettings,
  setAuthUserData,
};

// Exporting reducers
export { userReducer };
