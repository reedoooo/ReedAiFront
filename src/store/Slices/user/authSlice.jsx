import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import constants from 'config/constants';
import { setUser, setUserToken, setUserId } from './userSlice';

const { API_URL } = constants;

// Utility functions to handle localStorage
const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageItem = (key, defaultValue = null) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const removeLocalStorageItem = key => {
  localStorage.removeItem(key);
};
const initialState = {
  authUserLoginData: {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    isActive: false,
    displayName: '',
    lastLogin: '',
  },
  authUserRegisterData: {
    hasOnboarded: false,
    dateJoined: '',
  },
  authSession: {
    token: '',
    tokenType: '',
    accessToken: '',
    refreshToken: '',
    expiresIn: '',
    expiresAt: '',
    createdAt: '',
  },
  status: 'idle',
  error: null,
  isAuthenticated: !!getLocalStorageItem('userToken'),
  formDisabled: !!getLocalStorageItem('userToken'),
  isRedirectToSignin: false,
  user: getLocalStorageItem('userStorage')?.user || {},
  token: getLocalStorageItem('userToken'),
};
// Async thunks
export const handleAuthSubmit = createAsyncThunk(
  'auth/handleAuthSubmit',
  async (values, { dispatch, rejectWithValue }) => {
    const { username, password, email, isSignup } = values;
    const url = isSignup ? `${API_URL}/user/signup` : `${API_URL}/user/login`;
    const usernameOrEmail = !email ? username : email;
    const payload = isSignup
      ? { username, password, email }
      : { usernameOrEmail, password };

    try {
      const { data } = await axios.post(url, payload);
      if (data.token) {
        dispatch(setUserToken(data.token));
        dispatch(setUser(data.user));
        dispatch(setUserId(data.user._id));
        return { user: data.user, token: data.token, userId: data.user._id };
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
      const response = await axios.get(`${API_URL}/user/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error('Token validation failed');
      }
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      await axios.post(
        `${API_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      state.formDisabled = true;
    },
    enableForm: state => {
      state.formDisabled = false;
    },
    updateAuthStateFromLocalStorage: state => {
      state.isAuthenticated = !!getLocalStorageItem('userToken');
      state.formDisabled = !!getLocalStorageItem('userToken');
    },
    setIsRedirectToSignin: state => {
      state.isRedirectToSignin = !state.isRedirectToSignin;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleAuthSubmit.pending, state => {
        state.status = 'loading';
        state.formDisabled = true;
      })
      .addCase(handleAuthSubmit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.formDisabled = false;
      })
      .addCase(handleAuthSubmit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.formDisabled = false;
      })
      .addCase(validateToken.pending, state => {
        state.status = 'loading';
      })
      .addCase(validateToken.fulfilled, state => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
      })
      .addCase(validateToken.rejected, state => {
        state.status = 'failed';
        localStorage.clear();
      })
      .addCase(logout.pending, state => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, state => {
        state.status = 'succeeded';
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
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
  const store = require('./store').default;
  store.dispatch(updateAuthStateFromLocalStorage());
});
