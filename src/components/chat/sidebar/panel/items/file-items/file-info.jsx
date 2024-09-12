import { Box } from '@mui/material';
import { StyledButton, StyledTextField } from 'components/chat/styled';

export const FileInfo = ({ fileDescription, setFileDescription }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-between',
    }}
  >
    <StyledTextField
      label="File Description"
      value={fileDescription}
      onChange={e => setFileDescription(e.target.value)}
      fullWidth
      margin="normal"
    />
    <StyledButton variant="outlined" component="label">
      Choose File <input type="file" hidden />
    </StyledButton>
    <Box>
      <StyledButton variant="outlined" style={{ marginRight: '10px' }}>
        Cancel
      </StyledButton>
      <StyledButton variant="outlined">Save</StyledButton>
    </Box>
  </Box>
);

export default FileInfo;
