import CloseIcon from '@mui/icons-material/Close';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import StarRating from 'components/themed/UncommonUi/rating';

const promptTemplates = [
  {
    name: 'Customer Service - Product Return',
    content:
      'You are a customer service representative for an e-commerce company. A customer wants to return a product they purchased last week. Guide them through the return process, explaining the policy and steps required.',
    userIntent: 'Return a recently purchased product',
    responseTone: 'friendly',
    tags: ['Customer Service', 'E-commerce', 'Returns'],
  },
  {
    name: 'Technical Support - Wi-Fi Troubleshooting',
    content:
      'You are a technical support specialist for an internet service provider. A customer is having trouble connecting to their Wi-Fi network. Walk them through the basic troubleshooting steps to resolve common Wi-Fi issues.',
    userIntent: 'Resolve Wi-Fi connection problems',
    responseTone: 'informative',
    tags: ['Technical Support', 'Wi-Fi', 'Troubleshooting'],
  },
  {
    name: 'AI Assistant - Introduction',
    content:
      'You are an AI assistant introducing yourself to a new user. Explain your capabilities, how you can help, and invite the user to ask questions or request assistance.',
    userIntent: 'Learn about AI assistant capabilities',
    responseTone: 'casual',
    tags: ['AI', 'Introduction', 'Capabilities'],
  },
];

const ChatBotPromptTemplate = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [userIntent, setUserIntent] = useState(initialData?.userIntent || '');
  const [responseTone, setResponseTone] = useState(
    initialData?.responseTone || ''
  );
  const [relevanceRating, setRelevanceRating] = useState(0);
  const [clarityRating, setClarityRating] = useState(0);
  const [helpfulnessRating, setHelpfulnessRating] = useState(0);
  const [tags, setTags] = useState(initialData?.tags || []);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      name,
      content,
      userIntent,
      responseTone,
      relevanceRating,
      clarityRating,
      helpfulnessRating,
      tags,
    };
    onSubmit(formData);
  };

  const tagSuggestions = [
    'AI',
    'Machine Learning',
    'Natural Language Processing',
    'Chatbot',
    'Customer Service',
    'Technical Support',
    'Sales',
    'Marketing',
  ];

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          AI Chatbot Prompt Template
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          margin="normal"
          variant="outlined"
          helperText="Provide the name for the conversation."
        />
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          margin="normal"
          variant="outlined"
          helperText="Provide the content for the conversation."
        />
        <TextField
          fullWidth
          label="User Intent"
          value={userIntent}
          onChange={e => setUserIntent(e.target.value)}
          margin="normal"
          variant="outlined"
          helperText="Specify the user's intent or goal."
        />
        <TextField
          fullWidth
          select
          label="Response Tone"
          value={responseTone}
          onChange={e => setResponseTone(e.target.value)}
          margin="normal"
          variant="outlined"
          helperText="Select the tone for the chatbot's response."
        >
          <MenuItem value="friendly">Friendly</MenuItem>
          <MenuItem value="formal">Formal</MenuItem>
          <MenuItem value="informative">Informative</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
        </TextField>

        <Autocomplete
          multiple
          id="tags-filled"
          options={tagSuggestions}
          freeSolo
          value={tags}
          onChange={(event, newValue) => {
            setTags(newValue);
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option}
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Tags"
              placeholder="Add relevant tags"
              helperText="Add tags to categorize the prompt (e.g., 'AI', 'Customer Service')"
              margin="normal"
            />
          )}
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Rate the Last Response
        </Typography>
        <StarRating
          label="Relevance"
          value={relevanceRating}
          onChange={setRelevanceRating}
        />
        <StarRating
          label="Clarity"
          value={clarityRating}
          onChange={setClarityRating}
        />
        <StarRating
          label="Helpfulness"
          value={helpfulnessRating}
          onChange={setHelpfulnessRating}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Generate Prompt
        </Button>
      </Box>
    </Container>
  );
};

const TemplateMenu = ({ templates, onTemplateSelect, onAddTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleTemplateSelect = e => {
    const template = templates.find(t => t.name === e.target.value);
    setSelectedTemplate(e.target.value);
    onTemplateSelect(template);
  };

  return (
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
      <TextField
        select
        label="Select Template"
        value={selectedTemplate}
        onChange={handleTemplateSelect}
        fullWidth
        margin="normal"
        variant="outlined"
        helperText="Choose a template to view or edit"
      >
        {templates.map(template => (
          <MenuItem key={template.name} value={template.name}>
            {template.name}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={onAddTemplate}
        sx={{ mt: 2 }}
      >
        Add New Template
      </Button>
    </Box>
  );
};

const ChatBotPromptDialog = ({ open, onClose, initialData, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Configure AI Chatbot Prompt
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <ChatBotPromptTemplate onSubmit={onSubmit} initialData={initialData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const MainComponent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);

  const handleTemplateSelect = template => {
    setCurrentTemplate(template);
    setDialogOpen(true);
  };

  const handleAddTemplate = () => {
    setCurrentTemplate(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTemplateSubmit = formData => {
    console.log('Form submitted:', formData);
    setDialogOpen(false);
  };

  return (
    <Container>
      <TemplateMenu
        templates={promptTemplates}
        onTemplateSelect={handleTemplateSelect}
        onAddTemplate={handleAddTemplate}
      />
      <ChatBotPromptDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        initialData={currentTemplate}
        onSubmit={handleTemplateSubmit}
      />
    </Container>
  );
};

export default MainComponent;
