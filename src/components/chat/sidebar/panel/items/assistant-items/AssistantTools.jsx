import {
  Box,
  Button,
  TextField,
  Typography,
  TextareaAutosize,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { attachmentsApi } from 'api/Ai/chat-sessions';
import { useChatStore } from 'contexts/ChatProvider';
export const AssistantTools = () => {
  const {
    state: { selectedWorkspace },
    // actions: { selectedWorkspace },
  } = useChatStore();
  const [name, setName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [customHeaders, setCustomHeaders] = useState('');
  const [schema, setSchema] = useState('');
  const [schemaError, setSchemaError] = useState('');
  const [isOpen, onOpenChange] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonToolFile =
          await attachmentsApi.getFileByName('tool_files.json');
        console.log('jsonToolFile', jsonToolFile);
        // setPrompts(jsonPromptFile);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (!selectedWorkspace) return null;

  const handleSchemaChange = value => {
    setSchema(value);
    try {
      const parsedSchema = JSON.parse(value);
      // validateOpenAPI(parsedSchema)
      //   .then(() => setSchemaError('')) // Clear error if validation is successful
      //   .catch(error => setSchemaError(error.message)); // Set specific validation error message
    } catch (error) {
      setSchemaError('Invalid JSON format'); // Set error for invalid JSON format
    }
  };
  // ...rest of the code
  return (
    <Dialog
      open={isOpen}
      onClose={() => onOpenChange(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Create Tool</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Name
          </Typography>
          <TextField
            fullWidth
            placeholder="Tool name..."
            value={name}
            onChange={e => setName(e.target.value)}
            inputProps={{ maxLength: 30 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Description
          </Typography>
          <TextField
            fullWidth
            placeholder="Tool description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            inputProps={{ maxLength: 300 }}
          />
        </Box>

        {/* Uncomment this section if URL is needed */}
        {/* <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            URL
          </Typography>
          <TextField
            fullWidth
            placeholder="Tool URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box> */}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Custom Headers
          </Typography>
          <TextareaAutosize
            minRows={3}
            placeholder={`{"X-api-key": "1234567890"}`}
            value={customHeaders}
            onChange={e => setCustomHeaders(e.target.value)}
            style={{
              width: '100%',
              padding: '8.5px 14px',
              borderRadius: '4px',
              borderColor: '#ccc',
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Schema
          </Typography>
          <TextareaAutosize
            minRows={15}
            placeholder={`{
              "openapi": "3.1.0",
              "info": {
                "title": "Get weather data",
                "description": "Retrieves current weather data for a location.",
                "version": "v1.0.0"
              },
              "servers": [
                {
                  "url": "https://weather.example.com"
                }
              ],
              "paths": {
                "/location": {
                  "get": {
                    "description": "Get temperature for a specific location",
                    "operationId": "GetCurrentWeather",
                    "parameters": [
                      {
                        "name": "location",
                        "in": "query",
                        "description": "The city and state to retrieve the weather for",
                        "required": true,
                        "schema": {
                          "type": "string"
                        }
                      }
                    ],
                    "deprecated": false
                  }
                }
              },
              "components": {
                "schemas": {}
              }
            }`}
            value={schema}
            onChange={e => handleSchemaChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8.5px 14px',
              borderRadius: '4px',
              borderColor: '#ccc',
            }}
          />
          {schemaError && (
            <Typography variant="caption" color="error">
              {schemaError}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            onOpenChange(false);
            // Handle create action
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
