import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuList,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '@/routes/index';
import { LogoIcon } from 'components/index';
import { SidebarContext } from 'contexts/SidebarProvider';
import { useMode } from 'hooks';

export default function AuthNavbar(props) {
  const { logoText, secondary } = props;
  const { theme } = useMode();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuName, setMenuName] = React.useState('');

  const handleClick = (event, name) => {
    setAnchorEl(event.currentTarget);
    setMenuName(name);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuName('');
  };

  const createLinks = routeArray => {
    return routeArray?.map((link, key) => (
      <NavLink key={key} to={link?.layout + link?.path}>
        <Typography variant="body2" color="textSecondary">
          {link?.name}
        </Typography>
      </NavLink>
    ));
  };

  const renderMenuItems = routeName => {
    const route = routes?.find(route => route.name === routeName);
    return createLinks(route?.items);
  };

  const brand = (
    <Box
      component={NavLink}
      to="/"
      sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
    >
      <LogoIcon />
      <Typography variant="h6" ml={1}>
        {logoText}
      </Typography>
    </Box>
  );

  return (
    <SidebarContext.Provider value={{ sidebarWidth: 250 }}>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            {brand}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
              <Button
                aria-controls="dashboard-menu"
                aria-haspopup="true"
                onClick={event => handleClick(event, 'Dashboards')}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Dashboards
              </Button>
              <Menu
                id="dashboard-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && menuName === 'Dashboards'}
                onClose={handleClose}
              >
                <MenuList>{renderMenuItems('Dashboards')}</MenuList>
              </Menu>
              <Button
                aria-controls="auth-menu"
                aria-haspopup="true"
                onClick={event => handleClick(event, 'Authentication')}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Authentications
              </Button>
              <Menu
                id="auth-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && menuName === 'Authentication'}
                onClose={handleClose}
              >
                <MenuList>{renderMenuItems('Authentication')}</MenuList>
              </Menu>
              <Button
                aria-controls="main-pages-menu"
                aria-haspopup="true"
                onClick={event => handleClick(event, 'Main Pages')}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Main Pages
              </Button>
              <Menu
                id="main-pages-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && menuName === 'Main Pages'}
                onClose={handleClose}
              >
                <MenuList>{renderMenuItems('Main Pages')}</MenuList>
              </Menu>
              <Button
                aria-controls="nft-menu"
                aria-haspopup="true"
                onClick={event => handleClick(event, 'NFTs')}
                endIcon={<KeyboardArrowDownIcon />}
              >
                NFTs
              </Button>
              <Menu
                id="nft-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && menuName === 'NFTs'}
                onClose={handleClose}
              >
                <MenuList>{renderMenuItems('NFTs')}</MenuList>
              </Menu>
            </Box>
            <Button
              variant="contained"
              color="primary"
              href="https://www.horizon-ui.com/pro"
              sx={{ display: { xs: 'none', lg: 'flex' }, ml: 2 }}
            >
              Buy Now
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  logoText: PropTypes.string.isRequired,
  // secondary: PropTypes.bool,
};
