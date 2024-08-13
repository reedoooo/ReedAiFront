import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';
// import TextareaAutosize from '@mui/material/TextareaAutosize';

export const RCTextareaAutosizeRoot = styled(TextareaAutosize)(({
  theme,
  ownerState,
}) => {
  const { variant } = ownerState;

  const baseStyles = {
    color: '#fff',
  };

  const darkModeStyles = {
    width: '100%',
    margin: '10px 0',
    resize: 'none',
    background: '#000',
    color: '#fff',
    // border: '1px solid #dcdcdc',
    // padding: '10px',
    flex: '1 1 auto',
    padding: '16.5px 14px', // Matches TextField padding
    borderRadius: '4px',
    borderColor: 'grey',
    border: '1px solid transparent', // Start with transparent border
    outline: '1px solid grey', // Add outline to mimic TextField
    fontSize: theme.typography.pxToRem(14),
    '& .MuiInputUnderline:after': {
      borderBottomColor: 'grey',
    },
    '& .MuiInputBaseInput': {
      color: '#fff',
      background: '#000',
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
    },
    '&::placeholder': {
      color: theme.palette.text.disabled,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  };

  return {
    ...baseStyles,
    ...(variant === 'darkMode' && darkModeStyles),
  };
});

export default RCTextareaAutosizeRoot;
