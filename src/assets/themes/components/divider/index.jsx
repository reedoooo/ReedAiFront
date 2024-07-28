import { colors } from 'assets/themes/base';
import { pxToRem, rgba } from 'assets/themes/functions';

const { dark, transparent, white } = colors;

export default {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to right, ${rgba(dark.main, 0)}, ${rgba(dark.main, 0.4)}, ${rgba(dark.main, 0)}) !important`,
      height: pxToRem(1),
      margin: `${pxToRem(16)} 0`,
      borderBottom: 'none',
      opacity: 0.25,
    },
    vertical: {
      backgroundImage: `linear-gradient(to bottom, ${rgba(dark.main, 0)}, ${rgba(dark.main, 0.4)}, ${rgba(dark.main, 0)}) !important`,
      width: pxToRem(1),
      height: '100%',
      margin: `0 ${pxToRem(16)}`,
      borderRight: 'none',
    },
    light: {
      backgroundImage: `linear-gradient(to right, ${rgba(white.main, 0)}, ${white.main}, ${rgba(white.main, 0)}) !important`,
      '&.MuiDivider-vertical': {
        backgroundImage: `linear-gradient(to bottom, ${rgba(white.main, 0)}, ${white.main}, ${rgba(white.main, 0)}) !important`,
      },
    },
  },
};
