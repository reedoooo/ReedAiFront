import { Box, Typography } from '@mui/material';
import ChatFolders from './ChatFolder';

export const WorkspaceFolders = ({ folders }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Folder</Typography>
            <ChatFolders folders={folders} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
