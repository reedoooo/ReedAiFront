import { alpha } from '@mui/material/styles';
import { borders, colors, typography } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { fontWeightRegular, size } = typography;
const { borderRadius } = borders;
const { text } = colors;

export default {
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: size.sm,
    fontWeight: fontWeightRegular,
    borderRadius: borderRadius.lg,
    padding: `${pxToRem(6.302)} ${pxToRem(16.604)}`,
    lineHeight: 1.4,
    textAlign: 'center',
    textTransform: 'uppercase',
    userSelect: 'none',
    backgroundSize: '150% !important',
    backgroundPositionX: '25% !important',
    transition: 'all 150ms ease-in',
    '&:hover': {
      // backgroundColor: '#3da58a',
      backgroundColor: `${alpha('#3da58a', 0.25)} 0 0 0 0.25rem !important`,
      color: '#fff',
    },
    '@media (max-width:600px)': {
      fontSize: '0.875rem',
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.65,
    },
    '& .material-icons': {
      fontSize: pxToRem(15),
      marginTop: pxToRem(-2),
    },
  },
};
