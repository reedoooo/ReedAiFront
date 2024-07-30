import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import React, { useState } from 'react';
import { MdOutlineMoreHoriz } from 'react-icons/md';

export const DropDown = ({
  menuItems = [],
  defaultIcon = <MdOutlineMoreHoriz />,
  buttonStyles = {
    backgroundColor: '#F4F7FE',
    '&:hover': {
      backgroundColor: '#E9EDF7',
    },
    '&:focus': {
      backgroundColor: '#F4F7FE',
    },
    width: '37px',
    height: '37px',
    lineHeight: '100%',
    borderRadius: '10px',
  },
  menuStyles = {
    width: '150px',
    backdropFilter: 'blur(63px)',
    backgroundColor: '#E9EDF7',
    boxShadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    borderRadius: '20px',
    padding: '15px',
  },
  menuItemStyles = {
    transition: '0.2s linear',
    color: '#8F9BBA',
    '&:hover': '#1B2559',
    padding: '0px',
    borderRadius: '8px',
    marginBottom: '10px',
    '&:active': { backgroundColor: 'transparent' },
    '&:focus': { backgroundColor: 'transparent' },
  },
  ...rest
}) => {
  const textColor = '#8F9BBA';
  const textHover = '#1B2559';
  const iconColor = '#422AFB';
  const bgList = '#E9EDF7';
  const bgShadow = '14px 17px 40px 4px rgba(112, 144, 176, 0.08)';
  const bgButton = '#F4F7FE';
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box {...rest}>
      <IconButton
        onClick={handleClick}
        sx={{
          ...buttonStyles,
          backgroundColor: bgButton,
          '&:hover': {
            backgroundColor: '#E9EDF7',
          },
          '&:focus': {
            backgroundColor: bgButton,
          },
        }}
      >
        {React.cloneElement(defaultIcon, { size: '24px', color: '#422AFB' })}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          ...menuStyles,
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              item.onClick();
            }}
            sx={{
              ...menuItemStyles,
              '&:hover': {
                color: textHover,
              },
              '&:active': { backgroundColor: 'transparent' },
              '&:focus': { backgroundColor: 'transparent' },
            }}
          >
            <ListItemIcon>
              {item.icon
                ? React.cloneElement(item.icon, { size: '16px' })
                : React.cloneElement(defaultIcon, { size: '16px' })}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 'sm',
                fontWeight: 400,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropDown;
