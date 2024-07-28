import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { extractPaths } from '@/routes/index';
import { PaperCard, RCFlex } from 'components/index';
import useDisclosure from 'hooks/useDisclosure';
import useMode from 'hooks/useMode';
import Brand from '../../sidebar/components/Brand';

export const Sidebar = props => {
  const { theme } = useMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const anchorRef = React.useRef('left');

  const { routes } = props;

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const toggleDrawer = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };
  const linkPaths = extractPaths(routes);
  const pathsMap = linkPaths.reduce((map, path) => {
    const key = path.replace(/\/$/, '').split('/').pop() || 'root';
    map[key] = path;
    return map;
  }, {});
  const createSidebarLinks = (routes, paddingLeft = 0) => {
    return routes.map(route => {
      if (!route.path) return null;
      const children = route.children || [];
      const key = route.path
        ? route.path.replace(/\/$/, '').split('/').pop() || 'root'
        : route.index
          ? route.name.toLowerCase().replace(/ /g, '-')
          : null;
      let menuLink = null;
      if (key && pathsMap[key]) {
        menuLink = pathsMap[key];

        console.log('-- menu link at path --', menuLink);
      }
      return (
        <div key={uniqueId(route.name)}>
          <MenuItem
            component={NavLink}
            to={menuLink || route.path}
            onClick={toggleDrawer}
            style={{ paddingLeft }}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              boxSizing: 'border-box',
              maxWidth: '100%',
            }}
          >
            {route.icon && <React.Fragment>{route.icon}</React.Fragment>}
            <ListItemText
              primary={
                <Typography
                  variant={route.collapse ? 'h6' : 'body1'}
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    boxSizing: 'border-box',
                    maxWidth: '100%',
                  }}
                >
                  {route.name}
                </Typography>
              }
            />
          </MenuItem>
          {children.length > 0 && (
            <div
              key={uniqueId('children')}
              style={{ paddingLeft: paddingLeft + 20 }}
            >
              {createSidebarLinks(children, paddingLeft + 20)}
              <Divider />
            </div>
          )}
        </div>
      );
    });
  };
  const createLinkHeader = (route, paddingLeft = 0) => {
    return (
      <MenuItem
        component={NavLink}
        to={route.path}
        onClick={toggleDrawer}
        key={uniqueId(route.path)}
        style={{ paddingLeft }}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          boxSizing: 'border-box',
          maxWidth: '100%',
        }}
      >
        {route.icon && <React.Fragment>{route.icon}</React.Fragment>}
        <ListItemText
          primary={
            <Typography
              variant={route.collapse ? 'h6' : 'body1'}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                boxSizing: 'border-box',
                maxWidth: '100%',
              }}
            >
              {route.name}
            </Typography>
          }
        />
      </MenuItem>
    );
  };
  const createSidebarSubmenu = (routes, paddingLeft = 0) => {
    return routes.map(route => {
      const rootChildren = route.children || [];
      return (
        <div key={uniqueId(route.name)}>
          {createLinkHeader(route, paddingLeft)}
          {rootChildren.length > 0 && (
            <div
              key={uniqueId('routes')}
              style={{ paddingLeft: paddingLeft + 20 }}
            >
              {createSidebarLinks(rootChildren, paddingLeft + 20)}
              <Divider />
            </div>
          )}
        </div>
      );
    });
  };
  return (
    <Box sx={{ display: { xs: 'flex', xl: 'none' }, alignItems: 'center' }}>
      {/* --- Drawer Menu Button --- */}
      <Box
        ref={btnRef}
        sx={{ width: 'max-content', height: 'max-content' }}
        onClick={handleOpen}
      >
        <IconButton>
          <IoMenuOutline
            style={{
              color: theme.palette.text.secondary,
              width: '20px',
              height: '20px',
            }}
          />
        </IconButton>
      </Box>
      <Divider />

      {/* --- Drawer Menu --- */}
      <Drawer
        open={isOpen}
        onClose={handleClose}
        anchor={anchorRef.current}
        PaperProps={{
          sx: {
            width: 'clamp(240px, 50vw, 285px)',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
          },
        }}
      >
        {isOpen && (
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: '-30px',
              top: '10px',
              zIndex: 1300,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <IoMenuOutline
              style={{
                color: theme.palette.text.secondary,
                width: '20px',
                height: '20px',
              }}
            />
          </IconButton>
        )}
        {/* --- Drawer Menu Header --- */}
        <PaperCard theme={theme}></PaperCard>
        <Box sx={{ width: '285px', padding: '0', paddingBottom: '0' }}>
          <RCFlex
            direction="column"
            height="100%"
            pt="25px"
            px="16px"
            borderRadius="30px"
          >
            <Brand />
            <Stack direction="column" mb="auto" mt="8px">
              <Box ps="20px" pe={{ md: '16px', '2xl': '1px' }}>
                {createSidebarSubmenu(routes)}
              </Box>
            </Stack>
          </RCFlex>
        </Box>
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidebar;
