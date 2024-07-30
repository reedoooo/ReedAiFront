// src/components/CustomInput.js
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import React from 'react';

/**
 * Custom styled input component
 *
 * @component
 * @param {Object} props - The component props.
 * @returns {React.Element} The rendered custom Input component.
 */
const RCInputRoot = styled(InputBase)(({ theme, ownerState }) => {
  const { palette, functions, borders, boxShadows } = theme;
  const { disabled, variant } = ownerState;
  const baseStyles = () => {
    return {
      margin: '10px 0',
      '& label': {
        color: '#fff',
        '&.Mui-focused': { color: 'grey' },
      },
      // '& fieldset': { borderColor: 'grey' },
      // '&.input': { color: '#fff', background: '#000' },
      // '&:hover fieldset': { borderColor: 'grey' },
      // '&.Mui-focused fieldset': { borderColor: 'grey' },
      // '&.MuiInput-underline:after': { borderBottomColor: 'grey' },
      // '&.MuiOutlinedInput-root': {
      //   '& fieldset': { borderColor: 'grey' },
      //   '&:hover fieldset': { borderColor: 'grey' },
      //   '&.Mui-focused fieldset': { borderColor: 'grey' },
      //   color: '#fff',
      // },
      // '& .MuiInputBase-input': { color: '#fff', background: '#000' },

      // '&.Mui-focused fieldset': { borderColor: 'grey' },
      // '& .MuiInput-underline:after': { borderBottomColor: 'grey' },
      // '& .MuiOutlinedInput-root': {
      //   '& fieldset': { borderColor: 'grey' },
      //   '&:hover fieldset': { borderColor: 'grey' },
      //   '&.Mui-focused fieldset': { borderColor: 'grey' },
      // },
      // '& .MuiInputBase-input': { color: '#fff', background: '#000' },
      border: `1px solid ${palette.grey[300]}`,
      backgroundColor: palette.background.paper,
      padding: '10px 14px',
      fontSize: '14px',
      borderRadius: '4px',
      '&:focus-visible': {
        outline: 'none',
        ringOffset: '2px',
      },
      '&::placeholder': {
        color: palette.text.disabled,
      },
      '&.Mui-disabled': {
        cursor: 'not-allowed',
        opacity: '0.5',
      },
      '& .MuiFileInput': {
        border: 0,
        backgroundColor: 'transparent',
        fontSize: '14px',
        fontWeight: '500',
      },
      ...(disabled && {
        cursor: 'not-allowed',
        opacity: 0.5,
      }),
    };
  };
  return {
    ...(variant === 'base' && baseStyles()),
  };
});

export default RCInputRoot;
