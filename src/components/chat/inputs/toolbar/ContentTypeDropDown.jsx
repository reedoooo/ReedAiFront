import ListIcon from '@mui/icons-material/List';
import {
  IconButton,
  Menu,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import useTipTapEditor from 'hooks/useTipTapEditor';

export const ContentTypeDropDown = ({
  anchorEl,
  handleClose,
  handleMenuOpen,
  isFirstMessage,
  setUserInput,
}) => {
  const forms = ['Select input', 'Text input'];
  const { editorContent, contentType, handleContentTypeChange } =
    useTipTapEditor(isFirstMessage, setUserInput);

  return (
    <>
      <IconButton color="primary" onClick={handleMenuOpen}>
        <ListIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Content Type</InputLabel>
          <Select
            value={contentType}
            onChange={handleContentTypeChange}
            label="Content Type"
          >
            <MenuItem value="markdown">Markdown</MenuItem>
            <MenuItem value="html">HTML</MenuItem>
            <MenuItem value="text">Plain Text</MenuItem>
          </Select>
        </FormControl>
      </Menu>
    </>
  );
};

export default ContentTypeDropDown;
