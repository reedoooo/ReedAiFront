// NavbarContainer.js
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
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
    mainText,
    secondaryText,
    navbarPosition,
    navbarFilter,
    navbarBackdrop,
    navbarShadow,
    navbarBg,
    navbarBorder,
    secondaryMargin,
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
        // pb: '8px',
        // px: {
        //   xs: paddingX,
        //   md: '10px',
        // },
        // pl: {
        //   xl: '12px',
        // },
        // pt: '8px',
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
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          alignItems: { xl: 'center' },
          mb: gap,
        }}
      >
        <Box mb={{ xs: '8px', md: '0px' }}>
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
