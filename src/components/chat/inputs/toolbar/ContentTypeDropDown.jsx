import ListIcon from '@mui/icons-material/List';
import {
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from '@mui/material';
import { useTipTapEditor } from 'hooks/chat';

export const ContentTypeDropDown = ({
  anchorEl,
  handleClose,
  handleMenuOpen,
}) => {
  const { content, contentType, handleContentTypeChange } = useTipTapEditor();

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
