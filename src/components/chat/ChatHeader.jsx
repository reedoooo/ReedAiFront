/* eslint-disable jsx-a11y/no-autofocus */
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import routes from '@/routes/index';
import {
  CodeIcon,
  EditIcon,
  MenuIcon,
  MoreVertIcon,
  SaveIcon,
  ShareIcon,
} from 'assets/humanIcons';
import { useChatStore, useUserStore } from 'contexts';
import { useChatHandler, useDialog, useMenu, useMode } from 'hooks';
import { extractPaths, findBreadcrumbs } from 'utils/navigation';
import { PresetSelect } from './sidebar/panel';

const DialogBox = ({ dialog, title, subtitle, children, handleAction }) => (
  <Dialog
    open={dialog.open}
    onClose={dialog.handleClose}
    fullWidth={true}
    maxWidth={'sm'}
    sx={{
      '& .MuiPaper-root': {
        bgcolor: '#2B2C31',
      },
    }}
  >
    <DialogTitle>
      <Typography variant="h6" component="div" color="#ffffff">
        {title}
      </Typography>
    </DialogTitle>
    <DialogContent>
      {subtitle && (
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
      {children}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={dialog.handleClose}
        sx={{
          background: '#353740',
          color: '#ffffff',
        }}
      >
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
  const { selectedPreset, presets, sessionHeader, sessionId, workspaceId } =
    chatStore.state;
  const { setSelectedPreset, setSessionHeader } = chatStore.actions;
  const codeDialog = useDialog();
  const saveDialog = useDialog();
  const shareDialog = useDialog();
  const sessionNameDialog = useDialog();
  const { handleCreateNewSession } = useChatHandler();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile
  const mobileMenu = useMenu();
  const pathName = window.location.pathname;
  const linkPaths = extractPaths(routes);
  const breadcrumbs = findBreadcrumbs(pathName, linkPaths);
  let crumbs = [];
  let header = '';
  breadcrumbs.forEach((crumb, index) => {
    if (index === breadcrumbs.length - 1) {
      header = crumb.text;
    } else {
      crumbs.push(crumb);
    }
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleOpenSessionDialog = () => {
    sessionNameDialog.handleOpen();
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
            {header.length === 0 ? 'Playground' : header.toLocaleUpperCase()}
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
          <MenuItem onClick={handleOpenSessionDialog}>
            <EditIcon sx={{ mr: 1 }} /> New Session
          </MenuItem>
        </MenuList>
      </Popover>
      <DialogBox
        dialog={sessionNameDialog}
        title="New Session Name"
        handleAction={() => {
          handleCreateNewSession();
          sessionNameDialog.handleClose();
        }}
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
      <DialogBox
        dialog={codeDialog}
        title="View code"
        subtitle="The model will intelligently decide to call functions based on the input it receives from the user"
      >
        <TextField
          multiline
          fullWidth
          rows={10}
          defaultValue={`import os\nimport openai\n\nopenai.api_key = os.getenv("OPENAI_API_KEY")\n\nresponse = openai.Completion.create(\n  model="davinci",\n  prompt="",\n  temperature=0.9,\n  max_tokens=5,\n  top_p=1,\n  frequency_penalty=0,\n  presence_penalty=0,\n)`}
          sx={{
            color: '#888888',
            '& .MuiInputBase-root': {
              color: '#888888',
              p: '0.875rem',
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
