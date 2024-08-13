// createLogger to create custom logger
import { createLogger } from 'redux-logger';

// Custom logger
const logger = createLogger({
  // to collapse certain type of log action e.x., DONATE
  collapsed: (getState, action) => action.type === 'DONATE',

  // to log only certain type of action
  predicate: (getState, action) => action.type === 'CREDIT',

  // to show the difference between what changed in state
  diff: true,

  // to log time
  duration: true,
  timestamp: true,

  // custom colors for each log
  colors: {
    title: () => '#0f1842',
    prevState: () => '#de6f0d',
    action: () => '#6e13ab',
    nextState: () => '#1a9134',
  },

  // instead of colors - use cosole type
  level: console.warn,
});
