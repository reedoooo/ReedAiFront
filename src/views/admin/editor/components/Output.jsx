import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { executeCode } from 'api/editor';

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split('\n'));
      setIsError(result.stderr ? true : false);
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.message || 'Unable to run code');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="100%">
      <Typography variant="h6" mb={2}>
        Output
      </Typography>
      <Button
        variant="outlined"
        color="success"
        sx={{ mb: 2 }}
        disabled={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        sx={{
          color: isError ? 'error.main' : 'inherit',
          border: '1px solid',
          borderRadius: 1,
          borderColor: isError ? 'error.main' : '#333',
        }}
      >
        {output
          ? output.map((line, i) => <Typography key={i}>{line}</Typography>)
          : 'Click "Run Code" to see the output here'}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Output;
