// AdminNavbar.js
import { Box, useMediaQuery } from '@mui/material';
import { useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import routes from '@/routes/index';
import { useMode } from 'hooks';
import { NavbarContainer } from './components/navbarcontainer'; // Import the new NavbarContainer
import AdminNavbarLinks from './NavbarLinksAdmin';

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useMode();
  const controls = useAnimation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const pathName = window.location.pathname;

  useEffect(() => {
    window.addEventListener('scroll', changeNavbar);

    return () => {
      window.removeEventListener('scroll', changeNavbar);
    };
  });

  useEffect(() => {
    if (isSmallScreen) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isSmallScreen, controls]);

  const { secondary, message, brandText, fixed } = props;

  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const navbarProps = {
    mainText: '#1B254B',
    secondaryText: '#364152',
    navbarPosition: 'fixed',
    navbarFilter: 'none',
    navbarBackdrop: 'blur(20px)',
    navbarShadow: 'none',
    navbarBg: 'rgba(244, 247, 254, 0.2)',
    navbarBorder: 'transparent',
    navbarMinHeight: '75px',
    gap: '0px',
    paddingStyles: {
      pb: '8px',
      // px: {
      //   xs: '15px',
      //   md: '10px',
      // },
      // pl: {
      //   xl: '12px',
      // },
      // pt: '8px',
    },
    marginStyles: {
      mx: 'auto',
      mt: '0px',
    },
    relativeLocationStyles: {
      right: { xs: '12px', md: '30px', lg: '30px', xl: '30px' },
      top: { xs: '12px', md: '16px', lg: '20px', xl: '20px' },
    },
  };

  return (
    <NavbarContainer
      secondary={secondary}
      message={message ? message : ''}
      brandText={brandText}
      pathName={pathName}
      routes={routes}
      navbarProps={navbarProps}
    >
      <Box sx={{ marginLeft: 'auto', width: { xs: '100%', md: 'unset' } }}>
        <AdminNavbarLinks
          onOpen={props.onOpen}
          logoText={props.logoText}
          secondary={props.secondary}
          fixed={props.fixed}
          scrolled={scrolled}
        />
      </Box>
    </NavbarContainer>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
