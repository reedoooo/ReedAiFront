import { Box } from '@mui/material';
import React from 'react';
import { StyledTextField, StyledButton } from 'components/chat/styled';

export const SessionSettings = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '1rem',
      }}
    >
      <StyledTextField label="API Key" variant="outlined" fullWidth />
      <StyledButton variant="outlined">Save Settings</StyledButton>
    </Box>
  );
};

export default SessionSettings;
