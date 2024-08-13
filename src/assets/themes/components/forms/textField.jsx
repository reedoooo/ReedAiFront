export default {
  styleOverrides: {
    root: {
      p: 2,
    },
  },
  variants: [
    {
      props: { variant: 'darkMode' },
      style: {
        margin: '10px 0',
        color: '#3d3d3d',
        '& label': { display: 'none' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            color: '#fff',
            borderColor: 'grey',
            transition: 'border-color 0.2s',
          },
          '&:hover fieldset': { borderColor: '#fff' },
          '&.Mui-focused fieldset': { borderColor: '#18b984' },
          '&.Mui-focused': { color: '#fff' },
        },
        '& .MuiInputBase-input': {
          color: '#fff',
          background: '#000',
          '&.Mui-focused': { color: '#fff' },
        },
        '& .MuiInputBase-multiline': {
          padding: '1rem 1rem',
        },
        '& .MuiInputUnderline:after': { borderBottomColor: 'grey' },
      },
    },
    // Additional custom variants can be defined here
  ],
};
