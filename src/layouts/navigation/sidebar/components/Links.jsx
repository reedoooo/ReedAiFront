import { Box, Typography } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RCFlex } from 'components/themed/RCFlex';
import useMode from 'hooks/useMode';

const SidebarLinks = props => {
  const { theme } = useMode();
  const activeColor = theme.palette.text.primary;
  const inactiveColor = theme.palette.text.secondary;
  const activeIcon = theme.palette.primary.main;
  const textColor = theme.palette.text.secondary;
  const brandColor = theme.palette.primary.main;
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

//   const activeRoute = routeName => location.pathname.includes(routeName);

//   // Function to update active paths state
//   const updateActivePaths = (routes, parentPath = '') => {
//     let paths = [];

//     routes.forEach(route => {
//       const fullPath = `${parentPath}${route.path}`;
//       if (activeRoute(fullPath)) {
//         paths.push(fullPath);
//         if (route.items) {
//           const childPaths = updateActivePaths(route.items, fullPath);
//           paths = [...paths, ...childPaths];
//         }
//       }
//     });

//     return paths;
//   };

//   useEffect(() => {
//     const paths = updateActivePaths(routes);
//     setActivePaths(paths);
//   }, [location.pathname, routes]);

//   // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
//   const createLinks = (routes, parentPath = '') => {
//     return routes.map((route, index) => {
//       const fullPath = `${parentPath}${route.path}`;
//       const isActive = activePaths.includes(fullPath);

//       if (route.category) {
//         return (
//           <React.Fragment key={index}>
//             <Typography
//               fontSize="md"
//               color={activeColor}
//               fontWeight="bold"
//               mx="auto"
//               ps={{
//                 sm: '10px',
//                 xl: '16px',
//               }}
//               pt="18px"
//               pb="12px"
//             >
//               {route.name}
//             </Typography>
//             {createLinks(route.items, fullPath)}
//           </React.Fragment>
//         );
//       } else if (route.path) {
//         return (
//           <NavLink key={index} to={fullPath}>
//             {route.icon ? (
//               <Box>
//                 <RCFlex
//                   spacing={isActive ? '22px' : '26px'}
//                   py="5px"
//                   ps="10px"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <Box color={isActive ? activeIcon : textColor} me="18px">
//                     {route.icon}
//                   </Box>
//                   <Typography
//                     me="auto"
//                     color={isActive ? activeColor : textColor}
//                     fontWeight={isActive ? 'bold' : 'normal'}
//                   >
//                     {route.name}
//                   </Typography>
//                   <Box
//                     h="36px"
//                     w="4px"
//                     bg={isActive ? brandColor : 'transparent'}
//                     borderRadius="5px"
//                   />
//                 </RCFlex>
//               </Box>
//             ) : (
//               <Box>
//                 <RCFlex
//                   spacing={isActive ? '22px' : '26px'}
//                   py="5px"
//                   ps="10px"
//                   alignItems="center"
//                 >
//                   <Typography
//                     me="auto"
//                     color={isActive ? activeColor : inactiveColor}
//                     fontWeight={isActive ? 'bold' : 'normal'}
//                   >
//                     {route.name}
//                   </Typography>
//                   <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
//                 </RCFlex>
//               </Box>
//             )}
//           </NavLink>
//         );
//       }

//       return null;
//     });
//   };

//   return createLinks(routes);
// };

// export default SidebarLinks;
//     <NavLink key={index} to={route.path}>
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

// export default SidebarLinks;
// This function creates the links and collapses that appear in the sidebar (left menu)
//   const createLinks = routes => {
//     return routes.map((route, key) => {
//       if (route.collapse) {
//         return (
//           <Accordion key={key}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel-content"
//               id="panel-header"
//             >
//               <Box
//                 display="RC"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 width="100%"
//               >
//                 {route.icon && (
//                   <Box display="RC" alignItems="center">
//                     <Icon
//                       color={activeRoute(route.path) ? 'primary' : 'default'}
//                     >
//                       {route.icon}
//                     </Icon>
//                     <Typography
//                       variant="body1"
//                       color={
//                         activeRoute(route.path) ? 'primary' : 'textSecondary'
//                       }
//                     >
//                       {route.name}
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails key={uniqueId(route?.name)}>
//               {/* <React.Fragment key={index}> */}
//               <Typography
//                 variant="body1"
//                 // key={route?.name}
//                 color={activeColor}
//                 fontWeight="bold"
//                 mx="auto"
//                 paddingLeft={{ sm: '10px', xl: '16px' }}
//                 paddingTop="18px"
//                 paddingBottom="12px"
//               >
//                 {route.name}
//               </Typography>
//               {createLinks(route.items)}
//             </AccordionDetails>
//           </Accordion>
//         );
//       } else if (!route.invisible) {
//         return (
//           <NavLink
//             key={route?.path}
//             to={route.path}
//             disabled={route.disabled}
//             ref={linkRef}
//           >
//             <Box
//               display="RC"
//               alignItems="center"
//               paddingY="5px"
//               paddingLeft="10px"
//             >
//               <Box
//                 color={
//                   activeRoute(route?.path?.toLowerCase())
//                     ? activeIcon
//                     : textColor
//                 }
//                 marginRight="18px"
//               >
//                 {route.icon}
//               </Box>
//               <Typography
//                 marginRight="auto"
//                 color={
//                   activeRoute(route?.path?.toLowerCase())
//                     ? activeColor
//                     : inactiveColor
//                 }
//                 fontWeight={
//                   activeRoute(route?.path?.toLowerCase()) ? 'bold' : 'normal'
//                 }
//               >
//                 {route.name}
//               </Typography>
//               <Box
//                 height="36px"
//                 width="4px"
//                 backgroundColor={
//                   activeRoute(route?.path?.toLowerCase())
//                     ? brandColor
//                     : 'transparent'
//                 }
//                 borderRadius="5px"
//               />
//             </Box>
//           </NavLink>
//         );
//       }
//       return null;
//     });
//   };

//   return <React.Fragment>{createLinks(routes)}</React.Fragment>;
// };

// export default SidebarLinks;
//   const activeRoute = routeName => {
//     return location.pathname.includes(routeName);
//   };

//   const createLinks = routes => {
//     const routeParents = [
//       ...new Set(routes?.map(route => (route.collapse ? route.path : null))),
//     ];

//     return routeLayouts.map((layout, layoutIndex) => {
//       const layoutRoutes = routes.filter(
//         route =>
//           route.layout === layout &&
//           route.name &&
//           !route.name.toLowerCase().includes('error')
//       );

//       return (
//         <Box key={layoutIndex}>
//           {layoutRoutes.map((route, index) => (
//             <React.Fragment key={index}>
//               <NavLink
//                 to={route.layout + route.path}
//                 style={({ isActive }) => ({
//                   display: 'RC',
//                   alignItems: 'center',
//                   padding: '10px 15px',
//                   borderRadius: theme.shape.borderRadius,
//                   textDecoration: 'none',
//                   color: isActive
//                     ? theme.palette.primary.main
//                     : theme.palette.text.primary,
//                   backgroundColor: isActive
//                     ? theme.palette.action.selected
//                     : 'transparent',
//                 })}
//               >
//                 {route.icon && (
//                   <Box
//                     component="span"
//                     sx={{
//                       display: 'RC',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       marginRight: '10px',
//                     }}
//                   >
//                     {route.icon}
//                   </Box>
//                 )}
//                 <Typography variant="body1">{route.name}</Typography>
//               </NavLink>
//               {route.children && route.children.length > 0 && (
//                 <Box pl={4}>
//                   {route.children
//                     .filter(
//                       childRoute =>
//                         childRoute.name &&
//                         !childRoute.name.toLowerCase().includes('error')
//                     )
//                     .map((childRoute, childIndex) => (
//                       <NavLink
//                         to={route.layout + childRoute.path}
//                         key={childIndex}
//                         style={({ isActive }) => ({
//                           display: 'RC',
//                           alignItems: 'center',
//                           padding: '10px 15px',
//                           borderRadius: theme.shape.borderRadius,
//                           textDecoration: 'none',
//                           color: isActive
//                             ? theme.palette.primary.main
//                             : theme.palette.text.primary,
//                           backgroundColor: isActive
//                             ? theme.palette.action.selected
//                             : 'transparent',
//                         })}
//                       >
//                         {childRoute.icon && (
//                           <Box
//                             component="span"
//                             sx={{
//                               display: 'RC',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               marginRight: '10px',
//                             }}
//                           >
//                             {childRoute.icon}
//                           </Box>
//                         )}
//                         <Typography variant="body2">
//                           {childRoute.name}
//                         </Typography>
//                       </NavLink>
//                     ))}
//                 </Box>
//               )}
//             </React.Fragment>
//           ))}
//         </Box>
//       );
//     });
//   };

//   return <Box>{createLinks(routes)}</Box>;
// };

// export default SidebarLinks;

// import { Box, Typography } from '@mui/material';
// import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import useMode from 'hooks/useMode';

// export function SidebarLinks(props) {
//   const location = useLocation();
//   const { theme } = useMode();
//   const { routes } = props;

//   const activeColor = theme.palette.text.primary;
//   const inactiveColor = theme.palette.text.secondary;
//   const activeIcon = theme.palette.primary.main;
//   const textColor = theme.palette.text.secondary;
//   const brandColor = theme.palette.primary.main;

// const activeRoute = routeName => {
//   return location.pathname.includes(routeName);
// };

//   const createLinks = routes => {
//     return routes.map((route, index) => {
//       if (route.category) {
//         return (
// <React.Fragment key={index}>
//   <Typography
//     variant="body1"
//     color={activeColor}
//     fontWeight="bold"
//     mx="auto"
//     paddingLeft={{ sm: '10px', xl: '16px' }}
//     paddingTop="18px"
//     paddingBottom="12px"
//   >
//     {route.name}
//   </Typography>
//   {createLinks(route.items)}
// </React.Fragment>
//         );
//       } else if (
//         ['/admin', '/auth', '/blank', '/land'].includes(route.layout)
//       ) {
//         return (
//           <NavLink key={index} to={route.path}>
//             <Box
//               display="RC"
//               alignItems="center"
//               paddingY="5px"
//               paddingLeft="10px"
//             >
//               <Box
//                 color={
//                   activeRoute(route.path.toLowerCase()) ? activeIcon : textColor
//                 }
//                 marginRight="18px"
//               >
//                 {route.icon}
//               </Box>
//               <Typography
//                 marginRight="auto"
//                 color={
//                   activeRoute(route.path.toLowerCase())
//                     ? activeColor
//                     : inactiveColor
//                 }
//                 fontWeight={
//                   activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
//                 }
//               >
//                 {route.name}
//               </Typography>
//               <Box
//                 height="36px"
//                 width="4px"
//                 backgroundColor={
//                   activeRoute(route.path.toLowerCase())
//                     ? brandColor
//                     : 'transparent'
//                 }
//                 borderRadius="5px"
//               />
//             </Box>
//           </NavLink>
//         );
//       } else {
//         return null;
//       }
//     });
//   };

//   return <>{createLinks(routes)}</>;
// }

// export default SidebarLinks;
