// src/components/CustomInput.js
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

/**
 * Custom styled input component
 *
 * @component
 * @param {Object} props - The component props.
 * @returns {React.Element} The rendered custom Input component.
 */
const RCInputRoot = styled(InputBase)(({ theme, ownerState }) => {
  const { palette } = theme;
  const { disabled, variant, placeholder } = ownerState;

  const baseStyles = {
    margin: '10px 0',
    border: `1px solid ${palette.grey[300]}`,
    backgroundColor: 'transparent',
    // backgroundColor: palette.background.paper,
    padding: '10px 14px',
    fontSize: '14px',
    borderRadius: '4px',
    '&::placeholder': {
      color: palette.text.disabled,
    },
    '&.Mui-disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    ...(disabled && {
      cursor: 'not-allowed',
      opacity: 0.5,
    }),
  };

  const searchbarStyles = {
    width: '100%',
    minWidth: 0,
    outline: 'transparent solid 2px',
    outlineOffset: '2px',
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'all',
    transitionDuration: '0.2s',
    fontWeight: 500,
    borderRadius: '30px',
    borderColor: 'black',
    borderWidth: '2px',
    fontSize: '0.875rem',
    paddingLeft: '2.5rem', // padding-inline-start
    paddingRight: '1rem', // padding-inline-end
    height: '2.5rem',
    // border: 'none',
    paddingTop: '11px',
    paddingBottom: '11px',
    backgroundColor: 'transparent',
    color: palette.text.primary,
    '&::placeholder': {
      color: palette.text.disabled,
      content: placeholder,
    },
    '&:hover': {
      borderColor: 'transparent',
    },
    '&:focus': {
      borderColor: 'transparent',
      boxShadow: 'none',
    },
  };

  return {
    ...(variant === 'base' && baseStyles),
    ...(variant === 'searchbar' && searchbarStyles),
  };
});

export default RCInputRoot;
