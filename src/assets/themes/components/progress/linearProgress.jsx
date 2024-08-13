import { pxToRem } from '../../functions';

const light = {
  main: '#f0f0f0',
};

const borderRadius = {
  sm: '4px',
  md: '8px',
};

export default {
  styleOverrides: {
    root: {
      height: pxToRem(6),
      borderRadius: borderRadius.md,
      overflow: 'visible',
      position: 'relative',
    },
    colorPrimary: {
      backgroundColor: light.main,
    },
    colorSecondary: {
      backgroundColor: light.main,
    },
    bar: {
      borderRadius: borderRadius.sm,
      position: 'absolute',
      transform: 'translate(0, 0) !important',
      transition: 'width 0.6s ease !important',
    },
  },
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        root: {
          backgroundColor: light.main,
        },
        bar: {
          backgroundColor: '#18b984',
        },
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        root: {
          backgroundColor: light.main,
        },
        bar: {
          backgroundColor: '#94e2cd',
        },
      },
    },
    {
      props: { variant: 'table' },
      style: {
        root: {
          backgroundColor: light.main,
        },
        bar: {
          backgroundColor: '#18b984',
        },
      },
    },
  ],
};
