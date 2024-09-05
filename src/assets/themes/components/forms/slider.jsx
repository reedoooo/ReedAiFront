import { colors } from 'assets/themes/base';

const { transparent } = colors;

export default {
  variants: [
    {
      props: { variant: 'darkMode' },
      style: {
        color: '#ffffff',
        '& .MuiSlider-thumb': {
          color: '#18b984', // Slider button color
        },
        '& .MuiSlider-track': {
          color: '#ffffff',
        },
        '& .MuiSlider-rail': {
          color: '#ffffff',
        },
      },
    },
    // Additional custom variants can be defined here
  ],
  styleOverrides: {
    root: {
      width: '100%',

      '& .MuiSlider-active, & .Mui-focusVisible': {
        boxShadow: 'none !important',
      },

      '& .MuiSlider-valueLabel': {
        color: '#000000',
      },
    },
  },
};
