export default {
  styleOverrides: {
    root: {
      position: 'absolute', // Position the scroll buttons absolutely
      top: '50%', // Vertically center the buttons
      zIndex: 2, // Ensure the scroll buttons are on top of surrounding elements
      backgroundColor: 'transparent', // Transparent background by default
      opacity: 0.7, // Make the buttons slightly visible
      transform: 'translateY(-50%)', // Vertically center the scroll buttons
      transition: 'opacity 0.3s',
      color: '#fff',

      '&:hover': {
        opacity: 1, // Fully visible on hover
        // color: '#fff',
      },

      '&.Mui-disabled': {
        opacity: 0,
      },

      '&:first-of-type': {
        left: 0, // Align to the left side
        // marginLeft: '-24px', // Move the button outside the container to float
      },

      '&:last-of-type': {
        right: 0, // Align to the right side
        // marginRight: '-24px', // Move the button outside the container to float
      },

      // increase icon size
      '& .MuiSvgIcon-root': {
        fontSize: '5rem',
      },
    },
  },
};
