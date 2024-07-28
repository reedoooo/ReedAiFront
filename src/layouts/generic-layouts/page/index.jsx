import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

const PageLayout = props => {
  const { ...rest } = props;

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
        <Outlet />
        {/* {children} */}
      </Grid>
    </Box>
  );
};
export default PageLayout;
