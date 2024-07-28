import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
  useMediaQuery,
  Link as MuiLink,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';
// MUI Icons
import PropTypes from 'prop-types';

import React, { useState } from 'react';
import { MdNotificationsNone, MdInfoOutline, MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import routes from '@/routes/index';
import {
  CheckCircleRoundedIcon,
  MailIcon,
  PersonIcon,
  AccountCircleIcon,
  CreditCardIcon,
  KeyboardIcon,
  GroupIcon,
  SupportAgentIcon,
  CloudIcon,
  SettingsIcon,
  ExitToAppIcon,
  GitHubIcon,
  AddIcon,
} from 'assets/humanIcons';
import ProfileImg from 'assets/img/profile/user-1.png';
import ProfileImgAuth from 'assets/img/profile/user-3.png';
import { IconBox } from 'components/index';
import { useAuthStore } from 'contexts/AuthProvider';
import { useChatStore } from 'contexts/ChatProvider';
import { useUserStore } from 'contexts/UserProvider';
import useMode from 'hooks/useMode';
import { ReusableDropdownMenu } from '../menu';
import { SearchBar } from '../shared/searchBar/SearchBar';
import Sidebar from '../sidebar';
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.common.white,
  boxShadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
  borderRadius: '30px',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  p: '10px',
  flexDirection: 'row',
  width: { sx: '100%', md: 'auto' },
  maxWidth: '50%',
  flexWrap: {
    sx: 'wrap',
    md: 'nowrap',
  },
  color: theme.palette.text.primary, // Ensure text color is dark for readability
}));

// Adjust IconButton default color
const ColorIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary, // Choose a lighter color for less prominent icons
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

export default function HeaderLinks(props) {
  const { secondary } = props;
  const { theme } = useMode();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const authstore = useAuthStore(); // Use the useAuthStore hook to get state
  const chatStore = useChatStore();
  const userStore = useUserStore(); // Use the useChatStore hook to get state
  const { isAuthenticated, user } = authstore.state; // Destructure isAuthenticated from state
  const [anchorEl2, setAnchorEl2] = useState(null);
  const iconColor = theme.palette.grey[400];
  const textColor = theme.palette.text.primary;
  const textColorSecondary = theme.palette.text.secondary;
  const profileImage = userStore.state.profileImage;
  const notificationsMenuItems = [
    {
      icon: <Typography>No new notifications</Typography>,
      label: '',
      onClick: () => {},
    },
    {
      icon: <Typography>View all notifications</Typography>,
      label: '',
      onClick: () => {},
    },
  ];

  const infoMenuItems = [
    {
      icon: <Typography>App Info</Typography>,
      label: '',
      onClick: () => {},
    },
    {
      icon: <Typography>Support</Typography>,
      label: '',
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
  // const textColor = theme.palette.text.primary;
  // const textColorBrand = theme.palette.primary.main;
  const shadow = '14px 17px 40px 4px rgba(112, 144, 176, 0.18)';
  // // const borderButton = theme.palette.divider;
  // const navbarIcon = theme.palette.grey[400];
  const menuBg = theme.palette.common.white;
  // // const textColor = theme.palette.secondaryGray?.[900] || theme.palette.text.primary;
  // const borderColor = theme.palette.divider;
  // const borderButton = '#8F9BBA';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        // width: { xs: '100%', md: 'auto' },
        // flexDirection: 'row',
        // bgcolor: menuBg,
        // flexWrap: secondary ? { xs: 'wrap', md: 'nowrap' } : 'unset',
        // p: '10px',
        // borderRadius: '30px',
        // boxShadow: shadow,
      }}
    >
      {/* <StyledAppBar
        position="fixed"
        color="inherit"
        elevation={0}
        theme={theme}
      >
        <Toolbar> */}
      <SearchBar
        sx={{
          mb: secondary ? { xs: '10px', md: 'unset' } : 'unset',
          mr: '10px',
          borderRadius: '30px',
        }}
      />
      <Sidebar routes={routes} />
      <ReusableDropdownMenu
        triggerIcon={
          <MdNotificationsNone style={{ color: theme.palette.grey[400] }} />
        }
        items={notificationsMenuItems}
        title="Notifications"
        type="non-link"
      />
      <ReusableDropdownMenu
        triggerIcon={
          <MdInfoOutline style={{ color: theme.palette.grey[400] }} />
        }
        items={infoMenuItems}
        title="Information"
      />
      <ReusableDropdownMenu
        triggerIcon={
          <SettingsIcon style={{ color: theme.palette.grey[400] }} />
        }
        items={mainMenuItems}
        title="Settings"
      />
      {/* <IconButton>
      </IconButton>
      <IconButton>
      </IconButton>
      <IconButton>
      </IconButton> */}

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
                to="/auth/sign-in"
                variant="outlined"
                color="primary"
                component={Link}
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
}

HeaderLinks.propTypes = {
  secondary: PropTypes.bool,
};
