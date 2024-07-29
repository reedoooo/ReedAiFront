/* eslint-disable max-len */
import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { AspectRatioBox, StyledPaper } from 'components/index';
import useMode from 'hooks/useMode';

export function TypingAnimation() {
  const { theme } = useMode();
  const [text, setText] = useState('');
  const coverLetter =
    'Dear Hiring Manager,\n\nI am excited to apply for the role at your company. I believe my skills and background make me a good fit.\nThank you for considering my application.\n\nSincerely,\n[Your Name]';
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);
  useEffect(() => {
    const typeLetter = () => {
      if (indexRef.current < coverLetter.length) {
        setText(coverLetter.substring(0, indexRef.current + 1));
        indexRef.current += 1;
        timeoutRef.current = setTimeout(typeLetter, 70); // Controls the typing speed
      } else {
        timeoutRef.current = setTimeout(() => {
          setText('');
          indexRef.current = 0;
          typeLetter();
        }, 3000); // Wait 3 seconds before clearing and restarting
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
          component="pre" // Preformatted text to maintain whitespace
          sx={{
            fontFamily: '"Courier New", Courier, monospace', // Typewriter-style font
            fontSize: '1rem',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap', // Wraps text and preserves spaces and line breaks
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
      </StyledPaper>
    </AspectRatioBox>
  );
}

export default TypingAnimation;
