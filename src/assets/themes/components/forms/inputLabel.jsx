import { colors, typography } from 'assets/themes/base';

const { text, info } = colors;
const { size } = typography;

export default {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      color: text.main,
      lineHeight: 0.9,
      '&.Mui-focused': {
        color: info.main,
      },
      '&.MuiInputLabel-shrink': {
        lineHeight: 1.5,
        fontSize: size.md,
        '~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend': {
          fontSize: '0.85em',
        },
      },
    },
    sizeSmall: {
      fontSize: size.xs,
      lineHeight: 1.625,
    },
    sizeMedium: {
      fontSize: size.sm,
      lineHeight: 1.6,
    },
  },
};
