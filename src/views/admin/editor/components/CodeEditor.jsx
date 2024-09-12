import { Editor } from '@monaco-editor/react';
import { Box, Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import { CODE_SNIPPETS } from 'config/data-configs/editor';
import LanguageSelector from './LanguageSelector';
import Output from './Output';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');

  const editorOptions = {
    minimap: {
      enabled: false,
    },
    // selectOnLineNumbers: true,
    // roundedSelection: false,
    // readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
    // fontSize: fontSize,
    lineNumbers: 'on',
    folding: true,
    autoIndent: 'full',
    suggestOnTriggerCharacters: true,
  };

  const onMount = editor => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = language => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={editorOptions}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={value => setValue(value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Output editorRef={editorRef} language={language} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CodeEditor;
