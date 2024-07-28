// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

beforeAll(() => {
  const localStorageMock = (function () {
    let store = {};
    return {
      key: function (i) {
        return Object.keys(store)[i];
      },
      getItem: function (key) {
        return store[key] || null;
      },
      setItem: function (key, value) {
        store[key] = value.toString();
      },
      removeItem: function (key) {
        delete store[key];
      },
      get length() {
        return Object.keys(store).length;
      },
      clear: function () {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});
