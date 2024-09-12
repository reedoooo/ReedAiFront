import { TabGroup, TabPanel, TabPanels } from '@headlessui/react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
  EditIcon,
  FileCopyIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
} from 'assets/humanIcons';
import { useCopyToClipboard, useMode } from 'hooks';

export const CurrentPromptRenderer = ({ prompt, isOpen, onToggle }) => {
  const { copyToClipboard } = useCopyToClipboard();
  const handleCopy = () => {
    copyToClipboard(prompt.content);
    console.log('Prompt copied to clipboard', prompt.content);
  };
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        initial: { opacity: 0, height: 0 },
        enter: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
      }}
      transition={{ duration: 0.3 }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(211, 211, 211, 0.2)',
            borderRadius: '5px',
            p: '0.15rem',
          },
        }}
      >
        <Typography variant="subtitle2">{prompt.title}</Typography>
        <IconButton onClick={onToggle} size="small" color="white">
          {isOpen ? (
            <KeyboardArrowUpIcon
              fontSize="small"
              style={{ color: '#E8E8FD' }}
            />
          ) : (
            <KeyboardArrowDownIcon
              fontSize="small"
              style={{ color: '#E8E8FD' }}
            />
          )}
        </IconButton>
      </Box>
      {isOpen && (
        <Box
          sx={{
            my: '0.25rem',
            py: '0.25rem',
            border: '1px solid #E8E8FD',
            borderRadius: '10px',
            padding: '0.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="body2" className="mt-2 text-sm text-gray-500">
            {prompt.content}
          </Typography>
          <IconButton
            onClick={handleCopy}
            size="small"
            color="white"
            sx={{ alignSelf: 'flex-start', mt: '0.5rem' }}
          >
            <FileCopyIcon fontSize="small" style={{ color: '#E8E8FD' }} />
          </IconButton>
        </Box>
      )}
    </motion.div>
  );
};

export default CurrentPromptRenderer;
