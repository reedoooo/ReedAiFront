import { Box } from '@mui/material';
import { StyledButton } from 'components/chat/styled';
import { TextAreaAutosizeSection, TextFieldSection } from 'components/themed';

export const PromptForm = ({
  fileName,
  setFileName,
  fileContent,
  setFileContent,
  fileRole,
  setFileRole,
  fileDescription,
  setFileDescription,
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
    <Box sx={{ mt: 2 }}>
      <TextFieldSection
        label="File Name"
        value={fileName}
        onChange={e => setFileName(e.target.value)}
        variant="darkMode"
        fullWidth
      />
    </Box>
    <Box sx={{ mt: 2 }}>
      <TextAreaAutosizeSection
        label="Content"
        minRows={10}
        placeholder="Enter your prompt here..."
        variant="darkMode"
        value={fileContent}
        onChange={e => setFileContent(e.target.value)}
      />
    </Box>
    <Box sx={{ mt: 2 }}>
      <TextFieldSection
        label="Role"
        value={fileRole}
        onChange={e => setFileRole(e.target.value)}
        variant="darkMode"
        fullWidth
      />
    </Box>
    <Box sx={{ mt: 2 }}>
      <TextAreaAutosizeSection
        label="Description"
        minRows={10}
        placeholder="Enter a description for your prompt..."
        variant="darkMode"
        value={fileDescription}
        onChange={e => setFileDescription(e.target.value)}
      />
    </Box>
    {/* <Box>
      <StyledButton variant="outlined" style={{ marginRight: '10px' }}>
        Cancel
      </StyledButton>
      <StyledButton variant="outlined">
        {isEdit ? 'Update' : 'Save'}
      </StyledButton>
    </Box> */}
  </Box>
);

export default PromptForm;
