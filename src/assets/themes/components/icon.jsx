import { pxToRem } from 'assets/themes/functions';
import { boxShadows } from '../base';

export default {
  // defaultProps: {
  //   baseClassName: 'material-icons-round',
  //   fontSize: 'inherit',
  // },
  // width: '34px',
  // height: '34px',
  // fontSize: '18px',
  // backgroundColor: '#fff',
  // borderRadius: '50%',
  // boxShadow: boxShadows.colored.light,
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  styleOverrides: {
    root: {
      width: '34px',
      height: '34px',
      // fontSize: '18px',
      // backgroundColor: '#fff',
      // borderRadius: '50%',
      // boxShadow: boxShadows.colored.light,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSizeInherit: {
        fontSize: 'inherit !important',
      },
      fontSizeSmall: {
        fontSize: `${pxToRem(20)} !important`,
      },
      fontSizeLarge: {
        fontSize: `${pxToRem(36)} !important`,
      },
    },
  },
};
