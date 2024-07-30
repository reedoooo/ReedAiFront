import { colors, typography } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { text, success, secondary, transparent } = colors;
const { size } = typography;

export default {
  base: {
    backgroundColor: transparent.main,
    minHeight: pxToRem(40),
    color: text.main,
    boxShadow: 'none',
    padding: `${pxToRem(10)} ${pxToRem(24)}`,
    '&:hover': {
      backgroundColor: transparent.main,
      boxShadow: 'none',
    },
    '&:focus': {
      backgroundColor: transparent.main,
      boxShadow: 'none',
    },
    '&:active, &:active:focus, &:active:hover': {
      opacity: 0.85,
    },
    '&:disabled': {
      color: text.disabled,
    },
    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(16)} !important`,
    },
  },
  small: {
    minHeight: pxToRem(32),
    padding: `${pxToRem(6)} ${pxToRem(16)}`,
    fontSize: size.xs,
    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(12)} !important`,
    },
  },
  large: {
    minHeight: pxToRem(47),
    padding: `${pxToRem(12)} ${pxToRem(28)}`,
    fontSize: size.sm,
    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(22)} !important`,
    },
  },
  primary: {
    color: success.main,
    '&:focus:not(:hover)': {
      color: success.focus,
    },
  },
  secondary: {
    color: secondary.main,
    '&:focus:not(:hover)': {
      color: secondary.focus,
    },
  },
};
