// RCSpeedDialRoot.js
import SpeedDial from '@mui/material/SpeedDial';
import { styled } from '@mui/material/styles';

export const RCSpeedDialRoot = styled(SpeedDial)(({ theme, ownerState }) => {
  const { variant, disabled } = ownerState;

  const baseStyles = {
    position: 'fixed',
    bottom: 100,
    right: 16,
  };

  const standardStyles = {
    '& .MuiSpeedDial-fab': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  };

  const darkModeStyles = {
    '& .MuiSpeedDial-fab': {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.grey[900],
      },
    },
  };

  return {
    ...baseStyles,
    ...(variant === 'default' && standardStyles),
    ...(variant === 'darkMode' && darkModeStyles),
    ...(disabled && {
      '& .MuiSpeedDial-fab': {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
      },
    }),
  };
});

export default RCSpeedDialRoot;
