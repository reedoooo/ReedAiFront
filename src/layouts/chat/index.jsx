import { Box, Portal, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ChatSidebar } from 'components/chat/sidebar';
import { useAppStore } from 'contexts';
import { useMode } from 'hooks';

// =========================================================
// [ChatLayout] | This code provides the chat layout for the app
// =========================================================
const ChatLayout = () => {
  const { theme } = useMode();
  const {
    state: { isSidebarOpen },
  } = useAppStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <>
        <Portal>
          <Box sx={{ padding: '4px', maxHeight: 'calc(100% - 16px)' }}>
            <ChatSidebar />
          </Box>
        </Portal>
        <Box
          // sx={{
          //   flexGrow: 1,
          //   marginLeft: '60px', // Adjust to match the sidebar padding
          //   display: 'flex',
          //   flexDirection: 'column',
          //   width: 'calc(100% - 40px)', // Assuming the sidebar width is 240px + 16px padding
          // }}
          sx={{
            flexGrow: 1,
            marginLeft: isMobile && !isSidebarOpen ? '0px' : '40px', // Adjust margin based on sidebar visibility
            display: 'flex',
            flexDirection: 'column',
            width: isMobile && !isSidebarOpen ? '100%' : 'calc(100% - 40px)', // Expand width when sidebar is closed
            transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out', // Smooth transition
          }}
        >
          <Outlet />
        </Box>
      </>
    </Box>
  );
};

export default ChatLayout;
