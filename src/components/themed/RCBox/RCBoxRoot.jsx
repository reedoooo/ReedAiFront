import { Box, styled } from '@mui/material';

const RCBoxRoot = styled(Box)(({ theme, ownerState }) => {
  const { palette, functions, borders, boxShadows } = theme;
  const {
    variant,
    bgColor,
    color,
    opacity,
    borderRadius,
    shadow,
    coloredShadow,
  } = ownerState;
  const { gradients, grey, white } = palette;
  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  const { colored } = boxShadows;
  const greyColors = {
    'grey-100': grey[100],
    'grey-200': grey[200],
    'grey-300': grey[300],
    'grey-400': grey[400],
    'grey-500': grey[500],
    'grey-600': grey[600],
    'grey-700': grey[700],
    'grey-800': grey[800],
    'grey-900': grey[900],
  };
  const validGradients = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
    'light',
  ];
  const validColors = [
    'transparent',
    'white',
    'black',
    'text',
    'grey-100',
    'grey-200',
    'grey-300',
    'grey-400',
    'grey-500',
    'grey-600',
    'grey-700',
    'grey-800',
    'grey-900',
  ];
  const validBorderRadius = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'section'];
  const validBoxShadows = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'inset'];

  let backgroundValue = bgColor;
  if (variant === 'gradient') {
    backgroundValue = validGradients.find(el => el === bgColor)
      ? linearGradient(gradients[bgColor]?.main, gradients[bgColor]?.state)
      : white?.main;
  } else if (validColors.find(el => el === bgColor)) {
    backgroundValue = palette[bgColor]
      ? palette[bgColor].main
      : greyColors[bgColor];
  } else {
    backgroundValue = bgColor;
  }

  let colorValue = color;
  if (validColors.find(el => el === color)) {
    colorValue = palette[color] ? palette[color].main : greyColors[color];
  }

  let borderRadiusValue = borderRadius;
  if (validBorderRadius.find(el => el === borderRadius)) {
    borderRadiusValue = radius[borderRadius];
  }

  let boxShadowValue = 'none';
  if (validBoxShadows.find(el => el === shadow)) {
    boxShadowValue = boxShadows[shadow];
  } else if (coloredShadow) {
    boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : 'none';
  }

  const styles = {
    card: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'relative',
      minWidth: '100%',
      overflowWrap: 'break-word',
      maxWidth: 'max-content',
      height: '100%',
      borderRadius: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      padding: '20px 20px',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'relative',
      minWidth: '100%',
      overflowWrap: 'break-word',
      maxWidth: 'max-content',
      height: '100%',
      borderRadius: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      padding: theme.spacing(8),
    },
    dashboard: {
      backgroundColor: '#2d2d34',
      borderRadius: '1rem',
      flexGrow: 1,
    },
    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `1px solid ${palette.grey[500]}`,
      color: palette.grey[500],
      borderRadius: '1rem',
      padding: '1rem',
    },
  };

  return styles[variant] || {};
});

export default RCBoxRoot;
