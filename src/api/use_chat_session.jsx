import {
  createChatSession as createChatSessionApi,
  deleteChatSession as deleteChatSessionApi,
  getChatSessionsByUser as getChatSessionsByUserApi,
  renameChatSession as renameChatSessionApi,
  updateChatSession as updateChatSessionApi,
} from './chat/sessions';

export const GET_SESSIONS = 'GET_SESSIONS';
export const CREATE_SESSION = 'CREATE_SESSION';
export const DELETE_SESSION = 'DELETE_SESSION';
export const RENAME_SESSION = 'RENAME_SESSION';
export const UPDATE_SESSION = 'UPDATE_SESSION';

export const getChatSessions = () => async dispatch => {
  try {
    const sessions = await getChatSessionsByUserApi();
    dispatch({ type: GET_SESSIONS, payload: sessions });
  } catch (error) {
    console.error('Failed to get chat sessions:', error);
  }
};

export const createChatSession = variables => async dispatch => {
  try {
    await createChatSessionApi(variables.uuid, variables.name, variables.model);
    dispatch(getChatSessions());
  } catch (error) {
    console.error('Failed to create chat session:', error);
  }
};

export const deleteChatSession = uuid => async dispatch => {
  try {
    await deleteChatSessionApi(uuid);
    dispatch(getChatSessions());
  } catch (error) {
    console.error('Failed to delete chat session:', error);
  }
};

export const renameChatSession = variables => async dispatch => {
  try {
    await renameChatSessionApi(variables.uuid, variables.name);
    dispatch(getChatSessions());
  } catch (error) {
    console.error('Failed to rename chat session:', error);
  }
};

export const updateChatSession = variables => async dispatch => {
  try {
    await updateChatSessionApi(variables.sessionId, variables.session_data);
    dispatch(getChatSessions());
  } catch (error) {
    console.error('Failed to update chat session:', error);
  }
};
