import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react';

const SidebarItem = ({ item, contentType, handleEdit, icon, displayInfo }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginLeft: 1 }}
        >
          {displayInfo(item)}
        </Typography>
      </CardContent>
      <IconButton onClick={() => handleEdit(item)} color="primary">
        <EditIcon />
      </IconButton>
    </Card>
  );
};

export default SidebarItem;
