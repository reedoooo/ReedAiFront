import React, { useState, useCallback } from 'react';

export const ToastContext = React.createContext({
  toasts: null,
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  function id(toast) {
    return toast.__id;
  }

  const addToast = toast => {
    toast.__id ??= new Date();
    setToasts(toasts => [...toasts, toast]);
    return id(toast);
  };

  const removeToast = toast => {
    setToasts(toastList => {
      return toastList.filter(current => id(current) !== id(toast));
    });
  };

  const contextValue = {
    toasts: toasts,
    addToast: useCallback(error => addToast(error), []),
    removeToast: useCallback(error => removeToast(error), []),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastStore = timeout => {
  // function useToast(timeout) {
  const {
    toasts,
    addToast: originalAddToast,
    removeToast,
  } = React.useContext(ToastContext);

  function addToast(toast) {
    originalAddToast(toast);
    let appliedTimeout = toast.timeout ?? timeout;
    if (appliedTimeout > 0)
      setTimeout(() => removeToast(toast), appliedTimeout);
  }

  return { toasts, addToast, removeToast };
};
export default ToastProvider;
