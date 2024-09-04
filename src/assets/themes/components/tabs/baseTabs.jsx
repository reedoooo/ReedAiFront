import { borders, boxShadows, colors } from 'assets/themes/base';
import { pxToRem } from 'assets/themes/functions';

const { grey, white } = colors;
const { borderRadius } = borders;
const { tabsBoxShadow } = boxShadows;

export default {
  styleOverrides: {
    root: {
      position: 'relative', // Ensure the tabs container is positioned
      zIndex: 1, // Set a lower z-index to ensure the scroll buttons are on top
    },
    // scroller: {
    //   position: 'relative', // Allow scroll buttons to be positioned outside the scroller
    //   zIndex: 'inherit', // Inherit z-index from the root for consistency
    // },
    // scroller: {
    //   overflow: 'hidden !important', // Hide any overflow from the scroller
    // },
    // root: {
    //   // position: 'relative',
    //   // backgroundColor: grey[100],
    //   // borderRadius: borderRadius.xl,
    //   // minHeight: 'unset',
    //   // padding: pxToRem(4),
    // },
    // flexContainer: {
    //   height: '100%',
    //   zIndex: 10,
    // },
    // fixed: {
    //   overflow: 'unset !important',
    //   overflowX: 'unset !important',
    // },
    // vertical: {
    //   '& .MuiTabs-indicator': {
    //     width: '100%',
    //   },
    // },
    indicator: {
      // borderRadius: borderRadius.lg,
      // backgroundColor: white.main,
      // boxShadow: tabsBoxShadow.indicator,
      transition: 'all 500ms ease',
    },
  },
};
