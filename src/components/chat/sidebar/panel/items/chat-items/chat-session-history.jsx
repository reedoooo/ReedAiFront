/* eslint-disable jsx-a11y/no-autofocus */
import {
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Card,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Collapse,
  InputAdornment,
  TextField,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';

import React, { useState } from 'react';
import {
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
} from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import { toast } from 'sonner';
import { AiIcon, InfoOutlinedIcon } from 'assets/humanIcons';
import { ConversationCard, ExportOptions } from 'components/chat/styled';
import { useMode } from 'hooks/app';
const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  overflowY: 'auto',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2A2B32' : '#ECECF1',
  },
  '& .MuiListItemText-primary': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.mode === 'dark' ? '#202123' : '#f7f7f8',
  zIndex: 1,
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.mode === 'dark' ? '#343541' : '#FFFFFF',
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));
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
  setChatSessions,
  selectedSession,
  setSelectedSession,
  handleMenuClick,
  handleMenuClose,
  // handleExportJSON,
  handleDeleteConversation,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSession, setExpandedSession] = useState(null);
  const [editingSession, setEditingSession] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    console.log('Exporting CSV...');
    // const csvExporter = new ExportOptions(options);
    // csvExporter.generateCsv(sessions);
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
  const handleSessionClick = sessionId => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  const handleEdit = sessionId => {
    setEditingSession(sessionId);
  };

  const handleDelete = sessionId => {
    setDeleteConfirmation(sessionId);
  };

  const handleDeleteConfirm = () => {
    setChatSessions(
      sessions?.filter(session => session.id !== deleteConfirmation)
    );
    setDeleteConfirmation(null);
    toast.success('Chat session deleted successfully');
  };

  const handleNewSession = () => {
    const newSession = {
      id: sessions.length + 1,
      name: `New Chat ${sessions.length + 1}`,
      messages: [],
    };
    setChatSessions([...sessions, newSession]);
    setExpandedSession(newSession.id);
    toast.success('New chat session created');
    setTimeout(() => {
      const sessionList = document.getElementById('session-list');
      if (sessionList) {
        sessionList.scrollTop = 0;
      }
    }, 100);
  };

  const handleRename = (sessionId, newName) => {
    setChatSessions(
      sessions?.map(session =>
        session.id === sessionId ? { ...session, name: newName } : session
      )
    );
    setEditingSession(null);
    toast.success('Chat session renamed successfully');
  };
  const filteredSessions = sessions?.filter(session =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        padding: '0.5rem',
        flexGrow: 1,
        overflowY: 'auto',
        width: '300px',
        // height: '100vh',
        // backgroundColor: theme.palette.background.paper,
        // borderRight: `1px solid ${theme.palette.divider}`,
        // overflowY: 'auto',
      }}
    >
      <SearchContainer>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search sessions"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
          sx={{
            color: '#fff',
            'input::placeholder': {
              color: '#fff',
            },
            '&. MuiOutlinedInput-root': {
              color: '#fff',
            },
            '&.MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
          }}
        />
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FaPlus />}
          onClick={handleNewSession}
          sx={{ mt: 2 }}
        >
          New Chat
        </Button>
      </SearchContainer>
      <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {filteredSessions?.map(session => (
          <React.Fragment key={session.id}>
            <StyledListItem
              // button
              component={Button}
              onClick={() => handleSessionClick(session.id)}
            >
              <ListItemAvatar>
                {/* <Avatar>{session.icon}</Avatar> */}
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: theme.palette.primary.main,
                    marginBottom: '0.5rem',
                  }}
                >
                  <AiIcon
                    sx={{ fontSize: 32, color: theme.palette.common.white }}
                  />
                </Avatar>
              </ListItemAvatar>
              {editingSession === session.id ? (
                <TextField
                  value={session.name}
                  onChange={e => handleRename(session.id, e.target.value)}
                  onBlur={() => setEditingSession(null)}
                  autoFocus
                />
              ) : (
                <ListItemText
                  primary={session.id}
                  secondary={`${session.messages.length} messages`}
                />
              )}{' '}
              <ActionButton onClick={() => handleEdit(session.id)}>
                <FaEdit />
              </ActionButton>
              <ActionButton onClick={() => handleDelete(session.id)}>
                <FaTrash />
              </ActionButton>
              {expandedSession === session.id ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </StyledListItem>
            <Collapse in={expandedSession === session.id}>
              <MessageContainer>
                {session?.messages?.slice(-3).map((message, index) => (
                  <Box key={index}>
                    <Typography variant="body2" gutterBottom>
                      {message._id}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {message.content}
                    </Typography>
                  </Box>
                ))}
              </MessageContainer>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      <Dialog
        open={deleteConfirmation !== null}
        onClose={() => setDeleteConfirmation(null)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this chat session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(null)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
      <ExportOptions>
        <Button variant="contained" onClick={handleExportCSV}>
          Export All as CSV
        </Button>
      </ExportOptions>
    </Box>
  );
};

export default ConversationTab;
