import { Box, CssBaseline, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import LoadingIndicator from 'utils/app/LoadingIndicator';

const RootLayout = props => {
  const { ...rest } = props;
  const [fixed] = useState(false);
  const navigation = useNavigation();
  if (navigation.state === 'loading') {
    return <LoadingIndicator />;
  }
  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      maxWidth="100%"
      sx={{ overflowX: 'hidden', m: 0, p: 0 }} // Ensure no margins or paddings
    >
      <Grid
        container
        sx={{ minHeight: '100vh', minWidth: '100vw', m: 0, p: 0 }}
      >
        {/* ------------------------------------------- */}
        {/* Navbar */}
        {/* ------------------------------------------- */}
        <CssBaseline />
        {/* <Portal>
          <Box>
            <Navbar
              onOpen={onOpen}
              logoText={'Horizon UI Dashboard PRO'}
              brandText={getActiveRoute(routes)}
              secondary={getActiveNavbar(routes)}
              message={getActiveNavbarText(routes)}
              fixed={fixed}
            />
          </Box>
        </Portal> */}
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        {/* <Sidebar
          isOpen={isSidebarOpen}
          onOpen={toggleSidebarOpen}
          onClose={onClose}
          routes={routes}
          {...rest}
        /> */}
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <div>
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Outlet />
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </div>
      </Grid>
    </Box>
  );
};

export default RootLayout;
