import { apiUtils } from '@/lib/apiUtils';

export const authApi = {
  signup: async (username, email, password) => {
    const data = await apiUtils.post(`/user/signup`, {
      username,
      email,
      password,
    });
    return data;
  },

  login: async (usernameOrEmail, password) => {
    const data = await apiUtils.post(`/user/login`, {
      usernameOrEmail,
      password,
    });
    return data;
  },

  logout: async token => {
    const data = await apiUtils.post(`/user/logout`, token);
    return data;
  },

  validateToken: async token => {
    const data = await apiUtils.get(`/user/validate-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  refreshToken: async refreshToken => {
    const data = await apiUtils.post(`/user/refresh-token`, {
      token: refreshToken,
    });
    return data;
  },
};

export default authApi;
// export const authAPI = {
//   async handleAuthSubmit(values) {
//     const { username, password, email, isSignup } = values;
//     const url = isSignup ? `/user/signup` : `/user/login`;
//     const usernameOrEmail = !email ? username : email;
//     const payload = isSignup
//       ? { username, password, email }
//       : { usernameOrEmail, password };

//     try {
//       const { data } = await apiUtils.post(url, payload);
//       // Ensure the data returned is in the correct structure for the reducer
//       return {
//         user: data.user,
//         token: data.token,
//         userId: data.user._id,
//       };
//     } catch (error) {
//       console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
//       throw error;
//     }
//   },

//   async validateToken(token) {
//     try {
//       const data = await apiUtils.get(`/user/validate-token`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return data.status === 200;
//     } catch (error) {
//       console.error('Token validation error:', error);
//       throw error;
//     }
//   },

//   async logout(token) {
//     try {
//       await apiUtils.post(
//         `/user/logout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } catch (error) {
//       console.error('Logout error:', error);
//       throw error;
//     }
//   },
// };
