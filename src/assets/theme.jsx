import { createTheme } from '@mui/material/styles';
import { borders, boxShadows, breakpoints, colors, typography } from './themes';
import components from './themes/components';
import {
  boxShadow,
  hexToRgb,
  linearGradient,
  pxToRem,
  rgba,
} from './themes/functions';
import Transitions from './themes/transitions';

const baseThemeData = {
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },
  components: {
    ...components,
  },
  breakpoints: breakpoints.values,
  transitions: Transitions,
  borders: borders,
  boxShadows: boxShadows,
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeightLighter: typography.fontWeightLighter,
    fontWeightLight: typography.fontWeightLight,
    fontWeightRegular: typography.fontWeightRegular,
    fontWeightMedium: typography.fontWeightMedium,
    fontWeightBold: typography.fontWeightBold,
    commonAvatar: typography.commonAvatar,
    smallAvatar: typography.smallAvatar,
    mediumAvatar: typography.mediumAvatar,
    largeAvatar: typography.largeAvatar,
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    h4: typography.h4,
    h5: typography.h5,
    h6: typography.h6,
    subtitle1: typography.subtitle1,
    subtitle2: typography.subtitle2,
    body1: typography.body1,
    // --- Developing Styles --
    // icons: {
    // common: #3F4453,
    // brand: #18b984,
    // },
    // --- End Developing Styles --
  },
  spacing: factor => `${0.25 * factor}rem`,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
};

const getPalette = mode => ({
  mode,
  brand: colors.brand[mode],
  brandScheme: colors.brandScheme[mode],
  brandTabs: colors.brandTabs[mode],
  secondaryGray: colors.secondaryGray[mode],
  primary: colors.primary[mode],
  secondary: colors.secondary[mode],
  background: colors.background[mode],
  text: colors.text[mode],
  icon: colors.icon[mode],
  divider: colors.divider[mode],
  action: colors.action[mode],
});

// export const lightTheme = createTheme({
//   ...baseThemeData,
//   palette: getPalette('light'),
//   // typography: {
//   //   fontFamily: 'Roboto, Arial, sans-serif',
//   // },
// });

export const darkTheme = createTheme({
  ...baseThemeData,
  palette: getPalette('dark'),
  // typography: {
  //   fontFamily: 'Roboto, Arial, sans-serif',
  // },
});

export const getTheme = mode => (mode === 'dark' ? darkTheme : darkTheme);
