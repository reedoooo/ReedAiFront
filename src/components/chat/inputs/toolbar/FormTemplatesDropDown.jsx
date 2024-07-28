import { InsertDriveFileOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Dialog,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  DialogTitle,
  DialogContent,
  Grid,
} from '@mui/material';

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
