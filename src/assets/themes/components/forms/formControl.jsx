import { alpha } from '@mui/material/styles';
import { borders, colors, typography } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { grey, success, error, action } = colors;
const { borderRadius } = borders;
const { size } = typography;

export default {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      borderRadius: borderRadius.md,
      padding: pxToRem(2),
      margin: pxToRem(4),
      borderColor: '#808080',
      borderWidth: '3px',
      '&.success .MuiOutlinedInput-notchedOutline': {
        borderColor: success.main,
        borderWidth: '3px',
        boxShadow: `${alpha(success.main, 0.25)} 0 0 0 0.25rem !important`,
      },
      '&.error .MuiOutlinedInput-notchedOutline': {
        borderColor: error.main,
        borderWidth: '3px',
        boxShadow: `${alpha(error.main, 0.25)} 0 0 0 0.25rem !important`,
      },
    },
    // '& .MuiInputLabel-outlined': {
    //   color: grey[400],
    //   fontSize: size.sm,
    //   '&.Mui-focused': {
    //     color: grey[500],
    //     fontWeight: 'bold',
    //   },
    //   '&.MuiInputLabel-shrink': {
    //     transform: 'translate(14px, -6px) scale(0.75)',
    //   },
    // },
    input: {
      '&::placeholder': {
        color: grey[600],
      },
    },
    notchedOutline: {
      borderColor: action.dark.disabled,
      borderWidth: '2px',
      boxShadow: `${alpha(action.dark.disabled, 0.25)} 0 0 0 0.2rem !important`,
    },
  },
};
