import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import {
  Menu,
  MenuItem,
  IconButton as MenuButton,
  Typography,
  Box,
  Avatar,
  Divider,
  ListItemIcon,
  Tooltip,
  MenuList,
} from '@mui/material';
import React from 'react';
import useDisclosure from 'hooks/useDisclosure';
import useMode from 'hooks/useMode';

export const TransparentMenu = props => {
  const { icon, ...rest } = props;
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const textColor = '#8F9BBA';
  const bgList = '#E9EDF7';
  const bgShadow = '14px 17px 40px 4px rgba(112, 144, 176, 0.08)';

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <Tooltip title="Account settings">
          <MenuButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{icon}</Avatar>
          </MenuButton>
        </Tooltip>
      </Box>
      <MenuList
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        elevation={0}
        sx={{
          overflow: 'visible',
          filter: `drop-shadow(${bgShadow})`,
          bgcolor: bgList,
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
          '.MuiMenuItem-root': {
            '&:hover': {
              color: '#1B2559',
              backgroundColor: 'unset',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} color={textColor}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose} color={textColor}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} color={textColor}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose} color={textColor}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose} color={textColor}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TransparentMenu;
