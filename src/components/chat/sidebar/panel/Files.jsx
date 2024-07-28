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
import React, { useState } from 'react';
import { FaFile, FaSave } from 'react-icons/fa';
import { RCInput } from 'components/themed';

const StyledTextField = styled(TextField)({
  margin: '10px 0',
  '& label': {
    color: '#fff',
    '&.Mui-focused': { color: 'grey' },
  },
  '& .MuiInput-underline:after': { borderBottomColor: 'grey' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'grey' },
    '&:hover fieldset': { borderColor: 'grey' },
    '&.Mui-focused fieldset': { borderColor: 'grey' },
  },
  '& .MuiInputBase-input': { color: '#fff', background: '#000' },
});
const StyledButton = styled(Button)({
  color: '#fff',
  borderColor: '#fff',
  margin: '10px 0',
});
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
    </>
  );
};
export default Files;
