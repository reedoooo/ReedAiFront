import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const RCSliderRoot = styled(Slider)(({ theme, ownerState }) => {
  const { variant, disabled } = ownerState;

  const baseStyles = {
    width: '100%',
    // '& .MuiSlider-active, & .Mui-focusVisible': {
    //   boxShadow: 'none !important',
    // },

    // '& .MuiSlider-valueLabel': {
    //   color: '#000000',
    // },
  };

  const standardStyles = {
    color: '#ffffff',
    '& .MuiSlider-thumb': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    '& .MuiSlider-track': {
      color: '#18b984', // Slider button color
      opacity: 0.75,
    },
  };

  const darkModeStyles = {
    color: '#ffffff',
    '& .MuiSlider-root': {
      color: '#ffffff',
    },
    '& .MuiSlider-thumb': {
      color: '#ffffff',
    },
    '& .MuiSlider-track': {
      // color: '#ffffff',
      color: '#18b984', // Slider button color
    },
    '& .MuiSlider-rail': {
      color: '#ffffff',
    },
  };

  const prettoStyles = {
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&::before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&::before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  };

  return {
    ...baseStyles,
    ...(variant === 'default' && standardStyles),
    ...(variant === 'darkMode' && darkModeStyles),
  };
});

export default RCSliderRoot;
