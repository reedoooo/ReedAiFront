import { typography, colors } from 'assets/themes/base';

const { size } = typography;
const { black } = colors;
export default {
  styleOverrides: {
    root: {
      fontSize: size.md,
      textAlign: 'center',
      '&.MuiRCInputBase': {
        backgroundColor: black.generic,
        color: '#fff',
        borderColor: 'grey',
        // ADD LABEL STYLES
        '&.MuiInputLabel-shrink': {
          lineHeight: 1.5,
          fontSize: size.md,
          '&.MuiInputBase-root.MuiOutlinedInput-notchedOutline legend': {
            fontSize: '0.85em',
          },
        },
        // border: '1px solid var(--border-input)',
        // backgroundColor: 'var(--bg-background)',
        // padding: '10px 14px',
        // fontSize: '14px',
        // borderRadius: '4px',
        // '&:focus-visible': {
        //   outline: 'none',
        //   ringOffset: '2px',
        // },
        // '&::placeholder': {
        //   color: 'var(--placeholder-text-muted-foreground)',
        // },
        // '&.Mui-disabled': {
        //   cursor: 'not-allowed',
        //   opacity: '0.5',
        // },
        // '& .MuiFileInput': {
        //   border: 0,
        //   backgroundColor: 'transparent',
        //   fontSize: '14px',
        //   fontWeight: '500',
        // },
      },
    },
  },
};
