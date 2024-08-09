import { InsertDriveFileOutlined } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';

export const FormTemplatesDropDown = ({
  anchorEl,
  handleClose,
  handleMenuOpen,
  handleFormSelect,
}) => {
  const forms = ['Select input', 'Text input'];

  return (
    <>
      <IconButton color="primary" onClick={handleMenuOpen}>
        <InsertDriveFileOutlined />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {forms.map(form => (
          <MenuItem key={form} onClick={() => handleFormSelect(form)}>
            {form}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FormTemplatesDropDown;
