import { createSlice } from '@reduxjs/toolkit';
import { getLocalData, setLocalData } from '../helpers';

const LOCAL_NAME = 'modelStore';
const REDUX_NAME = 'models';

const initialState = getLocalData(LOCAL_NAME, REDUX_NAME);

function setLocalModelData(data) {
  setLocalData(LOCAL_NAME, data);
}

export const modelSlice = createSlice({
  name: REDUX_NAME,
  initialState,
  reducers: {
    setModels: (state, action) => {
      console.log('Setting models:', action.payload);
      state.models = action.payload;
      setLocalModelData({ ...state, models: action.payload });
    },
    setSelectedModel: (state, action) => {
      state.selectedModel = action.payload;
      setLocalModelData({ ...state, selectedModel: action.payload });
    },
    setAvailableHostedModels: (state, action) => {
      state.availableHostedModels = action.payload;
      setLocalModelData({ ...state, availableHostedModels: action.payload });
    },
    setAvailableLocalModels: (state, action) => {
      state.availableLocalModels = action.payload;
      setLocalModelData({ ...state, availableLocalModels: action.payload });
    },
    setAvailableOpenRouterModels: (state, action) => {
      state.availableOpenRouterModels = action.payload;
      setLocalModelData({
        ...state,
        availableOpenRouterModels: action.payload,
      });
    },
  },
});

export { initialState as modelInitialState };

export const {
  setModels,
  setSelectedModel,
  setAvailableHostedModels,
  setAvailableLocalModels,
  setAvailableOpenRouterModels,
} = modelSlice.actions;

export default modelSlice.reducer;
// const initialState = {
//   models: [],
//   modelNames: [
//     'gpt-3.5-turbo',
//     'gpt-3.5-turbo-16k',
//     'gpt-4',
//     'gpt-4-1106-preview',
//     'gpt-4-32k',
//     'gpt-4-8k',
//     'gpt-4-vision-preview',
//     'gpt-4o',
//     'gpt-4o-0301',
//     'gpt-4o-0314',
//     'gpt-4o-0315',
//     'gpt-4o-0316',
//     'llama-3.1-sonar-small-128k-online',
//     'llama-3.1-sonar-small-128k-chat',
//     'llama-3.1-sonar-large-128k-online',
//     'llama-3.1-sonar-large-128k-chat',
//     'llama-3.1-8b-instruct',
//     'llama-3.1-70b-instruct',
//     'mixtral-8x7b-instruct',
//   ],
//   selectedModel: null,
//   availableHostedModels: [],
//   availableLocalModels: [],
//   availableOpenRouterModels: [],
// };
