import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const DashboardLayout = () => {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <Box p={2}>
              <Typography variant="h4">Dashboard Header</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6">Sidebar</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>
                <Box p={2}>
                  <Typography variant="h6">Main Content</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper>
                <Box p={2}>
                  <Typography variant="h6">Content Block 1</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper>
                <Box p={2}>
                  <Typography variant="h6">Content Block 2</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardLayout;
