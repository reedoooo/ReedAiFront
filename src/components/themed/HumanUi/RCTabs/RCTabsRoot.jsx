import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * RCTabsRoot is a styled version of Material-UI Tabs and Tab components.
 */

export const RCTabsRoot = styled(Tabs)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px',
  background: '#333',
  borderRadius: '10px',
  color: 'white',

  '& .MuiTabs-flexContainer': {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  '& .MuiTabs-indicator': {
    display: 'none', // Remove the indicator
  },

  '& .MuiTab-root': {
    color: '#fff',
    minWidth: 'auto',
    padding: '6px 16px', // Adjust padding for even spacing
    // padding: '6px 12px',
    fontSize: '0.875rem',
    borderRadius: '10px',
    transition: 'background-color 0.3s',
    margin: '0 4px', // Ensure even spacing between tabs
    backgroundColor: '#333', // Set the background color for all tabs

    '&:hover': {
      backgroundColor: '#333',
    },

    '&.Mui-selected': {
      backgroundColor: '#000', // Ensure selected tab has black background
      color: '#fff',
      fontWeight: 'bold',
    },
  },
}));

export const RCTab = styled(Tab)(({ theme }) => ({
  background: '#444',
  borderRadius: '8px',
  transition: 'background-color 0.3s',

  '&:hover': {
    backgroundColor: '#555',
  },

  '&.Mui-selected': {
    backgroundColor: '#000', // Ensure selected tab has black background
    color: '#fff',
  },

  [theme.breakpoints.down('sm')]: {
    borderRadius: '5px',
  },
}));

export default RCTabsRoot;
