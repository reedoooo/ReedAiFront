import { IconButton } from '@mui/material';
import React from 'react';
import { CodeIcon } from 'assets/humanIcons';

export const CodeInsert = ({ editor, theme }) => {
  const handleMarkdownInsert = () => {
    editor.commands.insertContent(
      '<pre><code class="language-markdown"># Markdown Example\n\nThis is a code block with markdown styles.</code></pre>'
    );
  };

  return (
    <>
      <IconButton onClick={handleMarkdownInsert}>
        <CodeIcon style={{ color: theme.palette.primary.main, fontSize: 20 }} />
      </IconButton>
    </>
  );
};

export default CodeInsert;
