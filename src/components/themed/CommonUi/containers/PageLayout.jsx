import { Box, Grid } from '@mui/material';

export const PageLayout = ({ children }) => {
  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      maxWidth="100%"
      sx={{ overflowX: 'hidden', m: 0, p: 0 }} // Ensure no margins or paddings
    >
      <Grid container sx={{ minHeight: '100vh', m: 0, p: 0 }}>
        {children}
      </Grid>
    </Box>
  );
};
export default PageLayout;
