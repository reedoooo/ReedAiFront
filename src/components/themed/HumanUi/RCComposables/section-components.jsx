import PropTypes from 'prop-types';
import RCSlider from '../RCSlider';
import RCTextareaAutosize from '../RCTextareaAutosize';
import RCTextField from '../RCTextField';
import { FormSection } from './container-components';

export const TextFieldSection = ({ label = '', ...rest }) => (
  <FormSection label={label}>
    <RCTextField {...rest} />
  </FormSection>
);

TextFieldSection.propTypes = {
  label: PropTypes.string,
};

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
