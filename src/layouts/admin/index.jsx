// Chakra imports
import { Box, Portal, useTheme } from '@mui/material';
import { useAnimation } from 'framer-motion';
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import routes from '@/routes/index';
import { useAuthStore } from 'contexts/AuthProvider';
import { SidebarContext } from 'contexts/SidebarProvider';
import useDisclosure from 'hooks/useDisclosure';
import { FooterAdmin } from 'layouts/navigation/footer/FooterAdmin';
import AdminNavbar from 'layouts/navigation/navbar/NavbarAdmin';
import { LoadingIndicator } from 'utils/app/LoadingIndicator';

// =========================================================
// [AdminLayout] | This code provides the admin layout for the app
// =========================================================
const DashboardContainer = ({ children }) => {
  return (
    <Box
      sx={{
        mx: 'auto',
        p: { xs: '20px', md: '30px' },
        pe: '20px',
        minHeight: '100vh',
        pt: '50px',
      }}
    >
      {children}
    </Box>
  );
};
const ChatBotContainer = ({ children }) => {
  return (
    <Box
      sx={{
        mx: 'auto',
        p: { xs: '20px', md: '30px' },
        pe: '20px',
        minHeight: '100vh',
        pt: '50px',
      }}
    >
      {children}
    </Box>
  );
};
const AdminLayout = props => {
  const { ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigation = useNavigation();
  const authStore = useAuthStore();
  const theme = useTheme();
  const location = useLocation();
  const controls = useAnimation();
  const chatBotRoute = location.pathname.includes('/admin/chat/chat-home');
  const isChatBotRoute = Boolean(chatBotRoute);

  const HistoryTracker = () => {
    React.useEffect(() => {
      console.log(`Navigated to ${location.pathname}`);
    }, [location]);

    return null;
  };
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = routes => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        console.log('ROUTES', routes[i].items);
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = routes => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = routes => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getMenuItems = routes => {
    let menuItems = [];
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        menuItems.push(...getMenuItems(routes[i].items));
      } else if (routes[i].category) {
        menuItems.push(...getMenuItems(routes[i].items));
      } else {
        menuItems.push(routes[i]);
      }
    }
    return menuItems;
  };
  const { onOpen } = useDisclosure();
  // if (!authStore.state.token) {
  //   return <Navigate to="/auth/sign-in" />;
  // }
  if (navigation.state === 'loading') {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          {/* <Sidebar routes={routes} display="none" {...rest} /> */}
          <HistoryTracker />
          <Box
            sx={{
              float: 'right',
              minHeight: '100vh',
              height: '100%',
              overflow: 'auto',
              position: 'relative',
              maxHeight: '100%',
              width: { xs: '100%', xl: 'calc( 100% - 290px )' },
              maxWidth: { xs: '100%', xl: 'calc( 100% - 290px )' },
              transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
              transitionDuration: '.2s, .2s, .35s',
              transitionProperty: 'top, bottom, width',
              transitionTimingFunction: 'linear, linear, ease',
            }}
          >
            <Portal>
              <Box>
                {!isChatBotRoute ? (
                  <AdminNavbar
                    onOpen={onOpen}
                    logoText="Human Websites"
                    brandText={getActiveRoute(routes)}
                    secondary={getActiveNavbar(routes)}
                    message={getActiveNavbarText(routes)}
                    fixed={fixed}
                    isChatRoute={isChatBotRoute}
                  />
                ) : (
                  <>
                    {/* <ChatSidebar /> */}
                    {/* <ChatNavbar
                      onOpen={onOpen}
                      logoText="Human Websites"
                      brandText={getActiveRoute(routes)}
                      secondary={getActiveNavbar(routes)}
                      message={getActiveNavbarText(routes)}
                      fixed={fixed}
                      isChatRoute={isChatBotRoute}
                    /> */}
                  </>
                )}
              </Box>
            </Portal>
            {getRoute() ? (
              isChatBotRoute ? (
                <>
                  <Outlet />
                </>
              ) : (
                <>
                  <DashboardContainer>
                    <Outlet
                      context={{
                        menuItemData: getMenuItems(routes),
                      }}
                    />
                  </DashboardContainer>
                  <Box>
                    <FooterAdmin />
                  </Box>
                </>
              )
            ) : null}
            {/* {!isChatBotRoute && (
              <Box>
                <FooterAdmin />
              </Box>
            )} */}
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
};

export default AdminLayout;
