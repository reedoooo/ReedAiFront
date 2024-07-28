import { borders, boxShadows, colors } from 'assets/themes/base';
import { rgba } from 'assets/themes/functions';
const { black } = colors;
const { borderWidth, borderRadius } = borders;
const { md } = boxShadows;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  styleOverrides: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      minWidth: 0,
      wordWrap: 'break-word',
      backgroundImage: 'none',
      backgroundClip: 'border-box',
      border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
      borderRadius: borderRadius.xl,
      boxShadow: md,
      overflow: 'visible',
    },
  },
};
