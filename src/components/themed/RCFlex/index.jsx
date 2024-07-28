'use client';

import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import RCFlexRoot from './RCFlexRoot';
/**
 * A customizable flex component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.direction='column'] - Options: column, row, row-reverse, column-reverse.
 * @param {string} [props.align='center'] - Options: flex-start, center, flex-end, stretch, baseline.
 * @param {string} [props.justify='flex-start'] - Options: flex-start, center, flex-end, space-between, space-around, space-evenly.
 * @param {string} [props.wrap='nowrap'] - Options: nowrap, wrap, wrap-reverse.
 * @param {string} [props.basis='auto'] - Options: auto, content, min-content, max-content, fit-content.
 * @param {number} [props.grow=0] - Options: 0 - 1.
 * @param {number} [props.shrink=0] - Options: 0 - 1.
 * @param {React.Ref} ref - The ref object for the component.
 * @returns {React.Element} The rendered RCBox component.
 */
const RCFlex = forwardRef(function Flex(props, ref) {
  const {
    direction = 'column',
    align = 'center',
    justify = 'flex-start',
    wrap = 'nowrap',
    basis = 'auto',
    grow = 0,
    shrink = 0,
    sx = {},
    ...rest
  } = props;

  const ownerState = {
    direction,
    align,
    justify,
    wrap,
    basis,
    grow,
    shrink,
  };

  return <RCFlexRoot ref={ref} ownerState={ownerState} sx={sx} {...rest} />;
});

RCFlex.propTypes = {
  direction: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  align: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  justify: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  wrap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  basis: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  grow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  shrink: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

RCFlex.displayName = 'RCFlex';

export default RCFlex;
