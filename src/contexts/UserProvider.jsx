import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserInfo,
  resetUserInfo,
  setUser,
  setUserToken,
  setUserId,
} from 'store/Slices/user/userSlice';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();

  const setUserDetails = ({ userId, userToken }) => {
    dispatch(setUser({ userId }));
    dispatch(setUserToken(userToken));
  };

  const setUserDetailsFromToken = userToken => {
    dispatch(setUserToken(userToken));
  };

  const setUserIdFromToken = userId => {
    dispatch(setUserId(userId));
  };

  const updateUser = userInfo => {
    dispatch(updateUserInfo(userInfo));
  };

  const resetUser = () => {
    dispatch(resetUserInfo());
  };

  const actions = {
    setUserDetails,
    setUserDetailsFromToken,
    setUserIdFromToken,
    updateUser,
    resetUser,
  };

  return (
    <UserContext.Provider value={{ state, actions }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => useContext(UserContext);

export default UserProvider;
