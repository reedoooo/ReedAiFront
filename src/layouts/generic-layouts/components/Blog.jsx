import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const BlogPostLayout = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper>
            <Box p={4}>
              <Typography variant="h4" gutterBottom>
                Blog Post Title
              </Typography>
              <Typography variant="body1">
                This is the main content of the blog post. It can include text,
                images, and other media.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <Box p={4}>
              <Typography variant="h5" gutterBottom>
                Sidebar
              </Typography>
              <Typography variant="body1">
                This is the sidebar content, which can include links,
                advertisements, or other relevant information.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogPostLayout;
