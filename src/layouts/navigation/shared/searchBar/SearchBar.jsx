import { Search as SearchIcon } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import useMode from 'hooks/useMode';

export function SearchBar(props) {
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  const { theme } = useMode();
  // Material-UI Color Mode
  const searchIconColor = '#212121';
  const searchColor = '#212121';
  const inputBg = 'transparent';

  return (
    <TextField
      variant="outlined"
      sx={{
        marginRight: '10px',
        borderRadius: '30px',
        zIndex: 0,
        backgroundColor: inputBg,
        '& .MuiOutlinedInput-root': {
          borderRadius: borderRadius || '14px',
          borderColor:
            theme.palette.mode === 'light'
              ? 'grey.200'
              : 'rgba(255, 255, 255, 0.1)',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent',
          },
        },
        '& .MuiInputBase-input': {
          color: searchColor,
        },
        '& .MuiInputBase-input::placeholder': {
          color: 'text.secondary',
          fontSize: '14px',
        },
        width: {
          xs: '100px',
          md: '270px',
          lg: '530px',
          xl: '660px',
        },
        maxWidth: '100%',
        mr: { xs: '10px', md: '20px' },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              aria-label="search"
              sx={{
                backgroundColor: 'inherit',
                borderRadius: 'inherit',
                '&:hover, &:focus, &:active': {
                  backgroundColor: 'inherit',
                  transform: 'none',
                  boxShadow: 'none',
                },
              }}
            >
              <SearchIcon
                sx={{ color: searchIconColor, width: '15px', height: '15px' }}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      placeholder="Search..."
      {...rest}
    />
  );
}

export default SearchBar;
