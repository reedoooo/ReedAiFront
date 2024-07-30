import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

export const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write your markdown here...</p>',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Chat AI Application Template Generator
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          sx={{
            width: '33%',
            backgroundColor: '#f5f5f5',
            p: 2,
            overflow: 'auto',
          }}
        >
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Draggable Form/Input Components
          </Typography>
          <Box sx={{ backgroundColor: 'white', p: 2, mb: 2 }}>Component 1</Box>
          <Box sx={{ backgroundColor: 'white', p: 2, mb: 2 }}>Component 2</Box>
          <Box sx={{ backgroundColor: 'white', p: 2, mb: 2 }}>Component 3</Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '67%' }}>
          <Box sx={{ flexGrow: 1, backgroundColor: '#e0e0e0', p: 2 }}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Dropzone Area
            </Typography>
            <Box sx={{ backgroundColor: 'white', height: '100%' }}>
              Drop components here
            </Box>
          </Box>
          <Box sx={{ backgroundColor: '#bdbdbd', p: 2 }}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Toolbar
            </Typography>
            <Button variant="contained" sx={{ mr: 2 }}>
              Save
            </Button>
            <Button variant="contained">Edit</Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: '#616161', color: 'white', p: 2 }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Markdown Editor
        </Typography>
        <EditorContent
          editor={editor}
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '10px',
            borderRadius: '4px',
          }}
        />
      </Box>
    </Box>
  );
};

const EditorInterface = () => {
  return <TextEditor />;
};

export default EditorInterface;
