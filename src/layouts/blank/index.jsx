import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

// =========================================================
// [BlankLayout] | This code provides the blank layout for the app
// =========================================================
const BlankLayout = () => (
  <Box>
    <Outlet />
  </Box>
);
export default BlankLayout;
