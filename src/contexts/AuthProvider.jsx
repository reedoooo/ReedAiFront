import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearError,
  disableForm,
  enableForm,
  updateAuthStateFromLocalStorage,
  setIsRedirectToSignin,
  handleAuthSubmit,
  logout,
  refreshAccessToken,
} from 'store/Slices';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const authState = useSelector(state => state.auth);
  // const userState = useSelector(state => state.user);
  const state = {
    ...authState,
  };
  const dispatch = useDispatch();

  const actions = {
    handleAuthSubmit: values => dispatch(handleAuthSubmit(values)),
    handleRefreshAccessToken: token => dispatch(refreshAccessToken(token)),
    // validateToken: token => dispatch(validateToken(token)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
    disableForm: () => dispatch(disableForm()),
    enableForm: () => dispatch(enableForm()),
    setIsRedirectToSignin: isRedirectToSignin =>
      dispatch(setIsRedirectToSignin(isRedirectToSignin)),
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (state.token) {
  //       actions.validateToken(state.token);
  //     }
  //   }, 600000); // validate token every 10 minutes

  //   return () => clearInterval(intervalId);
  // }, [state.token]);

  useEffect(() => {
    const handleStorageChange = () => {
      dispatch(updateAuthStateFromLocalStorage());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => useContext(AuthContext);

export default AuthProvider;
