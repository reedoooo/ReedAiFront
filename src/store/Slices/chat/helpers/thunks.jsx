// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import mongoose from 'mongoose';
// // import { combineReducers } from 'redux';
// import { customHistory } from '@/routes/index';
// import {
//   createChatSession,
//   createOrUpdateUserActiveChatSession,
//   deleteChatData,
//   updateChatSession as fetchUpdateChatById,
//   getChatSessionDefault,
//   getChatMessagesBySessionId as getChatSessionHistory,
//   getChatSessionsByUser,
//   getUserActiveChatSession,
// } from 'api';
// // Import slices
// import activeChatSlice from '../activeChatSlice';
// import assistantSlice from '../assistantSlice';
// import chatInputCommandSlice from '../chatInputCommandSlice';
// import collectionSlice from '../collectionSlice';
// import fileSlice from '../fileSlice';
// import foldersSlice from '../foldersSlice';
// import generalChatSlice from '../generalChatSlice';
// import modelSlice from '../modelsSlice';
// import passiveChatSlice from '../passiveChatSlice';
// import presetSlice from '../presetSlice';
// import promptSlice from '../promptSlice';
// import retrievalSlice from '../retrievalSlice';
// import sessionSlice from '../sessionSlice';
// import toolSlice from '../toolSlice';
// import workspaceSlice from '../workspaceSlice';
// export const reloadRoute = createAsyncThunk(
//   'chat/reloadRoute',
//   async (id, { dispatch }) => {
//     customHistory.push({ pathname: '/chat', search: `?chatId=${id}` });
//     dispatch(sessionSlice.actions.setActiveSession(id));
//   }
// );

// export const syncChatSessions = createAsyncThunk(
//   'chat/syncChatSessions',
//   async (_, { dispatch }) => {
//     const sessions = await getChatSessionsByUser();
//     const historyData = sessions.reverse();
//     if (historyData.length === 0) {
//       const newChatText = 'chat.new';
//       historyData.push(await getChatSessionDefault(newChatText));
//     }
//     const activeSession = await getUserActiveChatSession();
//     const activeSessionId = activeSession
//       ? activeSession.chatSessionId
//       : historyData[0].id;
//     dispatch(sessionSlice.actions.setActiveSession(activeSessionId));
//     if (customHistory.location.search.split('=')[1] !== activeSessionId) {
//       await dispatch(reloadRoute(activeSessionId));
//     }
//   }
// );

// export const syncChatMessages = createAsyncThunk(
//   'chat/syncChatMessages',
//   async (id, { dispatch }) => {
//     if (id) {
//       const messageData = await getChatSessionHistory(id);
//       dispatch(
//         passiveChatSlice.actions.setChatMessages({
//           id,
//           messages: messageData,
//         })
//       );
//     }
//   }
// );

// export const updateChatSessionAsync = createAsyncThunk(
//   'chat/updateChatSession',
//   async ({ id, edit }, { dispatch }) => {
//     dispatch(fetchUpdateChatById(id, edit));
//   }
// );

// export const deleteChatSessionAsync = createAsyncThunk(
//   'chat/deleteChatSession',
//   async (index, { dispatch }) => {
//     dispatch(deleteChatData(index));
//   }
// );

// export const setActiveAsync = createAsyncThunk(
//   'chat/setActive',
//   async (id, { dispatch }) => {
//     dispatch(sessionSlice.actions.setActiveSession(id));
//     await createOrUpdateUserActiveChatSession(id);
//     await dispatch(reloadRoute(id));
//   }
// );

// export const initializeIds = createAsyncThunk(
//   'chat/initializeIds',
//   async (_, { dispatch }) => {
//     let chatId = localStorage.getItem('chatId');
//     let sessionId = localStorage.getItem('sessionId');
//     if (!chatId) {
//       chatId = new mongoose.Types.ObjectId();
//       localStorage.setItem('chatId', chatId);
//     }
//     if (!sessionId) {
//       sessionId = new mongoose.Types.ObjectId();
//       localStorage.setItem('sessionId', sessionId);
//     }
//     dispatch(chatSlice.actions.setChatId(chatId));
//     dispatch(chatSlice.actions.setSessionId(sessionId));
//   }
// );

// export const addChatSessionAsync = createAsyncThunk(
//   'chat/addChatSession',
//   async ({ historyData, chatData = [] }, { dispatch }) => {
//     const newSessionId = new mongoose.Types.ObjectId();
//     await createChatSession(newSessionId, historyData.title, historyData.model);
//     localStorage.setItem('sessionId', newSessionId);
//     dispatch(sessionSlice.actions.setSessionId(newSessionId));
//     dispatch(generalChatSlice.actions.setChat({ [newSessionId]: chatData }));
//     await dispatch(reloadRoute(newSessionId));
//   }
// );
// // Async thunks for file operations
// export const fetchFileData = createAsyncThunk(
//   'files/fetchData',
//   async ({ url, fileType }, { dispatch }) => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       dispatch(processFiles({ files: data, fileType }));
//       return data;
//     } catch (error) {
//       console.error(
//         `There was a problem with the fetch operation for ${fileType}:`,
//         error
//       );
//       return null;
//     }
//   }
// );

// export const processFiles = createAsyncThunk(
//   'files/processFiles',
//   async ({ files, fileType }, { dispatch }) => {
//     if (fileType === 'png') {
//       const pngFiles = files.filter(file => file.type === 'png');
//       dispatch(fileSlice.setChatImages(pngFiles));
//     } else if (fileType === 'json') {
//       const organizedFiles = files.map(file => ({
//         id: getNewPromptId(file.name),
//         title: file.name,
//         content: file.content,
//       }));
//       if (
//         organizedFiles.length > 0 &&
//         organizedFiles[0].title &&
//         organizedFiles[0].content
//       ) {
//         localStorage.setItem('customPrompts', JSON.stringify(organizedFiles));
//         dispatch(setFiles(organizedFiles));
//       } else {
//         console.error('Data structure is not as expected', organizedFiles);
//       }
//     }
//   }
// );

// const getNewPromptId = file => {
//   const id = file.split('/').pop().split('.')[0];
//   const idParts = id.split('-');
//   return uniqueId(idParts[idParts.length - 1]);
// };
