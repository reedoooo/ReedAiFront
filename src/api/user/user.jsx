import { apiUtils } from '@/lib/apiUtils';

export const userApi = {
  getUserById: async id => {
    try {
      const data = await apiUtils.get(`/user/${id}`);
      console.log('User data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
  addEnvToUser: async (userId, apiKey) => {
    try {
      const data = await apiUtils.post(`/user/${userId}/addApiKey`, {
        clientApiKey: apiKey,
      });
      return data;
    } catch (error) {
      console.error('Error adding API key to user:', error);
      throw error;
    }
  },
};

export default userApi;
