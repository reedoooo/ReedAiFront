import { DataObjectOutlined } from '@mui/icons-material';
import { Button, Box, Typography } from '@mui/material';
import React from 'react';

export const Regenerate = ({ onRegenerate }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 4,
        left: 0,
        right: 0,
        ml: 'auto',
        mr: 'auto',
        width: '100%',
        px: 2,
        '@media (min-width: 640px)': {
          position: 'absolute',
          bottom: 8,
          left: '280px',
          width: '50%',
        },
        '@media (min-width: 1024px)': {
          left: '200px',
        },
      }}
    >
      <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
        {'Sorry, there was an error.'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onRegenerate}
        startIcon={<DataObjectOutlined />}
        sx={{
          height: '3rem',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.375rem',
          border: '1px solid',
          borderColor: 'neutral.300',
          bgcolor: 'neutral.100',
          color: 'neutral.500',
          fontSize: '0.875rem',
          fontWeight: '600',
          '&:hover': {
            bgcolor: 'neutral.200',
          },
          '@media (prefers-color-scheme: dark)': {
            borderColor: 'transparent',
            bgcolor: '#444654',
            color: 'neutral.200',
            '&:hover': {
              bgcolor: '#555666',
            },
          },
        }}
      >
        Regenerate Response
      </Button>
    </Box>
  );
};

export default Regenerate;
