import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSiderCollapsed, setTheme } from 'store/Slices/appSlice';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const state = useSelector(state => state.app);
  const dispatch = useDispatch();

  const actions = {
    setSiderCollapsed: collapsed => dispatch(setSiderCollapsed(collapsed)),
    setTheme: theme => dispatch(setTheme(theme)),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => useContext(AppContext);
export default AppProvider;
