// ReusableMenu.js
import { Box, Button, Menu, MenuItem, MenuList } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export const SelectMenu = ({
  anchorEl = null,
  open = false,
  handleClose = () => {},
  handleOpen = () => {},
  handleSelect = () => {},
  buttonText = '',
  items = [],
  selectedItem = '',
  icon = null,
}) => {
  return (
    <Box
      sx={{
        fontFamily: 'IBM Plex Sans, sans-serif',
      }}
    >
      <Box>
        <Button
          onClick={handleOpen}
          startIcon={icon}
          sx={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: 1.5,
            padding: '8px 16px',
            borderRadius: '8px',
            color: grey[200],
            transition: 'all 150ms ease',
            cursor: 'pointer',
            background: grey[900],
            border: '1px solid',
            borderColor: grey[700],
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
            '&:hover': {
              background: grey[800],
              borderColor: grey[600],
            },
            '&:active': {
              background: grey[700],
            },
            '&:focus-visible': {
              boxShadow: `0 0 0 4px ${blue[300]}`,
              outline: 'none',
            },
          }}
        >
          {selectedItem || buttonText}
        </Button>
      </Box>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          component: styled(MenuList)({ variant: 'sidebarList' }),
          sx: {
            padding: '0',
            boxShadow: 'none',
            border: 'none',
          },
        }}
      >
        {items?.map(item => (
          <MenuItem
            key={item.name}
            onClick={() => handleSelect(item._id)}
            sx={{
              listStyle: 'none',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'default',
              userSelect: 'none',
              '&:last-of-type': {
                borderBottom: 'none',
              },
              '&:focus': {
                outline: '3px solid',
                backgroundColor: grey[800],
                color: grey[300],
              },
              '&.Mui-disabled': {
                color: grey[700],
              },
              '& .Mui-selected': {
                background: grey[700],
                color: grey[300],
              },
            }}
          >
            {icon && (
              <Box
                sx={{
                  marginRight: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {icon}
              </Box>
            )}
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SelectMenu;
