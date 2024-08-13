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
  fetchAndSetUserData,
  handleAuthSubmit,
  logout,
  refreshAccessToken,
  setProfile,
  setEnvKeyMap,
  setSelectedProfileImage,
} from './userSlice';

// Exporting all actions and thunks
export {
  // User actions and thunks
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
  fetchAndSetUserData,
};

// Exporting reducers
export { userReducer };
