import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const ZShapeLayout = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box p={4} bgcolor="primary.main" color="white">
          <Typography variant="h4">Top Bar</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box p={4} bgcolor="secondary.main" color="white">
          <Typography variant="h4">Left Content</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box p={4} bgcolor="primary.light" color="white">
          <Typography variant="h4">Right Content</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box p={4} bgcolor="primary.dark" color="white">
          <Typography variant="h4">Bottom Bar</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ZShapeLayout;
