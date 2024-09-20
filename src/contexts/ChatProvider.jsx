import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import * as chatActions from 'store/Slices/chat';
import * as authActions from 'store/Slices/user/userSlice';

const actions = { ...chatActions, ...authActions };
const createStateSelector = sliceName =>
  createSelector([state => state[sliceName]], slice => ({ ...slice }));
const selectWorkspace = createStateSelector('workspace');
const selectBaseChat = createStateSelector('baseChat');
const selectChatSession = createStateSelector('chatSession');
const selectAssistant = createStateSelector('assistant');
const selectCollection = createStateSelector('collection');
const selectFile = createStateSelector('file');
const selectFolders = createStateSelector('folder');
const selectModel = createStateSelector('model');
const selectPreset = createStateSelector('preset');
const selectPrompt = createStateSelector('prompt');

export const ChatContext = createContext(null);
export const ChatProvider = ({ children }) => {
  const workspace = useSelector(selectWorkspace);
  const baseChat = useSelector(selectBaseChat);
  const chatSession = useSelector(selectChatSession);
  const assistant = useSelector(selectAssistant);
  const collection = useSelector(selectCollection);
  const file = useSelector(selectFile);
  const folder = useSelector(selectFolders);
  const model = useSelector(selectModel);
  const preset = useSelector(selectPreset);
  const prompt = useSelector(selectPrompt);

  const state = {
    ...workspace,
    ...baseChat,
    ...chatSession,
    ...assistant,
    ...collection,
    ...file,
    ...folder,
    ...model,
    ...preset,
    ...prompt,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        await dispatch(actions.setAuthUserData());
      } catch (error) {
        console.error('Error fetching and setting user data:', error);
      }
    };
    initializeUserData();
  }, [dispatch]);

  const actionCreators = Object.keys(actions).reduce((acc, actionName) => {
    if (typeof actions[actionName] === 'function') {
      acc[actionName] = (...args) => dispatch(actions[actionName](...args));
    }
    return acc;
  }, {});

  const newActionCreators = {
    updateLocalChatMessages: (message, index = -1) => {
      if (index === -1) {
        dispatch(actions.addChatMessage(message));
      } else {
        dispatch(actions.updateChatMessage({ index, message }));
      }
      dispatch(actions.syncChatMessages());
    },
    debouncedSetChatMessages: (sessionId, messages) =>
      dispatch(actions.debouncedSetChatMessages(sessionId, messages)),
  };
  const combinedActions = { ...actionCreators, ...newActionCreators };

  return (
    <ChatContext.Provider value={{ state, actions: combinedActions }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatStore = () => useContext(ChatContext);
export default ChatProvider;
