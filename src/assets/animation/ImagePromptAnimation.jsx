/* eslint-disable max-len */
import { PhotoCamera } from '@mui/icons-material';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { AspectRatioBox, StyledPaper } from 'components/index';
import { useMode } from 'hooks';

export function ImagePromptAnimation() {
  const { theme } = useMode();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  const promptText = 'Generate a .png image of my logo';
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const typeLetter = () => {
      if (indexRef.current < promptText.length) {
        setText(promptText.substring(0, indexRef.current + 1));
        indexRef.current += 1;
        timeoutRef.current = setTimeout(typeLetter, 70); // Controls the typing speed
      } else {
        setLoading(true);
        timeoutRef.current = setTimeout(() => {
          setLoading(false);
          setShowLogo(true);
        }, 7000); // 7 seconds for loading
      }
    };
    typeLetter();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <AspectRatioBox theme={theme}>
      <StyledPaper elevation={3} theme={theme}>
        <Typography
          variant="body1"
          component="pre"
          sx={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '1rem',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            color: '#333',
            margin: '1rem',
            padding: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {text}
        </Typography>
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100px"
            marginTop="20px"
          >
            <CircularProgress />
          </Box>
        )}
        {showLogo && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100px"
            marginTop="20px"
            padding="20px"
            bgcolor="white"
          >
            <PhotoCamera style={{ fontSize: 40 }} />
          </Box>
        )}
      </StyledPaper>
    </AspectRatioBox>
  );
}

export default ImagePromptAnimation;
