import { Typography } from '@mui/material';

export const FormTitle = ({ label }) => (
  <Typography variant="h5" sx={{ color: '#ffffff' }}>
    {label}
  </Typography>
);

export const FormGroupLabel = ({ label }) => (
  <Typography variant="h6" sx={{ color: '#ffffff' }}>
    {label}
  </Typography>
);

export const FormSectionLabel = ({ label }) => (
  <Typography variant="caption" sx={{ color: '#ffffff' }}>
    {label}
  </Typography>
);

export const FormSection = ({ label, children }) => (
  <>
    <FormSectionLabel label={label} />
    {children}
  </>
);

export default {
  FormTitle,
  FormGroupLabel,
  FormSectionLabel,
  FormSection,
};
