import { Box } from '@mui/material';
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
    <Box
      sx={{
        borderRadius: 'theme.shape.borderRadius',
        marginTop: 4,
        overflowY: 'auto',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
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
            }}
          >
            {group.map((message, subIndex) => (
              <Box
                key={subIndex}
                sx={{
                  display: 'flex',
                  flexDirection:
                    message.role === 'user' ? 'row-reverse' : 'row',
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
      </Box>
    </Box>
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
