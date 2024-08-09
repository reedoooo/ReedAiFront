import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from 'api/user';
import constants from 'config/constants';
import { getItem } from 'utils/storage';
import {
  setActiveSession,
  setActiveWorkspace,
  setChatSessions,
  setWorkspaces,
} from '../chat';
import { getLocalData, setLocalData } from '../chat/helpers';
import {
  setUser,
  setUserToken,
  setUserId,
  setAuthTokens,
  setIsAuthenticated,
} from './userSlice';
const { API_URL } = constants;

const LOCAL_NAME = 'authStore';
const REDUX_NAME = 'auth';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalAuthData(data) {
  setLocalData(LOCAL_NAME, data);
}
export const handleAuthSubmit = createAsyncThunk(
  'auth/handleAuthSubmit',
  async (values, { dispatch, rejectWithValue }) => {
    const { username, password, email, isSignup } = values;
    try {
      const data = isSignup
        ? await auth.signup(username, email, password)
        : await auth.login(email || username, password);
      console.log('data:', data);
      if (data?.accessToken) {
        const responseBody = {
          authSession: {
            token: data.accessToken,
            tokenType: 'Bearer',
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn,
          },
          isAuthenticated: true,
        };

        if (isSignup) {
          responseBody.authUserRegisterData = {
            hasOnboarded: true,
            dateJoined: new Date().toISOString(),
          };
        }

        const updatedUserData = { ...data.user, ...responseBody };

        dispatch(setUser(updatedUserData));
        dispatch(setWorkspaces(updatedUserData.workspaces));
        dispatch(setActiveWorkspace(updatedUserData.workspaces[0]));
        dispatch(setChatSessions(updatedUserData.chatSessions));
        dispatch(setActiveSession(updatedUserData.chatSessions[0]));
        dispatch(setUserId(data.user._id));
        dispatch(
          setAuthTokens(
            data.accessToken,
            data.refreshToken,
            data.expiresIn.toString()
          )
        );
        dispatch(setIsAuthenticated(true));

        return {
          user: updatedUserData,
          token: data.accessToken,
          userId: data.user._id,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
          isAuthenticated: true,
        };
      }
    } catch (error) {
      console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (token, { rejectWithValue }) => {
    try {
      await auth.validateToken(token);
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refresh-token',
  async (token, { getState, rejectWithValue }) => {
    const { navigate } = useNavigate();

    try {
      const data = await auth.refreshToken(token);
      console.log('DATA', data);
      setAuthTokens(data.accessToken, data.refreshToken, data.expiresIn);
      return data.accessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      setAuthTokens(null, null, null);
      navigate('/auth/sign-in');
      return rejectWithValue(error.response.data);
      // window.location.href = '/auth/sign-in';
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      await auth.logout(token);
      localStorage.clear();
      dispatch(setUser({}));
      dispatch(setUserToken(null));
      dispatch(setUserId(''));
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    disableForm: state => {
      state.isFormDisabled = true;
    },
    enableForm: state => {
      state.isFormDisabled = false;
    },
    updateAuthStateFromLocalStorage: state => {
      state.isFormDisabled = !!getItem('userStore')?.accessToken;
    },
    setIsRedirectToSignin: state => {
      state.isRedirectToSignin = !state.isRedirectToSignin;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleAuthSubmit.pending, state => {
        state.authRequest.isFetching = true;
        state.formDisabled = true;
        state.authRequest.status = 'pending';
      })
      .addCase(handleAuthSubmit.fulfilled, (state, action) => {
        state.authRequest.isFetching = false;
        state.authRequest.status = 'fulfilled';
        state.isAuthenticated = true;
        state.formDisabled = false;
        state.user = action.payload;
      })
      .addCase(handleAuthSubmit.rejected, (state, action) => {
        state.authRequest.isFetching = false;
        state.authRequest.status = 'rejected';
        state.authRequest.error = action.payload;
        state.formDisabled = false;
      })
      .addCase(refreshAccessToken.pending, state => {
        state.authRequest.isFetching = true;
        state.authRequest.status = 'pending';
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.authRequest.isFetching = false;
        state.authRequest.status = 'fulfilled';
        state.token = action.payload;
      })
      .addCase(refreshAccessToken.rejected, state => {
        state.authRequest.isFetching = false;
        state.authRequest.status = 'rejected';
        localStorage.clear();
      })
      .addCase(logout.pending, state => {
        state.authRequest.isFetching = true;
        state.authRequest.status = 'pending';
      })
      .addCase(logout.fulfilled, state => {
        state.authRequest.isFetching = false;
        state.authRequest.status = 'fulfilled';
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.authRequest.isFetching = false;
        state.authRequest.status = 'rejected';
        state.authRequest.error = action.payload;
      });
  },
});

export const {
  clearError,
  disableForm,
  enableForm,
  updateAuthStateFromLocalStorage,
  setIsRedirectToSignin,
} = authSlice.actions;

export default authSlice.reducer;

// Listener to sync state with localStorage changes
window.addEventListener('storage', () => {
  const store = require('../store').default;
  store.dispatch(updateAuthStateFromLocalStorage());
});
// const initialState = {
//   formDisabled: null,
//   isRedirectToSignin: false,
//   authRequest: {
//     isFetching: false,
//     error: null,
//     message: '',
//     status: '',
//   },
//   user: {},
// };
