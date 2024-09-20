import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chatApi } from 'api/Ai/chat-sessions';
import { getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'baseChatStore';
const REDUX_NAME = 'baseChat';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalBaseChatData(data) {
  setLocalData(LOCAL_NAME, data);
}

// Create a variable to store the last fetch timestamp
let lastFetchTime = 0;
const FETCH_INTERVAL = 30000; // 30 seconds

export const syncChatMessages = createAsyncThunk(
  `${REDUX_NAME}/session/messages`,
  async (_, { dispatch, getState }) => {
    const sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) return;

    const currentTime = Date.now();
    // Only fetch if it's been more than 30 seconds since the last fetch
    if (currentTime - lastFetchTime < FETCH_INTERVAL) {
      console.log('Skipping fetch, too soon since last fetch');
      return;
    }

    lastFetchTime = currentTime; // Update the last fetch time
    const response = await chatApi.getChatSessionMessages(sessionId);

    const state = getState();
    // Check if the messages have changed to avoid unnecessary dispatch
    if (
      JSON.stringify(state.baseChat.chatMessages) !==
      JSON.stringify(response.messages)
    ) {
      dispatch(baseChatSlice.actions.setChatMessages(response.messages));
    }

    return response;
  }
);

export const baseChatSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setLoading: state => {
      state.baseChatRequest = { status: 'loading', error: null };
    },
    setError: (state, action) => {
      state.baseChatRequest = {
        status: 'failed',
        error: action.payload,
        message: action.payload.message || 'An error occurred',
      };
    },
    setChatRequestData: (state, action) => {
      state.baseChatRequest = {
        status: 'succeeded',
        success: action.payload,
        message: action.payload.message || 'Chat request successful',
      };
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
      setLocalBaseChatData({ ...state, userInput: action.payload });
    },
    setIsStreaming: (state, action) => {
      state.isStreaming = action.payload;
    },
    setStreamingMessageIndex: (state, action) => {
      state.streamingMessageIndex = action.payload;
    },
    setBooleanState: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setIsDisabled: (state, action) => {
      state.isDisabled = action.payload;
    },
    setFirstTokenReceived: (state, action) => {
      state.firstTokenReceived = action.payload;
    },
    setFirstMessageReceived: (state, action) => {
      state.isFirstMessageReceived = action.payload;
    },
    setAbortController: (state, action) => {
      state.abortController = action.payload;
    },
    setIsMessagesUpdated: (state, action) => {
      state.isMessagesUpdated = action.payload;
    },
    // -- secondary commands --
    setIsPromptPickerOpen: (state, action) => {
      state.isPromptPickerOpen = action.payload;
    },
    setSlashCommand: (state, action) => {
      state.slashCommand = action.payload;
    },
    setIsFilePickerOpen: (state, action) => {
      state.isFilePickerOpen = action.payload;
    },
    setHashtagCommand: (state, action) => {
      state.hashtagCommand = action.payload;
    },
    setIsToolPickerOpen: (state, action) => {
      state.isToolPickerOpen = action.payload;
    },
    setToolCommand: (state, action) => {
      state.toolCommand = action.payload;
    },
    setFocusPrompt: (state, action) => {
      state.focusPrompt = action.payload;
    },
    setFocusFile: (state, action) => {
      state.focusFile = action.payload;
    },
    setFocusTool: (state, action) => {
      state.focusTool = action.payload;
    },
    setFocusAssistant: (state, action) => {
      state.focusAssistant = action.payload;
    },
    setAtCommand: (state, action) => {
      state.atCommand = action.payload;
    },
    setIsAssistantPickerOpen: (state, action) => {
      state.isAssistantPickerOpen = action.payload;
    },
    setUseRetrieval: (state, action) => {
      state.useRetrieval = action.payload;
    },
    setSourceCount: (state, action) => {
      state.sourceCount = action.payload;
    },
  },
});

export const {
  setMode,
  setLoading,
  setError,
  setChatRequestData,
  setIsDisabled,
  setUserInput,
  setStreamingMessageIndex,
  setIsStreaming,
  setAbortController,
  // -- secondary commands --
  setIsPromptPickerOpen,
  setSlashCommand,
  setIsFilePickerOpen,
  setHashtagCommand,
  setIsToolPickerOpen,
  setToolCommand,
  setFocusPrompt,
  setFocusFile,
  setFocusTool,
  setFocusAssistant,
  setAtCommand,
  setIsAssistantPickerOpen,
  setFirstTokenReceived,
  setIsMessagesUpdated,
  setFirstMessageReceived,
  setUseRetrieval,
  setSourceCount,
} = baseChatSlice.actions;

export default baseChatSlice.reducer;
