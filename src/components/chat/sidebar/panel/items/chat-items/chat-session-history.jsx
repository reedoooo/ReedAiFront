import {
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Card,
  Menu,
  MenuItem,
} from '@mui/material';
import { MdInfoOutline } from 'react-icons/md';
import { InfoOutlinedIcon } from 'assets/humanIcons';
import { ConversationCard, ExportOptions } from 'components/chat/styled';

export const ConversationMenu = ({
  anchorEl,
  handleMenuClose,
  handleExportJSON,
  handleDeleteConversation,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>View Info</MenuItem>
      <MenuItem onClick={handleExportJSON}>Export as JSON</MenuItem>
      <MenuItem onClick={handleDeleteConversation}>Delete</MenuItem>
    </Menu>
  );
};
export const ConversationTab = ({
  anchorEl,
  sessions,
  selectedSession,
  setSelectedSession,
  handleMenuClick,
  handleMenuClose,
  // handleExportJSON,
  handleDeleteConversation,
}) => {
  const handleExportCSV = () => {
    const options = {
      filename: 'conversation_history',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'Conversation History',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    // const csvExporter = new Export(options);
    const csvExporter = new ExportOptions(options);
    csvExporter.generateCsv(sessions);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(sessions, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conversation_history.json';
    a.click();
  };
  return (
    <Box sx={{ padding: '1rem', flexGrow: 1, overflowY: 'auto' }}>
      {sessions?.map(chat => (
        <Card
          key={chat._id}
          onClick={() => setSelectedSession(chat)}
          sx={{
            background: '#1c1c1c',
            color: '#fff',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '5px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              background: '#1c1c1c',
              color: '#fff',
              margin: '10px 0',
              padding: '10px',
              borderRadius: '5px',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              // justifyContent: 'space-around',
            }}
          >
            <Tooltip title="Information about...">
              <IconButton
                onClick={event => handleMenuClick(event, chat)}
                sx={{ color: '#fff', width: '20px', height: '20px' }}
              >
                <InfoOutlinedIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              sx={{ color: '#ffffff', marginRight: '10px', pl: '1rem' }}
            >
              {chat.name}
            </Typography>
          </Box>
          <Box
            sx={{
              background: '#1c1c1c',
              color: '#fff',
              margin: '10px 0',
              padding: '10px',
              borderRadius: '5px',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: '#ffffff', marginRight: '10px' }}
            >
              {chat?.summary?.overallSummary}
            </Typography>
          </Box>
        </Card>
      ))}
      <ConversationMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleExportJSON={handleExportJSON}
        handleDeleteConversation={() =>
          handleDeleteConversation(selectedSession?._id)
        }
      />
      {selectedSession && (
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6" sx={{ color: '#fff', marginBottom: '10px' }}>
            {selectedSession.name}
          </Typography>
          <Box
            sx={{
              padding: '10px',
              background: '#000',
              borderRadius: '5px',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            {selectedSession?.messages?.map((message, index) => (
              <Typography
                key={index}
                sx={{
                  color: '#fff',
                  fontSize: '0.9rem',
                  marginBottom: '8px',
                  lineHeight: 1.4,
                }}
              >
                {message.content}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
      <ExportOptions>
        <Button variant="contained" onClick={handleExportJSON}>
          Export All as JSON
        </Button>
      </ExportOptions>
    </Box>
  );
};

export default ConversationTab;
