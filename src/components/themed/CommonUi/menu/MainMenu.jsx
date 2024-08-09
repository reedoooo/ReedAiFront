import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { useMode } from 'hooks';

export const MainMenu = ({ items, ...rest }) => {
  const { theme } = useMode();
  const textColor = '#A0AEC0';
  const textHover = '#1B2559';
  const iconColor = theme.palette.icon.main;
  const bgButton = '#E2E8F0';
  const [anchorEl, setAnchorEl] = React.useState(null);
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
          backgroundColor: bgButton,
          width: '37px',
          height: '37px',
          lineHeight: '100%',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: '#E9EDF7',
          },
          '&:focus': {
            backgroundColor: '#F4F7FE',
          },
        }}
      >
        <MdOutlineMoreHoriz color={iconColor} size="24px" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          width: '150px',
          minWidth: 'unset',
          maxWidth: '150px !important',
          border: 'transparent',
          backdropFilter: 'blur(63px)',
          backgroundColor: '#FFFFFF', // white
          boxShadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
          borderRadius: '20px',
          padding: '15px',
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
            sx={{
              transition: '0.2s linear',
              color: textColor,
              padding: '0px',
              borderRadius: '8px',
              marginBottom: '10px',
              '&:hover': {
                color: textHover,
                backgroundColor: 'unset',
              },
              '&:focus': {
                backgroundColor: 'unset',
              },
            }}
          >
            <ListItemIcon>
              {React.createElement(item.icon, {
                size: '16px',
                color: iconColor,
              })}
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

MainMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default MainMenu;
