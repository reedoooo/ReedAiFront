import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleAuthSubmit,
  logout,
  refreshAccessToken,
  setIsRedirectToSignin,
  setUser,
  setProfile,
  setSelectedProfileImage,
  setIsAuthenticated,
  fetchUserProfileImage,
} from 'store/Slices';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();

  const actions = {
    setProfile,
    setSelectedProfileImage,
    getUserProfileImage: username => dispatch(fetchUserProfileImage(username)),
    setIsAuthenticated: isAuthenticated =>
      dispatch(setIsAuthenticated(isAuthenticated)),
    setUser: user => dispatch(setUser(user)),
    handleAuthSubmit: values => dispatch(handleAuthSubmit(values)),
    handleRefreshAccessToken: token => dispatch(refreshAccessToken(token)),
    logout: () => dispatch(logout()),
    setIsRedirectToSignin: isRedirectToSignin =>
      dispatch(setIsRedirectToSignin(isRedirectToSignin)),
  };
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     dispatch(updateAuthStateFromLocalStorage());
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, [dispatch]);
  return (
    <UserContext.Provider value={{ state, actions }}>
      {children}
    </UserContext.Provider>
  );
};

/*
 * Custom hook to access the user context
 * @returns {Object} The user context
 *
 */
export const useUserStore = () => useContext(UserContext);

export default UserProvider;
