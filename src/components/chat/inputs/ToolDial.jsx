// InputActions.js
import EmojiPicker from '@emoji-mart/react';
import {
  Box,
  SpeedDialIcon,
  TextField,
  Button,
  IconButton,
  Modal,
  Typography,
  Card,
  Link,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { MdLock } from 'react-icons/md';
import {
  CodeIcon,
  EmojiEmotionsIcon,
  InsertDriveFileOutlined,
  ApiIcon,
} from 'assets/humanIcons';
import { RCSpeedDial } from 'components/themed';
import { useChatStore } from 'contexts/ChatProvider';
import { useDialog, useMenu, useMode, useTipTapEditor } from 'hooks';

export const ToolDial = () => {
  const { theme } = useMode();
  const chatStore = useChatStore();
  const { insertForm, insertCodeBlock, insertContentAndSync, editor } =
    useTipTapEditor();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const toggleSpeedDial = useCallback(() => {
    setSpeedDialOpen(prevOpen => !prevOpen);
  }, []);

  const formMenu = useMenu();
  const apiModalDialog = useDialog();

  const handleCloseDial = useCallback(() => {
    apiModalDialog.handleClose();
    formMenu.handleMenuClose();
    toggleSpeedDial();
  }, [apiModalDialog, formMenu, toggleSpeedDial]);
  const forms = ['Select input', 'Text input'];
  const handleInsertCodeBlock = useCallback(() => {
    if (editor) {
      insertCodeBlock();
    }
  }, [editor, insertCodeBlock]);

  const handleChange = useCallback(event => {
    setInputCode(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    chatStore.actions.setApiKey(inputCode);
    apiModalDialog.handleClose();
  }, [chatStore.actions, inputCode, apiModalDialog]);

  const handleBackdropClick = useCallback(
    event => {
      if (event.target === event.currentTarget) {
        apiModalDialog.handleClose();
      }
    },
    [apiModalDialog]
  );
  const actions = [
    {
      icon: <CodeIcon />,
      name: 'CodeBlock',
      title: 'Insert Code',
      onClick: handleInsertCodeBlock,
    },
    {
      icon: <EmojiEmotionsIcon />,
      name: 'Emoji',
      title: 'Insert Emoji',
      onClick: () => setShowEmojiPicker(prev => !prev),
    },
    {
      icon: <InsertDriveFileOutlined />,
      name: 'Form',
      title: 'Insert Form',
      onClick: formMenu.toggle,
    },
    {
      icon: <ApiIcon />,
      name: 'Api',
      title: 'API Settings',
      onClick: apiModalDialog.toggle,
    },
  ];
  useEffect(() => {
    // Cleanup on unmount if necessary
    return () => {
      setShowEmojiPicker(false);
      setSpeedDialOpen(false);
      setInputCode('');
    };
  }, []);
  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <RCSpeedDial
        actions={actions}
        onOpen={toggleSpeedDial}
        onClose={handleCloseDial}
        open={speedDialOpen}
        hidden={false}
        variant={theme.palette.mode === 'dark' ? 'darkMode' : 'default'}
      />
      {apiModalDialog.open && (
        <Modal
          open={apiModalDialog.open}
          onClose={apiModalDialog.handleClose}
          slotProps={{
            backdrop: {
              onClick: handleBackdropClick,
            },
          }}
        >
          <Box
            onClick={handleBackdropClick}
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
                <IconButton onClick={apiModalDialog.handleClose}>
                  <MdLock />
                </IconButton>
              </Box>
              <Typography
                color={theme.palette.grey[500]}
                fontWeight="500"
                mb={2}
              >
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
                  onClick={handleSubmit}
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
      )}
      {formMenu.isOpen && (
        <Menu
          open={formMenu.isOpen}
          anchorEl={formMenu.anchorEl}
          onClose={formMenu.handleMenuClose}
          onOpen={formMenu.handleMenuOpen}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {forms.map(form => (
            <MenuItem key={form} onClick={() => insertForm(editor, form)}>
              {form}
            </MenuItem>
          ))}
        </Menu>
      )}
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiSelect={emoji => {
            insertContentAndSync(emoji.native);
            setShowEmojiPicker(false);
          }}
          theme="dark"
          style={{ position: 'absolute', bottom: '60px', left: '20px' }}
        />
      )}
    </Box>
  );
};

export default ToolDial;
