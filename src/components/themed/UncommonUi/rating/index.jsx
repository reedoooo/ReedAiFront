// StarRating.jsx
import { Box, Typography, Rating } from '@mui/material';
import React from 'react';

export const StarRating = ({ label, value, onChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography component="legend" sx={{ mr: 2, minWidth: 150 }}>
        {label}
      </Typography>
      <Rating
        name={label.toLowerCase().replace(' ', '-')}
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
      />
    </Box>
  );
};

export default StarRating;
