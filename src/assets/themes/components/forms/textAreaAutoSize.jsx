import { colors, typography } from 'assets/themes/base';

const { transparent } = colors;

export default {
  variants: [
    {
      props: { variant: 'darkMode' },
      style: {
        width: '100%',
        margin: '10px 0',
        resize: 'none',
        background: '#000',
        color: '#fff',
        flex: '1 1 auto',
        padding: '16.5px 14px', // Matches TextField padding
        borderRadius: '4px',
        borderColor: 'grey',
        border: '1px solid transparent', // Start with transparent border
        outline: '1px solid grey', // Add outline to mimic TextField
        fontSize: typography.size.sm,
        '& .MuiInputUnderline:after': {
          borderBottomColor: 'grey',
        },
        '& .MuiInputBaseInput': {
          color: '#fff',
          background: '#000',
        },
        '&:focus-visible': {
          outline: `2px solid #18b984`,
        },
        '&::placeholder': {
          color: colors.text.disabled,
        },
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.5,
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
