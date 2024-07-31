import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import React from 'react';
import MainMenu from 'components/themed/CommonUi/menu/MainMenu';
import configs from 'config/index';

export default function Notifications(props) {
  return (
    <Card
      sx={{ mb: '20px', mt: '40px', mx: 'auto', maxWidth: '410px' }}
      {...props}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="30px"
        >
          <Typography variant="h6" fontWeight="bold">
            Notifications
          </Typography>
          <MainMenu items={configs.menus.genericMenuItems} />
        </Box>
        {[
          {
            id: '1',
            label: 'Item update notifications',
            checked: true,
          },
          { id: '2', label: 'Item comment notifications' },
          {
            id: '3',
            label: 'Buyer review notifications',
            checked: true,
          },
          {
            id: '4',
            label: 'Rating reminders notifications',
            checked: true,
          },
          { id: '5', label: 'Meetups near you notifications' },
          { id: '6', label: 'Company news notifications' },
          {
            id: '7',
            label: 'New launches and projects',
            checked: true,
          },
          { id: '8', label: 'Monthly product changes' },
          {
            id: '9',
            label: 'Subscribe to newsletter',
            checked: true,
          },
          { id: '10', label: 'Email me when someone follows me' },
        ].map(item => (
          <FormControlLabel
            key={item.id}
            control={<Switch checked={item.checked} />}
            label={item.label}
            sx={{ mb: '20px', fontSize: '0.875rem' }}
          />
        ))}
      </CardContent>
    </Card>
  );
}
