// import axios from 'axios';

// // Auth Actions please maintain alphabetical order
// export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
// export const CHANGESETTINGS = 'CHANGESETTINGS';
// export const CREATE_USER = 'CREATE_USER';
// export const FORGOTPASSWORD = 'FORGOTPASSWORD';
// export const RESETPASSWORD = 'RESETPASSWORD';
// export const SIGNIN = 'SIGNIN';
// export const SIGNOUT = 'SIGNOUT';
// // Auth Actions functions
// export const authError = (error) => {
//   return (dispatch) => {
//     dispatch({ type: AUTHENTICATION_ERROR, payload: error });
//     setTimeout(() => {
//       dispatch({ type: AUTHENTICATION_ERROR });
//     }, 4000);
//   };
// };
// export const changeSettings = async (user) => {
//   const apiurl = `${ROOT_URL}/settings`;
//   try {
//     const token = localStorage.getItem('token');
//     await axios.post(apiurl, user, {
//       headers: {
//         Authorization: token,
//       },
//     });
//     return {
//       type: CHANGESETTINGS,
//     };
//   } catch (error) {
//     return authError(error.response.data.message);
//   }
// export const createUser = async (user, history) => {
//   const apiurl = `${ROOT_URL}/signup`;
//     const adduserrequest = await axios.post(apiurl, user);
//     history.push('/signin');
//       type: CREATE_USER,
//       payload: adduserrequest,
//     if (error.message === 'Network Error')
//       return authError('Network Error - Email jaspinder to start server');
//     if (error.response.data.message.errmsg) {
//       const duplicateKey = error.response.data.message.errmsg;
//       const emailKeyWordPresent = duplicateKey.search(/email/i);
//       if (emailKeyWordPresent === -1) {
//         return authError('Username Unavailable');
//       }
//       return authError('Email already registered');
//     }
//     if (error.response.data.message)
//       return authError(error.response.data.message);
// export const signin = async (user, history) => {
//   const apiurl = `${ROOT_URL}/signin`;
//     const signinrequest = await axios.post(apiurl, user);
//     localStorage.setItem('token', signinrequest.data.token);
//     // After signin the user needs to be redirected to
//     history.push('/forgotpassword');
//       type: SIGNIN,
//       payload: signinrequest,
// export const signout = async (history) => {
//   const apiurl = `${ROOT_URL}/signout`;
//   const token = localStorage.getItem('token');
//     await axios.get(apiurl, {
//     // remove the JWT from local storage
//     localStorage.removeItem('token');
//       type: SIGNOUT,
// export const forgotPassword = async (email) => {
//     await axios.post(`${ROOT_URL}/forgotpassword`, { email });
//       type: FORGOTPASSWORD,
// export const resetPassword = async (passwords, history) => {
//     await axios.post(`${ROOT_URL}/reset`, passwords, {
//       type: RESETPASSWORD,
