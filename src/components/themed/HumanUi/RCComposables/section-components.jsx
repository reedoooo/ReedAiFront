import PropTypes from 'prop-types';
import RCSlider from '../RCSlider';
import RCTextareaAutosize from '../RCTextareaAutosize';
import RCTextField from '../RCTextField';
import { FormSection } from './container-components';

/**
 * Creates a TextFieldSection component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the TextFieldSection.
 * @param {Object} rest - The rest of the props to be passed to the RCTextField component (placeholder, type, etc.).
 * @param {String} rest.placeholder - The placeholder text for the TextField.
 * @param {String} rest.variant - The placeholder text for the TextField.
 * @param {String} rest.error - The placeholder text for the TextField.
 * @param {String} rest.value - The placeholder text for the TextField.
 * @returns {JSX.Element} The rendered TextFieldSection component.
 */
export const TextFieldSection = ({ label = '', ...rest }) => (
  <FormSection label={label}>
    <RCTextField {...rest} />
  </FormSection>
);

TextFieldSection.propTypes = {
  label: PropTypes.string,
};

/**
 * Creates a TextAreaAutosizeSection component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the TextAreaAutosizeSection.
 * @param {Object} rest - The rest of the props to be passed to the RCTextareaAutosize component (placeholder, type, etc.).
 * @param {String} rest.placeholder - The placeholder text for the TextAreaAutosize.
 * @param {String} rest.variant - The placeholder text for the TextAreaAutosize.
 * @param {String} rest.error - The placeholder text for the TextAreaAutosize.
 * @param {String} rest.value - The placeholder text for the TextAreaAutosize.
 * @param {String} rest.disabled - The placeholder text for the TextAreaAutosize.
 * @param {String} rest.maxRows - The maximum number of rows for the TextAreaAutosize.
 * @param {String} rest.minRows - The minimum number of rows for the TextAreaAutosize.
 * returns {JSX.Element} The rendered TextAreaAutosizeSection component.
 * */
export const TextAreaAutosizeSection = ({ label = '', ...rest }) => (
  <FormSection label={label}>
    <RCTextareaAutosize label={label} {...rest} />
  </FormSection>
);
TextAreaAutosizeSection.propTypes = {
  label: PropTypes.string,
};
export const SliderFieldSection = ({ label, onChange, ...rest }) => (
  <FormSection label={label}>
    <RCSlider onChange={(e, newValue) => onChange(newValue)} {...rest} />
  </FormSection>
);
SliderFieldSection.propTypes = {
  label: PropTypes.string,
};
export default {
  TextFieldSection,
  TextAreaAutosizeSection,
  SliderFieldSection,
};
// export const SwitchControl = ({ label, checked, onChange }) => (
//   <StyledSwitchFormControlLabel
//     control={<StyledSwitch checked={checked} onChange={onChange} />}
//     label={label}
//   />
// );
// export const SwitchControlSection = ({ label, checked, onChange }) => (
//   <StyledSwitchFormControlLabel
//     control={<StyledSwitch checked={checked} onChange={onChange} />}
//     label={label}
//   />
// );
