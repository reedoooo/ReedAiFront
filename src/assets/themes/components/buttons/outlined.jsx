import { borders, colors, typography } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { transparent, light, info, success, primary, secondary, error } = colors;
const { size, fontWeightRegular } = typography;
const { borderWidth } = borders;

export default {
  base: {
    minHeight: pxToRem(40),
    borderColor: light.main,
    borderWidth: borderWidth[2],
    padding: `${pxToRem(10)} ${pxToRem(24)}`,
    '&:hover': {
      opacity: 0.75,
      backgroundColor: transparent.main,
    },
    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(16)} !important`,
    },
    '& .MuiButton-label': {
      fontWeight: fontWeightRegular,
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
    backgroundColor: transparent.main,
    borderColor: primary.dark.main,
  },
  secondary: {
    borderColor: secondary.dark.main,
  },
  error: {
    borderColor: error.main,
  },
  info: {
    borderColor: info.main,
  },
  success: {
    borderColor: success.main,
  },
};
