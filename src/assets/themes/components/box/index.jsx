import root from './root';
import card from './variants/card';
import dashboard from './variants/dashboard';
import flexBetween from './variants/flexBetween';
import outlined from './variants/outlined';
import paper from './variants/paper';

export default {
  styleOverrides: {
    root: {
      ...root,
    },
  },
  variants: [card, paper, dashboard, flexBetween, outlined],
};
