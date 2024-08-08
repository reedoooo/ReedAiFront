import { useCallback, useState } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(notification => {
    setNotifications(prevNotifications => [
      ...prevNotifications,
      { ...notification, id: Date.now() },
    ]);
  }, []);

  const removeNotification = useCallback(id => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};

export default useNotification;
