/* eslint-disable no-case-declarations */
/* eslint-disable react/no-children-prop */
import {
  Box,
  Card,
  Typography,
  Avatar,
  styled,
  IconButton,
} from '@mui/material';
import memoizeOne from 'memoize-one';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaCopy, FaUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import { AiIcon } from 'assets/humanIcons';
import useMode from 'hooks/useMode';
import MessageOptions from './MessageOptions';

function extractMarkdownContent(messageContent) {
  try {
    if (
      typeof messageContent === 'string' &&
      messageContent.startsWith('{') &&
      messageContent.endsWith('}')
    ) {
      const parsedContent = JSON.parse(messageContent?.data);
      // If the parsed content contains a markdown key, use it
      if (parsedContent.pageLayout) {
        return parsedContent.pageLayout;
      }
      return JSON.stringify(parsedContent, null, 2);
    }
  } catch (error) {
    console.error('Error parsing JSON content:', error);
  }

  return messageContent;
}
const ChatBubbleWrapper = styled(Box)(({ theme, sender }) => ({
  backgroundColor: sender === 'user' ? '#26242C' : '#26242C',
  margin: '10px',
  padding: '10px',
  borderRadius: '12px',
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
  flexDirection: sender === 'user' ? 'row-reverse' : 'row',
  maxWidth: '90%',
  flexGrow: 1,
}));

const AvatarWrapper = styled(Avatar)(({ theme, sender }) => ({
  width: 40,
  height: 40,
  marginRight: sender === 'assistant' ? 2 : 0,
  marginLeft: sender === 'user' ? 2 : 0,
  backgroundColor:
    sender === 'user'
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
}));

const TypographyWrapper = styled(Typography)({
  color: '#6b7280',
  fontSize: '0.875rem',
  flexGrow: 1,
  overflowWrap: 'break-word',
});

const CodeBlockWithCopy = ({ children, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
          {language}
        </Typography>
        <IconButton size="small" onClick={handleCopy}>
          <FaCopy />
        </IconButton>
      </Box>
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        style={oneDark}
        language={language}
        PreTag="div"
        // {...props}
      />
      {/* <SyntaxHighlighter style={oneDark} language={language} PreTag="div">
        {children}
      </SyntaxHighlighter> */}
      {copied && (
        <Typography variant="caption" color="success.main">
          Copied!
        </Typography>
      )}
    </Box>
  );
};

export const RenderContent = ({ content, sender, maxWidth }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[gfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <Box
              component="div"
              sx={{
                overflowX: 'auto',
                maxWidth: maxWidth || '90%',
              }}
            >
              <CodeBlockWithCopy language={match[1]}>
                {String(children).replace(/\n$/, '')}
              </CodeBlockWithCopy>
            </Box>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        a({ href, children, ...props }) {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          );
        },
        img({ alt, src, ...props }) {
          return (
            <img alt={alt} src={src} style={{ maxWidth: '100%' }} {...props} />
          );
        },
      }}
    />
  );
};

export const ChatBubble = ({ message, sender }) => {
  const { theme } = useMode();
  const bubbleRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState('100%');

  useEffect(() => {
    if (bubbleRef.current) {
      setMaxWidth(`${bubbleRef.current.clientWidth}px`);
    }
  }, [bubbleRef.current]);

  const avatarStyle = {
    width: 40,
    height: 40,
    marginRight: sender === 'assistant' ? 2 : 0,
    marginLeft: sender === 'user' ? 2 : 0,
    backgroundColor:
      sender === 'user'
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  };

  const icon = sender === 'user' ? <FaUser /> : <AiIcon />;

  return (
    <ChatBubbleWrapper ref={bubbleRef} sender={sender} theme={theme}>
      <AvatarWrapper sx={avatarStyle} theme={theme} sender={sender}>
        {icon}
      </AvatarWrapper>
      <TypographyWrapper variant="body2">
        <div className={`chat-message ${sender}`}>
          <div className="message-content">
            <RenderContent
              content={message.content}
              maxWidth={maxWidth}
              sender={sender}
            />
          </div>
        </div>
        {sender === 'assistant' && (
          <MessageOptions
            message={message}
            onRegenerate={() => {
              // Handle regeneration logic here
              const messages = JSON.parse(localStorage.getItem('chatMessages'));
              const mostRecentPrompt = messages[messages.length - 1].content;
              console.log(`Regenerating message: ${mostRecentPrompt}`);
            }}
          />
        )}
      </TypographyWrapper>
    </ChatBubbleWrapper>
  );
};

export const UserMessage = React.memo(({ message }) => (
  <ChatBubble message={message} sender="user" />
));

export const AssistantMessage = React.memo(({ message }) => {
  const memoizedExtractMarkdownContent = useMemo(
    () => memoizeOne(extractMarkdownContent),
    []
  );
  return (
    <ChatBubble
      message={{
        ...message,
        content: memoizedExtractMarkdownContent(message.content),
      }}
      sender="assistant"
    />
  );
});

export const MessageBox = props => {
  const { messages } = props;

  return (
    <Box
      sx={{
        borderRadius: 'theme.shape.borderRadius', // You can adjust this value based on the theme's border radius scale
        marginTop: 4, // Margin top using theme's spacing scale
        overflowY: 'auto', // Vertical scroll
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          p: 2, // Padding using theme's spacing scale
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        {messages.map((message, index) => {
          switch (message.role) {
            case 'user':
              return <UserMessage key={index} message={message} />;
            case 'assistant':
            case 'system':
            case 'bot':
              return <AssistantMessage key={index} message={message} />;
            default:
              throw new Error(`Unknown message role: ${message.role}`);
          }
        })}
      </Box>
    </Box>
  );
};

export default MessageBox;
