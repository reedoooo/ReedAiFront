import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StyledButton } from 'components/chat/styled';
import PromptForm from './prompt-form';

export const EditPrompt = ({ prompt, onUpdate }) => {
  const [promptData, setPromptData] = useState(
    prompt || {
      name: '',
      content: '',
      role: '',
      description: '',
    }
  );

  useEffect(() => {
    if (prompt) {
      setPromptData(prompt);
    }
  }, [prompt]);

  const handleUpdate = () => {
    onUpdate(promptData);
  };

  return (
    <Box>
      <PromptForm
        promptData={promptData}
        setPromptData={setPromptData}
        isEdit={true}
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
};

export default EditPrompt;
