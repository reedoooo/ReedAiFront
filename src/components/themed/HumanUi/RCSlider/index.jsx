import PropTypes from 'prop-types';
import React from 'react';
import RCSliderRoot from './RCSliderRoot';

/**
 * The RCSlider component is a styled wrapper around the Material-UI Slider
 *
 * @component RCSlider
 * @param {Object} props - The component props.
 * @param {number} [props.value=0] - The current value of the slider.
 * @param {number} [props.min=0] - The minimum value of the slider.
 * @param {number} [props.max=100] - The maximum value of the slider.
 * @param {number} [props.step=1] - The step value for the slider.
 * @param {array} [props.marks] - The marks for the slider.
 * @param {boolean} [props.disabled=false] - Whether the slider is disabled.
 * @param {string} [props.variant='default'] - The style variant of the slider.
 * @returns {React.Element} The rendered RCSlider component.
 */

export const RCSlider = React.forwardRef(
  (
    {
      value = 0,
      min = 0,
      max = 100,
      step = 1,
      marks = [],
      disabled = false,
      variant = 'default',
      ...rest
    },
    ref
  ) => {
    // const MUI_VARIANT = variant === 'darkMode' ? 'outlined' : variant;
    return (
      <RCSliderRoot
        ref={ref}
        value={value}
        min={min}
        max={max}
        step={step}
        marks={marks}
        disabled={disabled}
        // variant={variant}
        ownerState={{
          disabled,
          variant,
        }}
        {...rest}
      />
    );
  }
);

RCSlider.displayName = 'RCSlider';

RCSlider.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  marks: PropTypes.array,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'darkMode']),
};

export default RCSlider;

// import PropTypes from 'prop-types';
// import React from 'react';
// import RCSliderRoot from './RCSliderRoot';

// /**
//  * The RCSlider component is a styled wrapper around the Material-UI
//  *
//  * @component RCSlider
//  * @param {Object} props - The component props.
//  * @param {string} [props.variant] - The variant for the input.
//  * @param {boolean} [props.error] - Whether the input is in error state.
//  * @param {string} [props.label] - The label for the input.
// //  * @param {boolean} [props.multiline=false] - Whether the input should be multiline.
// //  * @param {boolean} [props.fullWidth=false] - Whether the input should be full width.
// //  * @param {number} [props.rows=1] - The number of rows for the input.
//  * @param {string} [props.placeholder] - The placeholder for the input.
//  * @param {string} [props.value] - The value for the input.
// //  * @param {string} [props.margin] - The margin for the input.
//  * @returns {React.Element} The rendered RCSlider component.
//  */

// export const RCSlider = React.forwardRef(
//   (
//     {
//       variant = 'standard',
//       error = false,
//       label = '',
//       // multiline = false,
//       // fullWidth = false,
//       // rows = 1,
//       placeholder = '',
//       value = '',
//       // margin = 'normal',
//       ...rest
//     },
//     ref
//   ) => (
//     <RCSliderRoot
//       ref={ref}
//       variant={variant}
//       error={error}
//       label={label}
//       // multiline={multiline}
//       // fullWidth={fullWidth}
//       // rows={rows}
//       placeholder={placeholder}
//       value={value}
//       // margin={margin}
//       ownerState={{
//         error,
//         variant,
//         // margin,
//         // fullWidth,
//       }}
//       {...rest}
//     />
//   )
// );

// RCSlider.displayName = 'RCSlider';

// RCSlider.propTypes = {
//   variant: PropTypes.oneOf(['filled', 'outlined', 'standard', 'darkMode']),
//   // margin: PropTypes.oneOf(['none', 'dense', 'normal']),
//   error: PropTypes.bool,
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   value: PropTypes.string,
//   // fullWidth: PropTypes.bool,
//   // multiline: PropTypes.bool,
//   // rows: PropTypes.number,
// };

// export default RCSlider;
