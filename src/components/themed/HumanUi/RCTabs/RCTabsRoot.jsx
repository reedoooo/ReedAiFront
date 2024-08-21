import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * RCTabsRoot is a styled version of Material-UI Tabs and Tab components.
 */

export const RCTabsRoot = styled(Tabs)(({ theme, ownerState }) => {
  const { variant } = ownerState;

  const baseStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.5rem',
    background: '#1c1c1c',
    borderRadius: '14px',
    color: 'white',
  };

  const darkModeStyles = {
    color: '#3d3d3d',
    '& .MuiTab-root': {
      color: '#fff',
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
      },
    },
  };

  return {
    ...baseStyles,
    ...(variant === 'darkMode' && darkModeStyles),
  };
});

export const RCTab = styled(Tab)(({ theme }) => ({
  background: '#808080',
  borderRadius: '5px',
  '& .Mui-selected': {
    backgroundColor: '#000',
    color: '#fff',
    margin: '5px',
  },
}));

export default RCTabsRoot;
