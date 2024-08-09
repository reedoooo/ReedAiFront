/* eslint-disable jsx-a11y/no-autofocus */
import { ShareIcon } from '@heroicons/react/24/outline';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Fade,
  AppBar,
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
  InputLabel,
  TextField,
  CssBaseline,
  Container,
  InputAdornment,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { EditIcon, MoreVertIcon, SaveIcon } from 'assets/humanIcons';
import { CodeIcon } from 'assets/humanIcons/custom';
import IconBox from 'assets/humanIcons/utils/IconBox';
import { useChatStore } from 'contexts/ChatProvider';
import useDialog from 'hooks/useDialog';
import { useMode } from 'hooks/useMode';
import { Header } from './styled';
const PresetSelect = ({ presets, selectedPreset, handlePresetChange }) => (
  <FormControl
    variant="outlined"
    sx={{
      minWidth: 200,
      marginRight: 2,
      color: '#ffffff',
    }}
  >
    {/* <InputLabel sx={{ color: '#ffffff' }}>Load a preset...</InputLabel> */}
    <Select
      value={selectedPreset.name || ''}
      onChange={handlePresetChange}
      label="Load a preset..."
      sx={{
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
            bgcolor: '#333333',
            color: '#ffffff',
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
      {presets.map(preset => (
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
  const [expanded, setExpanded] = React.useState(false);
  const { name, handleOpen } = props;
  const handleExpansion = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const codeDialog = useDialog();
  const saveDialog = useDialog();
  const shareDialog = useDialog();

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePresetChange = event => {
    const selectedPresetName = event.target.value;
    const preset = presets.find(p => p.name === selectedPresetName);
    setSelectedPreset(preset);
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
          <IconButton aria-label="edit" sx={{ color: '#ffffff' }}>
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

      <Dialog
        open={codeDialog.open}
        onClose={codeDialog.handleClose}
        sx={{
          '& .MuiPaper-root': {
            bgcolor: '#333333',
          },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>View code</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={codeDialog.handleClose} sx={{ color: '#ffffff' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={saveDialog.open}
        onClose={saveDialog.handleClose}
        sx={{
          '& .MuiPaper-root': {
            bgcolor: '#333333',
          },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>Save Preset</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={saveDialog.handleClose} sx={{ color: '#ffffff' }}>
            Cancel
          </Button>
          <Button onClick={saveDialog.handleClose} sx={{ color: '#ffffff' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={shareDialog.open}
        onClose={shareDialog.handleClose}
        sx={{
          '& .MuiPaper-root': {
            bgcolor: '#333333',
          },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>Share Preset</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={shareDialog.handleClose} sx={{ color: '#ffffff' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ChatHeader;
