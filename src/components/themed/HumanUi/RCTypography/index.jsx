import PropTypes from 'prop-types';
import React from 'react';

import RCTypographyRoot from './RCTypographyRoot';

/**
 * A reusable typography component.
 *
 * @component
 * @param {string} color - Options: primary, secondary, tertiary, error, warning, info, success, light, dark, text, white, inherit.
 * @param {boolean} fontWeight - Options: false, regular, medium, bold.
 * @param {string} textTransform - Options: none, capitalize, uppercase, lowercase.
 * @param {string} verticalAlign - Options: unset, baseline, sub, super, text-top, text-bottom, middle, top, bottom.
 * @param {boolean} textGradient - Whether to apply a text gradient to the typography.
 * @param {number} opacity - Options: 0 - 1.
 * @param {ReactNode} children - The content of the typography.
 * @param {object} rest - Additional props to be spread on the root element.
 * @param {React.Ref} ref - The ref to be forwarded to the root element.
 * @returns {JSX.Element} The rendered typography component.
 */
export const RCTypography = React.forwardRef(
  (
    {
      variant = 'body1',
      color = 'primary',
      fontWeight = false,
      textTransform = 'none',
      verticalAlign = 'unset',
      textGradient = false,
      opacity = 1,
      children,
      ...rest
    },
    ref
  ) => {
    const MUI_VARIANT = variant === 'darkModeFormLabel' ? 'h6' : variant;

    return (
      <RCTypographyRoot
        {...rest}
        ref={ref}
        variant={MUI_VARIANT}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          variant,
        }}
      >
        {children}
      </RCTypographyRoot>
    );
  }
);

RCTypography.displayName = 'RCTypography';

// Typechecking props for the RCTypography
RCTypography.propTypes = {
  variant: PropTypes.oneOf([
    'body1',
    'body2',
    'button',
    'caption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'darkModeFormLabel',
    // 'subtitle2DarkMode',
  ]),
  color: PropTypes.oneOf([
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
    'textPrimary',
    'textSecondary',
    'textTertiary',
    'white',
  ]),
  fontWeight: PropTypes.oneOf([false, 'light', 'regular', 'medium', 'bold']),
  textTransform: PropTypes.oneOf([
    'none',
    'capitalize',
    'uppercase',
    'lowercase',
  ]),
  verticalAlign: PropTypes.oneOf([
    'unset',
    'baseline',
    'sub',
    'super',
    'text-top',
    'text-bottom',
    'middle',
    'top',
    'bottom',
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
};

export default RCTypography;
