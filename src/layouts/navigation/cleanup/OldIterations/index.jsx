// import {
// 	Box,
// 	Breadcrumbs,
// 	Link,
//   Button,
//   Container,
//   Grid,
//   Icon,
//   Menu,
//   MenuItem,
//   MenuList,
//   Stack,
//   Typography, } from '@mui/material';
// import PropTypes from 'prop-types';
// import React, { useState, useEffect } from 'react';
// import useMode from 'hooks/useMode';
// import AdminNavbarLinks from 'layouts/navigation/navbar/NavbarLinksAdmin';

// // Custom components
// import { GoChevronDown, GoChevronRight } from 'react-icons/go';
// import { NavLink } from 'react-router-dom';
// import routes from '@/routes';
// import IconBox from 'components/themedV2/icons/IconBox';
// import { SidebarContext } from 'contexts/SidebarProvider';
// import useDisclosure from 'hooks/useDisclosure';
// import { SidebarResponsive } from 'layouts/navigation/sidebar/Sidebar';
// export default function AdminNavbar(props) {
//   const [scrolled, setScrolled] = useState(false);

//   const changeNavbar = () => {
//     if (window.scrollY > 1) {
//       setScrolled(true);
//     } else {
//       setScrolled(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', changeNavbar);
//     console.log(`PROPS CHECK IN ADMIN NAVBAR: ${props} `, props);
//     return () => {
//       window.removeEventListener('scroll', changeNavbar);
//     };
//   }, [props]);

//   const { secondary, message, brandText } = props;
//   const theme = useMode();

//   let mainText =
//     theme.palette.mode === 'light'
//       ? theme.palette.primary.dark
//       : theme.palette.common.white;
//   let secondaryText =
//     theme.palette.mode === 'light'
//       ? theme.palette.grey[700]
//       : theme.palette.grey[500];
//   let navbarPosition = 'fixed';
//   let navbarFilter = 'none';
//   let navbarBackdrop = 'blur(20px)';
//   let navbarShadow = 'none';
//   let navbarBg =
//     theme.palette.mode === 'light'
//       ? 'rgba(244, 247, 254, 0.2)'
//       : 'rgba(11,20,55,0.5)';
//   let navbarBorder = 'transparent';
//   let secondaryMargin = '0px';
//   let paddingX = '15px';
//   let gap = '0px';

//   return (
//     <Box
//       sx={{
//         position: navbarPosition,
//         boxShadow: navbarShadow,
//         backgroundColor: navbarBg,
//         borderColor: navbarBorder,
//         filter: navbarFilter,
//         backdropFilter: navbarBackdrop,
//         backgroundPosition: 'center',
//         backgroundSize: 'cover',
//         borderRadius: '16px',
//         borderWidth: '1.5px',
//         borderStyle: 'solid',
//         transition:
//           'box-shadow 0.25s linear, background-color 0.25s linear, filter 0.25s linear, border 0.25s linear',
//         alignItems: { xl: 'center' },
//         display: secondary ? 'block' : 'flex',
//         minHeight: '75px',
//         justifyContent: { xl: 'center' },
//         lineHeight: '25.6px',
//         mx: 'auto',
//         mt: secondaryMargin,
//         pb: '8px',
//         right: { sm: '12px', md: '30px', lg: '30px', xl: '30px' },
//         px: { sm: paddingX, md: '10px' },
//         ps: { xl: '12px' },
//         pt: '8px',
//         top: { sm: '12px', md: '16px', lg: '20px', xl: '20px' },
//         width: {
//           sm: 'calc(100vw - 6%)',
//           md: 'calc(100vw - 8%)',
//           lg: 'calc(100vw - 6%)',
//           xl: 'calc(100vw - 350px)',
//           '2xl': 'calc(100vw - 365px)',
//         },
//       }}
//     >
//       <Box
//         sx={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           mb: gap,
//         }}
//       >
//         {/* ====== [BREADCRUMBS/SITE BRAND HEADER] ====== */}
//         <Box mb={{ sm: '8px', md: '0px' }}>
//           <Breadcrumbs>
//             <Link
//               href={`${process.env.PUBLIC_URL}/#/`}
//               color={secondaryText}
//               fontSize="small"
//               mb="5px"
//             >
//               Pages
//             </Link>
//             {brandText}
//           </Breadcrumbs>
//           <Link
//             color={mainText}
//             href={`${process.env.PUBLIC_URL}/#/`}
//             sx={{
//               backgroundColor: 'inherit',
//               borderRadius: 'inherit',
//               fontWeight: 'bold',
//               fontSize: '34px',
//               '&:hover': { color: mainText },
//               '&:active': {
//                 backgroundColor: 'inherit',
//                 transform: 'none',
//                 borderColor: 'transparent',
//               },
//               '&:focus': { boxShadow: 'none' },
//             }}
//           >
//             {brandText}
//           </Link>
//         </Box>
//         {/* ====== [ADMIN/USER DETAILS NAV BAR] ====== */}
//         <Box ms="auto" width={{ sm: '100%', md: 'unset' }} open={true}>
//           <AdminNavbarLinks
//             onOpen={props.onOpen}
//             logoText={props.logoText}
//             secondary={props.secondary}
//             fixed={props.fixed}
//             scrolled={scrolled}
//             open={props.open}
//           />
//         </Box>
//         {secondary ? (
//           <Typography color="common.white">{message}</Typography>
//         ) : null}
//       </Box>
//     </Box>
//   );
// }

// AdminNavbar.propTypes = {
//   brandText: PropTypes.string,
//   variant: PropTypes.string,
//   secondary: PropTypes.bool,
//   fixed: PropTypes.bool,
//   onOpen: PropTypes.func,
// };
// /* eslint-disable no-unused-vars */

// export default function AuthNavbar(props) {
//   const { logo, logoText, secondary, sidebarWidth, ...rest } = props;
//   const theme = useMode();
//   const {
//     isOpen: isOpenAuth,
//     onOpen: onOpenAuth,
//     onClose: onCloseAuth,
//   } = useDisclosure();
//   const {
//     isOpen: isOpenDashboards,
//     onOpen: onOpenDashboards,
//     onClose: onCloseDashboards,
//   } = useDisclosure();
//   const {
//     isOpen: isOpenMain,
//     onOpen: onOpenMain,
//     onClose: onCloseMain,
//   } = useDisclosure();
//   const {
//     isOpen: isOpenLanding,
//     onOpen: onOpenLanding,
//     onClose: onCloseLanding,
//   } = useDisclosure();

//   function getLinks(routeName) {
//     let foundRoute = routes.filter(function (route) {
//       return route.items && route.name === routeName;
//     });
//     return foundRoute[0]?.items || [];
//   }

//   function getLinksCollapse(routeName) {
//     let foundLinks = getLinks(routeName).filter(function (link) {
//       return link.collapse === true;
//     });
//     return foundLinks;
//   }

//   let authObject = getLinksCollapse('Authentication');
//   let mainObject = getLinksCollapse('Main Pages');
//   let dashboardsObject = getLinks('Dashboards');
//   let landingObject = getLinks('Landing');

//   let logoColor = theme.palette.common.white;
//   let extraArr = [];
//   routes.forEach(route => {
//     route.items?.forEach(item => {
//       if (item.items && item.name === 'Pages') {
//         extraArr = item.items.filter(link => !link.collapse);
//       }
//     });
//   });

//   const textColor =
//     theme.palette.mode === 'light'
//       ? theme.palette.primary.dark
//       : theme.palette.common.white;
//   let menuBg = theme.palette.common.white;
//   let mainText = theme.palette.common.white;
//   let navbarBg = 'none';
//   let navbarShadow = 'initial';
//   let bgButton = theme.palette.common.white;
//   let colorButton = theme.palette.primary.main;
//   let navbarPosition = 'absolute';

//   let brand = (
//     <a
//       href={`${process.env.PUBLIC_URL}/#/`}
//       target="_blank"
//       rel="noopener noreferrer"
//       style={{
//         display: 'flex',
//         lineHeight: '100%',
//         fontWeight: 'bold',
//         justifyContent: 'center',
//         alignItems: 'center',
//         color: mainText,
//       }}
//     >
//       <Typography variant="subtitle2" mt={1}>
//         {logoText}
//       </Typography>
//     </a>
//   );

//   if (props.secondary === true) {
//     brand = (
//       <a
//         href={`${process.env.PUBLIC_URL}/#/`}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{
//           minWidth: '175px',
//           display: 'flex',
//           lineHeight: '100%',
//           fontWeight: 'bold',
//           justifyContent: 'center',
//           alignItems: 'center',
//           color: mainText,
//         }}
//       >
//         <Stack direction="row" spacing="12px" align="center" justify="center">
//           <Box
//             w="1px"
//             h="20px"
//             bg={theme.palette.mode === 'dark' ? 'white' : 'gray.700'}
//           />
//         </Stack>
//         <Typography fontSize="sm" mt="3px">
//           {logoText}
//         </Typography>
//       </a>
//     );
//   }

//   const createPagesLinks = routes => {
//     return routes.map((link, index) => {
//       if (
//         link.name === 'Applications' ||
//         link.name === 'Ecommerce' ||
//         link.name === 'Authentication' ||
//         link.name === 'RTL' ||
//         link.name === 'Widgets' ||
//         link.name === 'Charts' ||
//         link.name === 'Alerts'
//       ) {
//         return null;
//       }
//       if (link.name === 'Pricing Page') {
//         return (
//           <Stack key={link.name} direction="column">
//             <Stack
//               direction="row"
//               spacing="6px"
//               align="center"
//               mb="6px"
//               cursor="default"
//             >
//               <IconBox bg="blue.500" color="white" h="30px" w="30px">
//                 {/* <RocketIcon color='inherit' /> */}
//               </IconBox>
//               <Typography fontWeight="bold" fontSize="sm" color={textColor}>
//                 Extra
//               </Typography>
//             </Stack>
//             {createExtraLinks(extraArr)}
//           </Stack>
//         );
//       }
//       if (link.authIcon) {
//         return (
//           <React.Fragment key={index}>
//             {link.authIcon}
//             {link.name}
//             {createPagesLinks(link.items)}
//           </React.Fragment>
//         );
//       } else {
//         if (link.component) {
//           return (
//             <NavLink key={link.name} to={link.layout + link.path}>
//               <MenuItem
//                 ps="36px"
//                 py="0px"
//                 sx={{
//                   '&:hover': {
//                     boxShadow: 'none',
//                     background: 'none',
//                   },
//                 }}
//                 style={{ borderRadius: '12px' }}
//               >
//                 <Typography color="gray.400" fontSize="sm" fontWeight="normal">
//                   {link.name}
//                 </Typography>
//               </MenuItem>
//             </NavLink>
//           );
//         } else {
//           return (
//             <React.Fragment key={index}>
//               {createPagesLinks(link.items)}
//             </React.Fragment>
//           );
//         }
//       }
//     });
//   };

//   const createLandingLinks = routes => {
//     return routes.map((link, key) => (
//       <NavLink
//         key={key}
//         to={link.layout + link.path}
//         style={{ maxWidth: 'max-content', marginLeft: '40px' }}
//       >
//         <Typography color="text.secondary" fontSize="small" fontWeight="normal">
//           {link.name}
//         </Typography>
//       </NavLink>
//     ));
//   };

//   const createExtraLinks = routes => {
//     return routes.map(link => (
//       <NavLink key={link.name} to={link.layout + link.path}>
//         <MenuItem
//           ps="36px"
//           py="0px"
//           sx={{
//             '&:hover': { boxShadow: 'none', background: 'none' },
//           }}
//           style={{ borderRadius: '12px' }}
//         >
//           <Typography color="gray.400" fontSize="sm" fontWeight="normal">
//             {link.name}
//           </Typography>
//         </MenuItem>
//       </NavLink>
//     ));
//   };

//   const createDashboardsLinks = routes => {
//     return routes.map((link, key) => (
//       <NavLink key={key} to={link.layout + link.path}>
//         <MenuItem
//           ps="36px"
//           py="0px"
//           sx={{
//             '&:hover': { boxShadow: 'none', background: 'none' },
//           }}
//           style={{ borderRadius: '12px' }}
//         >
//           <Typography color="gray.400" fontSize="sm" fontWeight="normal">
//             {link.name}
//           </Typography>
//         </MenuItem>
//       </NavLink>
//     ));
//   };

//   const createMainLinks = routes => {
//     return routes.map((link, key) => {
//       if (link.collapse === true) {
//         return (
//           <Stack key={key} direction="column" maxWidth="max-content">
//             <Stack direction="row" spacing="0px" align="center">
//               <IconBox bg="primary.main" h="30px" w="30px" mr={1}>
//                 {link.icon}
//               </IconBox>
//               <Typography
//                 fontWeight="bold"
//                 fontSize="medium"
//                 mr="auto"
//                 color={textColor}
//               >
//                 {link.name}
//               </Typography>
//               <Icon
//                 as={GoChevronRight}
//                 color={mainText}
//                 width="14px"
//                 height="14px"
//                 fontWeight="2000"
//               />
//             </Stack>
//             <Stack direction="column" bg={menuBg}>
//               {createMainLinks(link.items)}
//             </Stack>
//           </Stack>
//         );
//       } else {
//         return (
//           <NavLink
//             key={key}
//             to={link.layout + link.path}
//             style={{ maxWidth: 'max-content', marginLeft: '40px' }}
//           >
//             <Typography
//               color="text.secondary"
//               fontSize="small"
//               fontWeight="normal"
//             >
//               {link.name}
//             </Typography>
//           </NavLink>
//         );
//       }
//     });
//   };

//   const createAuthLinks = routes => {
//     return routes.map((link, key) => {
//       return (
//         <Stack key={key} direction="column" my="auto" maxWidth="max-content">
//           <Stack direction="row" spacing="0px" align="center">
//             <IconBox bg="primary.main" h="30px" w="30px" mr={1}>
//               {link.icon}
//             </IconBox>
//             <Typography
//               fontWeight="bold"
//               fontSize="medium"
//               mr="auto"
//               color={textColor}
//             >
//               {link.name}
//             </Typography>
//             <Icon
//               as={GoChevronRight}
//               color={mainText}
//               width="14px"
//               height="14px"
//               fontWeight="2000"
//             />
//           </Stack>
//           <Stack direction="column" bg={menuBg}>
//             {createAuthLinks(link.items)}
//           </Stack>
//         </Stack>
//       );
//     });
//   };

//   const linksAuth = (
//     <Grid container spacing={1} display={{ sm: 'none', lg: 'flex' }}>
//       <Stack
//         direction="row"
//         spacing="4px"
//         align="center"
//         color="#fff"
//         fontWeight="bold"
//         onMouseEnter={onOpenDashboards}
//         onMouseLeave={onCloseDashboards}
//         cursor="pointer"
//         position="relative"
//       >
//         <Typography fontSize="small" color={mainText}>
//           Dashboards
//         </Typography>
//         <Box>
//           <Icon
//             mt={1}
//             as={GoChevronDown}
//             color={mainText}
//             width="14px"
//             height="14px"
//             fontWeight="2000"
//           />
//         </Box>
//         <Menu open={isOpenDashboards}>
//           <MenuList
//             sx={{
//               backgroundColor: menuBg,
//               p: 2.75,
//               cursor: 'default',
//               borderRadius: '15px',
//               position: 'absolute',
//               top: '30px',
//               left: '-10px',
//             }}
//           >
//             <Grid container spacing={2} wrap="wrap" width="300px">
//               {createDashboardsLinks(dashboardsObject)}
//             </Grid>
//           </MenuList>
//         </Menu>
//       </Stack>
//       <Stack
//         direction="row"
//         spacing="4px"
//         align="center"
//         color="#fff"
//         fontWeight="bold"
//         onMouseEnter={onOpenAuth}
//         onMouseLeave={onCloseAuth}
//         cursor="pointer"
//         position="relative"
//       >
//         <Typography fontSize="small" color={mainText}>
//           Authentications
//         </Typography>
//         <Box>
//           <Icon
//             mt={1}
//             as={GoChevronDown}
//             color={mainText}
//             width="14px"
//             height="14px"
//             fontWeight="2000"
//           />
//         </Box>
//         <Menu open={isOpenAuth}>
//           <MenuList
//             sx={{
//               backgroundColor: menuBg,
//               p: 2.75,
//               cursor: 'default',
//               borderRadius: '15px',
//               position: 'absolute',
//               top: '30px',
//               left: '-10px',
//             }}
//           >
//             <Grid container spacing={2} wrap="wrap" width="300px">
//               {createAuthLinks(authObject)}
//             </Grid>
//           </MenuList>
//         </Menu>
//       </Stack>
//       <Stack
//         direction="row"
//         spacing="4px"
//         align="center"
//         color="#fff"
//         fontWeight="bold"
//         onMouseEnter={onOpenMain}
//         onMouseLeave={onCloseMain}
//         cursor="pointer"
//         position="relative"
//       >
//         <Typography fontSize="small" color={mainText}>
//           Main Pages
//         </Typography>
//         <Box>
//           <Icon
//             mt={1}
//             as={GoChevronDown}
//             color={mainText}
//             width="14px"
//             height="14px"
//             fontWeight="2000"
//           />
//         </Box>
//         <Menu open={isOpenMain}>
//           <MenuList
//             sx={{
//               backgroundColor: menuBg,
//               p: 2.75,
//               cursor: 'default',
//               borderRadius: '15px',
//               position: 'absolute',
//               top: '30px',
//               left: '-10px',
//             }}
//           >
//             <Grid container spacing={2} wrap="wrap" width="500px">
//               {createMainLinks(mainObject)}
//             </Grid>
//           </MenuList>
//         </Menu>
//       </Stack>
//       <Stack
//         direction="row"
//         spacing="4px"
//         align="center"
//         color="#fff"
//         fontWeight="bold"
//         onMouseEnter={onOpenLanding}
//         onMouseLeave={onCloseLanding}
//         cursor="pointer"
//         position="relative"
//       >
//         <Typography fontSize="small" color={mainText}>
//           Landings
//         </Typography>
//         <Box>
//           <Icon
//             mt={1}
//             as={GoChevronDown}
//             color={mainText}
//             width="14px"
//             height="14px"
//             fontWeight="2000"
//           />
//         </Box>
//         <Menu open={isOpenLanding}>
//           <MenuList
//             sx={{
//               backgroundColor: menuBg,
//               p: 2.75,
//               cursor: 'default',
//               borderRadius: '15px',
//               position: 'absolute',
//               top: '30px',
//               left: '-10px',
//               minWidth: '350px',
//             }}
//           >
//             <Grid container spacing={2} columns={2}>
//               {createLandingLinks(landingObject)}
//             </Grid>
//           </MenuList>
//         </Menu>
//       </Stack>
//     </Grid>
//   );

//   return (
//     <SidebarContext.Provider value={{ sidebarWidth }}>
//       <Box
//         sx={{
//           position: navbarPosition,
//           top: 2,
//           left: '50%',
//           transform: 'translate(-50%, 0px)',
//           background: navbarBg,
//           boxShadow: navbarShadow,
//           borderRadius: '15px',
//           p: 2.75,
//           mx: 'auto',
//           width: '1044px',
//           maxWidth: '90%',
//           zIndex: 3,
//         }}
//       >
//         <Container
//           maxWidth={false}
//           sx={{
//             display: 'flex',
//             justifyContent: { sm: 'start', lg: 'space-between' },
//           }}
//         >
//           {brand}
//           <Box
//             ms={{ base: 'auto', lg: '0px' }}
//             display={{ base: 'flex', lg: 'none' }}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <SidebarResponsive
//               logo={
//                 <Stack
//                   direction="row"
//                   spacing="12px"
//                   align="center"
//                   justify="center"
//                 >
//                   <Box
//                     w="1px"
//                     h="20px"
//                     bg={theme.palette.mode === 'dark' ? 'white' : 'gray.700'}
//                   />
//                 </Stack>
//               }
//               logoText={props.logoText}
//               secondary={props.secondary}
//               routes={routes}
//               {...rest}
//             />
//           </Box>
//           {linksAuth}
//           <a href="https://www.horizon-ui.com/pro">
//             <Button
//               sx={{
//                 backgroundColor: bgButton,
//                 color: colorButton,
//                 fontSize: 'xs',
//                 variant: 'contained',
//                 borderRadius: '50px',
//                 px: 6,
//                 display: { sm: 'none', lg: 'flex' },
//               }}
//             >
//               Buy Now
//             </Button>
//           </a>
//         </Container>
//       </Box>
//     </SidebarContext.Provider>
//   );
// }

// AuthNavbar.propTypes = {
//   logoText: PropTypes.string,
//   secondary: PropTypes.bool,
//   sidebarWidth: PropTypes.number,
// };
// // import {
// //   Avatar,
// //   Box,
// //   Icon,
// //   Menu,
// //   IconButton as MenuButton,
// //   MenuItem,
// //   MenuList,
// //   Typography as Text,
// //   Typography,
// // } from '@mui/material';
// // import PropTypes from 'prop-types';
// // import { MdNotificationsNone } from 'react-icons/md';
// // import routes from '@/routes';
// // import { ItemContent } from 'components/themedV2/menu/ItemContent';
// // import useMode from 'hooks/useMode';
// // import { SidebarResponsive } from 'layouts/navigation/sidebar/Sidebar';
// // import { SearchBar } from './searchBar/SearchBar';

// export default function HeaderLinks(props) {
//   const { secondary, open } = props;
//   const { theme, colorModeValues } = useMode();
//   const navbarIcon = colorModeValues('gray.400', 'white');
//   const menuBg = colorModeValues('white', 'navy.800');
//   const textColor = colorModeValues('secondaryGray.900', 'white');
//   const textColorBrand = colorModeValues('brand.700', 'brand.400');
//   const ethColor = colorModeValues('gray.700', 'white');
//   const borderColor = colorModeValues('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
//   const ethBg = colorModeValues('secondaryGray.300', 'navy.900');
//   const ethBox = colorModeValues('white', 'navy.800');
//   const shadow = colorModeValues(
//     '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
//     '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
//   );
//   const borderButton = colorModeValues('secondaryGray.500', 'whiteAlpha.200');

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'row',
//         flexWrap: secondary ? { xs: 'wrap', md: 'nowrap' } : 'unset',
//         p: 1,
//         borderRadius: '30px',
//         background: menuBg,
//         boxShadow: shadow,
//         width: { xs: '100%', md: 'auto' },
//       }}
//     >
//       {/* =============== [SEARCH INPUT] =============== */}
//       <SearchBar
//         mb={secondary ? { xs: 1, md: 'unset' } : 'unset'}
//         me={1}
//         borderRadius="30px"
//       />
//       {/* =============== [SIDEBAR EXPOSURE] =============== */}
//       <SidebarResponsive routes={routes} open={open} />
//       {/* =============== [NOTIFICATION MENU] =============== */}
//       <Menu>
//         <MenuButton sx={{ p: 0 }}>
//           <Icon
//             sx={{ mt: 0.75, width: 18, height: 18, mr: 1 }}
//             as={MdNotificationsNone}
//             color={navbarIcon}
//           />
//         </MenuButton>
//         <MenuList
//           sx={{
//             boxShadow: shadow,
//             p: 2,
//             borderRadius: '20px',
//             backgroundColor: menuBg,
//             border: 'none',
//             mt: 2.75,
//             mr: { xs: 3, md: 'unset' },
//             minWidth: { xs: 'unset', md: 400, xl: 450 },
//             maxWidth: { xs: 360, md: 'unset' },
//           }}
//         >
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             width="100%"
//             mb={2}
//           >
//             <Text fontSize="md" fontWeight="600" color={textColor}>
//               Notifications
//             </Text>
//             <Text
//               fontSize="sm"
//               fontWeight="500"
//               color={textColorBrand}
//               ms="auto"
//               sx={{ cursor: 'pointer' }}
//             >
//               Mark all read
//             </Text>
//           </Box>
//           <Box display="flex" flexDirection="column">
//             <MenuItem
//               sx={{
//                 '&:hover': { backgroundColor: 'none' },
//                 '&:focus': { backgroundColor: 'none' },
//                 px: 0,
//                 borderRadius: 1,
//                 mb: 1,
//               }}
//             >
//               <ItemContent info="Horizon UI Dashboard PRO" aName="Alicia" />
//             </MenuItem>
//             <MenuItem
//               sx={{
//                 '&:hover': { backgroundColor: 'none' },
//                 '&:focus': { backgroundColor: 'none' },
//                 px: 0,
//                 borderRadius: 1,
//                 mb: 1,
//               }}
//             >
//               <ItemContent
//                 info="Horizon Design System Free"
//                 aName="Josh Henry"
//               />
//             </MenuItem>
//           </Box>
//         </MenuList>
//       </Menu>
//       {/* =============== [USER MENU] =============== */}
//       <Avatar
//         sx={{
//           '&:hover': { cursor: 'pointer' },
//           color: 'white',
//           backgroundColor: '#11047A',
//           width: 40,
//           height: 40,
//         }}
//         name="Adela Parkson"
//       />
//       <Box display="flex" width="100%" mb={0}>
//         <Typography
//           color={textColor}
//           borderColor={borderColor}
//           sx={{
//             paddingLeft: 2.5,
//             paddingTop: 2,
//             paddingBottom: 1.25,
//             width: '100%',
//             fontSize: 'sm',
//             fontWeight: '700',
//           }}
//         >
//           👋&nbsp; Hey, Adela
//         </Typography>
//       </Box>
//       <Box display="flex" flexDirection="column" p={1}>
//         <Typography fontSize="sm" sx={{ px: 1.75 }}>
//           Profile Settings
//         </Typography>
//         <Typography fontSize="sm" sx={{ px: 1.75 }}>
//           Newsletter Settings
//         </Typography>
//         <Typography fontSize="sm" sx={{ px: 1.75, color: 'error.main' }}>
//           Log out
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// HeaderLinks.propTypes = {
//   variant: PropTypes.string,
//   fixed: PropTypes.bool,
//   secondary: PropTypes.bool,
//   onOpen: PropTypes.func,
//   open: PropTypes.bool.isRequired, // Add this line
// };
// import { Box, Container, Portal } from '@mui/material';
// import React, { useContext, useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import routes from '@/routes/index';
// import { MainWrapper, PageWrapper } from 'components/styled';
// import { SidebarContext } from 'contexts/SidebarProvider';
// import Navbar from 'layouts/navigation/navbar/NavbarAdmin';
// // import Header from 'layouts/navigation/header/Header';
// // import Sidebar from 'layouts/navigation/sidebar/Sidebar';

// const AdminLayout = props => {
//   const {
//     isSidebarOpen,
//     isMobileSidebarOpen,
//     toggleSidebar,
//     toggleMobileSidebar,
//     onSidebarClose,
//   } = useContext(SidebarContext);
//   // =========================================================
//   // This is the main layout for the admin dashboard
//   // It gives a variant view type for the application
//   // =========================================================
//   const { children, ...rest } = props;
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <MainWrapper className="mainwrapper">
//       {/* ------------------------------------------- */}
//       {/* Sidebar */}
//       {/* <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         isMobileSidebarOpen={isMobileSidebarOpen}
//         onSidebarClose={onSidebarClose}
//         routes={routes}
//         display="none"
//         {...rest}
//       /> */}
//       {/* Main Wrapper */}
//       <PageWrapper className="page-wrapper">
//         {/* ------------------------------------------- */}
//         {/* Header */}
//         {/* <Header
//           toggleSidebar={toggleSidebar}
//           toggleMobileSidebar={toggleMobileSidebar}
//         /> */}
//         {/* PageContent */}
//         {/* <Container
//           sx={{
//             paddingTop: '20px',
//             maxWidth: '1200px',
//           }}
//         > */}
//         {/* ------------------------------------------- */}
//         {/* Page Route */}
//         {/* <Box sx={{ minHeight: 'calc(100vh - 170px)' }}> */}
//         <Box
//           float="right"
//           minHeight="100vh"
//           height="100%"
//           overflow="auto"
//           position="relative"
//           maxHeight="100%"
//           width={{ base: '100%', xl: 'calc(100% - 290px)' }}
//           maxWidth={{ base: '100%', xl: 'calc(100% - 290px)' }}
//           transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
//           transitionDuration=".2s, .2s, .35s"
//           transitionProperty="top, bottom, width"
//           transitionTimingFunction="linear, linear, ease"
//         >
//           <Portal>
//             <Box>
//               <Navbar
//                 onOpen={onOpen}
//                 logoText="Horizon UI Dashboard PRO"
//                 brandText={getActiveRoute(routes)}
//                 fixed={fixed}
//                 {...props}
//               />
//             </Box>
//           </Portal>
//           <Box
//             mx="auto"
//             p={{ base: '20px', md: '30px' }}
//             minHeight="100vh"
//             pt="50px"
//           >
//             <Outlet />
//           </Box>
//         </Box>
//         {/* </Box> */}
//         {/* End Page */}
//         {/* </Container> */}
//       </PageWrapper>
//     </MainWrapper>
//   );
// };
// export default AdminLayout;
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Box>
//         <CssBaseline />
//         {/* Sidebar context provider */}
//         <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
//           {/* Sidebar component */}
//           <Sidebar routes={routes} display="none" {...rest} />
//           {/* Main content area */}
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               bgcolor: 'background.default',
//               minHeight: '100vh',
//               overflow: 'auto',
//               transition: theme.transitions.create(['margin', 'width'], {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//               }),
//               marginLeft: toggleSidebar ? '0px' : '240px',
//             }}
//           >
//             {/* Navbar component */}
//             <Navbar
//               onOpen={() => setToggleSidebar(!toggleSidebar)}
//               logoText="Horizon UI Dashboard PRO"
//               brandText={getActiveRoute(routes)}
//               secondary={getActiveNavbar(routes)}
//               message={getActiveNavbarText(routes)}
//               fixed={fixed}
//               {...rest}
//             />
//             <Box sx={{ mx: 'auto', p: { xs: 2, md: 3 }, pt: 4 }}>
//               <Outlet />
//             </Box>
//             <Box>
//               <Footer />
//           </Box>
//         </SidebarContext.Provider>
//       </Box>
//     </Box>
//   );
// }
