import { Tooltip, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * IconButtonWithTooltip is a customizable component that displays an icon button with a tooltip.
 *
 * @param {string} tooltipTitle - The text to display inside the tooltip.
 * @param {string} placement - The position of the tooltip relative to the button. (e.g., "right", "left", "top", "bottom")
 * @param {React.ElementType} icon - The icon component to display inside the button.
 * @param {string} iconColor - The color of the icon. Accepts any valid CSS color value.
 * @param {string} iconSize - The size of the icon. Accepts "small", "medium", "large", or any custom size like "24px".
 * @param {string} variant - The shape of the button. Accepts "circle", "square", or "default".
 * @param {string} colorVariant - The color variant of the button. Accepts "primary", "secondary", or "default".
 * @param {string} sizeVariant - The size variant of the button. Accepts "small", "medium", or "large".
 * @param {function} onClick - The function to execute when the icon button is clicked.
 * @param {object} ownerState - Additional state to pass to the component, often used in custom styles.
 * @returns {JSX.Element} - The rendered IconButtonWithTooltip component.
 */
export const IconButtonWithTooltip = ({
  tooltipTitle = 'Tooltip',
  placement = 'right',
  icon: IconComponent,
  iconColor = 'inherit',
  iconSize = 'medium',
  variant = 'default',
  colorVariant = 'default',
  sizeVariant = 'medium',
  onClick,
  ownerState = {},
}) => {
  // Determine button shape styles based on variant
  const shapeStyles =
    variant === 'circle'
      ? { borderRadius: '50%' }
      : variant === 'square'
        ? { borderRadius: '0%' }
        : {};

  // Define color styles based on colorVariant
  const colorStyles =
    colorVariant === 'primary'
      ? { color: 'primary.main' }
      : colorVariant === 'secondary'
        ? { color: 'secondary.main' }
        : colorVariant === 'white'
          ? { color: '#ffffff' }
          : { color: iconColor };

  // Define size styles based on sizeVariant
  const sizeStyles =
    sizeVariant === 'small'
      ? { fontSize: '20px', padding: '8px' }
      : sizeVariant === 'large'
        ? { fontSize: '32px', padding: '12px' }
        : { fontSize: iconSize };

  return (
    <Tooltip title={tooltipTitle} placement={placement}>
      <IconButton
        onClick={onClick}
        sx={{ ...shapeStyles, ...sizeStyles, ...ownerState }}
      >
        <IconComponent sx={{ ...colorStyles, fontSize: sizeStyles.fontSize }} />
      </IconButton>
    </Tooltip>
  );
};

// Define PropTypes for the component
IconButtonWithTooltip.propTypes = {
  tooltipTitle: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
  icon: PropTypes.elementType.isRequired,
  iconColor: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['circle', 'square', 'default']),
  colorVariant: PropTypes.oneOf(['primary', 'secondary', 'default', 'white']),
  sizeVariant: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func.isRequired,
  ownerState: PropTypes.object,
};

// Default props
// IconButtonWithTooltip.defaultProps = {
//   tooltipTitle: 'Tooltip',
//   placement: 'right',
//   iconColor: 'inherit',
//   iconSize: 'medium',
//   variant: 'default',
//   colorVariant: 'default',
//   sizeVariant: 'medium',
//   ownerState: {},
// };

export default IconButtonWithTooltip;
