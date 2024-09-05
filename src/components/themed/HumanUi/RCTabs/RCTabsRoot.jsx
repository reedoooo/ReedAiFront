import { Tabs, Tab, TabScrollButton } from '@mui/material';
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

  '& .MuiTabs-scroller': {
    overflowX: 'auto', // Enable horizontal scrolling
    scrollbarWidth: 'thin', // For Firefox: makes the scrollbar thinner
  },

  '& .MuiTabs-flexContainer': {
    flexWrap: 'nowrap', // Prevent wrapping, make it scroll horizontally
    // justifyContent: 'center',
  },

  '& .MuiTabs-indicator': {
    display: 'none', // Remove the indicator
  },

  '& .MuiTab-root': {
    color: '#fff',
    minWidth: 'auto',
    minHeight: '40px', // Updated to 40px
    padding: '6px 16px', // Adjust padding for even spacing
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
    '& .MuiTab-wrapper': {
      color: '#fff', // Change text color to white on hover
    },
    '& .MuiTouchRipple-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Show ripple effect on hover
    },
    '&.MuiTouchRipple-root:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Increase ripple effect on active
    },
    '&.MuiTouchRipple-root:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Increase ripple effect on focus
    },
  },

  '&.Mui-selected': {
    backgroundColor: '#000', // Ensure selected tab has black background
    color: '#fff',
  },

  [theme.breakpoints.down('sm')]: {
    borderRadius: '5px',
  },
}));

export const RCTabScrollButton = styled(TabScrollButton)(({ theme }) => ({
  backgroundColor: 'transparent', // Transparent background by default
  opacity: 0, // Hidden by default
  transition: 'opacity 0.3s',

  '&:hover': {
    backgroundColor: 'transparent', // Maintain transparent background on hover
    opacity: 1, // Show the button when hovered
  },

  '&.Mui-disabled': {
    opacity: 0, // Ensure the button stays hidden when disabled
  },
}));

export default RCTabsRoot;
