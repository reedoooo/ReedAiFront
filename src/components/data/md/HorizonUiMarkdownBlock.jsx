import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownBlock = ({
  code,
  editable = false,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState('Copy');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant="contained"
        size="small"
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 10,
          backgroundColor: '#1A1B26',
          color: 'white',
          '&:hover': {
            backgroundColor: '#2D2E3A',
          },
          '&:active': {
            backgroundColor: '#2D2E3A',
          },
        }}
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
        <Typography variant="caption">{copyText}</Typography>
      </Button>
      <Box
        sx={{
          p: 4,
          height: '500px',
          backgroundColor: '#1A1B26',
          color: 'white',
          overflow: 'scroll',
          borderRadius: '4px',
        }}
      >
        <ReactMarkdown className="font-normal">{code}</ReactMarkdown>
      </Box>
    </Box>
  );
};
