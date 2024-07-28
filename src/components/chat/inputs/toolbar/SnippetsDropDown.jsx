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
import { AddIcon } from 'assets/humanIcons';
export const SnippetsDropDown = ({
  anchorEl,
  handleClose,
  handleMenuOpen,
  handleSnippetSelect,
}) => {
  const snippets = [
    'Say hello',
    'Provide help',
    'Arrange callback',
    'Satisfaction poll',
  ];

  return (
    <>
      <IconButton color="primary" onClick={handleMenuOpen}>
        <AddIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {snippets.map(snippet => (
          <MenuItem key={snippet} onClick={() => handleSnippetSelect(snippet)}>
            {snippet}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SnippetsDropDown;
