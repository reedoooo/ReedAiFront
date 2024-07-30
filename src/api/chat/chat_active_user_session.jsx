// getUserActiveChatSession
import request from '@/utils/request/axios';

export const getUserActiveChatSession = async () => {
  try {
    const response = await request.get(
      '/chat/chat_session/user_active_sessions'
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// createOrUpdateUserActiveChatSession
export const createOrUpdateUserActiveChatSession = async chatSessionId => {
  try {
    const response = await request.put(
      '/chat/chat_session/user_active_sessions',
      {
        chatSessionId,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
