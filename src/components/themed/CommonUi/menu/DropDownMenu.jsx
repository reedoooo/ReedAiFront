import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Link as MuiLink,
  Divider,
} from '@mui/material';
import PropTypes from 'prop-types';

import React, { useState } from 'react';
import styled from 'styled-components';
import useMode from 'hooks/useMode';
const ColorIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary, // Choose a lighter color for less prominent icons
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));
export const ReusableDropdownMenu = props => {
  const { triggerIcon, title, items, rest } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const { theme } = useMode();
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box {...rest}>
      <ColorIconButton onClick={handleClick}>{triggerIcon}</ColorIconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {title && (
          <div>
            <Typography
              sx={{ px: 2, py: 1, color: theme.palette.text.primary }}
            >
              {title}
            </Typography>
            <Divider />
          </div>
        )}
        {items.map((item, index) => {
          if (item.type === 'link') {
            return (
              <MenuItem
                key={index}
                component={MuiLink}
                href={item.to}
                onClick={handleClose}
              >
                {item.icon && (
                  <Box component="span" sx={{ mr: 2 }}>
                    {item.icon}
                  </Box>
                )}
                <Typography variant="inherit" noWrap color="text.secondary">
                  {item.label}
                </Typography>
              </MenuItem>
            );
          } else {
            return (
              <MenuItem
                key={index}
                onClick={() => {
                  item.onClick();
                  handleClose();
                }}
              >
                {item.icon && (
                  <Box component="span" sx={{ mr: 2 }}>
                    {item.icon}
                  </Box>
                )}
                <Typography variant="inherit" noWrap color="text.secondary">
                  {item.label}
                </Typography>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </Box>
  );
};

ReusableDropdownMenu.propTypes = {
  triggerIcon: PropTypes.node.isRequired,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      shortcut: PropTypes.string,
    })
  ).isRequired,
};
