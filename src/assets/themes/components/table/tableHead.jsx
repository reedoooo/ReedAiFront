import { borders, boxShadows, colors, typography } from 'assets/themes/base';
import { rgba, pxToRem } from 'assets/themes/functions';

const { borderRadius } = borders;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      display: 'block',
      padding: `${pxToRem(16)} ${pxToRem(16)} 0  ${pxToRem(16)}`,
      borderRadius: `${borderRadius.xl} ${borderRadius.xl} 0 0`,
    },
  },
};
