// ChatNavbarLinks.js
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import ChatHeader from 'components/chat/ChatHeader';

export const ChatNavbarLinks = ({
  onOpen,
  logoText,
  secondary,
  fixed,
  scrolled,
}) => {
  return (
    <Box>
      <ChatHeader />
      <Button onClick={onOpen} variant="contained">
        Open Chat
      </Button>
    </Box>
  );
};

ChatNavbarLinks.propTypes = {
  onOpen: PropTypes.func,
  logoText: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  scrolled: PropTypes.bool,
};

export default ChatNavbarLinks;
