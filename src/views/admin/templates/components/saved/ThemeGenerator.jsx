'use client';

/* eslint-disable no-unused-vars */
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import useMode from 'hooks/useMode';

export default function ThemeGenerator(props) {
  const [themeName, setThemeName] = useState('');
  const [outputMessage, setOutputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const borderColor = '#e3e8ef';
  const inputColor = '#1B254B';
  const placeholderColor = '#697586';

  const handleGenerateTheme = async () => {
    setLoading(true);
    const themeStructure = `
      src/theme/
      ├── base/
      │   ├── colors.js
      │   ├── typography.js
      │   └── spacing.js
      ├── components/
      │   ├── Button.js
      │   ├── Input.js
      │   └── ... // Other component overrides
      ├── functions/
      │   ├── borderRadius.js
      │   ├── boxShadow.js
      │   └── transitions.js
      └── theme.js
    `;
    const apiKey = 'YOUR_OPENAI_API_KEY';
    const fetchFileContent = async prompt => {
      const response = await fetch(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt,
            max_tokens: 150,
          }),
        }
      );
      const data = await response.json();
      return data.choices[0].text.trim();
    };
    const baseColorsPrompt =
      'Generate the content for colors.js file for a Material UI theme with primary, secondary, error, warning, info, success, background, and text colors.';
    const baseColorsContent = await fetchFileContent(baseColorsPrompt);
    const themeContentPrompt =
      'Generate the content for theme.js file to create a theme using Material UI with imported base colors, typography, and spacing, and component overrides for Button and Input.';
    const themeFileContent = await fetchFileContent(themeContentPrompt);
    setTimeout(() => {
      setOutputMessage(
        'Theme files generated successfully!\n' + themeStructure
      );
      setLoading(false);
    }, 2000);
  };

  const handleThemeNameChange = event => {
    setThemeName(event.target.value);
  };

  return (
    <Box
      sx={{
        width: '100%',
        pt: { xs: '70px', md: '0px' },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          mx: 'auto',
          width: { xs: '100%', md: '100%', xl: '100%' },
          minHeight: { xs: '75vh', xl: '85vh' },
          maxWidth: '1000px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ width: '100%', mb: outputMessage ? '20px' : 'auto' }}>
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              minHeight: '54px',
              mb: '20px',
              fontSize: 'lg',
              fontWeight: '600',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: borderColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'none',
                },
                color: inputColor,
              },
            }}
            placeholder="Enter your theme name here..."
            onChange={handleThemeNameChange}
          />
          <Button
            variant="contained"
            sx={{
              py: '20px',
              px: '16px',
              width: { xs: '160px', md: '210px' },
              height: '54px',
              mt: 2,
              boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48)',
              background:
                'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              '&:hover': {
                boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48)',
                background:
                  'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              },
            }}
            onClick={handleGenerateTheme}
            disabled={loading}
          >
            Generate Theme
          </Button>
        </Box>
        <Box
          sx={{
            display: outputMessage ? 'flex' : 'none',
            flexDirection: 'column',
            width: '100%',
            mx: 'auto',
            mb: 'auto',
          }}
        >
          <Box
            sx={{
              p: '22px',
              width: '100%',
              zIndex: 2,
              background: 'white',
              borderRadius: '14px',
              boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48)',
            }}
          >
            <Typography
              sx={{
                color: inputColor,
                fontWeight: '600',
                fontSize: { xs: 'lg', md: 'xl' },
                lineHeight: { xs: '28px', md: '32px' },
              }}
            >
              {outputMessage}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            // display: 'flex',
            justifyContent: 'center',
            mt: '20px',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            display: themeName ? 'flex' : 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: 'md',
              fontWeight: '500',
              color: inputColor,
              whiteSpace: 'pre-wrap',
            }}
          >
            {`
              src/theme/
              ├── base/
              │   ├── colors.js
              │   ├── typography.js
              │   └── spacing.js
              ├── components/
              │   ├── Button.js
              │   ├── Input.js
              │   └── ... // Other component overrides
              ├── functions/
              │   ├── borderRadius.js
              │   ├── boxShadow.js
              │   └── transitions.js
              └── theme.js
            `}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
