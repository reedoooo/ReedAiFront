import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Button,
  Box,
} from '@mui/material';
import React, { useRef } from 'react';

export const SETUP_STEP_COUNT = 3;

const StepContainer = ({
  stepDescription,
  stepNum,
  stepTitle,
  onShouldProceed,
  children,
  showBackButton = false,
  showNextButton = true,
}) => {
  const buttonRef = useRef(null);

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  };

  return (
    <Card
      sx={{ maxHeight: 'calc(100vh - 60px)', width: 600, overflow: 'auto' }}
      onKeyDown={handleKeyDown}
    >
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">{stepTitle}</Typography>
            <Typography variant="body2">
              {stepNum} / {SETUP_STEP_COUNT}
            </Typography>
          </Box>
        }
        subheader={stepDescription}
      />
      <CardContent>{children}</CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        {showBackButton && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => onShouldProceed(false)}
          >
            Back
          </Button>
        )}
        {showNextButton && (
          <Button
            size="small"
            ref={buttonRef}
            onClick={() => onShouldProceed(true)}
          >
            Next
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default StepContainer;
