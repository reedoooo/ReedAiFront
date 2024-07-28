import { Box, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { LogoIcon } from 'assets/humanIcons/custom/logo';
import { RCFlex } from 'components/index';
import useMode from 'hooks/useMode';
import React, { Suspense } from 'react';
import { LoadingIndicator } from 'utils/app/LoadingIndicator';

const StyledLogoIcon = styled(SvgIcon)(({ theme }) => ({
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
}));

const NavbarLogo = () => (
  <Suspense fallback={<LoadingIndicator />}>
    <StyledLogoIcon>
      <LogoIcon />
    </StyledLogoIcon>
  </Suspense>
);

const HSeparator = props => {
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

const Brand = props => {
  return <SidebarBrand />;
};

export default Brand;
