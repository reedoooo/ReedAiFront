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
import React, { useState, useEffect } from 'react';
import { StyledButton } from 'components/chat/styled';
import { TextFieldSection } from 'components/themed';

export const PromptSuggest = ({ theme, prompts, setPrompts }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newPrompt, setNewPrompt] = useState({ title: '', content: '' });
  const [openPromptIndex, setOpenPromptIndex] = useState(null);
  const [downloadURL, setDownloadURL] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewPrompt(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPrompt = () => {
    if (newPrompt.title && newPrompt.content) {
      setPrompts(prev => [...prev, newPrompt]);
      setNewPrompt({ title: '', content: '' });
    }
  };

  const handleToggle = index => {
    setOpenPromptIndex(openPromptIndex === index ? null : index);
  };

  const changeShowModal = (action, prompt) => {
    // Implement modal logic here
  };

  const downloadPromptTemplate = async () => {
    try {
      const response = await fetch(downloadURL);
      const data = await response.json();
      // Process the downloaded data
      console.log(data);
      // You might want to add the downloaded prompts to your existing prompts
      // setPrompts(prev => [...prev, ...data]);
    } catch (error) {
      console.error('Error downloading prompt template:', error);
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
    // Add more categories as needed
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6">Suggested Prompts</Typography>
      <StyledButton onClick={downloadPromptTemplate}>
        Get Suggested Prompts
      </StyledButton>
      <motion.div layout>
        <Box p={2}>
          <Typography variant="body2">
            Note: Please verify the source of the downloaded JSON file, as
            malicious JSON files may harm your computer!
          </Typography>
          <Grid container spacing={2} alignItems="center" mt={2}>
            <Grid item xs={isMobile ? 12 : 10}>
              <TextFieldSection
                label="Download URL"
                value={downloadURL}
                onChange={e => setDownloadURL(e.target.value)}
                variant="darkMode"
                fullWidth
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
                title={info.key}
                sx={{ flex: isMobile ? '1 0 100%' : '1 0 30%' }}
                variant="outlined"
              >
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
