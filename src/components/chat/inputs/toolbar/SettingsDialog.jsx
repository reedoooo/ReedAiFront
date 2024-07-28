import SettingsIcon from '@mui/icons-material/Settings';
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
import { useState } from 'react';

export const SettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            orientation="vertical"
          >
            <Tab icon={<SettingsIcon />} />
            {/* Add more tabs as needed */}
          </Tabs>
          <Grid container>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography>Editor Settings</Typography>
                  <Switch />
                </CardContent>
                <CardActions>
                  <Button>Save</Button>
                </CardActions>
                <CardActions>{/* Add actions if needed */}</CardActions>
              </Card>
            </Grid>
            {/* Add more settings as needed */}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsDialog;
