// import { createSlice } from '@reduxjs/toolkit';
// import mongoose from 'mongoose';
// import { useSnackbar } from 'notistack';

// const LOCAL_NAME = 'promptStore';

// const defaultPromptList = [
//   {
//     userId: new mongoose.Types.ObjectId().toString(),
//     folderId: new mongoose.Types.ObjectId().toString(),
//     content: 'Write the code for a React component with a stateful counter',
//     name: 'React Counter Component',
//     sharing: 'private',
//     promptText: 'Create a React component with a stateful counter',
//     createdAt: new Date().toISOString(),
//     metadata: {
//       label: 'Component Name',
//       text: 'CounterComponent',
//       createdBy: 'John Doe',
//       description: 'A component with a stateful counter',
//       type: 'React',
//       style: 'functional',
//       props: {
//         initialCount: 0,
//       },
//     },
//   },
//   {
//     userId: new mongoose.Types.ObjectId().toString(),
//     folderId: new mongoose.Types.ObjectId().toString(),
//     content: 'Write the code for a RESTful API with Express and MongoDB',
//     name: 'Express MongoDB API',
//     sharing: 'private',
//     promptText: 'Create a RESTful API with Express and MongoDB',
//     createdAt: new Date().toISOString(),
//     metadata: {
//       label: 'API Name',
//       text: 'UserAPI',
//       createdBy: 'Jane Smith',
//       description: 'An API for managing users with Express and MongoDB',
//       type: 'API',
//       style: 'functional',
//       props: {
//         routes: [
//           'GET /users',
//           'POST /users',
//           'PUT /users/:id',
//           'DELETE /users/:id',
//         ],
//       },
//     },
//   },
//   {
//     userId: new mongoose.Types.ObjectId().toString(),
//     folderId: new mongoose.Types.ObjectId().toString(),
//     content:
//       'Generate code for a Redux store with slices for managing user authentication',
//     name: 'Redux Authentication Store',
//     sharing: 'private',
//     promptText:
//       'Create a Redux store with slices for managing user authentication',
//     createdAt: new Date().toISOString(),
//     metadata: {
//       label: 'Store Name',
//       text: 'AuthStore',
//       createdBy: 'Sam Wilson',
//       description: 'A Redux store with slices for managing user authentication',
//       type: 'Redux',
//       style: 'functional',
//       props: {
//         slices: ['auth', 'user'],
//         actions: ['login', 'logout', 'setUser'],
//       },
//     },
//   },
// ];

// function getLocalPromptList() {
//   const promptStore = JSON.parse(localStorage.getItem(LOCAL_NAME) || '{}');
//   if (promptStore && promptStore.promptList?.length > 0) {
//     return promptStore;
//   } else {
//     setLocalPromptList({ promptList: defaultPromptList });
//     return { promptList: defaultPromptList };
//   }
// }

// function setLocalPromptList(promptStore) {
//   localStorage.setItem(LOCAL_NAME, JSON.stringify(promptStore));
// }

// const promptSlice = createSlice({
//   name: 'prompt',
//   initialState: getLocalPromptList(),
//   reducers: {
//     addPrompt: (state, action) => {
//       state.promptList.unshift(action.payload);
//       setLocalPromptList(state);
//     },
//     modifyPrompt: (state, action) => {
//       const { key, value, newKey, newValue } = action.payload;
//       const index = state.promptList.findIndex(
//         item => item.key === key && item.value === value
//       );
//       if (index !== -1) {
//         state.promptList[index] = { key: newKey, value: newValue };
//         setLocalPromptList(state);
//       }
//     },
//     deletePrompt: (state, action) => {
//       state.promptList = state.promptList.filter(
//         item => item.key !== action.payload.key
//       );
//       setLocalPromptList(state);
//     },
//     clearPrompts: state => {
//       state.promptList = [];
//       setLocalPromptList(state);
//     },
//     importPrompts: (state, action) => {
//       const newPrompts = action.payload;
//       for (const i of newPrompts) {
//         let safe = true;
//         for (const j of state.promptList) {
//           if (j.key === i.key || j.value === i.value) {
//             safe = false;
//             break;
//           }
//         }
//         if (safe) state.promptList.unshift(i);
//       }
//       setLocalPromptList(state);
//     },
//     exportPrompts: state => {
//       const jsonDataStr = JSON.stringify(state.promptList);
//       const blob = new Blob([jsonDataStr], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'ChatGPTPromptTemplate.json';
//       link.click();
//       URL.revokeObjectURL(url);
//     },
// downloadPrompts: (state, action) => {
//   const downloadURL = action.payload;
//   fetch(downloadURL)
//     .then(response => response.json())
//     .then(jsonData => {
//       const jsonDataStr = JSON.stringify(jsonData);
//       promptSlice.caseReducers.importPrompts(state, {
//         payload: jsonDataStr,
//       });
//     })
//     .catch(() => {
//       useSnackbar().enqueueSnackbar('Network error or invalid JSON file', {
//         variant: 'error',
//       });
//     });
// },
//   },
// });

// export const {
//   addPrompt,
//   modifyPrompt,
//   deletePrompt,
//   clearPrompts,
//   importPrompts,
//   exportPrompts,
//   downloadPrompts,
// } = promptSlice.actions;
// export default promptSlice.reducer;
