import { borders, boxShadows } from 'assets/themes/base';

const { borderRadius } = borders;
const { xxl } = boxShadows;

export default {
  styleOverrides: {
    paper: {
      borderRadius: borderRadius.lg,
      boxShadow: xxl,
    },
    paperFullScreen: {
      borderRadius: 0,
    },
  },
};
