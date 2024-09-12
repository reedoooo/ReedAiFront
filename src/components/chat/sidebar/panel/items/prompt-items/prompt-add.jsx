import { Box, Button } from '@mui/material';
import React from 'react';
import { StyledButton } from 'components/chat/styled';
import PromptForm from './prompt-form';

export const AddPrompt = ({
  fileName,
  setFileName,
  fileContent,
  setFileContent,
  fileRole,
  setFileRole,
  fileDescription,
  setFileDescription,
  onSave,
}) => (
  <Box>
    <PromptForm
      fileName={fileName}
      setFileName={setFileName}
      fileContent={fileContent}
      setFileContent={setFileContent}
      fileRole={fileRole}
      setFileRole={setFileRole}
      fileDescription={fileDescription}
      setFileDescription={setFileDescription}
    />
    <StyledButton
      variant="outlined"
      onClick={onSave}
      sx={{ mt: 2, marginRight: '10px' }}
    >
      Save Prompt
    </StyledButton>
  </Box>
);

export default AddPrompt;
