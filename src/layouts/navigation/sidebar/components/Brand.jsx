import { Box, Typography } from '@mui/material';
import React, { Suspense } from 'react';
import { CustomLogoIcon } from 'assets/humanIcons/custom-logo';
import { RCFlex } from 'components';
import { useMode } from 'hooks';
import { LoadingIndicator } from 'utils';

export const NavbarLogo = () => (
  <Suspense fallback={<LoadingIndicator />}>
    <CustomLogoIcon />
  </Suspense>
);

export const HSeparator = props => {
  const { variant, children, ...rest } = props;
  return (
    <Box
      sx={{
        height: '1px',
        width: '100%',
        backgroundColor: 'rgba(135, 140, 189, 0.3)',
      }}
      {...rest}
    ></Box>
  );
};

export function SidebarBrand() {
  const { theme } = useMode();
  return (
    <RCFlex
      align="center"
      direction="row"
      sx={{ padding: '4px', bgcolor: theme.palette.background.paper }}
    >
      <NavbarLogo />
      <Box sx={{ ml: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
        >
          ReedAi
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Productivity and Creativity
        </Typography>
      </Box>
    </RCFlex>
  );
}

export const Brand = props => {
  return <SidebarBrand />;
};

export default Brand;
