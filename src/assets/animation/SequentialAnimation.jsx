/* eslint-disable max-len */
import { PhotoCamera } from '@mui/icons-material';
import { Typography, CircularProgress, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { CustomLogo } from 'assets/humanIcons/custom';
import { AspectRatioBox, StyledPaper } from 'components/index';
import useMode from 'hooks/useMode';
const animationData = [
  {
    animationName: 'Resume',
    prompt: 'Generate a resume for a software developer position',
    result:
      'Dear Hiring Manager,\n\nI am excited to apply for the role at your company. I believe my skills and background make me a good fit.\nThank you for considering my application.\n\nSincerely,\n[Your Name]',
    duration: 2000, // 2 seconds for typing
  },
  {
    animationName: 'Coding',
    prompt: 'Write a React component for a button',
    result: `
			import React from 'react
			function Button() {
				return (
					<div>
						<button>Click Me</button>
					</div>
				);
			}
			export default Button;
		`,
    duration: 7000, // 7 seconds for loading
  },
  {
    animationName: 'Image',
    prompt: 'Generate a .png image of my logo',
    result: CustomLogo,
    duration: 1000, // 1 second for showing the logo
  },
];
export function SequentialAnimations() {
  const { theme } = useMode();
  const [currentAnimation, setCurrentAnimation] = useState('typing');
  const [text, setText] = useState('');

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
        setCurrentAnimation('loading');
      }
    };

    if (currentAnimation === 'typing') {
      typeLetter();
    } else if (currentAnimation === 'loading') {
      timeoutRef.current = setTimeout(() => {
        setCurrentAnimation('showLogo');
      }, 7000); // 7 seconds for loading
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentAnimation]);

  return (
    <AspectRatioBox theme={theme}>
      <StyledPaper elevation={3} theme={theme}>
        {currentAnimation === 'typing' && (
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
        )}
        {currentAnimation === 'loading' && (
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
        {currentAnimation === 'showLogo' && (
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

export default SequentialAnimations;
