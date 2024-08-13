import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import staticDataApi from 'api/static/staticData';
import { authApi } from 'api/user';
import avatar5 from 'assets/img/avatars/avatar5.png'; // Fallback avatar
import {
  setActiveWorkspace,
  setAssistants,
  setChatSessions,
  setCollections,
  setFiles,
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

export const handleAuthSubmit = createAsyncThunk(
  'auth/handleAuthSubmit',
  async (values, { dispatch, rejectWithValue }) => {
    const { username, password, email, isSignup } = values;
    try {
      const data = isSignup
        ? await authApi.signup(username, email, password)
        : await authApi.login(email || username, password);
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
        dispatch(setProfile(updatedUserData.profile));
        dispatch(setWorkspaces(updatedUserData.workspaces));
        dispatch(setActiveWorkspace(updatedUserData.workspaces[0]));
        dispatch(setChatSessions(updatedUserData.chatSessions));
        // dispatch(setActiveSession(updatedUserData.chatSessions[0]));
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
    const token = getState().user.accessToken;
    try {
      await authApi.logout(token);
      localStorage.clear();
      sessionStorage.clear();
      dispatch(setUser({}));
      dispatch(setUserToken(null));
      dispatch(setUserId(''));
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async action to fetch user profile image
export const fetchUserProfileImage = createAsyncThunk(
  'user/fetchUserProfileImage',
  async (username, { rejectWithValue }) => {
    try {
      const imagename = username ? 'avatar1' : 'avatar5';
      const imgWithExt = `${imagename}.png`;
      const response = await staticDataApi.getProfileImage(imgWithExt);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      return response;
    } catch (error) {
      console.error('Error fetching profile image:', error);
      return rejectWithValue(error.message);
    }
  }
);
// Fetch and update user-related data like workspaces, presets, prompts, etc.
export const fetchAndSetUserData = createAsyncThunk(
  'user/fetchAndSetUserData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem(LOCAL_NAME));

      if (!storedUserData) {
        throw new Error('No user data found in local storage');
      }

      // Fetch and set the profile image
      const { username } = storedUserData.user;
      let imageUrl = null;
      let imageRetrievalStatus = false;
      if (!storedUserData.user.profileImage) {
        const profileImageAction = await dispatch(
          fetchUserProfileImage(username)
        );
        imageUrl = profileImageAction.payload || avatar5;
        imageRetrievalStatus = true;
      }
      // Assuming userData has properties like presets, workspaces, prompts, etc.
      const {
        presets,
        workspaces,
        prompts,
        models,
        chatSessions,
        collections,
        files,
        assistants,
        tools,
      } = storedUserData.user;
      const updatedHomeWorkSpace = {
        ...workspaces.find(workspace => workspace.isHome === true),
        presets: presets,
        prompts: prompts,
        models: models,
        chatSessions: chatSessions,
        collections: collections,
        files: files,
        assistants: assistants,
        tools: tools,
        active: true,
      };
      dispatch(setWorkspaceId(updatedHomeWorkSpace._id));
      dispatch(setSessionId(updatedHomeWorkSpace.chatSessions[0]._id));
      dispatch(setHomeWorkSpace(updatedHomeWorkSpace));
      dispatch(setActiveWorkspace(updatedHomeWorkSpace));
      dispatch(setSelectedWorkspace(updatedHomeWorkSpace));
      dispatch(setChatSessions(chatSessions));
      dispatch(
        setSelectedChatSession(
          chatSessions.find(session => session.active === true)
        )
      );
      // dispatch
      // dispatch(
      //   setSessionId(chatSessions.find(session => session.active === true)._id)
      // );
      dispatch(setPresets(presets));
      dispatch(setSelectedPreset(presets[0]));
      dispatch(setWorkspaces(workspaces));
      dispatch(setPrompts(prompts));
      dispatch(setSelectedPrompt(prompts[0]));
      dispatch(setModels(models));
      dispatch(setCollections(collections));
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

export const userSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      const updatedUserInfo = { ...state.userInfo, ...action.payload };
      setLocalUserData({ ...state, userInfo: updatedUserInfo });
      state.userInfo = updatedUserInfo;
    },
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
      state.user = { ...user };
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
    setAuthTokens: (state, action) => {
      console.log('setAuthTokens', action.payload);
      const accessToken = action.payload;
      setLocalUserData({
        ...state,
        user: {
          ...state.user,
          authSession: {
            token: accessToken,
            tokenType: null,
            accessToken: accessToken,
            refreshToken: accessToken,
            expiresIn: null,
            expiresAt: null,
            createdAt: null,
          },
        },
      });
      sessionStorage.setItem('userToken', accessToken);
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', accessToken);
      sessionStorage.setItem('expiresIn', '1d');
      state.accessToken = accessToken;
      state.token = accessToken;
      state.refreshToken = accessToken;
      state.expiresIn = '1d';
      // state.authSession.accessToken = accessToken;
      // state.authSession.refreshToken = accessToken;
      // state.authSession.expiresIn = '1d';
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      sessionStorage.setItem('userId', action.payload);
      setLocalUserData({ ...state, userId: action.payload });
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.userInfo = {
        ...state.userInfo,
        profileImage: action.payload.profile.imagePath,
        isImageRetrieved: true,
      };
      setLocalUserData(action.payload);
    },
    setEnvKeyMap: (state, action) => {
      state.envKeyMap = action.payload;
    },
    setSelectedProfileImage: (state, action) => {
      state.selectedProfileImage = action.payload;
      setLocalUserData({ ...state, selectedProfileImage: action.payload });
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
    // builder.addCase(fetchUserProfileImage.fulfilled, (state, action) => {
    //   state.userInfo.profileImage = action.payload;
    //   state.profileImage = action.payload;
    //   state.userInfo.isImageRetrieved = true;
    //   setLocalUserData({
    //     ...state,
    //     userInfo: { ...state.userInfo, profileImage: action.payload },
    //   });
    // });
    builder
      .addCase(handleAuthSubmit.pending, state => {
        state.userRequest.isFetching = true;
        state.userRequest.status = 'pending';
      })
      .addCase(handleAuthSubmit.fulfilled, (state, action) => {
        console.log('Handle auth user data:', action.payload);
        state.userRequest.isFetching = false;
        state.userRequest.status = 'fulfilled';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(handleAuthSubmit.rejected, (state, action) => {
        state.userRequest.isFetching = false;
        state.userRequest.status = 'rejected';
        state.userRequest.error = action.payload;
      })
      .addCase(refreshAccessToken.pending, state => {
        state.userRequest.isFetching = true;
        state.userRequest.status = 'pending';
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.userRequest.isFetching = false;
        state.userRequest.status = 'fulfilled';
        state.token = action.payload;
      })
      .addCase(refreshAccessToken.rejected, state => {
        state.userRequest.isFetching = false;
        state.userRequest.status = 'rejected';
        localStorage.clear();
      })
      .addCase(logout.pending, state => {
        state.userRequest.isFetching = true;
        state.userRequest.status = 'pending';
      })
      .addCase(logout.fulfilled, state => {
        state.userRequest.isFetching = false;
        state.userRequest.status = 'fulfilled';
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.userRequest.isFetching = false;
        state.userRequest.status = 'rejected';
        state.userRequest.error = action.payload;
      })
      .addCase(fetchAndSetUserData.fulfilled, (state, action) => {
        console.log('Fetched and set user data:', action.payload);
        const {
          workspaces,
          presets,
          prompts,
          models,
          chatSessions,
          collections,
          files,
          assistants,
          tools,
        } = action.payload;
        // state.userInfo.chat.workspaces = workspaces;
        // state.userInfo.chat.presets = presets;
        // state.userInfo.chat.prompts = prompts;
        // state.userInfo.chat.models = models;
        // state.userInfo.chat.chatSessions = chatSessions;
        // state.userInfo.chat.collections = collections;
        // state.userInfo.chat.files = files;
        // state.userInfo.chat.assistants = assistants;
        // state.userInfo.chat.tools = tools;
        // setLocalUserData({
        //  ...state,
        //   user: {
        //    ...state.user,
        //    ...action.payload,
        //   },
        // });
      })
      .addCase(fetchAndSetUserData.rejected, (state, action) => {
        console.error('Failed to fetch and set user data:', action.payload);
      });
  },
});

export const {
  updateUserInfo,
  resetUserInfo,
  setUser,
  setUserToken,
  setUserId,
  setAuthTokens,
  setIsAuthenticated,
  setUserOpenAiSettings,
  setIsRedirectToSignin,
  setProfile,
  setSelectedProfileImage,
  setEnvKeyMap,
} = userSlice.actions;

export default userSlice.reducer;
// window.addEventListener('storage', () => {
//   const store = require('../store').default;
//   store.dispatch(updateAuthStateFromLocalStorage());
// });
// function defaultSetting() {
//   return {
//     user: {},
//     userId: null,
//     token: null,
//     accessToken: null,
//     refreshToken: null,
//     expiresIn: null,
//     expiresAt: null,
//     createdAt: null,
//     isAuthenticated: false,
//     profileImage: avatar5, // Add default profile image to state
//     userInfo: {
// name: '',
// email: '',
// profileImage: avatar5, // Add default profile image to state
// isImageRetrieved: false,
//       chat: {
//         chatSessions: [],
//         assistants: [],
//         chatHistory: [],
//         workspaces: [],
//         presets: [],
//         prompts: [],
//         models: [],
//         collections: [],
//         files: [],
//         tools: [],
//       },
//     },
//     authSession: {
//       token: '',
//       tokenType: '',
//       accessToken: '',
//       refreshToken: '',
//       expiresIn: '',
//       expiresAt: '',
//       createdAt: '',
//     },
//     openAiSettings: {},
//   };
// }
// function getLocalState() {
//   const localSetting = JSON.parse(localStorage.getItem(LOCAL_NAME) || '{}');
//   return { ...defaultSetting(), ...localSetting };
// }
// const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);
