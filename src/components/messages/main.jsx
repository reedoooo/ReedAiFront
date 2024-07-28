/* eslint-disable no-case-declarations */
/* eslint-disable react/no-children-prop */
import { Box, Card, Typography, Avatar, styled } from '@mui/material';
import memoizeOne from 'memoize-one';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import gfm from 'remark-gfm';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import sanitizeHtml from 'sanitize-html';
import { AiIcon } from 'assets/humanIcons';
import useTypeCheck from 'hooks/useContentTypeCheck';
import useMode from 'hooks/useMode';
import MessageOptions from './MessageOptions';

function extractMarkdownContent(messageContent) {
  try {
    // Check if the content is valid JSON
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
                maxWidth: maxWidth || '100%',
              }}
            >
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
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
// export const RenderContent = ({ content, sender, maxwidth }) => {
//   <ReactMarkdown
//     children={content}
//     remarkPlugins={[gfm]} // To support GitHub Flavored Markdown
//     rehypePlugins={[rehypeRaw]} // To allow raw HTML
//     // rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSanitize]}
//     // remarkPlugins={[gfm, remarkGfm, remarkParse, remarkRehype]}
//     components={{
//       code({ node, inline, className, children, ...props }) {
//         const match = /language-(\w+)/.exec(className || '');
//         return !inline && match ? (
//           <Box
//             component="div"
//             sx={{
//               overflowX: 'auto',
//               maxWidth: maxwidth || '100%',
//             }}
//           >
//             <SyntaxHighlighter
//               children={String(children).replace(/\n$/, '')}
//               style={oneDark}
//               language={match[1]}
//               PreTag="div"
//               {...props}
//             />
//           </Box>
//         ) : (
//           <code className={className} {...props}>
//             {children}
//           </code>
//         );
//       },
//       a({ href, children, ...props }) {
//         return (
//           <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
//             {children}
//           </a>
//         );
//       },
//       img({ alt, src, ...props }) {
//         return (
//           <img alt={alt} src={src} style={{ maxWidth: '100%' }} {...props} />
//         );
//       },
//     }}
//   />;
// };
export const ChatBubble = ({ message, sender }) => {
  const { theme } = useMode();
  const bubbleRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState('100%');

  useEffect(() => {
    if (bubbleRef.current) {
      setMaxWidth(`${bubbleRef.current.clientWidth}px`);
    }
  }, [bubbleRef.current]);
  // Define styles conditionally based on the sender
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

  const bubbleStyles = {
    backgroundColor: sender === 'user' ? '#26242C' : '#26242C',
    // padding: 2,
    // marginRight: 2,
    margin: '10px',
    padding: '10px',
    borderRadius: '12px',
    alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
    display: 'flex',
    alignItems: sender === 'user' ? 'flex-end' : 'flex-start',
    justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
    flexDirection: sender === 'user' ? 'row-reverse' : 'row',
    mb: 2,
    maxWidth: '90%',
    flexGrow: 1,
  };

  const icon = sender === 'user' ? <FaUser /> : <AiIcon />;

  // const markdownContent = extractMarkdownContent(message.content);
  // const contentToRender =
  //   contentType === 'code' || contentType === 'markdown'
  //     ? extractMarkdownContent(message.content)
  //     : message.content;
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
      className="lg:w-1/2 2xl:w-1/3 p-8 rounded-md bg-gray-100"
      sx={{
        borderRadius: 'theme.shape.borderRadius', // You can adjust this value based on the theme's border radius scale
        marginTop: 4, // Margin top using theme's spacing scale
        overflowY: 'auto', // Vertical scroll
        flexGrow: 1,
      }}
    >
      <Box
        id="resultContainer"
        className="mt-4 h-48 overflow-y-auto"
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
