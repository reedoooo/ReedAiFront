import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// Define keyframes for the background color animation
const bgChange = keyframes`
  0% { background-color: transparent; }
  100% { background-color: inherit; }
`;

// Define the animated icon with conditional background color
const AnimatedIconWrapper = styled('div')(({ theme, isLoggedIn }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  width: '32px',
  height: '32px',
  color: theme.palette.common.white,
  backgroundColor: isLoggedIn
    ? theme.palette.primary.main
    : theme.palette.error.dark,
  borderRadius: '50%',
  borderColor: theme.palette.common.white,
  borderWidth: '1px',
  padding: theme.spacing(2),
  animation: `${bgChange} 1s ease-in-out`,
  transition: 'background-color 1s ease-in-out',
  marginBottom: '0.5rem',
}));

const ValidationIcon = ({ IconComponent, isValid, type }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
    const timeout = setTimeout(() => setAnimated(false), 1000);
    return () => clearTimeout(timeout);
  }, [isValid]);

  return (
    <AnimatedIconWrapper
      isLoggedIn={isValid}
      className={animated ? 'animated' : ''}
    >
      <IconComponent fontSize="inherit" />
    </AnimatedIconWrapper>
  );
};

ValidationIcon.displayName = 'ValidationIcon';

ValidationIcon.propTypes = {
  IconComponent: PropTypes.elementType.isRequired, // Should be a React component
  isValid: PropTypes.bool.isRequired, // Should be a boolean
  type: PropTypes.string, // Optional string for type
};

export default ValidationIcon;
