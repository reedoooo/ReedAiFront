import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import CodeEditor from './components/CodeEditor';

export const EditorEnvironment = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: '90vh',
          backgroundColor: '#0f0a19',
          color: '#a0aec0',
          px: 3, // Equivalent to Chakra UI's px={6}
          py: 4, // Equivalent to Chakra UI's py={8}
          pt: { xs: '130px', sm: '80px' },
        }}
      >
        <CodeEditor />
      </Box>
    </>
  );
};

export default EditorEnvironment;
