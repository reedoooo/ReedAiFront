import { Box } from '@mui/material';
import React from 'react';
import { useChatStore } from 'contexts/ChatProvider';
import useDialog from 'hooks/useDialog';
import useMenu from 'hooks/useMenu';
import ContentTypeDropDown from './ContentTypeDropDown.jsx';
import {
  APIModal,
  CodeInsert,
  EmojiDropDown,
  FileUpload,
  FormTemplatesDropDown,
  SettingsDialog,
  SnippetsDropDown,
} from './index.jsx';

const handleFormContentInsert = (editor, form) => {
  const formElements = {
    'Text input': '<input type="text" placeholder="Enter text here"/>',
    Checkbox: '<input type="checkbox"/> Checkbox',
    'Radio button': '<input type="radio"/> Radio button',
    'File input': '<input type="file"/>',
  };
  editor.commands.insertContent(formElements[form] || '');
};

export const InputActions = ({
  isFirstMessage,
  setUserInput,
  setFileInput,
  editor,
  theme,
}) => {
  const snippetsMenu = useMenu();
  const formMenu = useMenu();
  const settingsDialog = useDialog();
  const apiModalDialog = useDialog();
  const chatStore = useChatStore();
  const contentMenu = useMenu();
  return (
    <Box>
      <CodeInsert editor={editor} theme={theme} />
      <EmojiDropDown editor={editor} theme={theme} />
      <SnippetsDropDown
        anchorEl={snippetsMenu.anchorEl}
        handleClose={snippetsMenu.handleMenuClose}
        handleMenuOpen={snippetsMenu.handleMenuOpen}
        handleSnippetSelect={snippet => {
          editor.chain().focus().insertContent(snippet).run();
          snippetsMenu.handleMenuClose();
        }}
      />
      <FileUpload
        showUploaderButton={true}
        sessionId={chatStore.state.sessionId}
        // onFileChange={event => {
        //   const file = event.target.files[0];
        //   if (file) {
        //     console.log('File selected:', file.name);
        //   }
        // }}
        setUserInput={setUserInput}
        editor={editor}
        setFileInput={setFileInput}
        iconStyle={{ color: theme.palette.primary.main, fontSize: 20 }}
      />
      <FormTemplatesDropDown
        anchorEl={formMenu.anchorEl}
        handleClose={formMenu.handleMenuClose}
        handleMenuOpen={formMenu.handleMenuOpen}
        handleFormSelect={form => handleFormContentInsert(editor, form)}
      />
      <SettingsDialog
        open={settingsDialog.open}
        onClose={settingsDialog.handleClose}
        tabValue={settingsDialog.value}
        handleTabChange={(event, newValue) =>
          settingsDialog.handleChange(event, newValue)
        }
      />
      <APIModal
        open={apiModalDialog.open}
        onClose={apiModalDialog.handleClose}
        onOpen={apiModalDialog.handleOpen}
        setApiKey={chatStore.actions.setApiKey}
        handleCloseApiModal={apiModalDialog.handleClose}
      />
      <ContentTypeDropDown
        isFirstMessage={isFirstMessage}
        setUserInput={setUserInput}
        setFileInput={setFileInput}
        open={contentMenu.isOpen}
        anchorEl={contentMenu.anchorEl}
        handleClose={contentMenu.handleMenuClose}
        handleMenuOpen={contentMenu.handleMenuOpen}
      />
    </Box>
  );
};

export default InputActions;
