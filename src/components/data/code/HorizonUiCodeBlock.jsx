import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { Box, Button, Typography } from '@mui/material';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import CodeMirror from '@uiw/react-codemirror';
import React, { useEffect, useState } from 'react';

export const CodeBlock = ({
  height,
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
    <Box
      sx={{
        position: 'relative',
        height: `${height}px`,
        overflow: 'scroll',
      }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 10,
          backgroundColor: '#1A1B26',
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
        <Typography variant="caption" color="white">
          {copyText}
        </Typography>
      </Button>
      <CodeMirror
        editable={editable}
        value={code}
        minHeight={`${height}px`}
        extensions={[StreamLanguage.define(go)]}
        theme={tokyoNight}
        onChange={value => onChange(value)}
        style={{
          borderRadius: '4px',
          overflow: 'scroll',
        }}
      />
    </Box>
  );
};

export default CodeBlock;
