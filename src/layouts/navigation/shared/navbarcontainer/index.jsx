// NavbarContainer.js
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { CustomLogoIcon } from 'assets/humanIcons/custom-logo';
import { StyledLogoIcon } from 'components/styled';
import { BreadcrumbsComponent } from '../breadcrumbs'; // Adjust the path as needed

export const NavbarContainer = ({
  children,
  secondary,
  message,
  brandText,
  pathName,
  routes,
  navbarProps,
}) => {
  const {
    navbarPosition,
    navbarFilter,
    navbarBackdrop,
    navbarShadow,
    navbarBg,
    navbarBorder,
    navbarMinHeight,
    gap,
    paddingStyles,
    marginStyles,
    relativeLocationStyles,
  } = navbarProps;

  return (
    <Box
      sx={{
        ...paddingStyles,
        ...marginStyles,
        ...relativeLocationStyles,
        position: navbarPosition,
        boxShadow: navbarShadow,
        bgcolor: navbarBg,
        borderColor: navbarBorder,
        filter: navbarFilter,
        backdropFilter: navbarBackdrop,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '16px',
        borderWidth: '1.5px',
        borderStyle: 'solid',
        transitionDelay: '0s, 0s, 0s, 0s',
        transitionDuration: '0.25s, 0.25s, 0.25s, 0s',
        transitionProperty: 'box-shadow, background-color, filter, border',
        transitionTimingFunction: 'linear, linear, linear, linear',
        alignItems: { xl: 'center' },
        justifyContent: { xl: 'center' },
        display: secondary ? 'block' : 'flex',
        minHeight: navbarMinHeight,
        lineHeight: '25.6px',
        width: {
          xs: 'calc(100vw - 6%)',
          md: 'calc(100vw - 8%)',
          lg: 'calc(100vw - 6%)',
          xl: 'calc(100vw - 350px)',
          '2xl': 'calc(100vw - 365px)',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          // maxWidth: '350px',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
            md: 'row',
            lg: 'row',
            xl: 'row',
          },
          alignItems: { xl: 'center' },
          mb: gap,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            maxWidth: '350px',
            mb: { xs: '8px', md: '0px' },
          }}
        >
          <Box
            sx={{
              mr: '8px',
            }}
          >
            <StyledLogoIcon hval="120px">
              <CustomLogoIcon />
            </StyledLogoIcon>
          </Box>
          <BreadcrumbsComponent
            pathName={pathName}
            brandText={brandText}
            routes={routes}
          />
        </Box>
        {children}
      </Box>
      {secondary ? <Typography color="white">{message}</Typography> : null}
    </Box>
  );
};

NavbarContainer.propTypes = {
  children: PropTypes.node,
  secondary: PropTypes.bool,
  message: PropTypes.string,
  brandText: PropTypes.string,
  pathName: PropTypes.string,
  routes: PropTypes.array,
  navbarProps: PropTypes.object,
};

export default NavbarContainer;
