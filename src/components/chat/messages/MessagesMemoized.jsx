import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import ChatBubble from './ChatBubble';

export const UserMessage = React.memo(({ message }) => (
  <ChatBubble message={message} sender="user" />
));

UserMessage.displayName = 'UserMessage';

UserMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};
export const AssistantMessage = React.memo(({ message }) => (
  <ChatBubble message={message} sender="assistant" />
));

AssistantMessage.displayName = 'AssistantMessage';

AssistantMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};
