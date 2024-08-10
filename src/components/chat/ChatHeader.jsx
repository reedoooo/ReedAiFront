/* eslint-disable jsx-a11y/no-autofocus */
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  MenuList,
  Popover,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import {
  CodeIcon,
  EditIcon,
  MenuIcon,
  MoreVertIcon,
  SaveIcon,
  ShareIcon,
} from 'assets/humanIcons';
// import { CodeIcon } from 'assets/humanIcons/custom';
import { useChatStore } from 'contexts';
import { useDialog, useMenu, useMode } from 'hooks';
import { defaultChatSessionStoreData } from 'store/Slices/helpers';
import { PresetSelect } from './sidebar/panel';

const DialogBox = ({ dialog, title, children, handleAction }) => (
  <Dialog
    open={dialog.open}
    onClose={dialog.handleClose}
    sx={{
      '& .MuiPaper-root': {
        bgcolor: '#333333',
      },
    }}
  >
    <DialogTitle sx={{ color: '#ffffff' }}>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={dialog.handleClose} sx={{ color: '#ffffff' }}>
        Cancel
      </Button>
      <Button onClick={handleAction} sx={{ color: '#ffffff' }}>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export const ChatHeader = props => {
  const { theme } = useMode();
  const chatStore = useChatStore();
  const { selectedPreset, presets, sessionHeader } = chatStore.state;
  const {
    setSelectedPreset,
    createNewChatSession,
    setSessionHeader,
    setSessionId,
    setActiveSession,
    setSelectedChatSession,
    setIsGenerating,
    setChatFileItems,
    setFirstTokenReceived,
    setChatFiles,
    setChatImages,
    setNewMessageFiles,
    setNewMessageImages,
    setShowFilesDisplay,
    setIsPromptPickerOpen,
    setIsFilePickerOpen,
    setSelectedTools,
    setToolInUse,
    setChatMessages,
  } = chatStore.actions;
  const { name } = props;
  const codeDialog = useDialog();
  const saveDialog = useDialog();
  const shareDialog = useDialog();
  const sessionNameDialog = useDialog();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile
  const mobileMenu = useMenu();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleCreateNewSession = () => {
    sessionNameDialog.handleOpen();
  };
  const handleConfirmCreateSession = () => {
    // --- Clear the current session data ---
    setSelectedChatSession({
      _id: null,
    });
    setActiveSession({
      _id: null,
      messages: [],
    });
    setChatFileItems([]);
    setSessionId(null);
    setIsGenerating(false);
    setFirstTokenReceived(false);
    setChatFiles([]);
    setChatMessages([]);
    setChatImages([]);
    setNewMessageFiles([]);
    setNewMessageImages([]);
    setShowFilesDisplay(false);
    setIsPromptPickerOpen(false);
    setIsFilePickerOpen(false);
    setSelectedTools([]);
    setToolInUse('none');
    window.location.reload();

    // --- Create a new session with the entered name ---
    const newSessionData = {
      ...defaultChatSessionStoreData(),
      name: sessionHeader || 'New Chat Session',
      topic: sessionHeader || 'New Chat Session',
      prompt: `Starting a new chat session with topic: ${sessionHeader || 'New Chat Session'}.`,
      userId: chatStore.state.userId,
      workspaceId: chatStore.state.workspaceId,
      summary: '',
      messages: [],
      model: 'gpt-4o-mini',
      active: true,
      settings: {
        contextCount: 15,
        maxTokens: 500,
        temperature: 0.7,
        model: 'gpt-4o-mini',
        topP: 1,
        n: 4,
        debug: false,
        summarizeMode: false,
      },
      apiKey: chatStore.state.apiKey,
    };
    createNewChatSession(newSessionData);
    sessionNameDialog.handleClose();
  };
  const handlePresetChange = event => {
    const selectedPresetName = event.target.value;
    const preset = presets.find(p => p.name === selectedPresetName);
    setSelectedPreset(preset);
  };
  const handleDialogAction = dialog => {
    dialog.handleClose();
  };

  return (
    <>
      <CssBaseline />
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#1C1C1C',
          // padding: '10px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            aria-label="menu"
            onClick={
              isMobile
                ? mobileMenu.handleMenuOpen
                : sessionNameDialog.handleOpen
            }
            sx={{ color: '#ffffff' }}
          >
            {isMobile ? <MenuIcon /> : <EditIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ color: '#ffffff', marginLeft: '8px' }}>
            Playground
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
          }}
        >
          <PresetSelect
            presets={presets}
            selectedPreset={selectedPreset}
            handlePresetChange={handlePresetChange}
          />
          <Button
            startIcon={<SaveIcon />}
            onClick={saveDialog.handleOpen}
            sx={{ color: '#ffffff' }}
          >
            Save
          </Button>
          <Button
            startIcon={<CodeIcon />}
            onClick={codeDialog.handleOpen}
            sx={{ color: '#ffffff' }}
          >
            View code
          </Button>
          <Button
            startIcon={<ShareIcon />}
            onClick={shareDialog.handleOpen}
            sx={{ color: '#ffffff' }}
          >
            Share
          </Button>
          <IconButton onClick={handleMenuOpen} sx={{ color: '#ffffff' }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              '& .MuiPaper-root': {
                bgcolor: '#333333',
                color: '#ffffff',
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {presets.map(preset => (
              <MenuItem key={preset.name} value={preset.name}>
                {preset.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
      <Popover
        open={mobileMenu.isOpen}
        anchorEl={mobileMenu.anchorEl}
        onClose={mobileMenu.handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ display: { xs: 'block', sm: 'none' }, p: 1 }}
      >
        <MenuList>
          <MenuItem onClick={handleCreateNewSession}>
            <EditIcon sx={{ mr: 1 }} /> New Session
          </MenuItem>
          {/* <PresetSelect
            presets={presets}
            selectedPreset={selectedPreset}
            handlePresetChange={handlePresetChange}
          />
          <MenuItem onClick={saveDialog.handleOpen}>
            <SaveIcon sx={{ mr: 1 }} /> Save
          </MenuItem>
          <MenuItem onClick={codeDialog.handleOpen}>
            <CodeIcon sx={{ mr: 1 }} /> View Code
          </MenuItem>
          <MenuItem onClick={shareDialog.handleOpen}>
            <ShareIcon sx={{ mr: 1 }} /> Share
          </MenuItem> */}
        </MenuList>
      </Popover>
      <DialogBox
        dialog={sessionNameDialog}
        title="New Session Name"
        handleAction={handleConfirmCreateSession}
      >
        <TextField
          autoFocus
          margin="dense"
          label="Session Name"
          fullWidth
          value={sessionHeader}
          onChange={e => setSessionHeader(e.target.value)}
          sx={{
            color: '#ffffff',
            '& .MuiInputBase-root': {
              color: '#ffffff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
          }}
        />
      </DialogBox>
      <DialogBox dialog={codeDialog} title="View code">
        <TextField
          multiline
          fullWidth
          rows={10}
          defaultValue={`import os\nimport openai\n\nopenai.api_key = os.getenv("OPENAI_API_KEY")\n\nresponse = openai.Completion.create(\n  model="davinci",\n  prompt="",\n  temperature=0.9,\n  max_tokens=5,\n  top_p=1,\n  frequency_penalty=0,\n  presence_penalty=0,\n)`}
          sx={{
            color: '#ffffff',
            '& .MuiInputBase-root': {
              color: '#ffffff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
          }}
        />
      </DialogBox>
      <DialogBox dialog={saveDialog} title="Save Preset">
        <TextField
          autoFocus
          margin="dense"
          label="Preset Name"
          fullWidth
          sx={{
            color: '#ffffff',
            '& .MuiInputBase-root': {
              color: '#ffffff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
          }}
        />
      </DialogBox>
      <DialogBox dialog={shareDialog} title="Share Preset">
        <Box display="flex" alignItems="center">
          <TextField
            value="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8"
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        'https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8'
                      )
                    }
                    sx={{ color: '#ffffff' }}
                  >
                    Copy
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              color: '#ffffff',
              '& .MuiInputBase-root': {
                color: '#ffffff',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff',
              },
            }}
          />
        </Box>
      </DialogBox>
    </>
  );
};
export default ChatHeader;
