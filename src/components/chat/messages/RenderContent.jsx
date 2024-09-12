/* eslint-disable react/no-children-prop */
import { Box, Typography, IconButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaCopy, FaSave } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
export const RenderContent = ({ content, sender, maxWidth }) => {
  const [copied, setCopied] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [snippetName, setSnippetName] = useState('');

  useEffect(() => {
    const storedSnippets = localStorage.getItem('codeSnippets');
    if (storedSnippets) {
      setSnippets(JSON.parse(storedSnippets));
    }
  }, []);
  const saveSnippet = (code, language) => {
    if (snippetName.trim() === '') {
      alert('Please enter a name for the snippet');
      return;
    }

    const newSnippet = { name: snippetName, code, language };
    const updatedSnippets = [...snippets, newSnippet];
    setSnippets(updatedSnippets);
    localStorage.setItem('codeSnippets', JSON.stringify(updatedSnippets));
    setSnippetName('');
    alert('Snippet saved successfully!');
  };

  function codeBlock({ node, inline, className, children, ...props }) {
    if (!children) {
      return null;
    }
    const value = String(children).replace(/\n$/, '');
    if (!value) {
      return null;
    }

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    const match = /language-(\w+)/.exec(className || '');

    return !inline && match ? (
      <Box
        sx={{
          padding: { xs: '10px', sm: '15px', md: '20px' },
          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
          lineHeight: 1.5,
          wordBreak: 'break-word',
        }}
      >
        <Box
          sx={{
            // mb: 1,
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#333',
            padding: 1, // equal to 24px (MuiBox)
            color: '#fff',
            borderRadius: '4px 4px 0 0',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 2 }}>
            {match[1]}
          </Typography>
          <Box>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Snippet name"
              value={snippetName}
              onChange={e => setSnippetName(e.target.value)}
              sx={{ mr: 1, input: { color: '#fff' } }}
            />
            <IconButton
              size="small"
              onClick={() => saveSnippet(value, match[1])}
            >
              <FaSave />
            </IconButton>
            {copied ? (
              <Typography variant="caption" color="success.main">
                Copied!
              </Typography>
            ) : (
              <IconButton size="small" onClick={handleCopy}>
                <FaCopy />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box sx={{ overflowY: 'auto' }}>
          <SyntaxHighlighter
            // children={String(children).replace(/\n$/, '')}
            children={value}
            style={oneDark}
            language={match[1]}
            PreTag="div"
            customStyle={{ margin: '0' }}
            // {...props}
          />
        </Box>
      </Box>
    ) : (
      <code className={className} {...props}>
        {value}
      </code>
    );
  }

  const renderers = {
    p({ children }) {
      return <p className="mb-2 last:mb-0">{children}</p>;
    },
    img({ node, ...props }) {
      return <img className="max-w-[67%]" {...props} alt={props.alt} />;
    },
    code: codeBlock,
  };

  return (
    <Box
      component="div"
      className="markdown-body"
      sx={{
        overflowX: 'auto',
        '& pre': {
          maxWidth: '100%',
          overflowX: 'auto',
          borderRadius: 4,
        },
      }}
    >
      <ReactMarkdown
        children={content}
        remarkPlugins={[gfm]}
        components={renderers}
      />
    </Box>
  );
};

RenderContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default React.memo(RenderContent);
