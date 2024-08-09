import {
  Button,
  Typography,
  Switch,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Dialog,
  Tabs,
  Tab,
  DialogTitle,
  DialogContent,
  Grid,
} from '@mui/material';
import { SettingsIcon } from 'assets/humanIcons';
import { useTabs } from 'hooks/ui';

export const SettingsDialog = props => {
  const { open, handleClose, handleOpen } = props;
  const { activeTab, handleTabChange } = useTabs(0);
  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Tabs
            value={activeTab}
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
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsDialog;
