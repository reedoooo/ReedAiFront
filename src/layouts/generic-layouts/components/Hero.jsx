import { Box, Typography, Button, Container } from '@mui/material';
import React from 'react';

const HeroSectionLayout = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://via.placeholder.com/1500)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box bgcolor="rgba(255, 255, 255, 0.8)" p={4} borderRadius={2}>
          <Typography variant="h2" gutterBottom>
            Hero Section
          </Typography>
          <Typography variant="body1" gutterBottom>
            This is an example of a hero section with a background image and
            some overlay text.
          </Typography>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSectionLayout;
