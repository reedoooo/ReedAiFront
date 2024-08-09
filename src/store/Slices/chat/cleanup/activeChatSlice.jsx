// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isGenerating: false,
//   firstTokenReceived: false,
//   isMessagesUpdated: false,
//   isDisabled: false,
//   isFirstMessageReceived: false,
//   abortController: null,
//   active: null,
// };
// const LOCAL_NAME = 'activeChatStore';

// export const activeChatSlice = createSlice({
//   name: 'activeChat',
//   initialState,
//   reducers: {
//     setIsGenerating: (state, action) => {
//       state.isGenerating = action.payload;
//     },
//     setIsDisabled: (state, action) => {
//       state.isDisabled = action.payload;
//     },
//     setFirstTokenReceived: (state, action) => {
//       state.firstTokenReceived = action.payload;
//     },
//     setFirstMessageReceived: (state, action) => {
//       state.isFirstMessageReceived = action.payload;
//     },
//     setAbortController: (state, action) => {
//       state.abortController = action.payload;
//     },
//     setActiveLocal: (state, action) => {
//       state.active = action.payload;
//     },
//     setIsMessagesUpdated: (state, action) => {
//       state.isMessagesUpdated = action.payload;
//     },
//   },
// });

// export { initialState as chatActiveInitialState };

// export const {
//   setIsGenerating,
//   setFirstTokenReceived,
//   setAbortController,
//   setIsDisabled,
//   setActiveLocal,
//   setIsMessagesUpdated,
//   setFirstMessageReceived,
// } = activeChatSlice.actions;

// export default activeChatSlice.reducer;
