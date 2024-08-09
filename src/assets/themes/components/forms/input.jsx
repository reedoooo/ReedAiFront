import { alpha } from '@mui/material/styles';
import { borders, colors, typography } from 'assets/themes/base';

const { info, action, dark, text } = colors;
const { borderWidth } = borders;
const { size } = typography;

export default {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      color: text.main,
      bg: alpha(action.dark.hover, 0.15),
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: `${borderWidth[1]} solid ${alpha(action.dark.hover, 0.15)}`,
      },
      '&:before': {
        borderColor: alpha(action.dark.hover, 0.15),
      },
      // '&:after': {
      //   borderColor: info.main,
      // },
    },
    // input: {
    //   color: dark.main,
    //   '&::placeholder': {
    //     color: text.main,
    //   },
    // },
  },
};
