import { pxToRem } from 'assets/themes/functions';

export default {
  // defaultProps: {
  //   baseClassName: 'material-icons-round',
  //   fontSize: 'inherit',
  // },
  styleOverrides: {
    fontSizeInherit: {
      fontSize: 'inherit !important',
    },
    fontSizeSmall: {
      fontSize: `${pxToRem(20)} !important`,
    },
    fontSizeLarge: {
      fontSize: `${pxToRem(36)} !important`,
    },
  },
};
