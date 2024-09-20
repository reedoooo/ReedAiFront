import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import staticDataApi from 'api/static/staticData';
import { authApi, userApi } from 'api/user';
import avatar5 from 'assets/img/avatars/avatar5.png'; // Fallback avatar
import {
  setAssistants,
  setChatMessages,
  setChatSessions,
  setCollections,
  setFiles,
  setFolders,
  setHomeWorkSpace,
  setModels,
  setPresets,
  setPrompts,
  setSelectedAssistant,
  setSelectedChatSession,
  setSelectedPreset,
  setSelectedPrompt,
  setSelectedTools,
  setSelectedWorkspace,
  setSessionId,
  setTools,
  setWorkspaceId,
  setWorkspaces,
} from '../chat';
import { getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'userStore';
const REDUX_NAME = 'user';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalUserData(data) {
  setLocalData(LOCAL_NAME, data);
}

function dispatchUserUpdates(dispatch, updatedUserData) {
  console.log('Dispatching user updates:', updatedUserData);
  dispatch(setUser(updatedUserData));
  dispatch(setEnvKeyMap(updatedUserData.profile.envKeyMap));
  dispatch(setProfile(updatedUserData.profile));
  dispatch(setWorkspaces(updatedUserData.workspaces));
  dispatch(setSelectedWorkspace(updatedUserData.workspaces[0]));
  dispatch(setChatSessions(updatedUserData.chatSessions));
  dispatch(setIsAuthenticated(true));
}

export const handleAuthSubmit = createAsyncThunk(
  'auth/handleAuthSubmit',
  async (values, { dispatch, rejectWithValue }) => {
    const { username, password, email, isSignup } = values;
    try {
      const data = isSignup
        ? await authApi.signup(username, email, password)
        : await authApi.login(email || username, password);

      if (data?.accessToken) {
        console.log('res data:', data);

        const updatedUserData = {
          ...data.user,
          userId: data.user._id,
          isAuthenticated: true,
        };
        if (isSignup) {
          updatedUserData.authUserRegisterData = {
            hasOnboarded: true,
            dateJoined: new Date().toISOString(),
          };
        }

        dispatchUserUpdates(dispatch, updatedUserData);
        sessionStorage.setItem(
          'workspaceId',
          updatedUserData.workspaces[0]._id
        );
        sessionStorage.setItem(
          'sessionId',
          updatedUserData.workspaces[0].chatSessions[0]?._id
        );
        window.location.href = '/admin/dashboard';
        return {
          user: updatedUserData,
        };
      }
    } catch (error) {
      console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (token, { rejectWithValue }) => {
    try {
      await authApi.validateToken(token);
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refresh-token',
  async (token, { getState, rejectWithValue }) => {
    const navigate = useNavigate();

    try {
      const data = await authApi.refreshToken(token);
      console.log('DATA', data);
      return data.accessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      navigate('/auth/sign-in');
      return rejectWithValue(error.response.data);
      // window.location.href = '/auth/sign-in';
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const token = sessionStorage.getItem('accessToken');
    console.log('LOGOUT TOKEN', token);
    try {
      await authApi.logout(token);
      localStorage.clear();
      sessionStorage.clear();
      dispatch(setUser({}));
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserProfileImage = createAsyncThunk(
  'user/fetchUserProfileImage',
  async (username, { dispatch, rejectWithValue }) => {
    try {
      const imagename = username ? 'avatar1' : 'avatar5';
      const imgWithExt = `${imagename}.png`;

      const response = await staticDataApi.getProfileImage(imgWithExt);
      console.log('Image response:', response);
      // Convert the blob to a URL
      // const imageSrc = URL.createObjectURL(response);
      // Convert the buffer to a base64 string if needed
      // const buffer = Buffer.from(response.data, 'binary').toString('base64');
      // const imageSrc = `data:image/png;base64,${buffer}`;
      // dispatch(
      //   setUser(prevUser => ({
      //     ...prevUser,
      //     profileImageName: 'avatar1.png',
      //     profileImage: response,
      //     isImageRetrieved: true,
      //   }))
      // );
      // dispatch(
      //   setProfile(prevProfile => ({
      //     ...prevProfile,
      //     imagePath: response,
      //   }))
      // );
      // dispatch(setSelectedProfileImage(response));
      return response;
    } catch (error) {
      console.error('Error fetching profile image:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const setAuthUserData = createAsyncThunk(
  'user/setAuthUserData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem(LOCAL_NAME));

      if (!storedUserData) {
        // throw new Error('No user data found in local storage');
        console.log('No user data found in local storage');
        return;
      }

      const { username } = storedUserData.user;
      let imageUrl = null;
      let imageRetrievalStatus = false;
      if (!storedUserData?.selectedProfileImage) {
        imageUrl = (await dispatch(fetchUserProfileImage(username))).payload;
        imageRetrievalStatus = true;
        dispatch(setSelectedProfileImage(imageUrl));
      }
      const {
        workspaces,
        folders,
        presets,
        prompts,
        models,
        chatSessions,
        collections,
        files,
        assistants,
        tools,
      } = storedUserData.user;
      const homeWorkSpace = workspaces?.find(
        workspace => workspace.isHome === true
      );
      console.log('HOME_WORKSPACE', homeWorkSpace);
      const updatedHomeWorkSpace = {
        ...homeWorkSpace,
        folders,
        files,
        chatSessions,
        assistants,
        prompts,
        tools,
        models,
        presets,
        collections,
        active: true,
      };
      dispatch(setWorkspaces(workspaces));
      dispatch(setHomeWorkSpace(updatedHomeWorkSpace));
      dispatch(setSelectedWorkspace(updatedHomeWorkSpace));
      dispatch(setWorkspaceId(updatedHomeWorkSpace._id));
      dispatch(setChatSessions(workspaces[0].chatSessions));
      const currentChatSession = updatedHomeWorkSpace.chatSessions[0];
      // const currentChatSessionMessages = currentChatSession.messages;
      dispatch(setSelectedChatSession(currentChatSession));
      dispatch(setChatMessages(currentChatSession.messages));
      // localStorage.setItem(
      //   'chatMessages',
      //   JSON.stringify(currentChatSessionMessages)
      // );
      dispatch(setSessionId(workspaces[0].chatSessions[0]));
      dispatch(setPresets(presets));
      dispatch(setSelectedPreset(presets[0]));
      dispatch(setPrompts(prompts));
      dispatch(setSelectedPrompt(prompts[0]));
      dispatch(setModels(models));
      dispatch(setCollections(collections));
      dispatch(setFolders(folders));
      dispatch(setFiles(files));
      dispatch(setAssistants(assistants));
      dispatch(setSelectedAssistant(assistants[0]));
      dispatch(setTools(tools));
      dispatch(setSelectedTools(tools));
      return {
        ...storedUserData.user,
        profileImage: imageUrl,
        isImageRetrieved: imageRetrievalStatus,
        userInfo: {
          ...storedUserData.userInfo,
          profileImage: imageUrl,
          isImageRetrieved: imageRetrievalStatus,
        },
      };
    } catch (error) {
      console.error('Error fetching user data from local storage:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const addEnvToUser = createAsyncThunk(
  `${REDUX_NAME}/addEnvToUser`,
  async ({ apiKey }, { rejectWithValue }) => {
    try {
      console.log('Adding API key:', apiKey);
      const response = await userApi.addEnvToUser(
        sessionStorage.getItem('userId'),
        apiKey
      );
      // dispatch(setApiKey(apiKey));
      // dispatch(setChatRequestData(response.message));
      return response;
      // await dispatch(addApiKey(apiKey));
      // dispatch(setChatRequestData({ message: 'Added API key successfully' }));
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    resetUserInfo: state => {
      const defaultUserInfo = {
        name: '',
        email: '',
        profileImage: avatar5, // Add default profile image to state
        isImageRetrieved: false,
      };
      setLocalUserData({ ...state, userInfo: defaultUserInfo });
      state.userInfo = defaultUserInfo;
    },
    setUser: (state, action) => {
      const user = action.payload;
      console.log('USER SLICE ACTION PAYLOAD:', user);
      setLocalUserData({ ...state, ...user });
      state.user = user;
    },
    setUserOpenAiSettings: (state, action) => {
      const openAiSettings = action.payload;
      const userOpenAiSettings = state.user.openai || {};
      const updatedUser = {
        ...state.user,
        openai: { ...userOpenAiSettings, ...openAiSettings },
      };
      setLocalUserData({ ...state, user: updatedUser });
      state.openAiSettings = openAiSettings;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      setLocalUserData({ ...state, profile: action.payload });
    },
    setEnvKeyMap: (state, action) => {
      state.envKeyMap = action.payload;
    },
    setSelectedProfileImage: (state, action) => {
      state.selectedProfileImage = action.payload;
      state.isImageRetrieved = Boolean(action.payload);
      setLocalUserData({
        ...state,
        selectedProfileImage: action.payload,
        isImageRetrieved: true,
      });
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      setLocalUserData({ ...state, isAuthenticated: action.payload });
    },
    setIsRedirectToSignin: state => {
      state.isRedirectToSignin = !state.isRedirectToSignin;
      setLocalUserData({
        ...state,
        isRedirectToSignin: state.isRedirectToSignin,
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleAuthSubmit.pending, state => {
        state.loading = true;
      })
      .addCase(handleAuthSubmit.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(handleAuthSubmit.rejected, state => {
        state.loading = false;
      })
      .addCase(refreshAccessToken.pending, state => {
        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(refreshAccessToken.rejected, state => {
        state.loading = false;
      })
      .addCase(logout.fulfilled, state => {
        state.user = {};
        state.isAuthenticated = false;
      });
  },
});

export const {
  resetUserInfo,
  setUser,
  setIsAuthenticated,
  setUserOpenAiSettings,
  setIsRedirectToSignin,
  setProfile,
  setSelectedProfileImage,
  setEnvKeyMap,
} = userSlice.actions;

export default userSlice.reducer;
