/* eslint-disable react/no-children-prop */
import { Box, Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';

export const RenderContent = ({ content, sender, maxWidth }) => {
  const [copied, setCopied] = useState(false);

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
      <Box sx={{ position: 'relative', overflowX: 'auto', maxWidth: '100%' }}>
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
    code: codeBlock,
  };

  return (
    <Box
      component="div"
      className="markdown-body"
      sx={{
        overflowX: 'auto',
        maxWidth: '90%',
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
