import { Box, Portal, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ChatSidebar } from 'components/chat/sidebar';
import { useAppStore } from 'contexts';
import { useMode } from 'hooks';

// =========================================================
// [ChatLayout] | This code provides the chat layout for the app
// =========================================================
export const ChatLayout = props => {
  const { theme } = useMode();
  const {
    state: { isSidebarOpen },
  } = useAppStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <>
        <Portal>
          <ChatSidebar />
        </Portal>

        <Outlet />
      </>
    </Box>
  );
};

export default ChatLayout;
