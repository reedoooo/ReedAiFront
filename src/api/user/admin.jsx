import request from '@/utils/request/axios';
export const GetUserData = async (page, size) => {
  try {
    const response = await request.post('/admin/user_stats', {
      page,
      size,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const UpdateRateLimit = async (email, rateLimit) => {
  try {
    const response = await request.post('/admin/rate_limit', {
      email,
      rateLimit,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateUserFullName = async data => {
  try {
    const response = await request.put('/admin/users', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
