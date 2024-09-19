// components/FileForm.js
import { Button, InputLabel, TextField, Box } from '@mui/material';
import React from 'react';
import { formatFileSize } from '@/lib/fileUtils';
import { TextAreaAutosizeSection, TextFieldSection } from 'components/themed';

export const FileForm = ({
  fileName,
  setFileName,
  description,
  setDescription,
  fileContent,
  setFileContent,
  selectedFile,
  handleSelectedFile,
  isEditMode,
  acceptedFileTypes,
  fileNameMaxLength,
  fileDescriptionMaxLength,
}) => (
  <>
    {!isEditMode && (
      <div style={{ marginBottom: '16px' }}>
        <InputLabel>File</InputLabel>
        <Button variant="contained" component="label" sx={{ marginTop: 1 }}>
          Upload File
          <input
            type="file"
            hidden
            onChange={handleSelectedFile}
            accept={acceptedFileTypes}
          />
        </Button>
      </div>
    )}

    <div style={{ marginBottom: '16px' }}>
      <TextFieldSection
        label="File Name"
        value={fileName}
        onChange={e => setFileName(e.target.value)}
        variant="darkMode"
        placeholder="File name..."
        fullWidth
      />
    </div>
    {isEditMode && (
      <div style={{ marginBottom: '16px' }}>
        <TextAreaAutosizeSection
          label="File Description"
          minRows={3}
          maxRows={5}
          placeholder="File description..."
          variant="darkMode"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
    )}

    {isEditMode && selectedFile && (
      <>
        <div style={{ marginBottom: '16px' }}>
          <TextAreaAutosizeSection
            label="File Content"
            minRows={3}
            maxRows={5}
            placeholder="File content..."
            variant="darkMode"
            value={fileContent}
            onChange={e => setFileContent(e.target.value)}
          />
        </div>

        <Box mt={2}>
          <p>
            <strong>Type:</strong> {selectedFile.type || 'N/A'}
          </p>
          <p>
            <strong>Size:</strong>{' '}
            {selectedFile.size ? formatFileSize(selectedFile.size) : 'N/A'}
          </p>
          <p>
            <strong>Last Modified:</strong>{' '}
            {selectedFile.lastModified
              ? new Date(selectedFile.lastModified).toLocaleString()
              : 'N/A'}
          </p>
        </Box>
      </>
    )}
  </>
);

export default FileForm;
