import { Box } from '@mui/material';
import { StyledButton } from 'components/chat/styled';
import { TextAreaAutosizeSection, TextFieldSection } from 'components/themed';

export const PromptForm = ({ promptData, setPromptData, isEdit = false }) => (
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
        label="Name"
        value={promptData.name}
        onChange={e =>
          setPromptData(prev => ({ ...prev, name: e.target.value }))
        }
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
        value={promptData.content}
        onChange={e =>
          setPromptData(prev => ({ ...prev, content: e.target.value }))
        }
      />
    </Box>
    <Box sx={{ mt: 2 }}>
      <TextFieldSection
        label="Role"
        value={promptData.role}
        onChange={e =>
          setPromptData(prev => ({ ...prev, role: e.target.value }))
        }
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
        value={promptData.description}
        onChange={e =>
          setPromptData(prev => ({ ...prev, description: e.target.value }))
        }
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
