import { Box } from '@mui/material';
import React from 'react';

export default function IconBox(props) {
  const { icon, ...rest } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="50%"
      {...rest}
    >
      {icon}
    </Box>
  );
}
