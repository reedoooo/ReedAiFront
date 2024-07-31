// src/components/RCBox.js

import PropTypes from 'prop-types';
import React from 'react';
import RCInputRoot from './RCInputRoot';

/**
 * A customizable input component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.variant='base'] - Options: base, searchbar.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 * @param {Object} [props.InputProps] - Props to pass to the input component.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {React.Ref} ref - The ref object for the component.
 * @returns {React.Element} The rendered RCInput component.
 */
export const RCInput = React.forwardRef(
  (
    {
      variant = 'base',
      disabled = false,
      placeholder = '',
      InputProps = {},
      ...rest
    },
    ref
  ) => (
    <RCInputRoot
      {...rest}
      ref={ref}
      className="MuiRCInputBase"
      ownerState={{
        variant,
        disabled,
        placeholder,
      }}
      InputProps={InputProps}
    />
  )
);

RCInput.displayName = 'RCInput';

// Typechecking props for the RCInput
RCInput.propTypes = {
  variant: PropTypes.oneOf(['base', 'searchbar']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  InputProps: PropTypes.object,
};

export default RCInput;
