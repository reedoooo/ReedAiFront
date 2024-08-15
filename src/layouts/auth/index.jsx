// LAYOUTS: auth/index.js
import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { SidebarContext } from 'contexts/SidebarProvider';
import { useDisclosure } from 'hooks';
import LoadingIndicator from 'utils/app/LoadingIndicator';

// =========================================================
// [AuthLayout] | This code provides the auth layout for the app
// =========================================================
export const AuthLayout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const authBg = '#f5f5f5';
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <CssBaseline />
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
