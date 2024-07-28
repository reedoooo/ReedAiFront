import { Box, Grid } from '@mui/material';
import React from 'react';

const SplitScreen = () => {
  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6} style={{ backgroundColor: '#f0f0f0' }}>
        <Box p={4}>Left Side Content</Box>
      </Grid>
      <Grid item xs={12} md={6} style={{ backgroundColor: '#e0e0e0' }}>
        <Box p={4}>Right Side Content</Box>
      </Grid>
    </Grid>
  );
};

export default SplitScreen;
