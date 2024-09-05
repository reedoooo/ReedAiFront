// import { createSlice } from '@reduxjs/toolkit';

// // Utility functions for managing cookies
// const getCookie = name => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };

// const addCookies = (name, value, options = {}) => {
//   let cookieString = `${name}=${value};`;
//   if (options.path) {
//     cookieString += `path=${options.path};`;
//   }
//   document.cookie = cookieString;
// };

// const initialMode = getCookie('colorMode') || 'dark';

// export const colorModeSlice = createSlice({
//   name: 'colorMode',
//   initialState: {
//     mode: initialMode,
//   },
//   reducers: {
//     toggleColorMode: state => {
//       const newMode = state.mode === 'dark' ? 'light' : 'dark';
//       state.mode = newMode;
//       addCookies('colorMode', newMode, { path: '/' });
//     },
//     setColorMode: (state, action) => {
//       state.mode = action.payload;
//       addCookies('colorMode', action.payload, { path: '/' });
//     },
//   },
// });

// export const { toggleColorMode, setColorMode } = colorModeSlice.actions;

// export default colorModeSlice.reducer;
