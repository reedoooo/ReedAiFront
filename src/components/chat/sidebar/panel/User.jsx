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
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
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

const User = () => {
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState('user6edad39745ba');
  const [chatDisplayName, setChatDisplayName] = useState('thaHuman');
  const [profileContext, setProfileContext] = useState('');

  return (
    <>
      <Typography variant="h6" style={{ color: '#fff' }}>
        User Settings
        <FaSignOutAlt style={{ float: 'right', cursor: 'pointer' }} />
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
          <Tab label="Profile" style={{ color: '#fff', borderRadius: '5px' }} />
          <Tab
            label="API Keys"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab label="Account" style={{ color: '#fff', borderRadius: '5px' }} />
        </StyledTabs>
      </Box>
      {tab === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <StyledTextField
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <StyledButton variant="outlined" component="label">
            Choose File <input type="file" hidden />
          </StyledButton>
          <StyledTextField
            label="Chat Display Name"
            value={chatDisplayName}
            onChange={e => setChatDisplayName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <RCInput
            variant="base"
            label="Chat Display Name"
            value={chatDisplayName}
            onChange={e => setChatDisplayName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextareaAutosize
            minRows={3}
            placeholder="Profile context... (optional)"
            value={profileContext}
            onChange={e => setProfileContext(e.target.value)}
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
    </>
  );
};
export default User;
