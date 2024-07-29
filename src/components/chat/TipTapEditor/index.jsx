import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import React from 'react';
import useTipTapEditor from 'hooks/useTipTapEditor';

const TipTapEditor = ({ setUserInput, setFileInput }) => {
  const initialContent =
    '<p><strong>Prompt:</strong> Write the code for a dialog component using material ui </p>';
  const { editor, editorContent, contentType, handleContentTypeChange } =
    useTipTapEditor(initialContent, setUserInput, setFileInput);
  // return editor ? <div ref={editor.view.dom} /> : null;
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
          onClick={() => console.log(editorContent)}
          color="primary"
        >
          Log Content
        </Button>
      </Box>
    </Box>
  );
};

export default TipTapEditor;
