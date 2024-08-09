import pxToRem from '../functions/pxToRem';
import colors from './colors';

const { dark } = colors;

const baseProperties = {
  fontFamily: 'Inter, Arial, sans-serif',
  fontWeightLighter: 100,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontSizeXXS: pxToRem(10.4),
  fontSizeXS: pxToRem(12),
  fontSizeSM: pxToRem(14),
  fontSizeMD: pxToRem(16),
  fontSizeLG: pxToRem(18),
  fontSizeXL: pxToRem(20),
  fontSize2XL: pxToRem(24),
  fontSize3XL: pxToRem(30),
  fontSize4XL: pxToRem(36),
  fontSize5XL: pxToRem(42),
  fontSize6XL: pxToRem(48),
};

const baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightBold,
};

const baseDisplayProperties = {
  fontWeight: baseProperties.fontWeightLight,
  lineHeight: 1.2,
};

const typography = {
  fontWeightLighter: baseProperties.fontWeightLighter,
  fontWeightLight: baseProperties.fontWeightLight,
  fontWeightRegular: baseProperties.fontWeightRegular,
  fontWeightMedium: baseProperties.fontWeightMedium,
  fontWeightBold: baseProperties.fontWeightBold,
  commonAvatar: {
    cursor: 'pointer',
    borderRadius: '8px',
  },
  smallAvatar: {
    width: '22px',
    height: '22px',
    fontSize: '1rem',
  },
  mediumAvatar: {
    width: '34px',
    height: '34px',
    fontSize: '1.2rem',
  },
  largeAvatar: {
    width: '44px',
    height: '44px',
    fontSize: '1.5rem',
  },
  h1: {
    // fontSize: pxToRem(48),
    fontSize: pxToRem(36),
    lineHeight: 1.25,
    ...baseHeadingProperties,
  },
  h2: {
    fontSize: pxToRem(30),
    lineHeight: 1.3,
    ...baseHeadingProperties,
  },
  h3: {
    fontSize: pxToRem(24),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },
  h4: {
    fontSize: pxToRem(20),
    ...baseHeadingProperties,
  },
  h5: {
    fontSize: pxToRem(16),
    ...baseHeadingProperties,
  },
  h6: {
    fontSize: pxToRem(14),
    lineHeight: 1.625,
    ...baseHeadingProperties,
  },
  subtitle1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightLight,
  },
  subtitle2: {
    fontSize: baseProperties.fontSizeMD,
    lineHeight: 1.6,
  },
  body1: {
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightRegular,
  },
  body2: {
    fontSize: baseProperties.fontSizeLG,
    fontWeight: baseProperties.fontWeightRegular,
  },
  button: {
    fontSize: baseProperties.fontSizeSM,
    lineHeight: 1.5,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: baseProperties.fontSizeXS,
  },
  overline: {
    fontSize: baseProperties.fontSizeXXS,
  },
  d1: {
    fontSize: pxToRem(80),
    ...baseDisplayProperties,
  },
  d2: {
    fontSize: pxToRem(72),
    ...baseDisplayProperties,
  },
  d3: {
    fontSize: pxToRem(64),
    ...baseDisplayProperties,
  },
  d4: {
    fontSize: pxToRem(56),
    ...baseDisplayProperties,
  },
  d5: {
    fontSize: pxToRem(48),
    ...baseDisplayProperties,
  },
  d6: {
    fontSize: pxToRem(40),
    ...baseDisplayProperties,
  },
  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL,
    xxl: baseProperties.fontSize2XL,
    xxxl: baseProperties.fontSize3XL,
  },
  weight: {
    lighter: baseProperties.fontWeightLighter,
    light: baseProperties.fontWeightLight,
    regular: baseProperties.fontWeightRegular,
    medium: baseProperties.fontWeightMedium,
    bold: baseProperties.fontWeightBold,
  },
  lineHeight: {
    xs: 1.25,
    sm: 1.25,
    md: 1.5,
    lg: 2,
    xl: 2,
  },
};

export default typography;
