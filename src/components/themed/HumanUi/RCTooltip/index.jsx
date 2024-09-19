// RCTooltip.js
import PropTypes from 'prop-types';
import React from 'react';
import RCTooltipRoot from './RCTooltipRoot';

/**
 * Reusable tooltip component
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.display - The text or content to display inside the tooltip.
 * @param {ReactNode} props.trigger - The element that triggers the tooltip.
 * @param {number} [props.delayDuration=500] - The delay duration before showing the tooltip (in milliseconds).
 * @param {string} [props.side='right'] - The placement of the tooltip (top, bottom, left, right).
 * @returns {ReactNode} The rendered tooltip component.
 */
export const RCTooltip = ({
  display,
  trigger,
  delayDuration = 500,
  side = 'right',
}) => {
  return (
    <RCTooltipRoot
      title={display}
      placement={side}
      enterDelay={delayDuration}
      leaveDelay={200}
    >
      {trigger}
    </RCTooltipRoot>
  );
};

RCTooltip.propTypes = {
  display: PropTypes.string.isRequired,
  trigger: PropTypes.node.isRequired,
  delayDuration: PropTypes.number,
  side: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

export default RCTooltip;
