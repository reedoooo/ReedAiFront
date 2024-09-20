import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useMemo } from 'react';
import { UserMessage, AssistantMessage } from './MessagesMemoized';
import 'styles/MarkdownBlockStyles.css';

export const MessageBox = React.memo(props => {
  const { messages } = props;
  console.log('Rendering MessageBox component', messages);
  const groupedMessages = useMemo(() => {
    return messages?.reduce((acc, message, index) => {
      if (index % 2 === 0) {
        acc.push([message, messages[index + 1]].filter(Boolean));
      }
      return acc;
    }, []);
  }, [messages]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 3,
        width: '90%',
        maxWidth: '90%',
        mx: 'auto',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          width: '90%',
          maxWidth: '90%',
          mx: 'auto',
        }}
      >
        {groupedMessages.map((group, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: group[0]?.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
              width: '100%',
              maxWidth: '100%',
              mx: 'auto',
            }}
          >
            {group.map((message, subIndex) => (
              <Box
                key={subIndex}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: { xs: '10px', sm: '15px', md: '20px' },
                  height: '100%',
                  maxWidth: '100%',
                  flexGrow: 1,
                }}
              >
                {message.role === 'user' ? (
                  <UserMessage message={message} />
                ) : (
                  <AssistantMessage message={message} />
                )}
              </Box>
            ))}
          </Box>
        ))}
      </Container>
    </Container>
  );
});

MessageBox.displayName = 'MessageBox';

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      role: PropTypes.string,
    })
  ).isRequired,
};

export default MessageBox;
