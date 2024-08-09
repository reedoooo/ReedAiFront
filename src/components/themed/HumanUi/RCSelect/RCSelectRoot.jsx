import { selectClasses } from '@mui/base/Select';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * SelectButtonComponent is a custom button component used in RCSelectRoot.
 * It forwards the ref and other props to the underlying button element.
 * It renders the children and an UnfoldMoreRoundedIcon.
 *
 * @param {Object} props - The component props.
 * @param {React.Ref} ref - The ref to be forwarded to the button element.
 * @returns {React.Element} The rendered button component.
 */
const SelectButtonComponent = React.forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});
SelectButtonComponent.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

/**
 * RCSelectRoot component styles.
 *
 * @typedef {Object} RCSelectRootStyles
 * @property {string} fontFamily - The font family for the component.
 * @property {string} fontSize - The font size for the component.
 * @property {string} boxSizing - The box sizing for the component.
 * @property {string} minWidth - The minimum width for the component.
 * @property {string} padding - The padding for the component.
 * @property {string} borderRadius - The border radius for the component.
 * @property {string} textAlign - The text alignment for the component.
 * @property {string} lineHeight - The line height for the component.
 * @property {string} background - The background color for the component.
 * @property {string} border - The border for the component.
 * @property {string} color - The text color for the component.
 * @property {string} position - The position for the component.
 * @property {string} boxShadow - The box shadow for the component.
 * @property {string} transitionProperty - The transition property for the component.
 * @property {string} transitionTimingFunction - The transition timing function for the component.
 * @property {string} transitionDuration - The transition duration for the component.
 * @property {string} '&:hover' - The hover state styles for the component.
 * @property {string} '&.${selectClasses.focusVisible}' - The focus visible state styles for the component.
 * @property {string} '& > svg' - The styles for the child svg element.
 */
export const RCSelectRoot = styled(SelectButtonComponent, {
  shouldForwardProp: () => true,
})(({ theme }) => {
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
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    minWidth: '320px',
    padding: '8px 12px',
    borderRadius: '8px',
    textAlign: 'left',
    lineHeight: '1.5',
    background: theme.palette.mode === 'dark' ? grey[900] : '#fff',
    border: `1px solid ${
      theme.palette.mode === 'dark' ? grey[700] : grey[200]
    }`,
    color: theme.palette.mode === 'dark' ? grey[300] : grey[900],
    position: 'relative',
    boxShadow: `0px 2px 4px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    }`,
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '120ms',

    '&:hover': {
      background: theme.palette.mode === 'dark' ? grey[800] : grey[50],
      borderColor: theme.palette.mode === 'dark' ? grey[600] : grey[300],
    },

    [`&.${selectClasses.focusVisible}`]: {
      outline: 0,
      borderColor: blue[400],
      boxShadow: `0 0 0 3px ${
        theme.palette.mode === 'dark' ? blue[700] : blue[200]
      }`,
    },

    '& > svg': {
      fontSize: '1rem',
      position: 'absolute',
      height: '100%',
      top: 0,
      right: '10px',
    },
  };
});

export default RCSelectRoot;
