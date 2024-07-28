import { colors, typography } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { text, success, grey } = colors;
const { size } = typography;

export default {
  base: {
    backgroundColor: grey.default,
    minHeight: pxToRem(40),
    color: text.main,
    padding: `${pxToRem(10)} ${pxToRem(24)}`,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: pxToRem(4),
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: success.focus,
    },
    '&:active, &:active:focus, &:active:hover': {
      opacity: 0.85,
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
  medium: {
    minHeight: pxToRem(40),
    padding: `${pxToRem(10)} ${pxToRem(24)}`,
    fontSize: size.sm,
    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(16)} !important`,
    },
  },
  large: {
    minHeight: pxToRem(47),
    padding: `${pxToRem(12)} ${pxToRem(28)}`,
    fontSize: size.lg,
    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(22)} !important`,
    },
  },
  primary: {
    backgroundColor: grey.dark,
    '&:focus:not(:hover)': {
      backgroundColor: grey.light,
    },
  },
  secondary: {
    backgroundColor: grey.light,
    '&:focus:not(:hover)': {
      backgroundColor: grey.lightest,
    },
  },
};
