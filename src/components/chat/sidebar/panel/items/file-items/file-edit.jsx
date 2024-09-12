import { Box, TextareaAutosize } from '@mui/material';
import React from 'react';
import { StyledButton, StyledTextField } from 'components/chat/styled';
import { TextAreaAutosizeSection, TextFieldSection } from 'components/themed';

export const EditFile = ({
  fileName,
  setFileName,
  fileContent,
  setFileContent,
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
    />{' '}
    <TextAreaAutosizeSection
      label="File Content"
      minRows={3}
      maxRows={5}
      placeholder="File content..."
      variant="darkMode"
      value={fileContent}
      onChange={e => setFileContent(e.target.value)}
    />
    <Box>
      <StyledButton variant="outlined" style={{ marginRight: '10px' }}>
        Cancel
      </StyledButton>
      <StyledButton variant="outlined">Save</StyledButton>
    </Box>
  </Box>
);

export default EditFile;
