/* eslint-disable jsx-a11y/no-autofocus */
import {
  Typography,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  TextField,
  CssBaseline,
  InputAdornment,
} from '@mui/material';
import React, { useState } from 'react';
import {
  EditIcon,
  MoreVertIcon,
  SaveIcon,
  CodeIcon,
  ShareIcon,
} from 'assets/humanIcons';
// import { CodeIcon } from 'assets/humanIcons/custom';
import { useChatStore } from 'contexts';
import { useMode, useDialog } from 'hooks';

const PresetSelect = ({ presets, selectedPreset, handlePresetChange }) => (
  <FormControl
    variant="outlined"
    sx={{
      minWidth: 200,
      marginRight: 2,
      color: '#ffffff',
    }}
  >
    <Select
      value={selectedPreset.name || ''}
      onChange={handlePresetChange}
      label="Load a preset..."
      sx={{
        backgroundColor: 'transparent',
        color: '#ffffff',
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
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: '#333333',
            color: '#212121',
            '& .MuiMenuItem-root': {
              justifyContent: 'center',
            },
          },
        },
      }}
    >
      <MenuItem value="" disabled>
        Select a preset...
      </MenuItem>
      {presets?.map(preset => (
        <MenuItem key={preset.name} value={preset.name}>
          {preset.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

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
  const { selectedPreset, presets } = chatStore.state;
  const { setSelectedPreset } = chatStore.actions;
  const { name, handleOpen } = props;
  const codeDialog = useDialog();
  const saveDialog = useDialog();
  const shareDialog = useDialog();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

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
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: '#ffffff', marginLeft: '8px' }}>
            Playground
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
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
