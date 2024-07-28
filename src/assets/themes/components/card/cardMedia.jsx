import { borders } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
    },
    media: {
      width: 'auto',
    },
  },
};
