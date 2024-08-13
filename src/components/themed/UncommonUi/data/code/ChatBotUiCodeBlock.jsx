import {
  Check as IconCheck,
  ContentCopy as IconCopy,
  Download as IconDownload,
} from '@mui/icons-material';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC, memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useCopyToClipboard } from 'hooks/util';

// ... (keep the programmingLanguages and generateRandomString functions as they are)

const CodeBlockWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  backgroundColor: theme.palette.grey[900],
  fontFamily: theme.typography.fontFamily,
}));

const CodeBlockHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.grey[800],
  padding: theme.spacing(1, 2),
  color: theme.palette.common.white,
}));
const programmingLanguages = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css',
};
const generateRandomString = (length, lowercase = false) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};
export const MessageCodeBlock = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const fileExtension = programmingLanguages[language] || '.file';
    const suggestedFileName = `file-${generateRandomString(3, true)}${fileExtension}`;
    const fileName = window.prompt('Enter file name', suggestedFileName);

    if (!fileName) {
      return;
    }

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
  };

  return (
    <CodeBlockWrapper>
      <CodeBlockHeader>
        <Typography variant="caption" sx={{ textTransform: 'lowercase' }}>
          {language}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="text"
            size="small"
            sx={{ minWidth: 0, p: 1 }}
            onClick={downloadAsFile}
          >
            <IconDownload fontSize="small" />
          </Button>
          <Button
            variant="text"
            size="small"
            sx={{ minWidth: 0, p: 1 }}
            onClick={onCopy}
          >
            {isCopied ? (
              <IconCheck fontSize="small" />
            ) : (
              <IconCopy fontSize="small" />
            )}
          </Button>
        </Box>
      </CodeBlockHeader>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent',
        }}
        codeTagProps={{
          style: {
            fontSize: '14px',
            fontFamily: 'var(--font-mono)',
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </CodeBlockWrapper>
  );
});

MessageCodeBlock.displayName = 'MessageCodeBlock';
