import { Box, TextareaAutosize } from '@mui/material';
import React from 'react';
import { StyledButton, StyledTextField } from 'components/chat/styled';
import { TextAreaAutosizeSection, TextFieldSection } from 'components/themed';

export const PromptForm = ({
  fileName,
  setFileName,
  fileContent,
  setFileContent,
  isEdit = false,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-between',
    }}
  >
    <TextFieldSection
      label="File Name"
      value={fileName}
      onChange={e => setFileName(e.target.value)}
      variant="darkMode"
      fullWidth
    />
    <Box sx={{ mt: 2 }}>
      <TextAreaAutosizeSection
        label="Content"
        // minRows={3}
        // maxRows={5}
        minRows={10}
        placeholder="Enter your prompt here..."
        variant="darkMode"
        value={fileContent}
        onChange={e => setFileContent(e.target.value)}
      />
    </Box>
    <Box>
      <StyledButton variant="outlined" style={{ marginRight: '10px' }}>
        Cancel
      </StyledButton>
      <StyledButton variant="outlined">
        {isEdit ? 'Update' : 'Save'}
      </StyledButton>
    </Box>
  </Box>
);

export default PromptForm;
