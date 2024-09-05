import { Option } from '@mui/base';
import { styled } from '@mui/system';

const RCOptionRoot = styled('li')(({ theme }) => {
  const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    900: '#003A75',
  };

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
    listStyle: 'none',
    padding: '8px',
    borderRadius: '8px',
    cursor: 'default',

    [`&.${optionClasses.selected}`]: {
      backgroundColor: theme.palette.mode === 'dark' ? blue[900] : blue[100],
      color: theme.palette.mode === 'dark' ? blue[100] : blue[900],
    },

    [`&.${optionClasses.highlighted}`]: {
      backgroundColor: theme.palette.mode === 'dark' ? grey[800] : grey[100],
      color: theme.palette.mode === 'dark' ? grey[300] : grey[900],
    },

    [`&.${optionClasses.disabled}`]: {
      color: theme.palette.mode === 'dark' ? grey[700] : grey[400],
    },

    '&:hover:not(.Mui-disabled)': {
      backgroundColor: theme.palette.mode === 'dark' ? grey[800] : grey[100],
      color: theme.palette.mode === 'dark' ? grey[300] : grey[900],
    },

    '&:focus-visible': {
      outline: `3px solid ${
        theme.palette.mode === 'dark' ? blue[600] : blue[200]
      }`,
    },
  };
});

export default RCOptionRoot;
