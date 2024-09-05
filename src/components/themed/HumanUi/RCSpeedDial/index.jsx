// RCSpeedDial.js
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { EditIcon } from 'assets/humanIcons';
import RCSpeedDialRoot from './RCSpeedDialRoot';

/**
 * The RCSpeedDial component is a styled wrapper around the Material-UI SpeedDial
 *
 * @component RCSpeedDial
 * @param {Object} props - The component props.
 * @param {boolean} [props.open=false] - Whether the SpeedDial is open.
 * @param {function} [props.onOpen] - Callback fired when the SpeedDial opens.
 * @param {function} [props.onClose] - Callback fired when the SpeedDial closes.
 * @param {Array} [props.actions=[]] - The actions to display when the SpeedDial is open.
 * @param {string} [props.ariaLabel='SpeedDial'] - The aria-label for the SpeedDial.
 * @param {boolean} [props.hidden=false] - If true, the SpeedDial will be hidden.
 * @param {string} [props.variant='default'] - The style variant of the SpeedDial.
 * @param {boolean} [props.disabled=false] - If true, the SpeedDial will be disabled.
 * @returns {React.Element} The rendered RCSpeedDial component.
 */

export const RCSpeedDial = React.forwardRef(
  (
    {
      open = false,
      onOpen,
      onClose,
      actions = [],
      ariaLabel = 'SpeedDial',
      hidden = false,
      variant = 'default',
      disabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <RCSpeedDialRoot
        ref={ref}
        ariaLabel={ariaLabel}
        hidden={hidden}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={onClose}
        onOpen={onOpen}
        open={open}
        disabled={disabled}
        ownerState={{
          disabled,
          variant,
        }}
        {...rest}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </RCSpeedDialRoot>
    );
  }
);

RCSpeedDial.displayName = 'RCSpeedDial';

RCSpeedDial.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  ariaLabel: PropTypes.string,
  hidden: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'darkMode']),
  disabled: PropTypes.bool,
};

export default RCSpeedDial;
