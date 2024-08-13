import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleAuthSubmit,
  logout,
  refreshAccessToken,
  setIsRedirectToSignin,
  setUser,
  setIsAuthenticated,
  setProfile,
  setSelectedProfileImage,
} from 'store/Slices';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();

  const actions = {
    setProfile,
    setSelectedProfileImage,
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

export const useUserStore = () => useContext(UserContext);

export default UserProvider;
