import { Box } from '@mui/material';
import React from 'react';

function RCCardRoot(props) {
  const { children, ...rest } = props;
  return (
    <Box
      sx={{
        p: '20px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        borderRadius: '20px',
        minWidth: '0px',
        wordWrap: 'break-word',
        bg: '#ffffff',
        backgroundClip: 'border-box',
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default RCCardRoot;
