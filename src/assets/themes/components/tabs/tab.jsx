import { borders, boxShadows, colors, typography } from 'assets/themes/base';
import { rgba, pxToRem } from 'assets/themes/functions';

const { size, fontWeightBold } = typography;
const { borderRadius } = borders;
const { dark, success, text } = colors;

export default {
  styleOverrides: {
    root: {
      zIndex: 1, // Ensure Tabs have a lower z-index than scroll buttons
      minWidth: 'auto',
      padding: '6px 16px',
      fontSize: '0.875rem',
      transition: 'background-color 0.3s',

      '&:hover &.Mui-selected': {
        backgroundColor: '#555',
      },

      '&.Mui-selected': {
        backgroundColor: '#000',
        color: '#fff',
        fontWeight: 'bold',
      },
    },
    // root: {

    //   // display: 'flex',
    //   // alignItems: 'center',
    //   // flexDirection: 'row',
    //   // flex: '1 1 auto',
    //   // textAlign: 'center',
    //   // maxWidth: 'unset !important',
    //   // minWidth: 'unset !important',
    //   // minHeight: 'unset !important',
    //   // height: 'auto',
    //   // fontSize: size.lg,
    //   // fontWeight: fontWeightBold,
    //   // textTransform: 'none',
    //   // lineHeight: 'inherit',
    //   // py: pxToRem(12),
    //   // borderRadius: borderRadius.md,
    //   // color: `${success.darkest} !important`,
    //   // transition: 'background-color 300ms ease, color 300ms ease', // smooth transition for background and color
    //   // opacity: '1 !important',
    //   // '& .material-icons, .material-icons-round': {
    //   //   marginBottom: '0 !important',
    //   //   marginRight: pxToRem(4),
    //   // },
    //   // '& svg': {
    //   //   marginRight: pxToRem(6),
    //   // },
    //   // '&:hover': {
    //   //   backgroundColor: `${rgba(success.light, 0.2)} !important`, // change background color on hover
    //   //   color: `${dark.main} !important`, // change text color on hover
    //   // },
    //   // '&:selected': {
    //   //   color: `${success.main} !important`,
    //   //   backgroundColor: rgba(success.main, 0.5),
    //   // },
    // },
    // 'span.MuiTab-wrapper': {
    //   color: `${text.main} !important`,
    //   backgroundColor: `${success.main} !important`,
    //   transition: 'all 500ms ease',
    // },
    // labelIcon: {
    //   paddingTop: pxToRem(4),
    // },
  },
};
