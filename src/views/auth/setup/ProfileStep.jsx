import { TextField, Box, Typography, CircularProgress } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState, useCallback } from 'react';
import { CancelIcon, CheckCircleIcon } from 'assets/humanIcons';

const ProfileStep = ({
  username,
  usernameAvailable,
  displayName,
  onUsernameAvailableChange,
  onUsernameChange,
  onDisplayNameChange,
}) => {
  const [loading, setLoading] = useState(false);
  const PROFILE_USERNAME_MIN = 3;
  const PROFILE_USERNAME_MAX = 30;
  const PROFILE_DISPLAY_NAME_MAX = 30;
  const PROFILE_DISPLAY_NAME_MIN = 2;
  const handleUsernameChange = e => {
    // setUsername(e.target.value);
  };
  const debounce = (func, wait) => {
    let timeout;

    return (...args) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const checkUsernameAvailability = useCallback(
    debounce(async username => {
      if (!username) return;

      if (username.length < PROFILE_USERNAME_MIN) {
        onUsernameAvailableChange(false);
        return;
      }

      if (username.length > PROFILE_USERNAME_MAX) {
        onUsernameAvailableChange(false);
        return;
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        onUsernameAvailableChange(false);
        enqueueSnackbar(
          'Username must be letters, numbers, or underscores only - no other characters or spacing allowed.',
          { variant: 'error' }
        );
        return;
      }

      setLoading(true);

      const response = await fetch(`/api/username/available`, {
        method: 'POST',
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      const isAvailable = data.isAvailable;

      onUsernameAvailableChange(isAvailable);
      setLoading(false);
    }, 500),
    []
  );

  return (
    <>
      <Box mb={3}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="body1">Username</Typography>
          <Typography
            variant="body2"
            color={usernameAvailable ? 'green' : 'red'}
            ml={2}
          >
            {usernameAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
          </Typography>
        </Box>
        <Box position="relative">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="username"
            value={username}
            onChange={e => {
              onUsernameChange(e.target.value);
              checkUsernameAvailability(e.target.value);
            }}
            inputProps={{
              minLength: PROFILE_USERNAME_MIN,
              maxLength: PROFILE_USERNAME_MAX,
            }}
          />
          <Box
            position="absolute"
            top="50%"
            right={16}
            transform="translateY(-50%)"
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : usernameAvailable ? (
              <CheckCircleIcon color="green" />
            ) : (
              <CancelIcon color="red" />
            )}
          </Box>
        </Box>
        <Typography variant="caption" color="textSecondary">
          {username.length} / {PROFILE_USERNAME_MAX}
        </Typography>
      </Box>

      <Box mb={3}>
        <Typography variant="body1" mb={1}>
          Chat Display Name
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Your Name"
          value={displayName}
          onChange={e => onDisplayNameChange(e.target.value)}
          inputProps={{ maxLength: PROFILE_DISPLAY_NAME_MAX }}
        />
        <Typography variant="caption" color="textSecondary">
          {displayName.length} / {PROFILE_DISPLAY_NAME_MAX}
        </Typography>
      </Box>
    </>
  );
};

export default ProfileStep;
