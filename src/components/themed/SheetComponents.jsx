import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Slide,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { cn } from 'utils/index';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const sheetTransition = props => <Slide direction="up" {...props} />;

const StyledOverlay = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  backdropFilter: 'blur(5px)',
  position: 'fixed',
  inset: 0,
  zIndex: 50,
}));

const SheetOverlay = React.forwardRef((props, ref) => (
  <StyledOverlay {...props} ref={ref} />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    position: 'relative',
    gap: theme.spacing(2),
    transition: 'transform 0.3s ease-in-out, opacity 0.5s ease-in-out',
  },
}));

const SheetContent = React.forwardRef(
  ({ side = 'right', className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <StyledDialog
        ref={ref}
        className={cn(className)}
        TransitionComponent={sheetTransition}
        {...props}
      >
        {children}
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </StyledDialog>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef((props, ref) => (
  <DialogTitle
    ref={ref}
    className={cn('text-foreground text-lg font-semibold', props.className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef((props, ref) => (
  <DialogContent
    ref={ref}
    className={cn('text-muted-foreground text-sm', props.className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
