import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const Wrapper = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '300px',
  textAlign: 'center',
  transform: 'translateX(-50%)',
});

const Spanner = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: 0,
  background: '#2a2a2a55',
  width: '100%',
  display: 'block',
  textAlign: 'center',
  height: '300px',
  color: '#FFF',
  transform: 'translateY(-50%)',
  zIndex: 1000,
  visibility: 'hidden',
  opacity: 0,
  transition: 'all 0.3s',
  '&.show': {
    visibility: 'visible',
    opacity: 1,
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.5)',
  visibility: 'hidden',
  opacity: 0,
  transition: 'all 0.3s',
  '&.show': {
    visibility: 'visible',
    opacity: 1,
  },
}));

const Loader = styled(Box)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '10px',
  margin: '80px auto',
  position: 'relative',
  textIndent: '-9999em',
  transform: 'translateZ(0)',
  animation: 'load7 1.8s infinite ease-in-out',
  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    borderRadius: '50%',
    width: '2.5em',
    height: '2.5em',
    animationFillMode: 'both',
    animation: 'load7 1.8s infinite ease-in-out',
  },
  '&:before': {
    left: '-3.5em',
    animationDelay: '-0.32s',
  },
  '&:after': {
    left: '3.5em',
    animationDelay: '-0.16s',
  },
  '@keyframes load7': {
    '0%, 80%, 100%': {
      boxShadow: '0 2.5em 0 -1.3em',
    },
    '40%': {
      boxShadow: '0 2.5em 0 0',
    },
  },
}));
const LoadingOverlay = ({ children, show }) => {
  return (
    <Overlay className={show ? 'show' : ''}>
      <Spanner className="spanner show">
        <Loader className="loader"></Loader>
        <Typography>Uploading music file, please be patient.</Typography>
      </Spanner>
      {children}
    </Overlay>
  );
};

export default LoadingOverlay;
