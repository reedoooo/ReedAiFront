import { Box, MenuItem, Typography } from '@mui/material';
import React from 'react';
import {
  RCListBox,
  RCOption,
  RCPopup,
  RCSelect,
  RCSelectRoot,
} from 'components/themed/HumanUi';

const DropdownDisplay = ({
  label,
  items,
  getItemLabel,
  selectedValue,
  onChange,
}) => (
  <Box sx={{ marginBottom: '20px' }}>
    <Typography variant="h6" sx={{ marginBottom: '5px', color: '#ffffff' }}>
      {label}
    </Typography>
    <RCSelect
      value={selectedValue}
      onChange={(e, value) => onChange(value)}
      slots={{
        root: RCSelectRoot, // Your custom button
        listbox: RCListBox, // Your custom listbox
        popup: RCPopup, // Your custom popup
      }}
    >
      {items.map((item, index) => (
        <RCOption key={index} value={getItemLabel(item)}>
          <Typography variant="body2" sx={{ color: '#ffffff' }}>
            {getItemLabel(item)}
          </Typography>
        </RCOption>
      ))}
    </RCSelect>
  </Box>
);

export const DisplayDropdownMenus = ({
  workspaces,
  chatSessions,
  modelNames,
  presets,
  prompts,
  models,
  collections,
  files,
  assistants,
  tools,
  handleSelectChange, // Callback to handle selection
}) => {
  console.log(
    'DisplayDropdownMenus',
    workspaces,
    chatSessions,
    modelNames,
    presets,
    prompts,
    models,
    collections,
    files,
    assistants,
    tools,
    handleSelectChange
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <DropdownDisplay
        label="Workspaces"
        items={workspaces}
        selectedValue=""
        onChange={value => handleSelectChange('workspaces', value)}
        getItemLabel={item => item.name} // Assuming each workspace object has a 'name' property
      />
      <DropdownDisplay
        label="Chat Sessions"
        items={chatSessions}
        selectedValue=""
        onChange={value => handleSelectChange('chatSessions', value)}
        getItemLabel={item => item.sessionName} // Assuming each chat session object has a 'sessionName' property
      />
      <DropdownDisplay
        label="Model Names"
        items={modelNames}
        selectedValue=""
        onChange={value => handleSelectChange('modelNames', value)}
        getItemLabel={item => item} // Assuming modelNames is an array of strings
      />
      <DropdownDisplay
        label="Presets"
        items={presets}
        selectedValue=""
        onChange={value => handleSelectChange('presets', value)}
        getItemLabel={item => item.name} // Assuming each preset object has a 'name' property
      />
      <DropdownDisplay
        label="Prompts"
        items={prompts}
        selectedValue=""
        onChange={value => handleSelectChange('prompts', value)}
        getItemLabel={item => item.prompt} // Assuming each prompt object has a 'prompt' property
      />
      <DropdownDisplay
        label="Models"
        items={models}
        selectedValue=""
        onChange={value => handleSelectChange('models', value)}
        getItemLabel={item => item.modelName} // Assuming each model object has a 'modelName' property
      />
      <DropdownDisplay
        label="Collections"
        items={collections}
        selectedValue=""
        onChange={value => handleSelectChange('collections', value)}
        getItemLabel={item => item.collectionName} // Assuming each collection object has a 'collectionName' property
      />
      <DropdownDisplay
        label="Files"
        items={files}
        selectedValue=""
        onChange={value => handleSelectChange('files', value)}
        getItemLabel={item => item.name} // Assuming each file object has a 'name' property
      />
      <DropdownDisplay
        label="Assistants"
        items={assistants}
        selectedValue=""
        onChange={value => handleSelectChange('assistants', value)}
        getItemLabel={item => item.name} // Assuming each assistant object has a 'name' property
      />
      <DropdownDisplay
        label="Tools"
        items={tools}
        selectedValue=""
        onChange={value => handleSelectChange('tools', value)}
        getItemLabel={item => item.toolName} // Assuming each tool object has a 'toolName' property
      />
    </Box>
  );
};

export default DisplayDropdownMenus;
