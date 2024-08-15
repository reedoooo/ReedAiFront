import { Help, Info } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { MdInfoOutline, MdNotificationsNone } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import routes from '@/routes/index';
import {
  CheckCircleRoundedIcon,
  ExitToAppIcon,
  MailIcon,
  NotificationsActiveIcon,
  NotificationsNoneIcon,
  PersonIcon,
  SettingsIcon,
} from 'assets/humanIcons';
import { ReusableDropdownMenu, SearchBar } from 'components/themed';
import { useUserStore } from 'contexts';
import { useMode } from 'hooks';
import { Sidebar } from '../sidebar';

export const HeaderLinks = props => {
  const { secondary } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    state: { profileImage, isAuthenticated, user },
  } = useUserStore(); // Use the useChatStore hook to get state
  const {
    theme: {
      palette: { common, grey },
    },
  } = useMode();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const iconColor = grey[400];
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' }); // Dispatch the logout action
    navigate('/sign-in'); // Navigate to the sign-in page
  };
  const notificationsMenuItems = [
    {
      icon: <NotificationsNoneIcon color={iconColor} />,
      label: 'No new notifications',
      onClick: () => {},
    },
    {
      icon: <NotificationsActiveIcon color={iconColor} />,
      label: 'View all notifications',
      onClick: () => {},
    },
  ];
  const infoMenuItems = [
    {
      icon: <Info color={iconColor} />,
      label: 'App Info',
      onClick: () => {},
    },
    {
      icon: <Help color={iconColor} />,
      label: 'Support',
      onClick: () => {},
    },
  ];
  const mainMenuItems = [
    {
      icon: <PersonIcon color={iconColor} />,
      label: 'Profile Settings',
      onClick: () => {},
    },
    {
      icon: <MailIcon color={iconColor} />,
      label: 'Newsletter Settings',
      onClick: () => {},
    },
    {
      icon: <ExitToAppIcon color={iconColor} />,
      label: 'Log out',
      onClick: () => {},
    },
  ];
  const handleClick2 = event => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const shadow = '14px 17px 40px 4px rgba(112, 144, 176, 0.18)';
  const menuBg = common.white;
  // const borderButton = '#8F9BBA';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap', // 'unset' is equivalent to 'nowrap' in this context
        boxShadow: 'rgba(112, 144, 176, 0.18) 14px 17px 40px 4px',
        borderRadius: '30px',
      }}
    >
      <SearchBar
        variant=""
        background=""
        borderRadius="30px"
        placeholder="Search..."
        sx={{
          mb: secondary ? { xs: '10px', md: 'unset' } : 'unset',
          mr: '10px',
          borderRadius: '30px',
          // bgColor: 'white',
        }}
      />
      <Sidebar routes={routes} />
      <ReusableDropdownMenu
        triggerIcon={<MdNotificationsNone style={{ color: grey[400] }} />}
        items={notificationsMenuItems}
        title="Notifications"
        type="non-link"
      />
      <ReusableDropdownMenu
        triggerIcon={<MdInfoOutline style={{ color: grey[400] }} />}
        items={infoMenuItems}
        title="Information"
      />
      <ReusableDropdownMenu
        triggerIcon={<SettingsIcon style={{ color: grey[400] }} />}
        items={mainMenuItems}
        title="Settings"
      />

      <Box>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(anchorEl2 && {
              color: 'primary.main',
            }),
          }}
          onClick={handleClick2}
        >
          <Avatar
            src={isAuthenticated ? profileImage : profileImage} // Use the authenticated profile image if authenticated
            alt="Profile"
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </IconButton>
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '200px',
            },
          }}
        >
          <MenuItem
            to="/admin/profile"
            variant="outlined"
            color="primary"
            component={Link}
          >
            <ListItemIcon>
              <PersonIcon width={20} sx={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon
              to="/admin/profile"
              variant="outlined"
              color="primary"
              component={Link}
            >
              <MailIcon width={20} sx={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText>My Account</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon
              to="/admin/profile"
              variant="outlined"
              color="primary"
              component={Link}
            >
              <CheckCircleRoundedIcon width={20} sx={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText>My Tasks</ListItemText>
          </MenuItem>
          <Box mt={1} py={1} px={2}>
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                // "/auth/logout"
                variant="outlined"
                color="primary"
                // component={Link}
                fullWidth
              >
                Logout
              </Button>
            ) : (
              <Box>
                <Button
                  to="/auth/sign-in"
                  variant="outlined"
                  color="primary"
                  component={Link}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    mb: 2,
                  }}
                >
                  Login
                </Button>
                <Button
                  to="/auth/sign-up"
                  variant="outlined"
                  color="primary"
                  component={Link}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                  }}
                >
                  Signup
                </Button>
              </Box>
            )}
          </Box>
        </Menu>
      </Box>
      {/* </Toolbar> */}
      {/* </StyledAppBar> */}
    </Box>
  );
};

HeaderLinks.propTypes = {
  secondary: PropTypes.bool,
};

export default HeaderLinks;
