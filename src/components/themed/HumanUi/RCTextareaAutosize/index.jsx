import PropTypes from 'prop-types';
import React from 'react';
import RCTextareaAutosizeRoot from './RCTextareaAutosizeRoot';

/**
 * The RCTextareaAutosize component is a styled wrapper around the Material-UI TextareaAutosize
 *
 * @component RCTextareaAutosize
 * @param {Object} props - The component props.
 * @param {number} [props.minRows=3] - The minimum number of rows.
 * @param {number} [props.maxRows=5] - The maximum number of rows.
 * @param {string} [props.variant='default'] - The style variant of the textarea.
 * @param {string} [props.placeholder=''] - The placeholder text for the textarea.
 * @param {boolean} [props.disabled=false] - Whether the textarea is disabled.
 * @param {string} [props.value=''] - The value of the textarea.
 * @returns {React.Element} The rendered RCTextareaAutosize component.
 */

export const RCTextareaAutosize = React.forwardRef(
  (
    {
      minRows = 3,
      maxRows = 6,
      variant = 'default',
      placeholder = '',
      disabled = false,
      value = '',
      ...rest
    },
    ref
  ) => {
    const MUI_VARIANT = variant === 'darkMode' ? 'outlined' : variant;

    return (
      <RCTextareaAutosizeRoot
        ref={ref}
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        variant={MUI_VARIANT}
        ownerState={{
          variant,
          disabled,
        }}
        {...rest}
      />
    );
  }
);

RCTextareaAutosize.displayName = 'RCTextareaAutosize';

RCTextareaAutosize.propTypes = {
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'darkMode']),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};

export default RCTextareaAutosize;
