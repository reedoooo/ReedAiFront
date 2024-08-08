import PropTypes from 'prop-types';
import React from 'react';
import RCBox from '../RCBox';
import RCWrappedIconRoot from './RCIconWrapperRoot';
// ==============================|| ICON WRAPPER ||============================== //
/**
 * A reusable component that wraps an icon.
 *
 * @component
 * @param {string} size - Options:
 * @param {string} bgColor - Options:
 * @param {React.Ref} ref - The ref object for the component.
 * @returns {React.Element} The rendered RCWrappedIcon component.
 */
export const RCIconWrapper = React.forwardRef(
  ({ size = 'medium', bgColor = 'success', children, ...rest }, ref) => {
    return (
      <RCBox
        sx={{
          border: 'none',
        }}
      >
        <RCWrappedIconRoot
          ref={ref}
          ownerState={{
            size,
            bgColor,
          }}
          {...rest}
        >
          {children}
        </RCWrappedIconRoot>
      </RCBox>
    );
  }
);
RCIconWrapper.displayName = 'RCIconWrapper';
RCIconWrapper.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
    'text',
    'white',
  ]),
};
export default RCIconWrapper;
