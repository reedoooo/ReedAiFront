// src/components/RCBox.js

import PropTypes from 'prop-types';
import React from 'react';
import RCInputRoot from './RCInputRoot';

/**
 * A customizable box component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.variant='base'] - Options: none, base.
 * @param {React.Ref} ref - The ref object for the component.
 * @returns {React.Element} The rendered RCBox component.
 */
const RCInput = React.forwardRef(
  ({ variant = 'base', disabled = false, ...rest }, ref) => (
    <RCInputRoot
      {...rest}
      ref={ref}
      className="MuiRCInputBase"
      ownerState={{
        variant,
        disabled,
      }}
    />
  )
);

RCInput.displayName = 'RCInput';

// Typechecking props for the RCInput
RCInput.propTypes = {
  variant: PropTypes.oneOf(['base']),
  disabled: PropTypes.bool,
};

export default RCInput;
