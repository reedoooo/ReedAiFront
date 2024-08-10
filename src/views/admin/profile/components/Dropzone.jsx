/* eslint-disable no-unused-vars */
import { Box, Button, Input } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { styled as styledDefault } from 'styled-components';
import { useMode } from 'hooks';

const DropzoneContainer = styledDefault(Box)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.grey[100],
  border: `1px dashed ${theme.palette.grey[300]}`,
  borderRadius: 16,
  width: '100%',
  height: 'max-content',
  minHeight: '100%',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
}));

const Dropzone = props => {
  const { content, ...rest } = props;
  const { getRootProps, getInputProps } = useDropzone();
  const { theme } = useMode();

  return (
    <DropzoneContainer theme={theme} {...getRootProps()} {...rest}>
      <Input {...getInputProps()} style={{ display: 'none' }} />
      <Button variant="contained" disableElevation>
        {content}
      </Button>
    </DropzoneContainer>
  );
};

export default Dropzone;
