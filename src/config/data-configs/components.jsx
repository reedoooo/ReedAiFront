import { FileCopyIcon, HomeIcon, RefreshIcon } from 'assets/humanIcons';

export const buttonsData = [
  {
    startIcon: <RefreshIcon />,
    variant: 'outlined',
    color: 'primary',
    onClick: () => {},
    sx: { mt: 2 },
    handler: 'refresh',
    children: 'Refresh',
  },
  {
    startIcon: <FileCopyIcon />,
    variant: 'contained',
    color: 'primary',
    onClick: () => {},
    sx: { mt: 2 },
    handler: 'copy',
    children: 'Copy Route',
  },
  {
    startIcon: <HomeIcon />,
    variant: 'contained',
    color: 'primary',
    onClick: () => {},
    sx: { mt: 2 },
    handler: 'back',
    children: 'Go Back',
  },
  {
    startIcon: <HomeIcon />,
    variant: 'contained',
    color: 'primary',
    onClick: () => {},
    sx: { mt: 2 },
    handler: 'retry',
    children: 'Go to Route',
  },
  {
    startIcon: <HomeIcon />,
    variant: 'contained',
    color: 'primary',
    onClick: () => {},
    sx: { mt: 2 },
    handler: 'home',
    children: 'Go Back to Home',
  },
];

export const componentConfig = {
  buttonsData,
};

export default componentConfig;
