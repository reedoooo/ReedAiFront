import { colors, typography } from 'assets/themes/base';

const { size } = typography;
const { text } = colors;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};
