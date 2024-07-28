'use client';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';

const dialogVariants = {
  hidden: { width: 0 },
  visible: { width: '60vw', transition: { duration: 1 } },
};

const ReusableDialog = ({
  isOpen,
  handleClose,
  selectedTab,
  setSelectedTab,
  itemList,
  newItem,
  handleItemChange,
  handleCreateItem,
  deleteItem,
  dialogRef,
  itemType,
}) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={motion.div}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      variants={dialogVariants}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        ref: dialogRef,
        sx: {
          maxHeight: '50vh',
          margin: '0',
          position: 'absolute',
          transformOrigin: 'right center',
          display: 'flex',
          flexDirection: 'row',
        },
      }}
    >
      <Tabs
        orientation="vertical"
        value={selectedTab}
        onChange={(event, newValue) => setSelectedTab(newValue)}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label={`${itemType}`} />
      </Tabs>
      <DialogContent>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <List>
            {itemList.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} />
                <IconButton edge="end" onClick={() => deleteItem(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <TextField
              label={`${itemType} Name`}
              name="name"
              value={newItem.name}
              onChange={handleItemChange}
              fullWidth
            />
            <TextField
              label={`${itemType} Description`}
              name="description"
              value={newItem.description}
              onChange={handleItemChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateItem}
              sx={{ mt: 2 }}
            >
              Add {itemType}
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReusableDialog;
