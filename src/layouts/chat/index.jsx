import { Box, Portal } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ChatSidebar } from 'components/chat/sidebar';

const ChatLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <>
        <Portal>
          <Box sx={{ padding: '4px', maxHeight: 'calc(100% - 16px)' }}>
            <ChatSidebar />
          </Box>
        </Portal>
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: '60px', // Adjust to match the sidebar padding
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - 40px)', // Assuming the sidebar width is 240px + 16px padding
          }}
        >
          <Outlet />
        </Box>
      </>
    </Box>
  );
};

export default ChatLayout;
