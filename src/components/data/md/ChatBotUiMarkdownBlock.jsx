import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MessageMarkdownMemoized from 'components/chat/cleanup/organized/Messages/message-markdown-memoized';
import React from 'react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { MessageCodeBlock } from '../code/ChatBotUiCodeBlock';

const StyledBox = styled(Box)(({ theme }) => ({
  '& .prose': {
    minWidth: '100%',
    color: theme.palette.text.primary,
    '& p': {
      marginBottom: theme.spacing(2),
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '& pre': {
      padding: 0,
    },
  },
}));

export const MessageMarkdown = ({ content }) => {
  return (
    <StyledBox>
      <MessageMarkdownMemoized
        className="prose"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <Typography paragraph>{children}</Typography>;
          },
          img({ node, ...props }) {
            return <Box component="img" sx={{ maxWidth: '67%' }} {...props} />;
          },
          code({ node, className, children, ...props }) {
            const childArray = React.Children.toArray(children);
            const firstChild = childArray[0];
            const firstChildAsString = React.isValidElement(firstChild)
              ? firstChild.props.children
              : firstChild;

            if (firstChildAsString === '▍') {
              return (
                <Box
                  component="span"
                  sx={{
                    mt: 1,
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    cursor: 'default',
                  }}
                >
                  ▍
                </Box>
              );
            }

            if (typeof firstChildAsString === 'string') {
              childArray[0] = firstChildAsString.replace('`▍`', '▍');
            }

            const match = /language-(\w+)/.exec(className || '');

            if (
              typeof firstChildAsString === 'string' &&
              !firstChildAsString.includes('\n')
            ) {
              return (
                <Typography component="code" className={className} {...props}>
                  {childArray}
                </Typography>
              );
            }

            return (
              <MessageCodeBlock
                key={Math.random()}
                language={(match && match[1]) || ''}
                value={String(childArray).replace(/\n$/, '')}
                {...props}
              />
            );
          },
        }}
      >
        {content}
      </MessageMarkdownMemoized>
    </StyledBox>
  );
};
