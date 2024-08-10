import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useMode } from 'hooks';
import RCButtonRoot from './RCButtonRoot';

// Wrapper component for when you need a container around the button
const ButtonContainer = ({ children, withContainer }) => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      maxWidth: withContainer ? '50%' : '100%',
    }}
  >
    {children}
  </Box>
);

/**
 * Represents a themed button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.color='white'] - The color of the button.
 * @param {string} [props.variant='outlined'] - The variant of the button.
 * @param {string} [props.textSizeVariant='button'] - The text size variant of the button.
 * @param {string} [props.textWeightVariant='regular'] - The text weight variant of the button.
 * @param {string} [props.size='medium'] - The size of the button.
 * @param {boolean} [props.circular=false] - Whether the button should be circular.
 * @param {boolean} [props.iconOnly=false] - Whether the button should only display an icon.
 * @param {ReactNode} props.children - The content of the button.
 * @param {boolean} [props.withContainer=false] - Whether the button should be wrapped in a container.
 * @param {Ref} ref - The ref object for the button.
 * @returns {ReactNode} The rendered button component.
 */
export const RCButton = React.forwardRef(
  (
    {
      color = 'white',
      variant = 'outlined',
      textSizeVariant = 'button',
      textWeightVariant = 'regular',
      size = 'medium',
      circular = false,
      iconOnly = false,
      children,
      withContainer = false,
      ...rest
    },
    ref
  ) => {
    const darkMode = false; // TODO: Add darkMode support using the hook below.
    const { theme } = useMode();
    const ButtonContent = (
      <RCButtonRoot
        {...rest}
        ref={ref}
        color="primary.main"
        variant={variant === 'gradient' ? 'contained' : variant}
        size={size}
        theme={theme}
        ownerState={{
          color,
          variant,
          size,
          circular,
          iconOnly,
          darkMode,
          textSizeVariant,
          textWeightVariant,
        }}
      >
        {children}
      </RCButtonRoot>
    );
    if (withContainer) {
      return (
        <ButtonContainer withContainer={withContainer}>
          {ButtonContent}
        </ButtonContainer>
      );
    }
    return ButtonContent;
  }
);

RCButton.displayName = 'RCButton';

RCButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf([
    'text',
    'contained',
    'outlined',
    'gradient',
    'holo',
  ]),
  textSizeVariant: PropTypes.oneOf(['button', 'body', 'default', 'header']),
  textWeightVariant: PropTypes.oneOf(['regular', 'bold']),
  color: PropTypes.oneOf([
    'white',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  withContainer: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default RCButton;
