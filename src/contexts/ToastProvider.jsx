import React, { useState, useCallback, useMemo } from 'react';
import { Toaster } from 'sonner';

export const ToastContext = React.createContext({
  toasts: null,
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(toast => {
    const toastId = toast.__id ?? new Date();
    setToasts(prevToasts => [...prevToasts, { ...toast, __id: toastId }]);
    return toastId;
  }, []);

  const removeToast = useCallback(toast => {
    setToasts(prevToasts => {
      const index = prevToasts.findIndex(t => t.__id === toast.__id);
      if (index === -1) return prevToasts;
      const newToasts = [...prevToasts];
      newToasts.splice(index, 1);
      return newToasts;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      <Toaster />
      {children}
    </ToastContext.Provider>
  );
};

export const useToastStore = timeout => {
  const {
    toasts,
    addToast: originalAddToast,
    removeToast,
  } = React.useContext(ToastContext);

  const addToast = useCallback(
    toast => {
      const id = originalAddToast(toast);
      const appliedTimeout = toast.timeout ?? timeout;
      if (appliedTimeout > 0) {
        setTimeout(() => removeToast({ __id: id }), appliedTimeout);
      }
      return id;
    },
    [originalAddToast, removeToast, timeout]
  );

  return useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast]
  );
};

export default ToastProvider;
