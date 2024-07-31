import { Button } from '@mui/material';
import { styled as styledDefault } from 'styled-components';

const RCButtonRoot = styledDefault(Button)(({ ownerState, theme }) => {
  const { palette, functions, borders, boxShadows, typography } = theme;
  const { color, variant, size, circular, iconOnly, darkMode } = ownerState;
  const { white, text, transparent, grey } = palette;
  const { boxShadow, linearGradient, pxToRem, rgba } = functions;
  const { borderRadius } = borders;
  const { colored } = boxShadows;

  const containedStyles = () => {
    const backgroundValue = palette[color] ? palette[color]?.main : white?.main;
    const focusedBackgroundValue = palette[color]
      ? palette[color]?.focus
      : white?.focus;
    const boxShadowValue = colored[color]
      ? `${boxShadow([0, 3], [3, 0], palette[color].main, 0.15)}, ${boxShadow(
          [0, 3],
          [1, -2],
          palette[color].main,
          0.2
        )}, ${boxShadow([0, 1], [5, 0], palette[color].main, 0.15)}`
      : 'none';
    const hoveredBoxShadowValue = colored[color]
      ? `${boxShadow([0, 14], [26, -12], palette[color].main, 0.4)}, ${boxShadow(
          [0, 4],
          [23, 0],
          palette[color].main,
          0.15
        )}, ${boxShadow([0, 8], [10, -5], palette[color].main, 0.2)}`
      : 'none';
    let colorValue = white?.main;
    let focusedColorValue = white?.main;
    if (
      !darkMode &&
      (color === 'white' || color === 'light' || !palette[color])
    ) {
      colorValue = text.main;
    } else if (darkMode && color === 'white') {
      colorValue = grey[600];
    }
    if (color === 'white') {
      focusedColorValue = text.main;
    } else if (color === 'primary' || color === 'error' || color === 'dark') {
      focusedColorValue = white.main;
    }
    return {
      background: backgroundValue,
      color: colorValue,
      boxShadow: boxShadowValue,
      '&:hover': {
        backgroundColor: backgroundValue,
        boxShadow: hoveredBoxShadowValue,
      },
      '&:focus:not(:hover)': {
        backgroundColor: focusedBackgroundValue,
        boxShadow: palette[color]
          ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
          : boxShadow([0, 0], [0, 3.2], white.main, 0.5),
      },
      '&:disabled': {
        color: focusedColorValue,
      },
    };
  };

  const outlinedStyles = () => {
    const backgroundValue =
      color === 'white' ? rgba(white?.main, 0.1) : transparent?.main;
    const colorValue = palette?.[color]?.main || white?.main;
    const boxShadowValue = palette?.[color]
      ? boxShadow([0, 0], [0, 3.2], palette[color]?.main, 0.5)
      : boxShadow([0, 0], [0, 3.2], white?.main, 0.5);
    let borderColorValue = palette?.[color]?.main || rgba(white.main, 0.75);

    return {
      color: colorValue,
      background: transparent?.main,
      borderColor: borderColorValue,
      boxShadow: boxShadowValue,
      '&:hover': {
        backgroundColor: backgroundValue,
        borderColor: borderColorValue,
      },
      '&:active': {
        backgroundColor: colorValue,
        color: white?.main,
        opacity: 0.85,
      },
    };
  };

  const gradientStyles = () => {
    const backgroundValue =
      color === 'white'
        ? white?.main
        : linearGradient(palette[color]?.gradient);
    let colorValue = white.main;
    if (
      !darkMode &&
      (color === 'white' || color === 'light' || !palette[color])
    ) {
      colorValue = text.main;
    } else if (darkMode && color === 'light') {
      colorValue = palette.dark.state;
    }
    return {
      background: backgroundValue,
      color: colorValue,
      '&:hover': {
        backgroundColor: white.main,
      },
    };
  };

  const textStyles = () => {
    const colorValue = palette[color] ? palette[color].main : white.main;
    return {
      color: colorValue,
    };
  };

  const circularStyles = () => ({
    borderRadius: borderRadius.section,
  });

  const iconOnlyStyles = () => {
    let sizeValue = pxToRem(38);
    if (size === 'small') {
      sizeValue = pxToRem(25.4);
    } else if (size === 'large') {
      sizeValue = pxToRem(52);
    }
    let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
    if (size === 'small') {
      paddingValue = pxToRem(4.5);
    } else if (size === 'large') {
      paddingValue = pxToRem(16);
    }
    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,
      '& .material-icons': {
        marginTop: 0,
      },
      '&:hover, &:focus, &:active': {
        transform: 'none',
      },
    };
  };

  const holoStyles = () => {
    const backgroundValue =
      color === 'white'
        ? white?.main
        : linearGradient(palette[color]?.gradient);
    let colorValue = white?.main;
    if (
      !darkMode &&
      (color === 'white' || color === 'light' || !palette[color])
    ) {
      colorValue = text.main;
    } else if (darkMode && color === 'light') {
      colorValue = palette.dark.state;
    }
    return {
      background: backgroundValue,
      color: colorValue,
      '&:hover': {
        backgroundColor: white?.main,
      },
    };
  };

  return {
    ...(variant === 'contained' && containedStyles()),
    ...(variant === 'outlined' && outlinedStyles()),
    ...(variant === 'gradient' && gradientStyles()),
    ...(variant === 'holo' && holoStyles()),
    ...(variant === 'text' && textStyles()),
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
  };
});

export default RCButtonRoot;

// ! -----------------------  BUTTON ROOT   --------------------------
// import { Button } from '@mui/material';
// import { styled as styledDefault } from 'styled-components';

// const RCButtonRoot = styledDefault(Button)(({ ownerState, theme }) => {
//   const { palette, functions, borders, boxShadows, typography } = theme;
//   const {
//     color,
//     variant,
//     size,
//     circular,
//     iconOnly,
//     darkMode,
//     // textSizeVariant,
//     // textWeightVariant,
//   } = ownerState;
//   const { white, text, transparent, gradients, grey } = palette;
//   const { boxShadow, linearGradient, pxToRem, rgba } = functions;
//   const { borderRadius } = borders;
//   const { colored } = boxShadows;
//   // const getFontSizeVariant = () => {
//   //   switch (textSizeVariant) {
//   //     case 'header':
//   //       return 'h6';
//   //     case 'body':
//   //       return 'body1';
//   //     case 'default':
//   //     case 'button':
//   //     default:
//   //       return 'button';
//   //   }
//   // };
//   // const getFontWeightVariant = () => {
//   //   switch (textWeightVariant) {
//   //     case 'bold':
//   //       return 'bold';
//   //     case 'regular':
//   //       return 'regular';
//   //     default:
//   //       return 'regular';
//   //   }
//   // };
//   // const fontSizeVariant = getFontSizeVariant();
//   // const fontWeightVariant = getFontWeightVariant();
//   // const commonStyles = {
//   //   fontSize: typography[fontSizeVariant].fontSize,
//   //   fontWeight: typography[fontWeightVariant],
//   // };
//   const containedStyles = () => {
//     const backgroundValue = palette[color] ? palette[color].main : white.main;
//     const focusedBackgroundValue = palette[color]
//       ? palette[color].focus
//       : white.focus;
//     const boxShadowValue = colored[color]
//       ? `${boxShadow(0, 3, palette[color].main, 0.15)}, ${boxShadow(
//           0,
//           3,
//           palette[color].main,
//           0.2
//         )}, ${boxShadow(0, 1, palette[color].main, 0.15)}`
//       : 'none';
//     const hoveredBoxShadowValue = colored[color]
//       ? `${boxShadow(0, 14, palette[color].main, 0.4)}, ${boxShadow(
//           4,
//           0.15
//         )}, ${boxShadow(0, 8, palette[color].main, 0.2)}`
//       : 'none';
//     let colorValue = white.main;
//     let focusedColorValue = white.main;
//     if (
//       !darkMode &&
//       (color === 'white' || color === 'light' || !palette[color])
//     ) {
//       colorValue = text.main;
//     } else if (darkMode && color === 'white') {
//       colorValue = grey[600];
//     }
//     if (color === 'white') {
//       focusedColorValue = text.main;
//     } else if (color === 'primary' || color === 'error' || color === 'dark') {
//       focusedColorValue = white.main;
//     }
//     return {
//       background: backgroundValue,
//       color: colorValue,
//       boxShadow: boxShadowValue,
//       '&:hover': {
//         backgroundColor: backgroundValue,
//         boxShadow: hoveredBoxShadowValue,
//       },
//       '&:focus:not(:hover)': {
//         backgroundColor: focusedBackgroundValue,
//         boxShadow: palette[color]
//           ? boxShadow(0, 0, palette[color].main, 0.5)
//           : boxShadow(0, 0, white.main, 0.5),
//       },
//       '&:disabled': {
//         color: focusedColorValue,
//       },
//     };
//   };
//   const outlinedStyles = () => {
//     try {
//       const backgroundValue =
//         color === 'white' ? rgba(white?.main, 0.1) : transparent?.main;
//       const colorValue = palette?.[color]?.main || white?.main;
//       const boxShadowValue = palette?.[color]
//         ? boxShadow([0, 0], [0, 3.2], palette[color]?.main, 0.5)
//         : boxShadow([0, 0], [0, 3.2], white?.main, 0.5);
//       let borderColorValue = palette?.[color]?.main || rgba(white.main, 0.75);

//       if (!palette?.[color]) {
//         borderColorValue = rgba(white.main, 0.75);
//       }

//       return {
//         color: colorValue,
//         background: transparent?.main,
//         borderColor: borderColorValue,
//         boxShadow: boxShadowValue,
//         '&:hover': {
//           backgroundColor: backgroundValue,
//           borderColor: borderColorValue,
//         },
//         '&:active': {
//           backgroundColor: colorValue,
//           color: white?.main,
//           opacity: 0.85,
//         },
//       };
//     } catch (error) {
//       console.error('Error in outlinedStyles:', error);
//       return {};
//     }
//   };
//   const gradientStyles = () => {
//     const backgroundValue =
//       color === 'white'
//         ? white?.main
//         : linearGradient(gradients[color]?.main, gradients[color]?.state);
//     let colorValue = white.main;
//     if (
//       !darkMode &&
//       (color === 'white' || color === 'light' || !palette[color])
//     ) {
//       colorValue = text.main;
//     } else if (darkMode && color === 'light') {
//       colorValue = gradients.dark.state;
//     }
//     return {
//       background: backgroundValue,
//       color: colorValue,
//       '&:hover': {
//         backgroundColor: white.main,
//       },
//     };
//   };
//   const textStyles = () => {
//     const colorValue = palette[color] ? palette[color].main : white.main;
//     return {
//       color: colorValue,
//     };
//   };
//   const circularStyles = () => ({
//     borderRadius: borderRadius.section,
//   });
//   const iconOnlyStyles = () => {
//     let sizeValue = pxToRem(38);
//     if (size === 'small') {
//       sizeValue = pxToRem(25.4);
//     } else if (size === 'large') {
//       sizeValue = pxToRem(52);
//     }
//     let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
//     if (size === 'small') {
//       paddingValue = pxToRem(4.5);
//     } else if (size === 'large') {
//       paddingValue = pxToRem(16);
//     }
//     return {
//       width: sizeValue,
//       minWidth: sizeValue,
//       height: sizeValue,
//       minHeight: sizeValue,
//       padding: paddingValue,
//       '& .material-icons': {
//         marginTop: 0,
//       },
//       '&:hover, &:focus, &:active': {
//         transform: 'none',
//       },
//     };
//   };
//   const holoStyles = () => {
//     console.log('PALETTE', palette);
//     console.log('COLOR', color);
//     console.log('GRADIENT', gradients);
//     console.log('GRADIENT AT COLOR', gradients[color]);
//     const backgroundValue =
//       color === 'white'
//         ? white?.main
//         : linearGradient(gradients[color]?.main, gradients[color]?.state);
//     let colorValue = white?.main;
//     if (
//       !darkMode &&
//       (color === 'white' || color === 'light' || !palette[color])
//     ) {
//       colorValue = text.main;
//     } else if (darkMode && color === 'light') {
//       colorValue = gradients.dark.state;
//     }
//     return {
//       background: backgroundValue,
//       color: colorValue,
//       '&:hover': {
//         backgroundColor: white.main,
//       },
//     };
//   };

//   return {
//     // ...commonStyles,
//     ...(variant === 'contained' && containedStyles()),
//     ...(variant === 'outlined' && outlinedStyles()),
//     ...(variant === 'gradient' && gradientStyles()),
//     ...(variant === 'holo' && holoStyles()),
//     ...(variant === 'text' && textStyles()),
//     ...(circular && circularStyles()),
//     ...(iconOnly && iconOnlyStyles()),
//   };
// });

// export default RCButtonRoot;
