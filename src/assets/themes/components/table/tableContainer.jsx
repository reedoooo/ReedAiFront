import { borders, boxShadows, colors, typography } from 'assets/themes/base';
import { rgba, pxToRem } from 'assets/themes/functions';

const { md } = boxShadows;
const { borderRadius } = borders;
const { white } = colors;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      boxShadow: md,
      borderRadius: borderRadius.xl,
    },
  },
};
