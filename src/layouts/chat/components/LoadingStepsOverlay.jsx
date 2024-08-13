import { CheckCircleOutline } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

export const LoadingStep = ({ step, completed }) => (
  <ListItem>
    <ListItemIcon>
      {completed ? (
        <Fade in={completed}>
          <CheckCircleOutline color="success" />
        </Fade>
      ) : (
        <CircularProgress size={24} />
      )}
    </ListItemIcon>
    <ListItemText primary={step.label} />
  </ListItem>
);

export const LoadingSection = ({ title, steps, active }) => (
  <Fade in={active} timeout={500}>
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List>
        {steps.map((step, index) => (
          <LoadingStep key={index} step={step} completed={step.completed} />
        ))}
      </List>
    </Box>
  </Fade>
);

export const LoadingOverlay = ({ loading, sections }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setActiveSection(prev => (prev + 1) % sections.length);
      }, 5000); // Change section every 5 seconds
      return () => clearInterval(timer);
    }
  }, [loading, sections.length]);

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Loading Chat App
      </Typography>
      {sections.map((section, index) => (
        <LoadingSection
          key={index}
          title={section.title}
          steps={section.steps}
          active={index === activeSection}
        />
      ))}
    </Box>
  );
};

export default LoadingOverlay;
