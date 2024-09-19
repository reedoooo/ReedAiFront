// RCTooltipRoot.js
import { Tooltip } from '@mui/material';
import { styled } from '@mui/system';

export const RCTooltipRoot = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default RCTooltipRoot;
