import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { Outlet, Route } from 'react-router-dom';
import { MainWrapper, PageWrapper } from 'components/themed';
import useMode from 'hooks/useMode';

// Custom Material UI theme
export default function Land() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/full-screen-maps';
  };

  const getRoutes = routes => {
    return routes?.map((prop, key) => {
      if (prop.layout === '/') {
        console.log(
          `LANDING PROPS: ${prop.layout} ${prop.path} ${prop.name} ${prop.component} ${prop}`
        );
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return null;
      }
      return null;
    });
  };

  const { theme } = useMode();
  const authBg = theme.palette.mode === 'light' ? 'white' : 'navy.900';
  document.documentElement.dir = 'ltr';

  return (
    <MainWrapper className="mainwrapper">
      {/* Sidebar */}
      {/* <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      /> */}

      {/* Main Wrapper */}
      <PageWrapper className="page-wrapper">
        {/* Header */}
        {/* <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        /> */}

        {/* PageContent */}
        <Container
          sx={{
            paddingTop: '20px',
            maxWidth: '1200px',
          }}
        >
          {/* Page Route */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* End Page */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
