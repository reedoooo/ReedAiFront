import { logApiRequest } from "store/Slices";

export const apiLoggerMiddleware = (store) => (next) => async (action) => {
  if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
    const { payload, error, meta } = action;
    const logEntry = {
      method: meta.arg.method,
      url: meta.arg.url,
      status: action.type.endsWith('/fulfilled') ? 'success' : 'error',
      message: error ? error.message : 'Request successful',
      error: error ? error.message : null,
    };
    store.dispatch(logApiRequest(logEntry));
  }
  return next(action);
};

export default apiLoggerMiddleware;