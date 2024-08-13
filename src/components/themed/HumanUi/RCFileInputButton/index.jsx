import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * The RCFileInputButton component is a reusable file input with a styled button
 *
 * @component RCFileInputButton
 * @param {Object} props - The component props.
 * @param {function} props.onChange - The function to handle file selection.
 * @param {string} [props.buttonText='+ Code'] - The text to display on the button.
 * @param {string} [props.accept='*'] - The accepted file types.
 * @param {object} [props.buttonSx] - The styles to apply to the button.
 * @returns {React.Element} The rendered RCFileInputButton component.
 */

export const RCFileInputButton = ({
  onChange,
  buttonText = '+ Code',
  accept = '*',
  buttonSx = {},
}) => (
  <label htmlFor="file-input" style={{ marginLeft: '10px' }}>
    <input
      id="file-input"
      type="file"
      accept={accept}
      style={{ display: 'none' }}
      onChange={onChange}
    />
    <Button
      component="span"
      variant="outlined"
      sx={{
        color: '#ffffff',
        borderColor: '#ffffff',
        height: '50%',
        width: '100%',
        padding: '4px 10px',
        ...buttonSx,
      }}
    >
      {buttonText}
    </Button>
  </label>
);

RCFileInputButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  accept: PropTypes.string,
  buttonSx: PropTypes.object,
};

export default RCFileInputButton;
