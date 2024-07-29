import {
  Tabs,
  Tab,
  TextField,
  Button,
  TextareaAutosize,
  Typography,
  Box,
  Card,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { StyledButton, StyledTextField } from 'components/chat/styled';
const StyledTabs = styled(Tabs)({
  background: '#808080',
  borderRadius: '5px',
  '& .Mui-selected': {
    backgroundColor: '#000',
    color: '#fff',
    // padding: '10px',
    margin: '5px',
  },
});

export function UpsertDocsForm() {
  const [url, setUrl] = useState('');
  const [library, setLibrary] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/api/chat/upsert-docs`,
        { url, library }
      );
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Error upserting documentation.');
    }
  };

  return (
    <div className="UpsertDocsForm">
      <h2>Upsert Documentation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </label>
        <br />
        <label>
          Library:
          <input
            type="text"
            value={library}
            onChange={e => setLibrary(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

const Files = () => {
  const [tab, setTab] = useState(0);
  const [fileName, setFileName] = useState('example.txt');
  const [fileContent, setFileContent] = useState('');
  const [fileDescription, setFileDescription] = useState('');

  return (
    <>
      <Typography variant="h6" style={{ color: '#fff' }}>
        File Editor
        <FaSave style={{ float: 'right', cursor: 'pointer' }} />
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          color: 'white',
          borderRadius: '14px',
          background: '#1c1c1c', // Slightly different background for the panel to distinguish it
        }}
      >
        <StyledTabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          indicatorColor="#fff"
        >
          <Tab
            label="Edit File"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab
            label="File Info"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab
            label="Upsert Docs"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab label="List" style={{ color: '#fff', borderRadius: '5px' }} />
        </StyledTabs>
      </Box>
      {tab === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <StyledTextField
            label="File Name"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextareaAutosize
            minRows={10}
            placeholder="File content..."
            value={fileContent}
            onChange={e => setFileContent(e.target.value)}
            style={{
              width: '100%',
              margin: '10px 0',
              p: 2,
              color: '#fff',
              borderColor: 'grey',
              background: '#000',
              borderRadius: '5px',
            }}
          />
          <Box>
            <StyledButton variant="outlined" style={{ marginRight: '10px' }}>
              Cancel
            </StyledButton>
            <StyledButton variant="outlined">Save</StyledButton>
          </Box>
        </Box>
      )}
      {tab === 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <StyledTextField
            label="File Description"
            value={fileDescription}
            onChange={e => setFileDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <StyledButton variant="outlined" component="label">
            Choose File <input type="file" hidden />
          </StyledButton>
          <Box>
            <StyledButton variant="outlined" style={{ marginRight: '10px' }}>
              Cancel
            </StyledButton>
            <StyledButton variant="outlined">Save</StyledButton>
          </Box>
        </Box>
      )}
      {tab === 2 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Card style={{ width: '100%', borderRadius: '5px' }}>
            <UpsertDocsForm />
          </Card>
        </Box>
      )}
    </>
  );
};
export default Files;
