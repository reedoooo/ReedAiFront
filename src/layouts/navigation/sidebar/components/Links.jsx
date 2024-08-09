import { Box, Typography } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RCFlex } from 'components/themed/HumanUi/RCFlex';
import { useMode } from 'hooks';

const SidebarLinks = props => {
  const { theme } = useMode();
  const activeColor = theme.palette.text.primary;
  const inactiveColor = theme.palette.text.secondary;
  const textColor = theme.palette.text.secondary;
  const activeIcon = theme.palette.icon.default;
  const brandColor = theme.palette.icon.default;
  const location = useLocation();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return location.pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = routes => {
    const links = [];

    return routes.map((route, index) => {
      console.log('Content -> createLinks -> map', route);
      if (route.category) {
        links.push(
          <Typography
            key={index}
            fontSize="md"
            color={activeColor}
            fontWeight="bold"
            mx="auto"
            ps={{
              sm: '10px',
              xl: '16px',
            }}
            pt="18px"
            pb="12px"
          >
            {route.name}
          </Typography>
        );
        links.push(...createLinks(route.items));
      } else if (
        route.layout === '/admin' ||
        route.layout === '/auth' ||
        route.layout === '/rtl'
      ) {
        return (
          <NavLink key={index} to={route.layout + route.path}>
            {route.icon ? (
              <Box>
                <RCFlex
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                  }
                  py="5px"
                  ps="10px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : textColor
                    }
                    me="18px"
                  >
                    {route.icon}
                  </Box>
                  <Typography
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : textColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
                    }
                  >
                    {route.name}
                  </Typography>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : 'transparent'
                    }
                    borderRadius="5px"
                  />
                </RCFlex>
              </Box>
            ) : (
              <Box>
                <RCFlex
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                  }
                  py="5px"
                  ps="10px"
                  alignItems="center"
                >
                  <Typography
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
                    }
                  >
                    {route.name}
                  </Typography>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </RCFlex>
              </Box>
            )}
          </NavLink>
        );
      }
    });
  };

  //  BRAND
  return createLinks(routes);
};

export default SidebarLinks;
