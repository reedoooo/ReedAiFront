/* eslint-disable no-case-declarations */
/* eslint-disable react/no-children-prop */
import { Box, Typography, IconButton } from '@mui/material';
import memoizeOne from 'memoize-one';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaCopy, FaUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import { AiIcon } from 'assets/humanIcons';
import {
  ChatBubbleAvatarWrapper,
  ChatBubbleWrapper,
} from 'components/chat/styled';
import { useMode } from 'hooks/useMode';
import { extractMarkdownContent } from 'utils/format';
import MessageOptions from './MessageOptions';
import 'styles/MarkdownBlockStyles.css';

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

const MemoizedRenderContent = React.memo(RenderContent);

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
    <ChatBubbleWrapper
      ref={bubbleRef}
      sender={sender}
      theme={theme}
      className={`chat-bubble-wrapper-${sender}`}
    >
      <ChatBubbleAvatarWrapper sx={avatarStyle} theme={theme} sender={sender}>
        {icon}
      </ChatBubbleAvatarWrapper>
      <div className={`chat-message-${sender}`}>
        <div className={`message-content-${sender}`}>
          <MemoizedRenderContent
            content={message.content}
            maxWidth={maxWidth}
            sender={sender}
          />
        </div>
        {sender === 'assistant' && (
          <MessageOptions
            message={message}
            onRegenerate={() => {
              const messages = JSON.parse(localStorage.getItem('chatMessages'));
              const mostRecentPrompt = messages[messages.length - 1].content;
              console.log(`Regenerating message: ${mostRecentPrompt}`);
            }}
          />
        )}
      </div>
    </ChatBubbleWrapper>
  );
};

const MemoizedChatBubble = React.memo(ChatBubble);

export const UserMessage = React.memo(({ message }) => (
  <MemoizedChatBubble message={message} sender="user" />
));

UserMessage.displayName = 'UserMessage';

UserMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export const AssistantMessage = React.memo(({ message }) => {
  const memoizedExtractMarkdownContent = useMemo(
    () => memoizeOne(extractMarkdownContent),
    []
  );
  return (
    <MemoizedChatBubble
      message={{
        ...message,
        content: memoizedExtractMarkdownContent(message.content),
      }}
      sender="assistant"
    />
  );
});

AssistantMessage.displayName = 'AssistantMessage';

AssistantMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};
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
