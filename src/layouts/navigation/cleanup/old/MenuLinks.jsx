import {
  Menu,
  MenuItem,
  ListItemText,
  List,
  ListItem,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const generateLinks = (route, handleClick) => {
  return (
    <Box key={uniqueId(`${route.path}`)}>
      <MenuItem component={RouterLink} to={route.path} onClick={handleClick}>
        {route.icon}
        <ListItemText
          primary={
            <Typography variant={route.collapse ? 'h6' : 'body1'}>
              {route.name}
            </Typography>
          }
          inset={!route.collapse}
        />
      </MenuItem>
      {route.collapse && route.items && (
        <List component="div" disablePadding>
          {route.items.map(subRoute => generateLinks(subRoute, handleClick))}
        </List>
      )}
    </Box>
  );
};

const NavLinks = ({ routes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonRef = useRef(null);

  const handleClick = event => {
    console.log('event', event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        ref={buttonRef}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {routes.map(route => generateLinks(route, handleClose))}
      </Menu>
    </div>
  );
};

NavLinks.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavLinks;
// const createLinks = routes => {
//   return routes.map((route, index) => {
//     // IF RT PATH HAS ITEMS, RENDER THAT PATHS ARRAY OF CHILD ROUTES
//     if (route.path && route.items) {
//       return (
//         <React.Fragment key={index}>
//           <Typography
//             fontSize="md"
//             color={activeColor}
//             fontWeight="bold"
//             mx="auto"
//             ps={{
//               sm: '10px',
//               xl: '16px',
//             }}
//             pt="18px"
//             pb="12px"
//           >
//             {route.name}
//           </Typography>
//           {renderNavLink(route)}
//           {/* {createLinks(route.items)} */}
//         </React.Fragment>
//       );

// } else if (route.path) {
//   return (
//     <NavLink key={index} to={route.path}>
//       {route.icon ? (
//         <Box>
//           <RCFlex
//             spacing={
//               activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
//             }
//             py="5px"
//             ps="10px"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Box
//               color={
//                 activeRoute(route.path.toLowerCase())
//                   ? activeIcon
//                   : textColor
//               }
//               me="18px"
//             >
//               {route.icon}
//             </Box>
//             <Typography
//               me="auto"
//               color={
//                 activeRoute(route.path.toLowerCase())
//                   ? activeColor
//                   : textColor
//               }
//               fontWeight={
//                 activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
//               }
//             >
//               {route.name}
//             </Typography>
//             <Box
//               h="36px"
//               w="4px"
//               bg={
//                 activeRoute(route.path.toLowerCase())
//                   ? brandColor
//                   : 'transparent'
//               }
//               borderRadius="5px"
//             />
//           </RCFlex>
//         </Box>
//       ) : (
//         <Box>
//           <RCFlex
//             spacing={
//               activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
//             }
//             py="5px"
//             ps="10px"
//             alignItems="center"
//           >
//             <Typography
//               me="auto"
//               color={
//                 activeRoute(route.path.toLowerCase())
//                   ? activeColor
//                   : inactiveColor
//               }
//               fontWeight={
//                 activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
//               }
//             >
//               {route.name}
//             </Typography>
//             <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
//           </RCFlex>
//         </Box>
//       )}
//     </NavLink>
//   );
// }
//   });
// };

//  BRAND
//   return createLinks(routes);
// };
