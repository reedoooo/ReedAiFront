import { configureStore } from '@reduxjs/toolkit';
import localforage from 'localforage';
import logger from 'redux-logger';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import rootReducer from './Slices';
offlineConfig.persistOptions = { storage: localforage }; // Configure IndexedDB storage

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(offline(offlineConfig)),
});
export const dispatch = store.dispatch;
export const setField = (field, value) => dispatch(setField({ field, value }));

export default store;
// import { api } from '../lib';
// import { offline } from 'redux-offline';
// import offlineConfig from 'redux-offline/lib/defaults';
// offlineConfig.persistOptions = { storage: localStorage };
// enhancers: [offline(offlineConfig)], // Enable offline functionality

// middleware: [createAsyncMiddleware(errorHandler), logger],
// enhancers: [
// reducer: {
//   rootReducer: rootReducer,
//   // [api.reducerPath]: api.reducer,
// },
// enhancers: () => [offline(offlineConfig)],
// getDefaultMiddleware().concat(
//   // api.middleware,
//   // apiLoggerMiddleware
//   logger,
//   // error => console.error('Error:', error)
//   createAsyncMiddleware({
//     errorHandler: errorHandlerMiddleWare,
//   })
// ),
// logger,
// const errorHandlerMiddleWare = error =>
//   console.error('Async action error:', error);
// // const apiLoggerMiddleware = store => next => async action => {
//   if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
//     const { payload, error, meta } = action;
//     const logEntry = {
//       method: meta.arg.method,
//       url: meta.arg.url,
//       status: action.type.endsWith('/fulfilled') ? 'success' : 'error',
//       message: error ? error.message : 'Request successful',
//       error: error ? error.message : null,
//     };
//     store.dispatch(logApiRequest(logEntry));
//   }
//   return next(action);
// };
// import { applyMiddleware, compose } from 'redux'
// import thunkMiddleware from 'redux-thunk'

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'
// import rootReducer from './reducers'

// export default function configureStore(preloadedState) {
//   const middlewares = [loggerMiddleware, thunkMiddleware]
//   const middlewareEnhancer = applyMiddleware(...middlewares)

//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
//   const composedEnhancers = compose(...enhancers)

//   const store = createStore(rootReducer, preloadedState, composedEnhancers)

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
//   }

//   return store
// }
// function logger({ getState }) {
//   return next => action => {
//     console.log('will dispatch', action);

//     // Call the next dispatch method in the middleware chain.
//     const returnValue = next(action);

//     console.log('state after dispatch', getState());

//     // This will likely be the action itself, unless
//     // a middleware further in chain changed it.
//     return returnValue;
//   };
// }
// devTools: process.env.NODE_ENV !== 'production',
// middleware: (getDefaultMiddleware) =>
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware().concat(
//       createAsyncMiddleware(errorHandler).concat(
//         api.middleware,
//         apiLoggerMiddleware
//       )
//     ),
// });
