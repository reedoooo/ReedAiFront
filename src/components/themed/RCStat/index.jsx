import PropTypes from 'prop-types';
import React from 'react';
import RCStatRoot, { StatUnit, StatValue } from './RCStatRoot';

/**
 * ----------------------------------------
 * [RCStat] A stat component with a value and a unit.
 * ----------------------------------------
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.value - The stat value.
 * @param {string} props.unit - The stat unit.
 * @param {string} props.fontSize - The stat font size.
 * @param {string} props.color - The stat color.
 * @returns {React.Element} The rendered RCStat component.
 */
const Stat = React.forwardRef(function Stat(
  { value, unit, fontSize, color, ...rest },
  ref
) {
  return (
    <RCStatRoot ref={ref} ownerState={{ fontSize, color }} {...rest}>
      <StatValue>{value}</StatValue>
      <StatUnit>{unit}</StatUnit>
    </RCStatRoot>
  );
});

Stat.displayName = 'RCStat';

// Typechecking props for the RCStat
Stat.propTypes = {
  value: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info']),
};
