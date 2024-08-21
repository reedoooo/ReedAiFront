import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useMemo } from 'react';
import { UserMessage, AssistantMessage } from './MessagesMemoized';
import 'styles/MarkdownBlockStyles.css';

export const MessageBox = props => {
  const { messages } = props;
  const groupedMessages = useMemo(() => {
    const groups = [];
    for (let i = 0; i < messages.length; i += 2) {
      groups.push(messages.slice(i, i + 2));
    }
    return groups;
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
        // borderRadius: 'theme.shape.borderRadius',
        // marginTop: 4,
        // overflowY: 'auto',
        // flexGrow: 1,
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
          // width: { sm: 550, md: 650, xl: 700 },
          // maxWidth: { sm: 550, md: 650, xl: 700 },
          // p: 2,
          // flexGrow: 1,
          // overflowY: 'auto',
          // display: 'flex',
          // flexDirection: 'column',
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
              // maxWidth: '100%',
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
                  // overflowX: 'auto',
                  // display: 'flex',
                  // flexDirection:
                  //   message.role === 'user' ? 'row-reverse' : 'row',
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
};

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      role: PropTypes.string,
    })
  ).isRequired,
};

export default MessageBox;
