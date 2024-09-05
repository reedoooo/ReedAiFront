import { borders, boxShadows, colors } from 'assets/themes/base';
import { linearGradient, pxToRem } from 'assets/themes/functions';

const { white, gradients, grey, transparent } = colors;
const { borderWidth } = borders;
const { md } = boxShadows;

export default {
  // defaultProps: {
  //   disableRipple: false,
  // },
  styleOverrides: {
    switchBase: {
      color: gradients.dark.main,
      // color: '#18b984 !important',
      '&:hover': {
        backgroundColor: transparent.main,
      },
      '&.Mui-checked': {
        color: gradients.dark.main,
        '&:hover': {
          backgroundColor: transparent.main,
        },
      },
      '& .MuiSwitch-thumb': {
        // color: '#18b984 !important',
        borderColor: `${gradients.dark.main} !important`,
      },
      '& + .MuiSwitch-track': {
        backgroundColor: `${gradients.dark.main} !important`,
        opacity: 1,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: '0.3 !important',
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        backgroundImage: linearGradient(
          gradients.info.main,
          gradients.info.state
        ),
      },
    },
    thumb: {
      backgroundColor: white.main,
      boxShadow: md,
      border: `${borderWidth[1]} solid ${grey[400]}`,
    },
    track: {
      width: pxToRem(32),
      height: pxToRem(15),
      backgroundColor: grey[400],
      opacity: 1,
    },
    checked: {},
  },

  variants: [
    {
      props: { variant: 'darkMode' },
      style: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: '#18b984 !important', // Ensure the thumb color is green when checked
          '&:hover': {
            backgroundColor: 'rgba(24, 185, 132, 0.08) !important', // Hover effect when checked
          },
        },
        '& .MuiSwitch-switchBase': {
          color: '#18b984 !important',
          '& .MuiSwitch-thumb': {
            color: '#18b984 !important',
            backgroundColor: '#18b984 !important',
          },
          '&:hover': {
            backgroundColor: 'rgba(24, 185, 132, 0.08)', // Hover effect when unchecked
          },
          '&.Mui-checked': {
            color: '#18b984 !important', // Ensure the thumb color is green when checked
            '&:hover': {
              backgroundColor: 'rgba(24, 185, 132, 0.08)', // Hover effect when checked
            },
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#ffffff !important', // Ensure the track color remains white
          },
        },
        '& .MuiSwitch-track': {
          backgroundColor: '#ffffff !important', // Ensure the track color remains white
          opacity: 1, // Ensure track color is visible
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          color: '#18b984 !important',
          backgroundColor: '#ffffff !important', // Track color when checked
        },
        '& .MuiSwitch-thumb': {
          color: '#18b984 !important',
        },
      },
    },
  ],
};
