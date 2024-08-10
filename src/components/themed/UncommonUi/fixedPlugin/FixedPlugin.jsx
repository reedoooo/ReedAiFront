import { Button, CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import React from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { useMode } from 'hooks';
// FixedPlugin: This component is used to change the color mode of the application
export const FixedPlugin = props => {
  const { ...rest } = props;
  const { theme, toggleColorMode } = useMode();
  const colorMode = theme.palette.mode;
  const bgButton = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button
        {...rest}
        style={{
          height: '60px',
          width: '60px',
          zIndex: 99,
          background: bgButton,
          position: 'fixed',
          left: document.documentElement.dir === 'rtl' ? '35px' : '',
          right: document.documentElement.dir === 'rtl' ? '' : '35px',
          bottom: '30px',
          border: '1px solid',
          borderColor: '#6A53FF',
          borderRadius: '50px',
          display: 'flex',
          padding: '0px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={toggleColorMode}
      >
        <IconButton>
          <IoMdMoon
            style={{
              color: colorMode === 'light' ? 'white' : 'transparent',
              height: '24px',
              width: '24px',
            }}
          />
          <IoMdSunny
            style={{
              color: colorMode === 'dark' ? 'white' : 'transparent',
              height: '24px',
              width: '24px',
            }}
          />
        </IconButton>
      </Button>
    </ThemeProvider>
  );
};

export default FixedPlugin;
