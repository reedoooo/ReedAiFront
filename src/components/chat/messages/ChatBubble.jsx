import React, { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { AiIcon } from 'assets/humanIcons';
import useMode from 'hooks/useMode';
import { ChatBubbleAvatarWrapper, ChatBubbleWrapper } from '../styled';
import MessageOptions from './MessageOptions';
import RenderContent from './RenderContent';

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
          <RenderContent
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

export default React.memo(ChatBubble);

// const MemoizedChatBubble = React.memo(ChatBubble);

// export default MemoizedChatBubble;
