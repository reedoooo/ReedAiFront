import { UserIcon } from '@heroicons/react/24/outline';
import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { StyledButton } from 'components/chat/styled';
import {
  RCTabs,
  TextAreaAutosizeSection,
  TextFieldSection,
} from 'components/themed';
import { useUserStore } from 'contexts';
import { useTabManager } from 'hooks/chat/useTabManager';
import { ApiKeys } from './items/user-items';

export const User = props => {
  const {
    state: { profile },
  } = useUserStore();
  const { activeTabs, selectedTab, selectTab } = useTabManager('user');
  const [chatDisplayName, setChatDisplayName] = useState('thaHuman');
  const [profileContext, setProfileContext] = useState('');
  const [username, setUsername] = useState(profile?.username || '');

  const renderContent = () => {
    switch (selectedTab) {
      case 0: // Profile
        return (
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
        );
      case 1: // API Keys
        return <ApiKeys />;
      case 2: // Account
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Account settings coming soon...</Typography>
            <Box>
              <StyledButton variant="outlined" style={{ marginRight: '10px' }}>
                Cancel
              </StyledButton>
              <StyledButton variant="outlined">Save</StyledButton>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

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
        value={selectedTab}
        onChange={(e, newValue) => selectTab(newValue)}
        tabs={activeTabs}
        variant="darkMode"
      />
      {renderContent()}
    </>
  );
};
export default User;
