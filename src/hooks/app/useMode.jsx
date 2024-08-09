import { useContext } from 'react';
import { getTheme } from 'assets/theme';
import { ColorModeContext } from 'contexts/ColorModeProvider';

export const useMode = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const theme = getTheme(mode);

  const validateColor = color => {
    let currentPalette = theme.palette;
    if (typeof color === 'object') {
      if (currentPalette[color]) {
        return true;
      }
      return true; // Assume object values are valid for now
    } else if (typeof color === 'string') {
      if (currentPalette[color]) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log('Invalid color:', color);
    }
    return true;
  };

  const colorModeValues = (dark, light, defaultColor = '#26242C') => {
    const validDark = validateColor(dark);
    const validLight = validateColor(light);
    const valid = validDark || validLight;
    const returnDark = validDark ? dark : defaultColor;
    const returnLight = validLight ? light : defaultColor;
    const color = mode === 'dark' ? returnDark : returnLight;
    if (valid) {
      console.log(
        `VALID: ${valid}, ${validDark}, ${validLight}  RETURN: ${returnDark}, ${returnLight}  MODE: ${mode}  DEFAULT: ${defaultColor}  COLOR: ${color}`
      );
    } else if (!valid && color.startsWith('#')) {
      console.log(`============= RETURNING HEX COLOR: ${color} =============`);
      return color;
    } else {
      console.log(`============= INVALID COLOR: ${color} =============`);
    }
    return mode === 'dark' ? returnDark : returnLight;
  };

  return { mode, theme, toggleColorMode, colorModeValues };
};

export default useMode;
