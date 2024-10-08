import { Box, Button, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  PanelContainer,
  StyledButton,
  StyledTextareaAutosize,
  StyledTextField,
  TabContentContainer,
} from 'components/chat/styled';
import { useChatStore } from 'contexts/ChatProvider';
import {
  FormSection,
  ReusableSliderField,
  ReusableSwitchControl,
} from '../shared-items';

export const AssistantDisplay = props => {
  const {
    state: { assistants, selectedAssistant },
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
        <StyledTextField
          label="Name"
          name="name"
          value={formObject.name}
          onChange={handleChange}
          fullWidth
        />
        <StyledTextField
          label="Role"
          name="role"
          value={formObject.role}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
        />
        <FormSection label="Instructions">
          <StyledTextareaAutosize
            minRows={4}
            name="instructions"
            value={formObject.instructions}
            onChange={handleChange}
            style={{ width: '100%', color: 'white', backgroundColor: '#333' }}
          />
        </FormSection>

        <FormSection label="Model">
          <Select
            fullWidth
            variant="outlined"
            name="model"
            value={formObject.model}
            onChange={handleChange}
            sx={{ color: 'white', '.MuiSelect-icon': { color: 'white' } }}
          >
            <MenuItem value="gpt-4.0">gpt-4.0</MenuItem>
          </Select>
        </FormSection>

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
          <ReusableSliderField
            label="Temperature"
            value={formObject.temperature}
            onChange={newValue =>
              setFormObject(prevState => ({
                ...prevState,
                temperature: newValue,
              }))
            }
            min={0}
            max={1}
            step={0.01}
          />
          <ReusableSliderField
            label="Top P"
            value={formObject.top_p}
            onChange={newValue =>
              setFormObject(prevState => ({
                ...prevState,
                top_p: newValue,
              }))
            }
            min={0}
            max={1}
            step={0.01}
          />
          <Button variant="contained">Switch to v1</Button>
        </FormSection>

        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save Changes
        </StyledButton>
      </Box>
    </PanelContainer>
  );
};
