import EmojiPicker from '@emoji-mart/react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
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
import { useMenu, useMode, useTipTapEditor } from 'hooks';
import ApiModal from './ApiModal';

export const ToolDial = () => {
  const { theme } = useMode();
  const chatStore = useChatStore();
  const { insertForm, insertCodeBlock, insertContentAndSync, editor } =
    useTipTapEditor();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [apiModalOpen, setApiModalOpen] = useState(false);

  const toggleSpeedDial = useCallback(() => {
    setSpeedDialOpen(prevOpen => !prevOpen);
  }, []);

  const formMenu = useMenu();

  const handleCloseDial = useCallback(() => {
    formMenu.handleMenuClose();
    toggleSpeedDial();
  }, [formMenu, toggleSpeedDial]);

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
    setApiModalOpen(false);
  }, [chatStore.actions, inputCode]);

  const handleApiModalToggle = useCallback(() => {
    setApiModalOpen(prev => !prev);
  }, []);

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
      onClick: handleApiModalToggle,
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
    <Box
      sx={{
        position: 'fixed',
        bottom: '75px',
        right: '15px',
        margin: '0',
        zIndex: 1000,
      }}
    >
      <RCSpeedDial
        actions={actions}
        onOpen={toggleSpeedDial}
        onClose={handleCloseDial}
        open={speedDialOpen}
        hidden={false}
        variant={theme.palette.mode === 'dark' ? 'darkMode' : 'default'}
      />
      <ApiModal
        open={apiModalOpen}
        onClose={handleApiModalToggle}
        inputCode={inputCode}
        onInputChange={handleChange}
        onSubmit={handleSubmit}
      />
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
          {['Select input', 'Text input'].map(form => (
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
