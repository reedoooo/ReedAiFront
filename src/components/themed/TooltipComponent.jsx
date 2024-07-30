import { Tooltip as MuiTooltip, TooltipProps, styled } from '@mui/material';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React, { forwardRef } from 'react';
import { cn } from 'utils/index';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const StyledTooltip = styled(MuiTooltip)(({ theme }) => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 12,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
  },
}));

const TooltipContent = forwardRef((props, ref) => {
  const { className, sideOffset = 4, ...other } = props;
  return (
    <StyledTooltip
      ref={ref}
      {...other}
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, sideOffset],
            },
          },
        ],
      }}
      classes={{ tooltip: cn('text-sm', className) }}
    />
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

const WithTooltip = ({
  display,
  trigger,
  delayDuration = 500,
  side = 'right',
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent placement={side}>{display}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WithTooltip;
