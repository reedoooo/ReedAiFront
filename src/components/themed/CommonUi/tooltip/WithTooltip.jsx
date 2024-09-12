import { Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export const WithTooltip = ({
  display,
  trigger,
  delayDuration = 500,
  side = 'right',
}) => {
  return (
    <StyledTooltip
      title={display}
      placement={side}
      enterDelay={delayDuration}
      leaveDelay={200}
    >
      {trigger}
    </StyledTooltip>
  );
};

export default WithTooltip;
