import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const validFlexDirections = ['row', 'row-reverse', 'column', 'column-reverse'];
const validAlignItems = [
  'flex-start',
  'center',
  'flex-end',
  'stretch',
  'baseline',
];
const validJustifyContent = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];
const validFlexWraps = ['nowrap', 'wrap', 'wrap-reverse'];

const RCFlexRoot = styled(Box, {
  shouldForwardProp: prop => !['ownerState', 'sx'].includes(prop),
})(({ ownerState }) => {
  // const theme = useTheme();
  const { direction, align, justify, wrap, basis, grow, shrink } = ownerState;

  return {
    display: 'flex',
    flexDirection: validFlexDirections.includes(direction) ? direction : 'row',
    alignItems: validAlignItems.includes(align) ? align : 'stretch',
    justifyContent: validJustifyContent.includes(justify)
      ? justify
      : 'flex-start',
    flexWrap: validFlexWraps.includes(wrap) ? wrap : 'nowrap',
    flexBasis: basis || 'auto',
    flexGrow: grow || 0,
    flexShrink: shrink || 1,
  };
});

export default RCFlexRoot;
