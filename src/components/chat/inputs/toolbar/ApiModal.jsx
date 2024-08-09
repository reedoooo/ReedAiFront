import {
  Box,
  Button,
  Card,
  IconButton,
  Link,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { MdLock } from 'react-icons/md';
import { ApiIcon } from 'assets/humanIcons';
import { useMode } from 'hooks';

export const APIModal = ({ open, onClose, setApiKey, onOpen }) => {
  const [inputCode, setInputCode] = useState('');
  const { theme } = useMode();

  const handleChange = event => {
    setInputCode(event.target.value);
  };

  const handleApiKeyChange = () => {
    setApiKey(inputCode);
    localStorage.setItem('apiKey', inputCode);
    onClose();
  };

  return (
    <>
      <IconButton onClick={onOpen}>
        <ApiIcon style={{ color: theme.palette.primary.main, fontSize: 20 }} />
      </IconButton>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 2,
          }}
        >
          <Card
            sx={{ p: 3, maxWidth: 500, width: '100%', textAlign: 'center' }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                color={theme.palette.text.primary}
              >
                Enter your OpenAI API Key
              </Typography>
              <IconButton onClick={onClose}>
                <MdLock />
              </IconButton>
            </Box>
            <Typography color={theme.palette.grey[500]} fontWeight="500" mb={2}>
              You need an OpenAI API Key to use Horizon AI Templates features.
              Your API Key is stored locally on your browser and never sent
              anywhere else.
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                onChange={handleChange}
                value={inputCode}
              />
              <Button
                variant="contained"
                onClick={handleApiKeyChange}
                sx={{ ml: 1 }}
              >
                Save
              </Button>
            </Box>
            <Link
              href="https://platform.openai.com/account/api-keys"
              sx={{
                color: theme.palette.primary.main,
                fontSize: 'small',
                textDecoration: 'underline',
                fontWeight: '600',
              }}
              target="_blank"
              rel="noopener"
            >
              Get your API key from OpenAI Dashboard
            </Link>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default APIModal;
