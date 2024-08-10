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
import {
  StyledButton,
  StyledMotionTabs,
  StyledTextField,
  TabContentContainer,
} from 'components/chat/styled';
import { useMode } from 'hooks';

const Assistants = () => {
  const [tab, setTab] = useState(0);
  const [defaultAssistant, setDefaultAssistant] = useState({
    name: '',
    role: '',
  });
  const [defaultTemplate, setDefaultTemplate] = useState({
    name: '',
    content: '',
  });
  const { theme } = useMode();
  useEffect(() => {
    setDefaultAssistant({ name: 'Default Assistant', role: 'Default Role' });
    setDefaultTemplate({
      name: 'Default Template',
      content: 'Default Content',
    });
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedTab, setSelectedTab] = useState('main');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const itemRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const handleSave = () => {
    console.log('Workspace updated!');
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      itemRef.current?.click();
    }
  };

  const assistantList = [
    { name: 'Assistant 1', _id: '1' },
    { name: 'Assistant 2', _id: '2' },
    // Add more assistants as needed
  ];

  const templateList = [
    { templateName: 'Template 1', templateText: 'Content 1', _id: '1' },
    { templateName: 'Template 2', templateText: 'Content 2', _id: '2' },
    // Add more templates as needed
  ];

  const handleAssistantChange = e => {
    const { name, value } = e.target;
    setDefaultAssistant(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAssistant = () => {
    console.log('New Assistant Created:', defaultAssistant);
    // Add logic to create a new assistant
  };

  const deleteAssistant = id => {
    console.log('Delete Assistant with ID:', id);
    // Add logic to delete an assistant
  };

  const handleTemplateChange = e => {
    const { name, value } = e.target;
    setDefaultTemplate(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTemplate = () => {
    console.log('New Template Created:', defaultTemplate);
    // Add logic to create a new template
  };

  const deleteTemplate = id => {
    console.log('Delete Template with ID:', id);
    // Add logic to delete a template
  };

  return (
    <>
      <Box
        ref={itemRef}
        sx={{
          '&:hover': {
            backgroundColor: 'accent.main',
            opacity: 0.5,
          },
          display: 'flex',
          width: '100%',
          cursor: 'pointer',
          alignItems: 'center',
          borderRadius: '4px',
          padding: '8px',
          outline: 'none',
        }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <FaSignOutAlt sx={{ fontSize: 30 }} />{' '}
        <Typography
          sx={{
            marginLeft: '12px',
            flex: 1,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Assistant and Template Manager
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          color: 'white',
          borderRadius: '14px',
          background: '#1c1c1c',
        }}
      >
        <StyledMotionTabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          indicatorColor="#fff"
        >
          <Tab
            label="Assistants"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab
            label="Assistant Templates"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
        </StyledMotionTabs>
      </Box>

      {tab === 0 && (
        <TabContentContainer>
          <List>
            {assistantList.map((assistant, index) => (
              <ListItem key={index}>
                <ListItemText primary={assistant.name} />
                <IconButton
                  edge="end"
                  onClick={() => deleteAssistant(assistant._id)}
                >
                  <FaTrashAlt style={{ color: '#fff' }} />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <StyledTextField
              label="Name"
              name="name"
              value={defaultAssistant.name}
              onChange={handleAssistantChange}
              fullWidth
            />
            <StyledTextField
              label="Role"
              name="role"
              value={defaultAssistant.role}
              onChange={handleAssistantChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            {/* Instructions Section */}
            <Box>
              <Typography variant="h6">Instructions</Typography>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="dense"
                InputProps={{ style: { color: 'white' } }}
              />
            </Box>

            {/* Model Section */}
            <Box>
              <Typography variant="h6">Model</Typography>
              <Select
                fullWidth
                variant="outlined"
                margin="dense"
                defaultValue="gpt-4.0"
                sx={{ color: 'white', '.MuiSelect-icon': { color: 'white' } }}
              >
                <MenuItem value="gpt-4.0">gpt-4.0</MenuItem>
              </Select>
            </Box>

            {/* Tools Section */}
            <Box>
              <Typography variant="h6">Tools</Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="File search"
                sx={{ color: 'white' }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Code interpreter"
                sx={{ color: 'white' }}
              />
              <Button variant="contained">+ Files</Button>
            </Box>

            {/* Functions Section */}
            <Box>
              <Typography variant="h6">Functions</Typography>
              <Button variant="contained">GenerateComponentCode</Button>
            </Box>

            {/* Model Configuration Section */}
            <Box>
              <Typography variant="h6">Model Configuration</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Response format"
                sx={{ color: 'white' }}
              />
              <Typography gutterBottom>Temperature</Typography>
              <Slider
                defaultValue={1}
                min={0}
                max={1}
                step={0.01}
                sx={{ color: 'white' }}
              />
              <Typography gutterBottom>Top P</Typography>
              <Slider
                defaultValue={1}
                min={0}
                max={1}
                step={0.01}
                sx={{ color: 'white' }}
              />
              <Button variant="contained">Switch to v1</Button>
            </Box>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleCreateAssistant}
              sx={{ mt: 2 }}
            >
              Add Assistant
            </StyledButton>
          </Box>
        </TabContentContainer>
      )}
      {tab === 1 && (
        <TabContentContainer>
          <List>
            {templateList.map((template, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={template.templateName}
                  secondary={template.templateText}
                />
                <IconButton
                  edge="end"
                  onClick={() => deleteTemplate(template._id)}
                >
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
            </StyledButton>
          </Box>
        </TabContentContainer>
      )}
    </>
  );
};

export default Assistants;
