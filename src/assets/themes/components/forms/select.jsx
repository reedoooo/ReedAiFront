import { colors } from 'assets/themes/base';

const { transparent } = colors;

export default {
  variants: [
    {
      props: { variant: 'darkMode' },
      style: {
        color: '#ffffff',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ffffff',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ffffff',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ffffff',
        },
      },
    },
    // Additional custom variants can be defined here
  ],
  styleOverrides: {
    root: {
      p: 2,
    },
  },
};
