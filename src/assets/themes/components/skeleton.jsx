import Fade from '@mui/material/Fade';
import { borders, colors, typography } from '../base';
import { pxToRem } from '../functions';

const { black, light, grey, blue, red, green } = colors;
const { size, fontWeightRegular } = typography;
const { borderRadius } = borders;

export default {
  defaultProps: {
    arrow: true,
    TransitionComponent: Fade,
  },
  styleOverrides: {
    root: {
      maxWidth: pxToRem(200),
      backgroundColor: black.main,
      color: light.main,
      fontSize: size.sm,
      fontWeight: fontWeightRegular,
      textAlign: 'center',
      borderRadius: borderRadius.md,
      opacity: 0.7,
      padding: `${pxToRem(5)} ${pxToRem(8)} ${pxToRem(4)}`,
    },
  },
  variants: [
    {
      props: { variant: 'text' },
      style: {
        root: {
          backgroundColor: grey[200],
          height: pxToRem(20),
          marginBottom: pxToRem(8),
        },
      },
    },
    {
      props: { variant: 'circular' },
      style: {
        root: {
          backgroundColor: blue[200],
          width: pxToRem(40),
          height: pxToRem(40),
          borderRadius: '50%',
        },
      },
    },
    {
      props: { variant: 'rectangular' },
      style: {
        root: {
          backgroundColor: red[200],
          width: '100%',
          height: pxToRem(150),
        },
      },
    },
    {
      props: { variant: 'rounded' },
      style: {
        root: {
          backgroundColor: green[200],
          borderRadius: borderRadius.lg,
          height: pxToRem(100),
        },
      },
    },
    {
      props: { variant: 'bar' },
      style: {
        root: {
          backgroundColor: grey[400],
          height: pxToRem(10),
          borderRadius: borderRadius.sm,
        },
      },
    },
  ],
};
