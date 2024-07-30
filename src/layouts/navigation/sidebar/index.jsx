import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { IoMenuOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { PaperCard, RCBox, RCFlex } from 'components/index';
import useDisclosure from 'hooks/useDisclosure';
import useMode from 'hooks/useMode';
import { extractPaths } from 'utils/navigation';
import {
  renderThumb,
  renderTrack,
  renderView,
} from '../shared/scrollbar/Scrollbar';
import Brand from './components/Brand';

export const Sidebar = props => {
  const { theme } = useMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef(null);
  const anchorRef = React.useRef('left');
  const sidebarWidth = 285;
  const indent = sidebarWidth * 0.025;

  const { routes } = props;

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  const linkPaths = extractPaths(routes);
  const pathsMap = linkPaths.reduce((map, path) => {
    const key = path.replace(/\/$/, '').split('/').pop() || 'root';
    map[key] = path;
    return map;
  }, {});
  const renderMenuItem = (route, paddingLeft) => (
    <MenuItem
      component={NavLink}
      to={pathsMap[route.path?.split('/').pop()] || route.path}
      onClick={handleToggle}
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        boxSizing: 'border-box',
        maxWidth: '100%',
        paddingLeft: `${paddingLeft}px`,
      }}
      key={uniqueId(route.path)}
    >
      {route.icon && (
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            marginRight: 1,
            color: theme.palette.primary.main,
          }}
        >
          {route.icon}
        </ListItemIcon>
      )}
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
            }}
          >
            {route.name}
          </Typography>
        }
      />
    </MenuItem>
  );

  const renderRoutes = (routes, paddingLeft = 0) =>
    routes.map(route => (
      <Box key={uniqueId(route.name)}>
        {renderMenuItem(route, paddingLeft)}
        {route.children && route.children.length > 0 && (
          <Box sx={{ paddingLeft: `${paddingLeft}px` }}>
            {renderRoutes(route.children, paddingLeft + indent)}
            {/* <Divider /> */}
          </Box>
        )}
      </Box>
    ));

  return (
    <Box sx={{ display: { xs: 'flex', xl: 'none' }, alignItems: 'center' }}>
      {/* --- Drawer Menu Button --- */}
      <Box
        sx={{ width: 'max-content', height: 'max-content' }}
        onClick={handleToggle}
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
        onClose={handleToggle}
        anchor={anchorRef.current}
        PaperProps={{
          sx: {
            width: '300px',
            maxWidth: '300px',
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
          },
        }}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Box
            sx={{
              height: '100%',
              pt: '25px',
              px: '16px',
              borderRadius: '30px',
            }}
          >
            <Box
              sx={{
                width: 285,
                maxWidth: 285,
                padding: '0',
                paddingBottom: '0',
              }}
              role="presentation"
            >
              <RCFlex
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  paddingTop: '25px',
                  paddingX: '16px',
                  borderRadius: '30px',
                }}
              >
                <RCBox theme={theme} variant="card">
                  <Brand />
                </RCBox>

                <Stack direction="column" mb="auto" mt="8px">
                  <Box
                    sx={{
                      paddingLeft: '20px',
                      paddingRight: '16px',
                      width: '100%',
                    }}
                  >
                    {renderRoutes(routes)}
                  </Box>
                </Stack>
              </RCFlex>
            </Box>
          </Box>
        </Scrollbars>
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidebar;
