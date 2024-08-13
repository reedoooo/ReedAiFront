import { UserIcon } from '@heroicons/react/24/outline';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import {
  StyledButton,
  StyledTextareaAutosize,
  StyledTextField,
  StyledMuiTabs,
} from 'components/chat/styled';
import { useUserStore } from 'contexts';
import { useMode } from 'hooks';

export const User = () => {
  const { theme } = useMode();
  const {
    state: { profile },
    actions: { setProfile },
  } = useUserStore();

  const [tab, setTab] = useState(0);
  const [chatDisplayName, setChatDisplayName] = useState('thaHuman');
  const [profileContext, setProfileContext] = useState('');
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [username, setUsername] = useState(profile?.username || '');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState(
    profile?.image_url || ''
  );
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileInstructions, setProfileInstructions] = useState(
    profile?.profile_context || ''
  );
  const [googleGeminiAPIKey, setGoogleGeminiAPIKey] = useState(
    profile?.google_gemini_api_key || ''
  );
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            mx: '12px',
          }}
        >
          User
        </Typography>
        <IconButton>
          <UserIcon style={{ float: 'right', cursor: 'pointer' }} />
        </IconButton>
      </Box>
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
        <StyledMuiTabs
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
        </StyledMuiTabs>
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
          {/* <RCInput
            variant="base"
            label="Chat Display Name"
            value={chatDisplayName}
            onChange={e => setChatDisplayName(e.target.value)}
            fullWidth
            margin="normal"
          /> */}
          <StyledTextareaAutosize
            minRows={3}
            placeholder="Profile context... (optional)"
            value={profileContext}
            onChange={e => setProfileContext(e.target.value)}
            theme={theme}
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
