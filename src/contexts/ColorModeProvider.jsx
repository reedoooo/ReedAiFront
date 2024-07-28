import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme } from 'assets/theme';
import useManageCookies from 'hooks/useManageCookies';

export const ColorModeContext = createContext({
  mode: 'dark',
  toggleColorMode: () => {},
  theme: getTheme('dark'),
});

export const ColorModeProvider = ({ children }) => {
  const { addCookies, getCookie } = useManageCookies();
  const initialMode = getCookie('colorMode') || 'dark';
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    addCookies('colorMode', mode, { path: '/' });
  }, [mode]);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    addCookies('colorMode', newMode, { path: '/' });
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
