// const link = {
//   // defaultProps: {
//   //   underline: 'none',
//   //   color: 'inherit',
//   // },

//   styleOverrides: {
//     root: {
//       cursor: 'pointer',
//     },
//   },
// };

export default {
  styleOverrides: {
    root: {
      cursor: 'pointer',
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
};
