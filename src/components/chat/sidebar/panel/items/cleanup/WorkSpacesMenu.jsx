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

const ReusableWorkspaceDialog = ({
  isOpen,
  handleClose,
  selectedTab,
  setSelectedTab,
  workspaceList,
  fileList,
  handleWorkspaceChange,
  handleCreateWorkspace,
  handleFileChange,
  handleCreateFile,
  deleteWorkspace,
  deleteFile,
  dialogRef,
  newWorkspace,
  newFile,
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
        <Tab label="Workspaces" />
        <Tab label="Workspace Files" />
      </Tabs>
      <DialogContent>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          {selectedTab === 0 && (
            <Box>
              <List>
                {workspaceList.map((workspace, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={workspace.name} />
                    <IconButton
                      edge="end"
                      onClick={() => deleteWorkspace(workspace._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="Workspace Name"
                  name="name"
                  value={newWorkspace.name}
                  onChange={handleWorkspaceChange}
                  fullWidth
                />
                <TextField
                  label="Workspace Description"
                  name="description"
                  value={newWorkspace.description}
                  onChange={handleWorkspaceChange}
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateWorkspace}
                  sx={{ mt: 2 }}
                >
                  Add Workspace
                </Button>
              </Box>
            </Box>
          )}
          {selectedTab === 1 && (
            <Box>
              <List>
                {fileList.map((file, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={file.fileName} />
                    <IconButton edge="end" onClick={() => deleteFile(file._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="File Name"
                  name="fileName"
                  value={newFile.fileName}
                  onChange={handleFileChange}
                  fullWidth
                />
                <TextField
                  label="File Content"
                  name="fileContent"
                  value={newFile.fileContent}
                  onChange={handleFileChange}
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateFile}
                  sx={{ mt: 2 }}
                >
                  Add File
                </Button>
              </Box>
            </Box>
          )}
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

export default ReusableWorkspaceDialog;
