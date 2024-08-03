import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import React, { useState } from 'react';

export const WorkspaceDialog = ({ open, onClose, onCreate, res }) => {
  const [workspaceData, setWorkspaceData] = useState({
    userId: '',
    name: '',
    description: '',
    imagePath: '',
    activeChatSession: '',
    defaultPreset: res.defaultPreset,
    defaultTool: res.defaultTool,
    defaultModel: res.defaultModel,
    defaultPrompt: res.defaultPrompt,
    defaultCollection: res.defaultCollection,
    defaultFile: res.defaultFile,
    defaultAssistant: res.defaultAssistant,
    chatSessions: [],
    folders: [],
    active: false,
    defaultContextLength: '',
    defaultTemperature: '',
    embeddingsProvider: '',
    instructions: '',
    sharing: '',
    includeProfileContext: false,
    includeWorkspaceInstructions: false,
    isHome: false,
  });

  const handleChange = (field, value) => {
    setWorkspaceData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...workspaceData[field]];
    newArray[index] = value;
    setWorkspaceData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = () => {
    onCreate(workspaceData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Workspace</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Workspace Name"
          value={workspaceData.name}
          onChange={e => handleChange('name', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Description"
          value={workspaceData.description}
          onChange={e => handleChange('description', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Image Path"
          value={workspaceData.imagePath}
          onChange={e => handleChange('imagePath', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="User ID"
          value={workspaceData.userId}
          onChange={e => handleChange('userId', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Active Chat Session ID"
          value={workspaceData.activeChatSession}
          onChange={e => handleChange('activeChatSession', e.target.value)}
        />
        {/* Additional input fields for arrays and objects */}
        <TextField
          fullWidth
          margin="dense"
          label="Default Context Length"
          value={workspaceData.defaultContextLength}
          onChange={e => handleChange('defaultContextLength', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Default Model"
          value={workspaceData.defaultModel}
          onChange={e => handleChange('defaultModel', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Default Temperature"
          value={workspaceData.defaultTemperature}
          onChange={e => handleChange('defaultTemperature', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Embeddings Provider"
          value={workspaceData.embeddingsProvider}
          onChange={e => handleChange('embeddingsProvider', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Instructions"
          value={workspaceData.instructions}
          onChange={e => handleChange('instructions', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Sharing"
          value={workspaceData.sharing}
          onChange={e => handleChange('sharing', e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={workspaceData.includeProfileContext}
              onChange={e =>
                handleChange('includeProfileContext', e.target.checked)
              }
            />
          }
          label="Include Profile Context"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={workspaceData.includeWorkspaceInstructions}
              onChange={e =>
                handleChange('includeWorkspaceInstructions', e.target.checked)
              }
            />
          }
          label="Include Workspace Instructions"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={workspaceData.isHome}
              onChange={e => handleChange('isHome', e.target.checked)}
            />
          }
          label="Is Home Workspace"
        />
        {/* Add more fields as needed for nested objects */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkspaceDialog;
