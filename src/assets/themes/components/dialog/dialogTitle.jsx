import { typography } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { size } = typography;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.xl,
    },
  },
};
