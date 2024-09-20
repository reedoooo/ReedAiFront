// src/hooks/useLocalStorage.jsx
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error('Error setting value:', error);
    }
  };

  return [storedValue, setValue];
};
export default useLocalStorage;

// import { useState } from 'react';

// export const useLocalStorage = (keyName, defaultValue) => {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const value = window.localStorage.getItem(keyName);
//       if (value) {
//         return JSON.parse(value);
//       } else {
//         window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     } catch (err) {
//       return defaultValue;
//     }
//   });
//   const setValue = newValue => {
//     try {
//       window.localStorage.setItem(keyName, JSON.stringify(newValue));
//     } catch (err) {
//       console.log(err);
//     }
//     setStoredValue(newValue);
//   };
//   return [storedValue, setValue];
// };

// export default useLocalStorage;
