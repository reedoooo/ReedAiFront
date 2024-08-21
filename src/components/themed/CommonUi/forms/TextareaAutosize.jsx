import { StyledTextareaAutosize } from 'components/chat/styled';
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

/**
 * @param {TextareaAutosizeProps} props
 */
const CustomTextareaAutosize = ({
  value,
  onValueChange,
  textareaRef,
  className,
  placeholder = '',
  minRows = 3,
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
