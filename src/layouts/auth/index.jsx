// LAYOUTS: auth/index.js
import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { SidebarContext } from 'contexts/SidebarProvider';
import useDisclosure from 'hooks/useDisclosure';
import LoadingIndicator from 'utils/app/LoadingIndicator';

// Custom Material UI theme
export const AuthLayout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigation = useNavigation();
  const authBg = '#f5f5f5';
  const { onOpen } = useDisclosure();
  if (navigation.state === 'loading') {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <CssBaseline />
        {/* <Portal>
          <Box>
            <AuthNavbar
              onOpen={onOpen}
              logoText={'Horizon UI Dashboard PRO'}
              brandText={getActiveRoute(routes)}
              secondary={getActiveNavbar(routes)}
              message={getActiveNavbarText(routes)}
              fixed={fixed}
            />
          </Box>
        </Portal> */}
        <Box
          sx={{
            backgroundColor: authBg,
            float: 'right',
            minHeight: '100vh',
            height: '100%',
            position: 'relative',
            width: '100%',
            transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
            transitionDuration: '.2s, .2s, .35s',
            transitionProperty: 'top, bottom, width',
            transitionTimingFunction: 'linear, linear, ease',
          }}
        >
          <Box mx="auto" minHeight="100vh">
            <Outlet />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
};
export default AuthLayout;
