import { TextField } from '@mui/material';

export const FormField = ({
  field,
  formikProps,
  formValues,
  setFormValues,
}) => {
  const fieldProps = formikProps.getFieldProps(field.name);
  const fieldError = formikProps.errors[field.name];
  const fieldTouched = formikProps.touched[field.name];
  const fieldDirty = !!fieldProps.value;
  const successCondition = fieldDirty && !fieldError;
  const errorCondition = fieldTouched && fieldError;

  return (
    <TextField
      id={field.name}
      label={field.label}
      InputLabelProps={{
        shrink: fieldDirty ? true : false,
      }}
      name={field.name}
      variant="outlined"
      fullWidth
      key={field.name}
      {...fieldProps}
      value={formValues[field.name]}
      error={fieldTouched && Boolean(fieldError)}
      helperText={fieldTouched && fieldError}
      className={`${fieldDirty && !fieldError ? 'dirty' : ''} ${
        successCondition ? 'success' : ''
      } ${errorCondition ? 'error' : ''}`}
      onBlur={() => formikProps.setFieldTouched(field.name, true)}
      onChange={e => {
        formikProps.handleChange(e);
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value,
        });
      }}
    />
  );
};

const FormFields = ({ configs, formikProps, formValues, setFormValues }) =>
  configs.map(field => (
    <FormField
      key={field.name}
      field={field}
      formikProps={formikProps}
      formValues={formValues}
      setFormValues={setFormValues}
    />
  ));

export default FormFields;
