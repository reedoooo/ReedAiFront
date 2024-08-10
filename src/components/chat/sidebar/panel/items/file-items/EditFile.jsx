import { TextareaAutosize, Box } from '@mui/material';
import React, { useState } from 'react';
import {
  StyledButton,
  StyledTextField,
  StyledMuiTabs,
} from 'components/chat/styled';

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
    <StyledTextField
      label="File Name"
      value={fileName}
      onChange={e => setFileName(e.target.value)}
      fullWidth
      margin="normal"
    />
    <TextareaAutosize
      minRows={10}
      placeholder="File content..."
      value={fileContent}
      onChange={e => setFileContent(e.target.value)}
      style={{
        width: '100%',
        margin: '10px 0',
        p: 2,
        color: '#fff',
        borderColor: 'grey',
        background: '#000',
        borderRadius: '5px',
      }}
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
