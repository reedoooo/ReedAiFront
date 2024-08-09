import { InformationCircleIcon } from '@heroicons/react/24/outline';
import {
  Box,
  Button,
  createSvgIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormGroup,
  IconButton,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { workspaces as workspacesApi } from 'api/chat';
import { InfoOutlinedIcon, SettingsIcon } from 'assets/humanIcons';
import {
  StyledSlider,
  StyledSwitch,
  StyledSwitchFormControlLabel,
  StyledTextareaAutosize,
  StyledTextField,
  WorkspaceCreatorContainer,
} from 'components/chat/styled';
import { RCOption, RCSelect } from 'components/themed';
import { DEFAULT_APP_DATA } from 'config/app-data-configs';
import { useChatStore } from 'contexts/ChatProvider';
import { useDialog, useMode } from 'hooks';

const marks = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
];
const CustomIcon = createSvgIcon(
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12 4.5C10.4812 4.5 9.18807 5.64857 8.75697 7.08966C8.30641 7.03092 7.84789 7 7.379 7C5.71652 7 4.25 8.21098 4.25 9.9C4.25 11.589 5.71652 12.8 7.379 12.8C7.84789 12.8 8.30641 12.7691 8.75697 12.7103C9.18807 14.1514 10.4812 15.3 12 15.3C13.5188 15.3 14.8119 14.1514 15.243 12.7103C15.6936 12.7691 16.1521 12.8 16.621 12.8C18.2835 12.8 19.75 11.589 19.75 9.9C19.75 8.21098 18.2835 7 16.621 7C16.1521 7 15.6936 7.03092 15.243 7.08966C14.8119 5.64857 13.5188 4.5 12 4.5ZM4 8C4 6.89543 4.89543 6 6 6C7.10457 6 8 6.89543 8 8C8 9.10457 7.10457 10 6 10C4.89543 10 4 9.10457 4 8ZM12 5.5C13.3807 5.5 14.5 6.61929 14.5 8C14.5 9.38071 13.3807 10.5 12 10.5C10.6193 10.5 9.5 9.38071 9.5 8C9.5 6.61929 10.6193 5.5 12 5.5ZM18 8C18 6.89543 18.8954 6 20 6C21.1046 6 22 6.89543 22 8C22 9.10457 21.1046 10 20 10C18.8954 10 18 9.10457 18 8Z"
    fill="white"
  />,
  'CustomIcon'
);

export const WorkspaceCreatorForm = () => {
  const { theme } = useMode();
  const chatStore = useChatStore();
  const { selectedPreset, presets } = chatStore.state;
  const { setSelectedPreset } = chatStore.actions;
  const [name, setName] = useState('Default Workspace');
  const [instructions, setInstructions] = useState('Default instructions');
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(256);
  const [stopSequences, setStopSequences] = useState('Default stop sequence');
  const [topP, setTopP] = useState(0.9);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.1);
  const [presencePenalty, setPresencePenalty] = useState(0.1);
  const [model, setModel] = useState('gpt-4o-mini');
  const [contextLength, setContextLength] = useState(10);
  const [embeddingsProvider, setEmbeddingsProvider] = useState(
    'text-embedding-3-small'
  );
  const [systemPrompt, setSystemPrompt] = useState('Default system prompt');
  const [assistantPrompt, setAssistantPrompt] = useState(
    'Default assistant prompt'
  );
  const [fileSearchEnabled, setFileSearchEnabled] = useState(true);
  const [codeInterpreterEnabled, setCodeInterpreterEnabled] = useState(true);
  const [codeInput, setCodeInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePresetChange = event => {
    const selectedPresetName = event.target.value;
    const preset = presets.find(p => p.name === selectedPresetName);
    setSelectedPreset(preset);
  };
  const functionsDialog = useDialog();

  const handleSaveCode = () => {
    console.log('Code input:', codeInput);
    functionsDialog.handleClose();
  };
  const defaultAppData = DEFAULT_APP_DATA;
  const handleFileChange = event => {
    const files = event.target.files;
    console.log(files); // Handle the selected files
  };

  const handleSave = async () => {
    const workspaceData = {
      name,
      userId: sessionStorage.getItem('userId'),
      customPreset: {
        name: selectedPreset?.name || '',
        temperature,
        maxTokens,
        stopSequences,
        topP,
        frequencyPenalty,
        presencePenalty,
        model,
        contextLength,
        embeddingsProvider,
        systemPrompt,
        assistantPrompt,
        functions: [],
      },
      defaultData: {
        prompt: defaultAppData.PROMPT,
        file: defaultAppData.FILE,
        assistant: 'asst_IGZesXTMSiEQyO9qxg1FlOCG',
        tool: defaultAppData.TOOLS,
        model: defaultAppData.MODEL,
        folder: defaultAppData.FOLDER,
      },
    };

    try {
      const savedWorkspace = await workspacesApi.create(workspaceData);
      console.log('Workspace settings saved:', savedWorkspace);
      // Additional logic to update the user context can be added here
    } catch (error) {
      console.error('Error saving workspace:', error);
    }
  };

  return (
    <WorkspaceCreatorContainer theme={theme}>
      <Typography variant="h6" sx={{ color: '#ffffff' }}>
        Workspaces
      </Typography>
      <Divider sx={{ color: '#ffffff', marginBottom: '5px' }} />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Name
      </Typography>
      <StyledTextField
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Instructions
      </Typography>
      <StyledTextareaAutosize
        theme={theme}
        fullWidth
        multiline
        rows={4}
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
      />
      <Typography variant="h6" sx={{ color: '#ffffff', marginTop: '5px' }}>
        Models
      </Typography>
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Example
      </Typography>
      {/* <RCSelect defaultValue={10}>
        {[10, 20, 30].map((value, index) => (
          <RCOption key={index} value={value}>
            Option {value}
          </RCOption>
        ))}
      </RCSelect>{' '} */}
      <Divider sx={{ color: '#ffffff', marginBottom: '5px' }} />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Preset Name
      </Typography>
      <FormControl
        variant="outlined"
        sx={{
          minWidth: 200,
          marginRight: 2,
          color: '#ffffff',
        }}
      >
        <Select
          value={selectedPreset?.name || ''}
          onChange={handlePresetChange}
          label="Load a preset..."
          sx={{
            color: '#ffffff',
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
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Model Name
      </Typography>
      <FormControl fullWidth>
        <Select
          value={model}
          onChange={e => setModel(e.target.value)}
          label="Model"
          sx={{
            color: '#ffffff',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="gpt-4o">GPT-40</MenuItem>
          <MenuItem value="gpt-4o-mini">GPT-40-mini</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Context Length
      </Typography>
      <StyledTextField
        fullWidth
        value={contextLength}
        onChange={e =>
          setContextLength(
            e.target.value === '' ? '' : parseInt(e.target.value)
          )
        }
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Embeddings Provider
      </Typography>
      <StyledTextField
        fullWidth
        value={embeddingsProvider}
        onChange={e => setEmbeddingsProvider(e.target.value)}
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        System Prompt
      </Typography>
      <StyledTextField
        fullWidth
        multiline
        rows={3}
        value={systemPrompt}
        onChange={e => setSystemPrompt(e.target.value)}
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Assistant Prompt
      </Typography>
      <StyledTextField
        fullWidth
        multiline
        rows={3}
        value={assistantPrompt}
        onChange={e => setAssistantPrompt(e.target.value)}
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Temperature
      </Typography>
      <StyledSlider
        value={temperature}
        onChange={(e, newValue) => setTemperature(newValue)}
        min={0}
        max={1}
        step={0.01}
        marks={marks}
        valueLabelDisplay="auto"
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Maximum Tokens
      </Typography>
      <StyledSlider
        value={maxTokens}
        onChange={(e, newValue) => setMaxTokens(newValue)}
        min={1}
        max={512}
        step={1}
        valueLabelDisplay="auto"
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Stop sequences
      </Typography>
      <TextField
        placeholder="Enter sequence and press Tab"
        variant="outlined"
        fullWidth
        value={stopSequences}
        onChange={e => setStopSequences(e.target.value)}
        sx={{
          color: '#ffffff',
        }}
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Top P
      </Typography>
      <StyledSlider
        value={topP}
        onChange={(e, newValue) => setTopP(newValue)}
        min={0}
        max={1}
        step={0.01}
        marks={marks}
        valueLabelDisplay="auto"
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Frequency penalty
      </Typography>
      <StyledSlider
        value={frequencyPenalty}
        onChange={(e, newValue) => setFrequencyPenalty(newValue)}
        min={0}
        max={2}
        step={0.01}
        valueLabelDisplay="auto"
      />
      <Typography variant="caption" sx={{ color: '#ffffff' }}>
        Presence penalty
      </Typography>
      <StyledSlider
        value={presencePenalty}
        onChange={(e, newValue) => setPresencePenalty(newValue)}
        min={0}
        max={2}
        step={0.01}
        valueLabelDisplay="auto"
      />
      <FormGroup>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            marginBottom: '10px',
            fontSize: '0.875rem', // Directly targeting the label font size
          }}
        >
          <StyledSwitchFormControlLabel
            control={
              <StyledSwitch
                checked={fileSearchEnabled}
                onChange={() => setFileSearchEnabled(!fileSearchEnabled)}
              />
            }
            label="File search"
          />
          <Tooltip title="Information about Code interpreter">
            <IconButton sx={{ marginLeft: 'auto', color: '#ffffff' }}>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>

          <IconButton sx={{ marginLeft: 'auto' }}>
            <SettingsIcon />
          </IconButton>
          <label htmlFor="file-input" style={{ marginLeft: '10px' }}>
            <input
              id="file-input"
              type="file"
              accept="*"
              style={{
                display: 'none',
              }}
              onChange={handleFileChange} // You can define this function to handle file selection
            />
            <Button
              component="span"
              variant="outlined"
              sx={{
                color: '#ffffff',
                borderColor: '#ffffff',
                height: '50%', // Reducing height by 50%
                width: '100%', // Adjusting width to fit the reduced height
                padding: '4px 10px', // Adjust padding to fit the reduced height
              }}
            >
              + Files
            </Button>
          </label>
        </Box>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)', width: '100%' }} />
        <Box display="flex" alignItems="center" sx={{ marginBottom: '10px' }}>
          <StyledSwitchFormControlLabel
            control={
              <StyledSwitch
                checked={codeInterpreterEnabled}
                onChange={() =>
                  setCodeInterpreterEnabled(!codeInterpreterEnabled)
                }
              />
            }
            label="Code interpreter"
          />
          <Tooltip title="Information about Code interpreter">
            <IconButton sx={{ marginLeft: 'auto', color: '#ffffff' }}>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
          <IconButton sx={{ marginLeft: 'auto' }}>
            <SettingsIcon />
          </IconButton>
          <label htmlFor="file-input" style={{ marginLeft: '10px' }}>
            <input
              id="file-input"
              type="file"
              accept="*"
              style={{
                display: 'none',
              }}
              onChange={handleFileChange} // You can define this function to handle file selection
            />
            <Button
              component="span"
              variant="outlined"
              sx={{
                color: '#ffffff',
                borderColor: '#ffffff',
                height: '50%', // Reducing height by 50%
                width: '100%', // Adjusting width to fit the reduced height
                padding: '4px 10px', // Adjust padding to fit the reduced height
              }}
            >
              + Files
            </Button>
          </label>
        </Box>
      </FormGroup>
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)', width: '100%' }} />
      <Box display="flex" alignItems="center" sx={{ marginBottom: '10px' }}>
        <Typography variant="h6" sx={{ color: '#ffffff', marginRight: '10px' }}>
          Functions
        </Typography>
        <Tooltip title="Information about Functions">
          <InformationCircleIcon
            sx={{
              color: '#ffffff',
              marginLeft: '5px',
              height: '18px',
              width: '18px',
            }}
          />{' '}
        </Tooltip>
        <Button
          variant="outlined"
          sx={{ color: '#ffffff', borderColor: '#ffffff', marginLeft: 'auto' }}
          onClick={functionsDialog.handleOpen}
        >
          + Functions
        </Button>
      </Box>
      <Dialog open={functionsDialog.open} onClose={functionsDialog.handleClose}>
        <DialogTitle>Enter Function Code</DialogTitle>
        <DialogContent>
          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            margin="dense"
            id="code-input"
            label="Code"
            type="text"
            fullWidth
            multiline
            rows={10}
            value={codeInput}
            onChange={e => setCodeInput(e.target.value)}
            variant="outlined"
            inputProps={{ style: { fontFamily: 'monospace' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={functionsDialog.handleClose}>Cancel</Button>
          <Button onClick={handleSaveCode}>Save</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          width: '100%',
        }}
      >
        <InformationCircleIcon
          sx={{
            color: '#ffffff',
            marginRight: '10px',
            height: '18px',
            width: '18px',
          }}
        />
        <Typography variant="body2" sx={{ color: '#ffffff' }}>
          GenerateComponentCode
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.2)',
          },
          marginTop: '20px',
          alignSelf: 'center',
        }}
      >
        Save Workspace
      </Button>
      <Typography variant="body2" sx={{ color: '#ffffff', marginTop: '20px' }}>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ marginRight: '8px' }}>
            <CustomIcon />
          </Box>
          API and Playground requests will not be used to train our models.{' '}
          <a
            href="https://platform.openai.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#5CDB95' }}
          >
            Learn more
          </a>
        </Box>
      </Typography>
    </WorkspaceCreatorContainer>
  );
};

export default WorkspaceCreatorForm;
