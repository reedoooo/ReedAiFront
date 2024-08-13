import { Box } from '@mui/material';
import { useChatStore } from 'contexts';
import { useDialog, useMenu, useMode } from 'hooks';
import {
  APIModal,
  CodeInsert,
  EmojiDropDown,
  FormTemplatesDropDown,
  SettingsDialog,
  SnippetsDropDown,
  ContentTypeDropDown,
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
}) => {
  const chatStore = useChatStore();
  const { theme } = useMode();
  const snippetsMenu = useMenu();
  const formMenu = useMenu();
  const contentMenu = useMenu();
  const settingsDialog = useDialog();
  const apiModalDialog = useDialog();

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
      <FormTemplatesDropDown
        anchorEl={formMenu.anchorEl}
        handleClose={formMenu.handleMenuClose}
        handleMenuOpen={formMenu.handleMenuOpen}
        handleFormSelect={form => handleFormContentInsert(editor, form)}
      />
      <SettingsDialog
        open={settingsDialog.open}
        handleClose={settingsDialog.handleClose}
        handleOpen={settingsDialog.handleOpen}
      />
      <APIModal
        open={apiModalDialog.open}
        onClose={apiModalDialog.handleClose}
        onOpen={apiModalDialog.handleOpen}
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
