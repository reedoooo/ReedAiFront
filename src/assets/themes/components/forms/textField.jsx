import { colors } from 'assets/themes/base';

const { transparent } = colors;

export default {
  styleOverrides: {
    root: {
      p: 2,
    },
    input: {
      '&::placeholder': {
        color: transparent.main,
      },
    },
  },
};
