import { borders, colors } from 'assets/themes/base';

const { borderRadius } = borders;
const { primary } = colors;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      transition: 'all 200ms ease-in-out',
      color: primary.dark,
      background: primary.lighter,
    },
    rounded: {
      borderRadius: borderRadius.lg,
    },
    img: {
      height: 'auto',
    },
  },
};
