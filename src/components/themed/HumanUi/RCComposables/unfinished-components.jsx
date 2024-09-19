import {
  StyledSlider,
  StyledSwitch,
  StyledSwitchFormControlLabel,
  StyledTextField,
} from 'components/chat/styled';
import { FormSection } from './container-components';
const marks = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
];

export const ReusableSliderField = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}) => (
  <FormSection label={label}>
    <StyledSlider
      value={value}
      // onChange={onChange}
      onChange={(e, newValue) => onChange(newValue)}
      min={min}
      max={max}
      step={step}
      marks={marks}
      valueLabelDisplay="auto"
    />
  </FormSection>
);
export const ReusableSwitchControl = ({ label, checked, onChange }) => (
  <StyledSwitchFormControlLabel
    control={<StyledSwitch checked={checked} onChange={onChange} />}
    label={label}
  />
);
export const ReusableTextField = ({
  label,
  value,
  onChange,
  multiline,
  rows = 1,
  fullWidth = true,
}) => (
  <FormSection label={label}>
    <StyledTextField
      fullWidth={fullWidth}
      value={value}
      onChange={e => onChange(e.target.value)}
      multiline
      rows={rows}
      variant="outlined"
      sx={{
        color: '#ffffff',
      }}
    />
  </FormSection>
);

export default {
  ReusableSliderField,
  ReusableSwitchControl,
  ReusableTextField,
};
