import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

/**
 * @typedef {Object} TextareaAutosizeProps
 * @property {string} value
 * @property {function(string): void} onValueChange
 * @property {React.RefObject<HTMLTextAreaElement>} [textareaRef]
 * @property {string} [className]
 * @property {string} [placeholder]
 * @property {number} [minRows]
 * @property {number} [maxRows]
 * @property {number} [maxLength]
 * @property {function(React.KeyboardEvent): void} [onKeyDown]
 * @property {function(React.ClipboardEvent): void} [onPaste]
 * @property {function(React.CompositionEvent): void} [onCompositionStart]
 * @property {function(React.CompositionEvent): void} [onCompositionEnd]
 */

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
  flex: '1 1 auto',
  width: '100%',
  resize: 'none',
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  fontSize: theme.typography.pxToRem(14),
  '&::placeholder': {
    color: theme.palette.text.disabled,
  },
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}));

/**
 * @param {TextareaAutosizeProps} props
 */
const CustomTextareaAutosize = ({
  value,
  onValueChange,
  textareaRef,
  className,
  placeholder = '',
  minRows = 1,
  maxRows = 6,
  maxLength,
  onKeyDown = () => {},
  onPaste = () => {},
  onCompositionStart = () => {},
  onCompositionEnd = () => {},
}) => {
  return (
    <StyledTextareaAutosize
      ref={textareaRef}
      className={className}
      minRows={minRows}
      maxRows={minRows > maxRows ? minRows : maxRows}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      onChange={event => onValueChange(event.target.value)}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
    />
  );
};

export default CustomTextareaAutosize;

CustomTextareaAutosize.displayName = 'CustomTextareaAutosize';
