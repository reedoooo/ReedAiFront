import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useTipTapEditor } from 'hooks/chat';

export const TipTapEditor = ({ onSend }) => {
  const { editor, content, handleContentTypeChange, contentType } =
    useTipTapEditor();
  const handleSend = async () => {
    if (content.trim()) {
      onSend(content);
    }
  };

  return (
    <Box>
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
      <Box mt={2}>
        {editor && (
          <Box>
            <div ref={editor.view.dom} />
          </Box>
        )}
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          onClick={() => console.log(content)}
          color="primary"
        >
          Log Content
        </Button>
      </Box>
    </Box>
  );
};

export default TipTapEditor;
