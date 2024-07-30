import { TextField, Box, Typography } from '@mui/material';
import React from 'react';

const APIStep = ({
  openaiAPIKey,
  openaiOrgID,
  perplexityAPIKey,
  openrouterAPIKey,
  onOpenaiAPIKeyChange,
  onOpenaiOrgIDChange,
  onPerplexityAPIKeyChange,
  onOpenrouterAPIKeyChange,
}) => {
  return (
    <>
      <Box mt={5} mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={'OpenAI API Key'}
          type="password"
          value={openaiAPIKey}
          onChange={e => onOpenaiAPIKeyChange(e.target.value)}
          margin="normal"
        />
      </Box>

      <Box ml={2} mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="OpenAI Organization ID (optional)"
          type="password"
          value={openaiOrgID}
          onChange={e => onOpenaiOrgIDChange(e.target.value)}
          margin="normal"
        />
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Perplexity API Key"
        type="password"
        value={perplexityAPIKey}
        onChange={e => onPerplexityAPIKeyChange(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="OpenRouter API Key"
        type="password"
        value={openrouterAPIKey}
        onChange={e => onOpenrouterAPIKeyChange(e.target.value)}
        margin="normal"
      />
      <Box mt={2}>
        <Typography variant="body2">
          Note: OpenAI API keys and Azure OpenAI API keys are required to use
          the AI features.
        </Typography>
      </Box>
    </>
  );
};

export default APIStep;
