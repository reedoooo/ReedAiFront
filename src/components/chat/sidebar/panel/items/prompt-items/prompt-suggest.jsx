import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Card,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { settingsApi } from 'api/Ai/chat-items';

export const PromptSuggest = ({ theme, onImport, prompts, setPrompts }) => {
  const [downloadURL, setDownloadURL] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const downloadPromptTemplate = async () => {
    try {
      const response = await settingsApi.downloadPromptTemplate(downloadURL);
      onImport(JSON.stringify(response));
    } catch (error) {
      console.error('Error downloading prompt template:', error);
      alert(
        'Error downloading prompt template. Please check the URL and try again.'
      );
    }
  };

  const PromptRecommend = [
    {
      key: 'General',
      desc: 'General purpose prompts',
      url: '#',
      downloadUrl: '/prompts/general.json',
    },
    {
      key: 'Coding',
      desc: 'Coding related prompts',
      url: '#',
      downloadUrl: '/prompts/coding.json',
    },
    {
      key: 'Writing',
      desc: 'Writing assistance prompts',
      url: '#',
      downloadUrl: '/prompts/writing.json',
    },
    {
      key: 'awesome-chatgpt-prompts-en',
      desc: 'ChatGPT English Prompts',
      downloadUrl: '/static/awesome-chatgpt-prompts-en.json',
      url: 'https://github.com/f/awesome-chatgpt-prompts',
    },
  ];

  return (
    <Box>
      <Typography variant="h6">Suggested Prompts</Typography>
      <motion.div layout>
        <Box p={2}>
          <Typography variant="body2">
            Note: Please verify the source of the downloaded JSON file, as
            malicious JSON files may harm your computer!
          </Typography>
          <Grid container spacing={2} alignItems="center" mt={2}>
            <Grid item xs={isMobile ? 12 : 10}>
              <TextField
                fullWidth
                value={downloadURL}
                onChange={e => setDownloadURL(e.target.value)}
                placeholder="Enter a valid JSON URL"
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 2}>
              <Button
                variant="contained"
                fullWidth
                disabled={!downloadURL.trim()}
                onClick={downloadPromptTemplate}
              >
                Download
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              height: 360,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {PromptRecommend.map(info => (
              <Card
                key={info.key}
                sx={{ flex: isMobile ? '1 0 100%' : '1 0 30%' }}
                variant="outlined"
              >
                <Typography variant="h6">{info.key}</Typography>
                <Typography variant="body2">{info.desc}</Typography>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="text"
                    component="a"
                    href={info.url}
                    target="_blank"
                  >
                    🔗
                  </Button>
                  <Button
                    variant="text"
                    onClick={() =>
                      setDownloadURL(`http://localhost:3001${info.downloadUrl}`)
                    }
                  >
                    ➕
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default PromptSuggest;
