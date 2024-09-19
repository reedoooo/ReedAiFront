/* eslint-disable react/no-children-prop */
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaCopy, FaSave } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import { RCDialog } from 'components/themed';

export function SaveSnippetDialog({
  openDialog,
  handleCloseDialog,
  snippetName,
  setSnippetName,
  saveSnippet,
}) {
  return (
    <RCDialog
      open={openDialog}
      onClose={handleCloseDialog}
      title="Save Code Snippet"
      subtitle="Enter the name for your code snippet below."
      actions={
        <>
          <Button onClick={handleCloseDialog} sx={{ color: '#fff' }}>
            Cancel
          </Button>
          <Button
            onClick={saveSnippet}
            variant="contained"
            sx={{ backgroundColor: '#555', color: '#fff' }}
          >
            Save
          </Button>
        </>
      }
    >
      <TextField
        margin="dense"
        id="name"
        label="Snippet Name"
        type="text"
        fullWidth
        variant="outlined"
        value={snippetName}
        onChange={e => setSnippetName(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#555',
            },
            '&:hover fieldset': {
              borderColor: '#777',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#999',
            },
            '& input': {
              color: '#fff',
            },
            '& input::placeholder': {
              color: '#888',
              opacity: 1,
            },
          },
        }}
      />
    </RCDialog>
  );
}
export const RenderContent = ({ content, sender, maxWidth }) => {
  const [copied, setCopied] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [snippetName, setSnippetName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');

  useEffect(() => {
    const storedSnippets = localStorage.getItem('codeSnippets');
    if (storedSnippets) {
      setSnippets(JSON.parse(storedSnippets));
    }
  }, []);

  const handleOpenDialog = (code, language) => {
    setCurrentCode(code);
    setCurrentLanguage(language);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSnippetName('');
  };

  const saveSnippet = () => {
    if (snippetName.trim() === '') {
      alert('Please enter a name for the snippet');
      return;
    }
    const newSnippet = {
      name: snippetName,
      code: currentCode,
      language: currentLanguage,
    };
    const updatedSnippets = [...snippets, newSnippet];
    setSnippets(updatedSnippets);
    localStorage.setItem('codeSnippets', JSON.stringify(updatedSnippets));
    setSnippetName('');
    alert('Snippet saved successfully!');
    handleCloseDialog();
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
            <IconButton
              size="small"
              onClick={() => handleOpenDialog(value, match[1])}
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
      <SaveSnippetDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        snippetName={snippetName}
        setSnippetName={setSnippetName}
        saveSnippet={saveSnippet}
      />
    </Box>
  );
};

RenderContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default React.memo(RenderContent);
