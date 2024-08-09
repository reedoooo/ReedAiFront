import { alpha } from '@mui/material/styles';
import { borders, colors, typography } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { info, grey, background, action, black } = colors;
const { borderRadius } = borders;
const { size } = typography;

export default {
  styleOverrides: {
    root: {
      borderColor: '#808080',
      borderWidth: '1px',
      '&:hover': {
        borderColor: action.dark.disabled,
        borderWidth: '3px',
        boxShadow: `${alpha(action.dark.hover, 0.25)} 0 0 0 0.2rem !important`,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3d3d3d',
        // boxShadow: `${alpha(info.main, 0.25)} 0 0 0 0.2rem !important`,
      },
    },
    inputSizeSmall: {
      fontSize: size.xs,
      padding: pxToRem(10),
    },
    multiline: {
      color: grey[700],
      padding: 0,
    },
  },
};
