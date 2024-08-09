// ChatBotPromptForm.jsx
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
  Popover,
  styled,
  TextareaAutosize,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React, { useState } from 'react';
import { CloseIcon } from 'assets/humanIcons';
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
export const ChatBotPromptTemplate = props => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [userIntent, setUserIntent] = useState('');
  const [responseTone, setResponseTone] = useState('');
  const [relevanceRating, setRelevanceRating] = useState(0);
  const [clarityRating, setClarityRating] = useState(0);
  const [helpfulnessRating, setHelpfulnessRating] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { onSubmit } = props;
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

const TemplateMenu = ({ templates, onTemplateSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const defaultTemplates = templates || [];
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [userIntent, setUserIntent] = useState('');
  const [responseTone, setResponseTone] = useState('');
  const [tags, setTags] = useState([]);

  // Add a dropdown to select a template
  <TextField
    select
    label="Select Template"
    value={selectedTemplate}
    onChange={e => {
      const template = defaultTemplates.find(t => t.name === e.target.value);
      setSelectedTemplate(e.target.value);
      setName(template.name);
      setContent(template.content);
      setUserIntent(template.userIntent);
      setResponseTone(template.responseTone);
      setTags(template.tags);
    }}
  >
    {defaultTemplates.map(template => (
      <MenuItem key={template.name} value={template.name}>
        {template.name}
      </MenuItem>
    ))}
  </TextField>;

  const ChatBotPromptDialog = ({ open, onClose }) => {
    const handleSubmit = formData => {
      // Handle the form submission here
      console.log('Form submitted:', formData);
      onClose();
    };

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
          <ChatBotPromptTemplate onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };
};

export default ChatBotPromptTemplate;
