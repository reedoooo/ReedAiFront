/* eslint-disable max-len */
import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AspectRatioBox, StyledPaper } from 'components/index';
import useMode from 'hooks/useMode';

export function CodingAnimation() {
  const { theme } = useMode();
  const [text, setText] = useState('');
  const codeSnippet = `
import React from 'react';

function ExampleComponent() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is a code snippet example.</p>
    </div>
  );
}

export default ExampleComponent;
  `;
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const typeLetter = () => {
      if (indexRef.current < codeSnippet.length) {
        setText(codeSnippet.substring(0, indexRef.current + 1));
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
        <SyntaxHighlighter
          language="javascript"
          style={materialLight}
          customStyle={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '1rem',
            lineHeight: 1.6,
            padding: '1rem',
            margin: '1rem',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {text}
        </SyntaxHighlighter>
      </StyledPaper>
    </AspectRatioBox>
  );
}

export default CodingAnimation;
