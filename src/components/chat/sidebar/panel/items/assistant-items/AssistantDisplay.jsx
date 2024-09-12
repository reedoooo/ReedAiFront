import { Box, Button, FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PanelContainer } from 'components/chat/styled';
import {
  RCFileInputButton,
  SliderFieldSection,
  TextAreaAutosizeSection,
  TextFieldSection,
} from 'components/themed';
import { FormSectionLabel } from 'components/themed/HumanUi/RCComposables/container-components';
import { useChatStore } from 'contexts/ChatProvider';
import { FormSection, ReusableSwitchControl } from '../shared-items';
export const AssistantDisplay = props => {
  const {
    state: { assistants, selectedAssistant, modelNames },
    actions: { deleteAssistant, setSelectedAssistant, createAssistant },
  } = useChatStore();

  // Add a check for selectedAssistant being undefined or null
  const initialFormObject = {
    name: selectedAssistant?.name || '',
    role: selectedAssistant?.role || '',
    instructions: selectedAssistant?.instructions || '',
    model: selectedAssistant?.model || '',
    tools: selectedAssistant?.tools || [],
    file_search: selectedAssistant?.file_search || false,
    code_interpreter: selectedAssistant?.code_interpreter || false,
    functions: selectedAssistant?.functions || [],
    model_configuration: {
      response_format:
        selectedAssistant?.model_configuration?.response_format || false,
      temperature: selectedAssistant?.model_configuration?.temperature || 0.5,
      top_p: selectedAssistant?.model_configuration?.top_p || 0.5,
    },
    temperature: selectedAssistant?.temperature || 0.5,
    top_p: selectedAssistant?.top_p || 0.5,
  };

  const [formObject, setFormObject] = useState(initialFormObject);

  useEffect(() => {
    // Sync formObject with selectedAssistant when selectedAssistant changes
    setFormObject({
      name: selectedAssistant?.name || '',
      role: selectedAssistant?.role || '',
      instructions: selectedAssistant?.instructions || '',
      model: selectedAssistant?.model || '',
      tools: selectedAssistant?.tools || [],
      file_search: selectedAssistant?.file_search || false,
      code_interpreter: selectedAssistant?.code_interpreter || false,
      functions: selectedAssistant?.functions || [],
      model_configuration: {
        response_format:
          selectedAssistant?.model_configuration?.response_format || false,
        temperature: selectedAssistant?.model_configuration?.temperature || 0.5,
        top_p: selectedAssistant?.model_configuration?.top_p || 0.5,
      },
      temperature: selectedAssistant?.temperature || 0.5,
      top_p: selectedAssistant?.top_p || 0.5,
    });
  }, [selectedAssistant]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormObject(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log('formObject', formObject);
  };

  const handleSubmit = async () => {
    // Update the assistant in the store only when the form is submitted
    createAssistant(formObject);
  };

  return (
    <PanelContainer>
      <Box sx={{ mt: 2 }}>
        <TextFieldSection
          label="Name"
          value={formObject.name}
          onChange={handleChange}
          variant="darkMode"
          fullWidth
        />
        <TextFieldSection
          label="Role"
          value={formObject.role}
          onChange={handleChange}
          variant="darkMode"
          fullWidth
        />
        <TextAreaAutosizeSection
          label="Instructions"
          minRows={3}
          maxRows={5}
          placeholder="Instructions content..."
          variant="darkMode"
          value={formObject.instructions}
          onChange={handleChange}
        />

        <FormSectionLabel label="Model Name" />
        <FormControl fullWidth>
          <Select
            value={formObject.model}
            onChange={handleChange}
            label="Model"
            sx={{
              color: '#ffffff',
              '&.Mui-focused': {
                opacity: 1,
                transform: 'scale(1, 1)',
                transition:
                  'opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48)',
              },
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
              PaperProps: {
                sx: {
                  maxHeight: 200,
                  mt: '10px',
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Select a model...
            </MenuItem>
            {modelNames?.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormSection label="Tools">
          <ReusableSwitchControl
            label="File search"
            checked={formObject.file_search}
            onChange={() =>
              setFormObject(prevState => ({
                ...prevState,
                file_search: !prevState.file_search,
              }))
            }
          />
          <ReusableSwitchControl
            label="Code interpreter"
            checked={formObject.code_interpreter}
            onChange={() =>
              setFormObject(prevState => ({
                ...prevState,
                code_interpreter: !prevState.code_interpreter,
              }))
            }
          />
          <Button variant="contained">+ Files</Button>
        </FormSection>

        <FormSection label="Functions">
          <Button variant="contained">GenerateComponentCode</Button>
        </FormSection>

        <FormSection label="Model Configuration">
          <ReusableSwitchControl
            label="Response format"
            checked={formObject.model_configuration.response_format}
            onChange={() =>
              setFormObject(prevState => ({
                ...prevState,
                model_configuration: {
                  ...prevState.model_configuration,
                  response_format:
                    !prevState.model_configuration.response_format,
                },
              }))
            }
          />
          <SliderFieldSection
            label="Temperature"
            valueLabelDisplay="auto"
            value={formObject.model_configuration.temperature}
            onChange={handleChange}
            min={0}
            max={1}
            step={0.01}
          />
          <SliderFieldSection
            label="Top P"
            valueLabelDisplay="auto"
            value={formObject.model_configuration.top_p}
            onChange={handleChange}
            min={0}
            max={1}
            step={0.01}
          />
          <Button variant="contained">Switch to v1</Button>
        </FormSection>
        <Button
          variant="contained"
          onClick={handleSubmit}
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
          Save Assistant
        </Button>
      </Box>
    </PanelContainer>
  );
};
