import { Dialog } from '@mui/material';
import styledDefault from 'styled-components';
import { useMode } from 'hooks';

const validGradients = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error',
];
const validColors = ['grey', 'white', 'black', 'text', 'transparent', 'light'];
const validBorderRadius = ['none', 'sm', 'md', 'lg', 'xl'];
const validBoxShadows = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const RCDialogRoot = styledDefault(Dialog)(({ ownerState }) => {
  const { theme } = useMode();
  const { palette, functions, borders, boxShadows } = theme;
  const {
    variant,
    bgColor,
    color,
    opacity,
    borderRadius,
    shadow,
    coloredShadow,
    transition,
  } = ownerState;
  const { gradients, grey, white } = palette;
  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  const { colored } = boxShadows;

  let backgroundValue = bgColor;
  if (variant === 'gradient' && validGradients.includes(bgColor)) {
    backgroundValue = linearGradient(
      gradients[bgColor].main,
      gradients[bgColor].state
    );
  } else if (validColors.includes(bgColor)) {
    backgroundValue = palette[bgColor] ? palette[bgColor].main : grey[bgColor];
  }

  let colorValue = color;
  if (validColors.includes(color)) {
    colorValue = palette[color] ? palette[color].main : grey[color];
  }

  let borderRadiusValue = borderRadius;
  if (validBorderRadius.includes(borderRadius)) {
    borderRadiusValue = radius[borderRadius];
  }

  let boxShadowValue = 'none';
  if (validBoxShadows.includes(shadow)) {
    boxShadowValue = boxShadows[shadow];
  } else if (coloredShadow) {
    boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : 'none';
  }

  const transitionStyles = {
    slide: {
      transition: 'transform 0.3s ease-out',
    },
    fade: {
      transition: 'opacity 0.3s ease-out',
    },
    grow: {
      transformOrigin: 'center',
    },
    zoom: {
      transform: 'scale(1.1)',
    },
    none: {},
  };

  return {
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
    ...transitionStyles[transition],
  };
});

export default RCDialogRoot;
