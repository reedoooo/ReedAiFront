import { typography, colors, borders } from 'assets/themes/base';

const { size } = typography;
const { black } = colors;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      textAlign: 'center',
      '&.MuiRCInputBase': {
        // backgroundColor: black.generic,
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
    searchbar: {
      width: '100%',
      minWidth: 0,
      // outline: 'transparent solid 2px',
      outlineOffset: '2px',
      position: 'relative',
      appearance: 'none',
      transitionProperty: 'all',
      transitionDuration: '0.2s',
      fontWeight: 500,
      borderRadius: '30px',
      fontSize: '0.875rem',
      paddingLeft: '2.5rem', // padding-inline-start
      paddingRight: '1rem', // padding-inline-end
      height: '2.5rem',
      border: 'none',
      paddingTop: '11px',
      paddingBottom: '11px',
      background: '#E2E8F0', // Equivalent to chakra-colors-secondaryGray-300
      color: '#4A5568', // Equivalent to chakra-colors-gray-700
      '&::placeholder': {
        color: '#A0AEC0', // Equivalent to chakra-colors-gray-500
      },
      '&:hover': {
        borderColor: 'transparent',
      },
      '&:focus': {
        borderColor: 'transparent',
        boxShadow: 'none',
      },
      '&.MuiInputLabel-shrink': {
        lineHeight: 1.5,
        fontSize: size.md,
        '&.MuiInputBase-root.MuiOutlinedInput-notchedOutline legend': {
          fontSize: '0.85em',
        },
      },
    },
  },
};
