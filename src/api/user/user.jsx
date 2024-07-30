import request from '@/utils/request/axios';
export async function fetchLogin(email, password) {
  try {
    const response = await request.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function fetchSignUp(email, password) {
  try {
    const response = await request.post('/signup', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function updateUserProfile(data) {
  try {
    const response = await request.post(`/${data.userId}/profile/update`, data);
    return response.data; // returns user
  } catch (error) {
    console.error(error);
    throw error;
  }
}
