// src/components/NavbarLogo.jsx
import { SvgIcon, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { LogoIcon } from 'components/index';
// import { ReactComponent as LogoSvg } from 'assets/logo.svg';

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  background: '#007bff',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  width: '128px',
  height: '128px',
}));

const StyledLogoIcon = styled(SvgIcon)(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
}));

const NavbarLogo = () => {
  return (
    <Wrapper>
      <StyledLogoIcon component={LogoIcon} />
    </Wrapper>
  );
};

export default NavbarLogo;
