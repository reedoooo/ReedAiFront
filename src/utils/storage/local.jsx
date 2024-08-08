// src/utils/localStorage.js

import React from 'react';

/**
 * Checks if localStorage is available in the current environment.
 * @returns {boolean} True if localStorage is available, false otherwise.
 */
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Sets an item in localStorage with optional expiration.
 * @param {string} key - The key to set.
 * @param {*} value - The value to store.
 * @param {number} [expirationInMinutes] - Optional expiration time in minutes.
 */
export const setItem = (key, value, expirationInMinutes) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return;
  }

  try {
    const item = {
      value: value,
      expiration: expirationInMinutes
        ? new Date().getTime() + expirationInMinutes * 60000
        : null,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error setting localStorage item:', error);
  }
};

/**
 * Gets an item from localStorage.
 * @param {string} key - The key to retrieve.
 * @param {*} defaultValue - The default value if the key doesn't exist.
 * @returns {*} The stored value or the default value.
 */
export const getItem = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return defaultValue;
  }

  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return defaultValue;

    const item = JSON.parse(itemStr);
    if (item.expiration && new Date().getTime() > item.expiration) {
      localStorage.removeItem(key);
      return defaultValue;
    }
    return item.value;
  } catch (error) {
    console.error('Error getting localStorage item:', error);
    return defaultValue;
  }
};

/**
 * Removes an item from localStorage.
 * @param {string} key - The key to remove.
 */
export const removeItem = key => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage item:', error);
  }
};

/**
 * Clears all items from localStorage.
 */
export const clearAll = () => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Gets all keys from localStorage.
 * @returns {string[]} An array of all keys in localStorage.
 */
export const getAllKeys = () => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return [];
  }

  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Error getting localStorage keys:', error);
    return [];
  }
};

/**
 * Custom React Hook for using localStorage.
 * @param {string} key - The key to use in localStorage.
 * @param {*} initialValue - The initial value if the key doesn't exist.
 * @returns {[*, Function]} An array with the current value and a setter function.
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    return getItem(key, initialValue);
  });

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    setItem(key, valueToStore);
  };

  return [storedValue, setValue];
};
