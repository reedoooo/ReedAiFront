import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const RCTextFieldRoot = styled(TextField)(({ theme, ownerState }) => {
  const { variant } = ownerState;

  const baseStyles = {
    color: '#fff',
    '&::placeholder': {
      color: '#424242',
    },
  };

  const darkModeStyles = {
    margin: '10px 0',
    color: '#3d3d3d',
    border: '1px solid transparent', // Start with transparent border
    '& label': { display: 'none' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        color: '#fff',
        borderColor: 'grey',
        transition: 'border-color 0.2s',
      },
      '&:hover fieldset': { borderColor: '#fff' },
      '&.Mui-focused fieldset': { borderColor: '#18b984' },
      '&.Mui-focused': { color: '#fff' },
    },
    '& .MuiInputBase-input': {
      color: '#fff',
      background: '#000',
      '&.Mui-focused': { color: '#fff' },
    },
    '& .MuiInputBase-multiline': {
      padding: '1rem 1rem',
    },
    '& .MuiInputUnderline:after': { borderBottomColor: 'grey' },
  };

  return {
    ...baseStyles,
    ...(variant === 'darkMode' && darkModeStyles),
  };
});

export default RCTextFieldRoot;
