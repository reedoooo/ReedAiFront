import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { MainWrapper, PageWrapper } from 'components/themed';

// =========================================================
// [LandLayout] | This code provides the land layout for the app
// =========================================================
export default function Land() {
  return (
    <MainWrapper className="mainwrapper">
      <PageWrapper className="page-wrapper">
        <Container
          sx={{
            paddingTop: '20px',
            maxWidth: '1200px',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
