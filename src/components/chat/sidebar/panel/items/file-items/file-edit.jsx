// components/EditFile.js
import { Box } from '@mui/material';
import React from 'react';
import { StyledButton } from 'components/chat/styled';
import FileForm from './file-form';

export const EditFile = ({
  fileName,
  setFileName,
  fileContent,
  setFileContent,
  fileDescription,
  setFileDescription,
  selectedFile,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-between',
    }}
  >
    <FileForm
      fileName={fileName}
      setFileName={setFileName}
      fileContent={fileContent}
      setFileContent={setFileContent}
      selectedFile={selectedFile}
      fileDescription={fileDescription}
      setFileDescription={setFileDescription}
      isEditMode={true}
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

// import { Box, TextareaAutosize } from '@mui/material';
// import React from 'react';
// import { formatFileSize } from '@/lib/fileUtils';
// import { StyledButton, StyledTextField } from 'components/chat/styled';
// import { TextAreaAutosizeSection, TextFieldSection } from 'components/themed';

// export const EditFile = ({
//   fileName,
//   setFileName,
//   fileContent,
//   setFileContent,
//   selectedFile,
// }) => (
//   <Box
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       width: '100%',
//       justifyContent: 'space-between',
//     }}
//   >
// <TextFieldSection
//   label="File Name"
//   value={fileName}
//   onChange={e => setFileName(e.target.value)}
//   variant="darkMode"
//   fullWidth
// />{' '}
// <TextAreaAutosizeSection
//   label="File Content"
//   minRows={3}
//   maxRows={5}
//   placeholder="File content..."
//   variant="darkMode"
//   value={fileContent}
//   onChange={e => setFileContent(e.target.value)}
// />
//     <Box mt={2}>
//       <p>
//         <strong>Type:</strong> {selectedFile.type || 'N/A'}
//       </p>
//       <p>
//         <strong>Size:</strong>{' '}
//         {selectedFile.size ? formatFileSize(selectedFile.size) : 'N/A'}
//       </p>
//       <p>
//         <strong>Last Modified:</strong>{' '}
//         {selectedFile.lastModified
//           ? new Date(selectedFile.lastModified).toLocaleString()
//           : 'N/A'}
//       </p>
//     </Box>
//     <Box>
//       <StyledButton variant="outlined" style={{ marginRight: '10px' }}>
//         Cancel
//       </StyledButton>
//       <StyledButton variant="outlined">Save</StyledButton>
//     </Box>
//   </Box>
// );

// export default EditFile;
