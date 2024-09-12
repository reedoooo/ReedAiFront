import { Box, Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import { TextFieldSection } from 'components/themed';
import { FormSectionLabel } from 'components/themed/HumanUi/RCComposables/container-components';
import { useUserStore } from 'contexts/UserProvider';

export const ApiKeys = () => {
  const {
    state: {
      user: { openai, profile },
    },
  } = useUserStore();

  const [openaiAPIKey, setOpenaiAPIKey] = useState(openai.apiKey || '');
  const [openaiOrgID, setOpenaiOrgID] = useState(openai.organization_id || '');
  const [anthropicAPIKey, setAnthropicAPIKey] = useState(
    profile.envKeyMap.anthropic_api_key || ''
  );
  const [googleGeminiAPIKey, setGoogleGeminiAPIKey] = useState(
    profile.envKeyMap.google_gemini_api_key || ''
  );
  const [mistralAPIKey, setMistralAPIKey] = useState(
    profile.envKeyMap.mistral_api_key || ''
  );
  const [groqAPIKey, setGroqAPIKey] = useState(
    profile.envKeyMap.groq_api_key || ''
  );
  const [perplexityAPIKey, setPerplexityAPIKey] = useState(
    profile.envKeyMap.perplexity_api_key || ''
  );
  const [openrouterAPIKey, setOpenrouterAPIKey] = useState(
    profile.envKeyMap.openrouter_api_key || ''
  );

  const handleApiKeyChange = (key, value) => {
    // This function should be implemented to handle API key changes
    // For now, it's just a placeholder
    console.log(`API key ${key} changed to ${value}`);
  };

  const handleSaveApiKeys = () => {
    // This function should be implemented to save all API keys
    // For now, it's just a placeholder
    console.log('Saving API keys');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <FormSectionLabel label="API Keys" />
      <Divider sx={{ color: '#ffffff', marginBottom: '5px' }} />

      <TextFieldSection
        label="OpenAI API Key"
        variant="darkMode"
        fullWidth
        value={openaiAPIKey}
        onChange={e => {
          setOpenaiAPIKey(e.target.value);
          handleApiKeyChange('openai_api_key', e.target.value);
        }}
      />

      <TextFieldSection
        label="OpenAI Organization ID"
        variant="darkMode"
        fullWidth
        value={openaiOrgID}
        onChange={e => {
          setOpenaiOrgID(e.target.value);
          handleApiKeyChange('openai_organization_id', e.target.value);
        }}
      />

      <TextFieldSection
        label="Anthropic API Key"
        variant="darkMode"
        fullWidth
        value={anthropicAPIKey}
        onChange={e => {
          setAnthropicAPIKey(e.target.value);
          handleApiKeyChange('anthropic_api_key', e.target.value);
        }}
      />

      <TextFieldSection
        label="Google Gemini API Key"
        variant="darkMode"
        fullWidth
        value={googleGeminiAPIKey}
        onChange={e => {
          setGoogleGeminiAPIKey(e.target.value);
          handleApiKeyChange('google_gemini_api_key', e.target.value);
        }}
      />

      <TextFieldSection
        label="Mistral API Key"
        variant="darkMode"
        fullWidth
        value={mistralAPIKey}
        onChange={e => {
          setMistralAPIKey(e.target.value);
          handleApiKeyChange('mistral_api_key', e.target.value);
        }}
      />

      <TextFieldSection
        label="Groq API Key"
        variant="darkMode"
        fullWidth
        value={groqAPIKey}
        onChange={e => {
          setGroqAPIKey(e.target.value);
          handleApiKeyChange('groq_api_key', e.target.value);
        }}
      />

      <TextFieldSection
        label="Perplexity API Key"
        variant="darkMode"
        fullWidth
        value={perplexityAPIKey}
        onChange={e => {
          setPerplexityAPIKey(e.target.value);
          handleApiKeyChange('perplexity_api_key', e.target.value);
        }}
      />

      <TextFieldSection
        label="OpenRouter API Key"
        variant="darkMode"
        fullWidth
        value={openrouterAPIKey}
        onChange={e => {
          setOpenrouterAPIKey(e.target.value);
          handleApiKeyChange('openrouter_api_key', e.target.value);
        }}
      />

      <Button
        variant="contained"
        onClick={handleSaveApiKeys}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.2)',
          },
          marginTop: '20px',
          alignSelf: 'center',
        }}
      >
        Save API Keys
      </Button>
    </Box>
  );
};
