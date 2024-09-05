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
      color: '#18b984',
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
