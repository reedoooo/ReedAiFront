import { Box, Button } from '@mui/material';
import React from 'react';
import { StyledButton } from 'components/chat/styled';
import PromptForm from './prompt-form';

export const EditPrompt = ({
  fileName,
  setFileName,
  fileContent,
  setFileContent,
  fileRole,
  setFileRole,
  fileDescription,
  setFileDescription,
  onUpdate,
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
      onClick={onUpdate}
      sx={{ mt: 2, marginRight: '10px' }}
    >
      Update Prompt
    </StyledButton>
  </Box>
);

export default EditPrompt;
