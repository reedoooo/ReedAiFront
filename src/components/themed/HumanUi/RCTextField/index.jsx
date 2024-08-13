import PropTypes from 'prop-types';
import React from 'react';
import RCTextFieldRoot from './RCTextFieldRoot';

/**
 * The RCTextField component is a styled wrapper around the Material-UI TextField.
 *
 * @component RCTextField
 * @param {Object} props - The component props.
 * @param {string} [props.variant] - The variant for the input.
 * @param {boolean} [props.error] - Whether the input is in error state.
 * @param {string} [props.label] - The label for the input.
 * @param {string} [props.placeholder] - The placeholder for the input.
 * @param {string} [props.value] - The value for the input.
 * @returns {React.Element} The rendered RCTextField component.
 */

export const RCTextField = React.forwardRef(
  (
    {
      variant = 'standard',
      error = false,
      label = '',
      placeholder = '',
      value = '',
      ...rest
    },
    ref
  ) => {
    const MUI_VARIANT = variant === 'darkMode' ? 'outlined' : variant;

    return (
      <RCTextFieldRoot
        ref={ref}
        variant={MUI_VARIANT}
        error={error}
        label={label}
        placeholder={placeholder}
        value={value}
        ownerState={{
          error,
          variant,
        }}
        {...rest}
      />
    );
  }
);

RCTextField.displayName = 'RCTextField';

RCTextField.propTypes = {
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard', 'darkMode']),
  error: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default RCTextField;
