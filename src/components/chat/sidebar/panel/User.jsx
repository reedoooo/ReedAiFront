import { UserIcon } from '@heroicons/react/24/outline';
import { Box, IconButton, Tab, Typography } from '@mui/material';
import React, { useState } from 'react';
import { StyledButton } from 'components/chat/styled';
import {
  RCTabs,
  TextAreaAutosizeSection,
  TextFieldSection,
} from 'components/themed';
import { useUserStore } from 'contexts';
import { useMode } from 'hooks';

export const User = props => {
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
  const tabs = [
    { label: 'Profile' },
    { label: 'Api Keys' },
    { label: 'Account' },
  ];
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
      <RCTabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        tabs={tabs}
        variant="darkMode"
      />
      {tab === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <TextFieldSection
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            variant="darkMode"
            fullWidth
          />
          <StyledButton variant="outlined" component="label">
            Choose File <input type="file" hidden />
          </StyledButton>
          <TextFieldSection
            label="Chat Display Name"
            value={chatDisplayName}
            onChange={e => setChatDisplayName(e.target.value)}
            variant="darkMode"
            fullWidth
          />
          <TextAreaAutosizeSection
            minRows={3}
            placeholder="Profile context... (optional)"
            value={profileContext}
            onChange={e => setProfileContext(e.target.value)}
            variant="darkMode"
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
