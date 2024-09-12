// Chakra imports
import { Box, Portal } from '@mui/material';
import React, { useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigation,
  useParams,
} from 'react-router-dom';
import routes from '@/routes/index';
import { SidebarContext } from 'contexts';
import { useDisclosure } from 'hooks/ui';
import { FooterAdmin, AdminNavbar } from 'layouts';
import {
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
  getLayoutRoute,
  getMenuItems,
} from 'utils';

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
export const AdminLayout = props => {
  const { ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();
  const location = useLocation();
  const params = useParams();
  const chatBotRoute =
    location.pathname.includes(`/admin/${params.workspaceId}`) ||
    location.pathname.includes(`/admin/chat`);
  // ||
  // location.pathname.includes(`/admin/codeEditor`);
  const isChatBotRoute = Boolean(chatBotRoute);

  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
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
            {getLayoutRoute('admin') ? (
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
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
};

export default AdminLayout;
