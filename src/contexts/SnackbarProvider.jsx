// SnackbarContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import { NotificationBox } from 'components/themed';

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info', // 'success', 'error', 'warning', 'info'
  });

  const showMessage = useCallback((message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const hideMessage = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
  }, [snackbar]);

  return (
    <SnackbarContext.Provider value={{ snackbar, showMessage, hideMessage }}>
      {children}
      <NotificationBox
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={hideMessage}
      />
    </SnackbarContext.Provider>
  );
};

/**
 * Custom hook that provides access to the SnackbarContext.
 * @returns {Object} The SnackbarContext
 * @func showMessage - A function to show a snackbar with a message and optional severity
 * @func hideMessage - A function to hide the snackbar
 * @prop snackbar - The current state of the snackbar
 * @example const { snackbar, showMessage, hideMessage } = useSnackbarStore();
 */
export const useSnackbarStore = () => useContext(SnackbarContext);

export default SnackbarProvider;
