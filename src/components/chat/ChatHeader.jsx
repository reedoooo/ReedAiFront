import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import useMode from 'hooks/useMode';

const ChatHeader = () => {
  const { theme } = useMode();
  return (
    <header className="chatbot-header">
      <img src="/bot-avatar.png" alt="Bot Avatar" className="bot-avatar" />
      <div className="bot-info">
        <h2 className="bot-name">AI Assistant</h2>
        <span className="bot-status">Online</span>
      </div>
    </header>
  );
};
export default ChatHeader;
