// src/utils/reduxUtils.js

// import { createSelector } from 'reselect';

/**
 * Creates a standard action creator.
 * @param {string} type - The action type.
 * @returns {function} An action creator function.
 */
export const createAction = type => payload => ({
  type,
  payload,
});

/**
 * Creates an async action creator (thunk) with automatic loading, success, and error actions.
 * @param {string} type - The base action type.
 * @param {function} asyncFn - The async function to execute.
 * @returns {function} A thunk action creator.
 */
export const createAsyncAction = (type, asyncFn) => {
  const actionCreators = {
    pending: createAction(`${type}_REQUEST`),
    success: createAction(`${type}_SUCCESS`),
    failure: createAction(`${type}_FAILURE`),
  };

  return (...args) =>
    async dispatch => {
      dispatch(actionCreators.request());
      try {
        const result = await asyncFn(...args);
        dispatch(actionCreators.success(result));
        return result;
      } catch (error) {
        dispatch(actionCreators.failure(error));
        throw error;
      }
    };
};

/**
 * Creates a reducer function with a standard switch statement.
 * @param {Object} initialState - The initial state for the reducer.
 * @param {Object} handlers - An object mapping action types to handler functions.
 * @returns {function} A reducer function.
 */
export const createReducer =
  (initialState, handlers) =>
  (state = initialState, action) =>
    // eslint-disable-next-line no-prototype-builtins
    handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state;

/**
 * Creates a memoized selector using reselect.
 * @param {Array} inputSelectors - An array of input selectors.
 * @param {function} resultFunc - A function that computes the derived data.
 * @returns {function} A memoized selector.
 */
export const createMemoizedSelector = (inputSelectors, resultFunc) =>
  createSelector(inputSelectors, resultFunc);

/**
 * Combines multiple reducers into a single reducer function.
 * @param {Object} reducers - An object of reducer functions.
 * @returns {function} A single reducer function.
 */
export const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

/**
 * Creates a middleware for handling async actions with automatic error handling.
 * @param {function} errorHandler - A function to handle errors.
 * @returns {function} Redux middleware.
 */
export const createAsyncMiddleware =
  errorHandler =>
  ({ dispatch }) =>
  next =>
  action => {
    if (typeof action === 'function') {
      return action(dispatch).catch(errorHandler);
    }
    return next(action);
  };

/**
 * Utility function to normalize an array of objects by a given key.
 * @param {Array} array - The array to normalize.
 * @param {string} key - The key to use for normalization.
 * @returns {Object} An object with normalized data and an array of ids.
 */
export const normalizeArray = (array, key = 'id') => {
  return array.reduce(
    (acc, item) => {
      acc.byId[item[key]] = item;
      acc.allIds.push(item[key]);
      return acc;
    },
    { byId: {}, allIds: [] }
  );
};

/**
 * Creates a hook for selecting data from the Redux store with automatic memoization.
 * @param {function} selector - The selector function.
 * @param {Array} deps - An array of dependencies for memoization.
 * @returns {function} A custom hook for selecting data.
 */
export const createSelector = (selector, deps = []) => {
  return () => {
    const { useSelector } = require('react-redux');
    return useSelector(selector, deps);
  };
};
