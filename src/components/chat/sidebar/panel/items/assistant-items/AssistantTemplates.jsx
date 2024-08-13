import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  Switch,
  Tab,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';
import { AssistantIcon } from 'assets/humanIcons';
import {
  StyledButton,
  StyledMotionTabs,
  StyledTextField,
  TabContentContainer,
} from 'components/chat/styled';
import { useMode } from 'hooks';

export const AssistantTemplates = () => {
  return (
    <TabContentContainer>
      {/* <List>
        {templateList.map((template, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={template.templateName}
              secondary={template.templateText}
            />
            <IconButton edge="end" onClick={() => deleteTemplate(template._id)}>
              <FaTrashAlt style={{ color: '#fff' }} />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <StyledTextField
          label="Template Name"
          name="templateName"
          value={defaultTemplate.name}
          onChange={handleTemplateChange}
          fullWidth
        />
        <StyledTextField
          label="Template Text"
          name="templateText"
          value={defaultTemplate.content}
          onChange={handleTemplateChange}
          fullWidth
          sx={{ mt: 2 }}
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleCreateTemplate}
          sx={{ mt: 2 }}
        >
          Add Template
        </StyledButton> */}
      {/* </Box> */}
    </TabContentContainer>
  );
};
