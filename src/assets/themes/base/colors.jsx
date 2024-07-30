import { rgba } from '../functions';
const MuiModeBasedStyles = {
  primary: {
    light: {
      lighter: '#94e2cd',
      light: '#4cceac',
      main: '#18b984',
      secondary: '#5CDB95',
      tertiary: '#5fe7bb',
      dark: '#2e7c67',
      focus: rgba('#18b984' || '#dbf5ee', 0.15),
      contrastText: '#dbf5ee',
      gradient: 'linear-gradient(180deg, #18b984, #5CDB95)',
    },
    dark: {
      lighter: '#94e2cd',
      light: '#4cceac',
      main: '#18b984',
      secondary: '#5CDB95',
      tertiary: '#5fe7bb',
      dark: '#2e7c67',
      focus: rgba('#18b984' || '#dbf5ee', 0.15),
      contrastText: '#dbf5ee',
      gradient: 'linear-gradient(180deg, #18b984, #5CDB95)',
    },
  },
  secondary: {
    light: {
      lighter: '#70a1ff',
      light: '#5c7cfa',
      main: '#3a539b',
      secondary: '#3C40C6',
      tertiary: '#3d3d3d',
      dark: '#293f66',
      focus: rgba('#3a539b' || '#eef2f6', 0.15),
      contrastText: '#eef2f6',
      gradient: 'linear-gradient(180deg, #3a539b, #3C40C6)',
    },
    dark: {
      lighter: '#70a1ff',
      light: '#5c7cfa',
      main: '#3a539b',
      secondary: '#3C40C6',
      tertiary: '#3d3d3d',
      dark: '#293f66',
      focus: rgba('#3a539b' || '#eef2f6', 0.15),
      contrastText: '#eef2f6',
      gradient: 'linear-gradient(180deg, #3a539b, #3C40C6)',
    },
  },
  text: {
    light: {
      primary: '#212121',
      secondary: '#3d3d3d',
      tertiary: '#707070',
      contrastText: '#ffffff',
      main: '#212121',
      hover: '#4a4a4a',
      colorText: '#343239',
      colorPrimaryText: rgba('#fff', 0.96),
      colorLabel: '#A4A3A6',
      gradient: 'linear-gradient(180deg, #212121, #3d3d3d)',
    },
    dark: {
      primary: '#212121',
      secondary: '#3d3d3d',
      main: '#212121',
      tertiary: '#707070',
      contrastText: '#ffffff',
      hover: '#4a4a4a',
      colorText: '#343239',
      colorPrimaryText: rgba('#fff', 0.96),
      colorLabel: '#A4A3A6',
      gradient: 'linear-gradient(180deg, #212121, #3d3d3d)',
    },
  },
  icon: {
    light: {
      default: '#18b984',
      main: '#18b984',
      hover: '#5CDB95',
      focus: '#5CDB95',
      set: '#2e7c67',
      gradient: 'linear-gradient(180deg, #18b984, #5CDB95)',
    },
    dark: {
      default: '#18b984',
      main: '#18b984',
      hover: '#5CDB95',
      focus: '#5CDB95',
      set: '#2e7c67',
      gradient: 'linear-gradient(180deg, #18b984, #5CDB95)',
    },
  },
  background: {
    light: {
      default: '#f0f2f5',
      main: '#f0f2f5',
      paper: '#fff',
      hover: '#e0e0e0',
      focus: '#B2BAC2',
      set: '#6F7E8C',
      gradient: 'linear-gradient(180deg, #f0f2f5, #ffffff)',
    },
    dark: {
      default: '#f0f2f5',
      main: '#f0f2f5',
      paper: '#fff',
      hover: '#e0e0e0',
      focus: '#B2BAC2',
      set: '#6F7E8C',
      gradient: 'linear-gradient(180deg, #f0f2f5, #ffffff)',
    },
  },
  border: {
    light: {
      default: '#e0e0e0',
      main: '#e0e0e0',
      paper: '#fff',
      hover: '#e0e0e0',
      focus: '#B2BAC2',
      set: '#6F7E8C',
      gradient: 'linear-gradient(180deg, #e0e0e0, #ffffff)',
    },
    dark: {
      default: '#e0e0e0',
      main: '#e0e0e0',
      paper: '#fff',
      hover: '#e0e0e0',
      focus: '#B2BAC2',
      set: '#6F7E8C',
      gradient: 'linear-gradient(180deg, #e0e0e0, #ffffff)',
    },
  },
  divider: {
    light: '#eeeeee',
    dark: '#eeeeee',
  },
  action: {
    light: {
      hover: '#424242',
      disabled: '#eeeeee',
    },
    dark: {
      hover: '#424242',
      disabled: '#eeeeee',
    },
  },
};
const ChakraModeBasedStyles = {
  brand: {
    light: {
      100: '#E9E3FF',
      200: '#422AFB',
      300: '#422AFB',
      400: '#7551FF',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#11047A',
    },
    dark: {
      100: '#E9E3FF',
      200: '#422AFB',
      300: '#422AFB',
      400: '#7551FF',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#11047A',
    },
  },
  brandScheme: {
    light: {
      200: '#7551FF',
      300: '#7551FF',
      900: '#02044A',
    },
    dark: {
      200: '#7551FF',
      300: '#7551FF',
      900: '#02044A',
    },
  },
  brandTabs: {
    light: {
      400: '#422AFB',
    },
    dark: {
      400: '#422AFB',
    },
  },
  secondaryGray: {
    light: {
      100: '#E0E5F2',
      200: '#E1E9F8',
      300: '#F4F7FE',
      400: '#E9EDF7',
      500: '#8F9BBA',
      600: '#A3AED0',
      700: '#707EAE',
      800: '#707EAE',
      900: '#1B2559',
    },
    dark: {
      100: '#E0E5F2',
      200: '#E1E9F8',
      300: '#F4F7FE',
      400: '#E9EDF7',
      500: '#8F9BBA',
      600: '#A3AED0',
      700: '#707EAE',
      800: '#707EAE',
      900: '#1B2559',
    },
  },
};
export const colors = {
  // ||==========================================||
  // ||          [ CHAKRA_UI_COLORS ]          ||
  // ||==========================================||
  brand: ChakraModeBasedStyles.brand,
  brandScheme: ChakraModeBasedStyles.brandScheme,
  brandTabs: ChakraModeBasedStyles.brandTabs,
  secondaryGray: ChakraModeBasedStyles.secondaryGray,
  // ||==========================================||
  common: {
    black: '#000000',
    white: '#ffffff',
  },
  red: {
    100: '#FEEFEE',
    500: '#EE5D50',
    600: '#E31A1A',
  },
  blue: {
    50: '#EFF4FB',
    500: '#3965FF',
  },
  orange: {
    100: '#FFF6DA',
    500: '#FFB547',
  },
  green: {
    100: '#E6FAF5',
    500: '#01B574',
  },
  navy: {
    50: '#d0dcfb',
    100: '#aac0fe',
    200: '#a3b9f8',
    300: '#728fea',
    400: '#3652ba',
    500: '#1b3bbb',
    600: '#24388a',
    700: '#1B254B',
    800: '#111c44',
    900: '#0b1437',
  },
  gray: {
    100: '#FAFCFE',
  },
  // ||==========================================||
  // ||          [ MATERIAL_UI_COLORS ]          ||
  // ||==========================================||
  primary: MuiModeBasedStyles.primary,
  secondary: MuiModeBasedStyles.secondary,
  text: MuiModeBasedStyles.text,
  icon: MuiModeBasedStyles.icon,
  background: MuiModeBasedStyles.background,
  border: MuiModeBasedStyles.border,
  divider: MuiModeBasedStyles.divider,
  action: MuiModeBasedStyles.action,

  // ||==========================================||
  grey: {
    50: '#f8fafc',
    100: '#eef2f6',
    200: '#e3e8ef',
    300: '#cdd5df',
    400: '#8993a5', // Assuming you might need a grey400, placed logically in sequence
    500: '#697586',
    600: '#4b5565',
    700: '#364152',
    800: '#232a3b', // Assuming grey800, filled logically between grey700 and grey900
    900: '#121926',
  },
  black: {
    generic: '#000000',
    darker: '#040509',
    dark: '#0B0C0E',
    darkest: '#141414',
    main: '#1C1C1C',
    light: '#212121',
    focus: '#26242C',
    lighterFocus: '#2C2A32',
    lightest: '#3A3842',
    gradient: 'linear-gradient(180deg, #1C1C1C, #26242C)',
  },
  white: {
    main: '#ffffff',
    default: '#ffffff',
    focus: '#E8E8E8',
    gradient: 'linear-gradient(180deg, #ffffff, #EBEFF4)',
  },
  info: {
    light: '#90caf9',
    focus: '#64b5f6',
    main: '#49a3f1',
    dark: '#1A73E8',
    gradient: 'linear-gradient(180deg, #49a3f1, #1A73E8)',
  },
  success: {
    light: '#b9f6ca',
    focus: '#69f0ae',
    main: '#00c853',
    dark: '#00b551',
    gradient: 'linear-gradient(180deg, #00c853, #00994d)',
  },
  warning: {
    light: '#fff8e1',
    focus: '#ffecb3',
    main: '#ffe57f',
    dark: '#ffc107',
    gradient: 'linear-gradient(180deg, #ffe57f, #ffc107)',
  },
  error: {
    light: '#ef9a9a',
    focus: '#e57373',
    main: '#f44336',
    dark: '#c62828',
    gradient: 'linear-gradient(180deg, #f44336, #c62828)',
  },
  dark: {
    main: '#344767',
    focus: '#2c3c58',
    level1: '#29314f',
    level2: '#212946',
    level3: '#1a223f',
    level4: '#111936',
    textTitle: '#dbf5ee',
    textPrimary: '#b7ebde',
    textSecondary: '#94e2cd',
    gradient: 'linear-gradient(180deg, #344767, #2c3c58)',

    // textTitle: '#d7dcec',
    // textPrimary: '#bdc8f0',
    // textSecondary: '#8492c4',
  },
  light: {
    default: '#ffffff',
    main: '#EBEFF4',
    focus: '#CED4DA',
    level1: '#f8fafc',
    level2: '#eef2f6',
    level3: '#e3e8ef',
    level4: '#cdd5df',
    textTitle: '#212121',
    textPrimary: '#212121',
    textSecondary: '#3d3d3d',
    gradient: 'linear-gradient(180deg, #ffffff, #EBEFF4)',

    // textTertiary: '#707070',
    // textQuaternary: '#A4A3A6',
    // textQuinary: '#697586',
  },
  gradients: {
    primary: {
      main: '#18b984',
      state: '#5CDB95',
    },
    secondary: {
      main: '#3a539b',
      state: '#3C40C6',
    },
    info: {
      main: '#49a3f1',
      state: '#1A73E8',
    },
    success: {
      main: '#00c853',
      state: '#00994d',
    },
    warning: {
      main: '#FFA726',
      state: '#FB8C00',
    },
    error: {
      main: '#EF5350',
      state: '#E53935',
    },
    light: {
      main: '#EBEFF4',
      state: '#CED4DA',
    },
    white: {
      main: '#EBEFF4',
      state: '#CED4DA',
    },
    dark: {
      main: '#42424a',
      state: '#191919',
    },
  },
  transparent: {
    main: 'transparent',
  },
  inputBorderColor: '#d2d6da',
  tabs: {
    indicator: { boxShadow: '#ddd' },
  },
  inputColors: {
    borderColor: { main: '#d2d6da', focus: '#35d1f5' },
    boxShadow: '#81e3f9',
    error: '#fd5c70',
    success: '#66d432',
  },
  coloredShadows: {
    primary: '#e91e63',
    secondary: '#110e0e',
    info: '#00bbd4',
    success: '#4caf4f',
    warning: '#ff9900',
    error: '#f44336',
    light: '#adb5bd',
    dark: '#404040',
  },
};

export default colors;

// const greenPalette = {
//   50: '#b7ebde', // Even lighter than the lightest
//   100: '#94e2cd', // Lightest shade
//   200: '#70d8bd', // Lighter shade
//   300: '#4cceac', // Light shade, also 'crystalGreen' with opacity adjusted for full hex
//   400: '#3da58a', // Default, mid-light
//   500: '#18b984', // Main green used in the primary color
//   600: '#159b76', // Slightly darker and less saturated than 500
//   700: '#12875f', // Darker and more muted green
//   800: '#0f7348', // Dark, rich green
//   900: '#2e7c67', // Darkest shade, used for the deepest contrast
//   contrastText: '#dbf5ee', // Lightest contrast text
//   main: '#18b984', // Primary main color
//   focus: 'rgba(24, 185, 132, 0.15)', // Focus state with opacity
//   hoverContrastText: 'white', // Text color for hover states
// };
// const redPalette = {
//   50: '#f8dcdb', // Even lighter than the lightest
//   100: '#f1b9b7', // Lightest
//   200: '#e99592', // Lighter
//   300: '#e2726e', // Light shade
//   400: '#db4f4a', // Default, main used color
//   500: '#af3f3b', // Mid-dark, more saturation
//   600: '#832f2c', // Darker and more intense
//   700: '#58201e', // Even darker, rich depth
//   800: '#2c100f', // Darkest shade, for deep contrast
//   contrastText: '#f8dcdb', // Lightest contrast text
//   main: '#db4f4a', // Primary main color
//   focus: 'rgba(219, 79, 74, 0.15)', // Focus state with opacity
// const bluePalette = {
//   50: '#e1e2fe', // Even lighter than the lightest
//   100: '#c3c6fd', // Lightest
//   200: '#a4a9fc', // Lighter
//   300: '#868dfb', // Light shade
//   400: '#6870fa', // Default, main used color
//   500: '#535ac8', // Mid-dark, more saturation
//   600: '#3e4396', // Darker and more intense
//   700: '#2a2d64', // Even darker, rich depth
//   800: '#151632', // Darkest shade, for deep contrast
//   contrastText: '#e1e2fe', // Lightest contrast text
//   main: '#6870fa', // Primary main color
//   focus: 'rgba(104, 112, 250, 0.15)', // Focus state with opacity
// const myGradients = {
//   primary: {
//     main: '#0172AF',
//     state: '#74FEBD',
//     value: 'linear-gradient(180deg, #0172AF 0%, #74FEBD 100%)',
//   },
//   secondary: {
//     main: '#FF8473',
//     state: '#FFF9d2',
//     value: 'linear-gradient(180deg, #FF8473 0%, #FFF9d2 100%)',
