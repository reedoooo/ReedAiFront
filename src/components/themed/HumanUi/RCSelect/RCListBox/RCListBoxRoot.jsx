import { styled } from '@mui/system';

const RCListBoxRoot = styled('ul')(({ theme }) => {
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  return {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    padding: '6px',
    margin: '12px 0',
    minWidth: '320px',
    borderRadius: '12px',
    overflow: 'auto',
    outline: '0px',
    background: theme.palette.mode === 'dark' ? grey[900] : '#fff',
    border: `1px solid ${
      theme.palette.mode === 'dark' ? grey[700] : grey[200]
    }`,
    color: theme.palette.mode === 'dark' ? grey[300] : grey[900],
    boxShadow: `0px 2px 4px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    }`,

    '&.closed': {
      opacity: 0,
      transform: 'scale(0.95, 0.8)',
      transition: 'opacity 200ms ease-in, transform 200ms ease-in',
    },

    '&.open': {
      opacity: 1,
      transform: 'scale(1, 1)',
      transition:
        'opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48)',
    },

    '&.placement-top': {
      transformOrigin: 'bottom',
    },

    '&.placement-bottom': {
      transformOrigin: 'top',
    },
  };
});

export default RCListBoxRoot;
