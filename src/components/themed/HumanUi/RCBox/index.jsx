import PropTypes from 'prop-types';
import React from 'react';
import RCBoxRoot from './RCBoxRoot';

/**
 * A customizable box component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.variant='contained'] - Options: none, contained, outlined, text, button.
 * @param {string} [props.bgColor='transparent'] - Options: transparent, primary, secondary
 * @param {string} [props.color='dark'] - Options: primary, secondary, dark
 * @param {number} [props.opacity=1] - Options: 0 - 1
 * @param {boolean} [props.hasBorderRadius=false] - Whether to apply a border radius to the box.
 * @param {string} [props.borderRadius='none'] - Options: none, sm, md, lg, xl, full.
 * @param {string} [props.shadow='none'] - Options: none, sm, md, lg, xl, full.
 * @param {string} [props.coloredShadow='none'] - Options: none, sm, md, lg, xl, full.
 * @param {React.Ref} ref - The ref object for the component.
 * @returns {React.Element} The rendered RCBox component.
 */
export const RCBox = React.forwardRef(
  (
    {
      variant = 'contained',
      bgColor = 'transparent',
      color = 'dark',
      opacity = 1,
      hasBorderRadius = false,
      borderRadius = 'none',
      shadow = 'none',
      coloredShadow = 'none',
      ...rest
    },
    ref
  ) => (
    <RCBoxRoot
      {...rest}
      ref={ref}
      ownerState={{
        variant,
        bgColor,
        color,
        opacity,
        borderRadius,
        shadow,
        coloredShadow,
      }}
    />
  )
);

RCBox.displayName = 'RCBox';

// Typechecking props for the RCBox
RCBox.propTypes = {
  variant: PropTypes.oneOf([
    'contained',
    'gradient',
    'dashboard',
    'none',
    'outlined',
    'text',
    'button',
    'paper',
    'card',
    'flexBetween',
  ]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  hasBorderRadius: PropTypes.bool,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
};

export default RCBox;
