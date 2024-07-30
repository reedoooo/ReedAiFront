import { Container, Box, Typography } from '@mui/material';
import React from 'react';

const SingleColumnLayout = () => {
  return (
    <Container maxWidth="md">
      <Box p={4}>
        <Typography variant="h2">Single Column Layout</Typography>
        <Typography variant="body1">
          This is a single column layout with responsive design.
        </Typography>
      </Box>
    </Container>
  );
};

export default SingleColumnLayout;
