import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { IconBolt } from '@tabler/icons-react';
import React, { useState } from 'react';
import { SidebarItem } from '../all/sidebar-display-item';
import { TOOL_DESCRIPTION_MAX, TOOL_NAME_MAX } from '@/db/limits';
import { validateOpenAPI } from '@/lib/openapi-conversion';

const ToolItem = ({ tool }) => {
  const [name, setName] = useState(tool.name);
  const [isTyping, setIsTyping] = useState(false);
  const [description, setDescription] = useState(tool.description);
  const [customHeaders, setCustomHeaders] = useState(tool.custom_headers);
  const [schema, setSchema] = useState(tool.schema);
  const [schemaError, setSchemaError] = useState('');

  const handleSchemaChange = value => {
    setSchema(value);
    try {
      const parsedSchema = JSON.parse(value);
      validateOpenAPI(parsedSchema)
        .then(() => setSchemaError(''))
        .catch(error => setSchemaError(error.message));
    } catch (error) {
      setSchemaError('Invalid JSON format');
    }
  };

  return (
    <SidebarItem
      item={tool}
      isTyping={isTyping}
      contentType="tools"
      icon={
        <IconButton>
          <IconBolt size={30} />
        </IconButton>
      }
      updateState={{
        name,
        description,
        custom_headers: customHeaders,
        schema,
      }}
      renderInputs={() => (
        <>
          <TextField
            fullWidth
            label="Name"
            placeholder="Tool name..."
            value={name}
            onChange={e => setName(e.target.value)}
            inputProps={{ maxLength: TOOL_NAME_MAX }}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            placeholder="Tool description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            inputProps={{ maxLength: TOOL_DESCRIPTION_MAX }}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            label="Custom Headers"
            placeholder='{"X-api-key": "1234567890"}'
            value={customHeaders}
            onChange={e => setCustomHeaders(e.target.value)}
            minRows={1}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            label="Schema"
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
              ],
              "components": {
                "schemas": {}
              }
            }`}
            value={schema}
            onChange={e => handleSchemaChange(e.target.value)}
            minRows={15}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            margin="normal"
            error={!!schemaError}
            helperText={schemaError}
          />
        </>
      )}
    />
  );
};

export default ToolItem;
