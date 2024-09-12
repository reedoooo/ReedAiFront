import {
  Add as AddIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Input,
} from '@mui/material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { attachmentsApi } from 'api/Ai/chat-sessions';
import { useChatStore } from 'contexts/ChatProvider';
import { useFileProcesser } from 'hooks/chat';

const AnimatedList = styled(motion.ul)({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const AnimatedListItem = styled(motion.li)({
  margin: 0,
  padding: 0,
});
const SidebarContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#000000',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  // width: '250px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const TopBar = styled('div')({
  display: 'flex',
  padding: '10px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const NewFileButton = styled(Button)({
  backgroundColor: '#FFFFFF',
  color: '#000000',
  borderRadius: '4px',
  flexGrow: 1,
  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#F0F0F0',
  },
});

const FolderButton = styled(IconButton)({
  backgroundColor: '#FFFFFF',
  color: '#000000',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#F0F0F0',
  },
});

const ContentArea = styled('div')({
  flexGrow: 1,
  overflowY: 'auto',
});

const StyledListItem = styled(
  ({ isHovered, isFocused, isSelected, ...other }) => <ListItem {...other} />
)(({ theme, isHovered, isFocused, isSelected }) => ({
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backgroundColor: isHovered
    ? 'rgba(255, 255, 255, 0.05)'
    : isFocused
      ? 'rgba(255, 255, 255, 0.1)'
      : isSelected
        ? 'rgba(255, 255, 255, 0.15)'
        : 'transparent',
  outline: isFocused ? '1px solid #FFFFFF' : 'none',
}));

const DraggableItem = ({
  item,
  path,
  moveItem,
  onHover,
  onFocus,
  onSelect,
  isHovered,
  isFocused,
  isSelected,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { ...item, path },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover(draggedItem) {
      if (draggedItem.path === path) {
        return;
      }
      moveItem(draggedItem.path, path);
    },
  });

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelect(path);
    }
  };

  return (
    <span
      ref={node => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        display: 'inline-block',
        width: '100%',
      }}
      onMouseEnter={() => onHover(path)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onFocus(path)}
      onBlur={() => onFocus(null)}
      onClick={() => onSelect(path)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      {item.name}
    </span>
  );
};

const FileUploadTextField = ({
  value,
  onChange,
  fileInputRef,
  existingNames,
  handleFileUpload,
}) => {
  // const fileInputRef = useRef(null);

  const handleTextFieldClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <TextField
        fullWidth
        value={value}
        onClick={handleTextFieldClick}
        placeholder="Select a file"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <Button
              variant="contained"
              component="span"
              onClick={handleTextFieldClick}
            >
              Upload
            </Button>
          ),
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </>
  );
};

export const FileManagementSidebar = props => {
  const { folders, files, space } = props;
  console.log('folders', folders);
  console.log('files', files);
  const [openNewFileDialog, setOpenNewFileDialog] = useState(false);
  const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [fileStructure, setFileStructure] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [filesFromStorage, setFilesFromStorage] = useState([]);
  const { handleSelectDeviceFile, fileInputRef } = useFileProcesser();
  const {
    actions: { addNewMessageFile, updateNewMessageFile, getAllStoredFiles },
  } = useChatStore();
  const [fileNameError, setFileNameError] = useState('');
  const [folderNameError, setFolderNameError] = useState('');

  const validateName = useCallback(
    (name, type) => {
      const existingNames = fileStructure.map(item => item.name.toLowerCase());
      if (existingNames.includes(name.toLowerCase())) {
        return `A ${type} with this name already exists.`;
      }
      return '';
    },
    [fileStructure]
  );

  const handleNewFileNameChange = e => {
    const value = e.target.value;
    setNewFileName(value);
    setFileNameError(value ? '' : 'File name is required');
  };

  const handleNewFolderNameChange = e => {
    const value = e.target.value;
    setNewFolderName(value);
    setFolderNameError(validateName(value, 'folder'));
  };

  const ErrorMessage = ({ error }) => (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{ color: 'red', marginTop: '5px' }}
        >
          {error}
        </motion.div>
      )}
    </AnimatePresence>
  );
  useEffect(() => {
    function organizeFilesIntoFileDirectory(folders, files) {
      const fileDirectory = folders.map(folder => {
        const folderFiles = files
          .filter(file => file.folderId === folder._id)
          .map(file => ({
            id: file._id,
            name: file.name,
            type: 'file',
          }));
        console.log('folderFiles', folderFiles);
        return {
          id: folder._id,
          name: folder.name,
          type: 'folder',
          children: folderFiles,
        };
      });
      console.log('fileDirectory', fileDirectory);

      const rootFiles = files
        .filter(file => !file.folderId)
        .map(file => ({
          id: file._id,
          name: file.name,
          type: 'file',
        }));
      console.log('rootFiles', rootFiles);

      return [...fileDirectory, ...rootFiles];
    }

    if (folders.length > 0 || files.length > 0) {
      const organizedFileDirectory = organizeFilesIntoFileDirectory(
        folders,
        files
      );
      console.log('organizedFileDirectory', organizedFileDirectory);
      setFileStructure(organizedFileDirectory);
    }
  }, [folders, files]);
  useEffect(() => {
    const fetchStoredFiles = async () => {
      const storedFiles = await getAllStoredFiles();
      console.log('storedFiles', storedFiles);
      setFilesFromStorage(storedFiles);
    };
    fetchStoredFiles();
  }, [getAllStoredFiles]);
  // Toggle folder expand/collapse
  const toggleFolder = useCallback(folderId => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  }, []);

  const moveItem = useCallback((fromPath, toPath) => {
    setFileStructure(prevStructure => {
      const newStructure = JSON.parse(JSON.stringify(prevStructure));
      const fromPathArray = fromPath.split('.');
      const toPathArray = toPath.split('.');

      const getItemAtPath = (structure, path) => {
        return path.reduce((acc, key) => {
          if (acc && typeof acc === 'object') {
            return acc.children ? acc.children[key] : acc[key];
          }
          return undefined;
        }, structure);
      };

      const removeItemAtPath = (structure, path) => {
        const parent = getItemAtPath(structure, path.slice(0, -1));
        if (parent && Array.isArray(parent.children)) {
          const index = parseInt(path[path.length - 1]);
          parent.children.splice(index, 1);
        }
      };

      const insertItemAtPath = (structure, path, item) => {
        const parent = getItemAtPath(structure, path.slice(0, -1));
        if (parent) {
          if (!parent.children) parent.children = [];
          const index = parseInt(path[path.length - 1]);
          parent.children.splice(index, 0, item);
        }
      };

      const item = getItemAtPath(newStructure, fromPathArray);
      if (item) {
        removeItemAtPath(newStructure, fromPathArray);
        insertItemAtPath(newStructure, toPathArray, item);
      }

      return newStructure;
    });
  }, []);

  const handleNewFile = () => {
    setOpenNewFileDialog(true);
    setNewFileName('');
    setFileToUpload(null);
  };

  const handleNewFolder = () => {
    setOpenNewFolderDialog(true);
  };

  const handleCloseNewFileDialog = () => {
    setOpenNewFileDialog(false);
    setNewFileName('');
  };

  const handleCloseNewFolderDialog = () => {
    setOpenNewFolderDialog(false);
    setNewFolderName('');
  };
  const handleFileUpload = async event => {
    const file = event.target.files[0];
    if (file && !files.find(f => f.name === file.name)) {
      setFileToUpload(file);
      setNewFileName(file.name);
      await handleSelectDeviceFile(file, false);
    }
  };
  const handleCreateNewFile = async () => {
    if (newFileName && fileToUpload) {
      try {
        // Find the first folder in the fileStructure, if any
        const firstFolder = fileStructure.find(item => item.type === 'folder');

        // Use selectedFolderId if it's set, otherwise use the first folder's id, or null if no folders exist
        const folderId =
          selectedFolderId || (firstFolder ? firstFolder.id : null);
        const uploadedFile = await attachmentsApi.uploadFile(fileToUpload, {
          name: newFileName,
          userId: sessionStorage.getItem('userId'),
          workspaceId: sessionStorage.getItem('workspaceId'),
          fileId: 'local',
          folderId: folderId,
          space: space,
          contentType: fileToUpload.type,
          size: fileToUpload.size,
        });
        console.log('uploadedFile', uploadedFile);
        const newFile = {
          ...uploadedFile,
          id: uploadedFile._id,
          name: newFileName,
          type: 'file',
          path: uploadedFile.path,
        };

        addNewMessageFile(newFile);
        const createdFile = await attachmentsApi.createFile(newFile);
        updateNewMessageFile({ ...createdFile, id: createdFile._id });

        setFileStructure(prev => [
          ...prev,
          { id: createdFile._id, name: createdFile.name, type: 'file' },
        ]);

        setOpenNewFileDialog(false);
        setNewFileName('');
        setFileToUpload(null);
      } catch (error) {
        console.error('Error creating new file:', error);
      }
    }
  };
  const handleCreateNewFolder = () => {
    if (newFolderName) {
      const newFolder = {
        id: _.uniqueId('folder_'),
        name: newFolderName,
        type: 'folder',
        itemType: [],
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'default_user_id',
        workspaceId: 'default_workspace_id',
        space: 'default_space',
        path: `/${newFolderName}`,
        level: 0,
      };
      setFileStructure(prev => [...prev, newFolder]);
      handleCloseNewFolderDialog();
    }
  };
  const renderFileStructure = useCallback(
    (items, path = []) => {
      return items.map((item, index) => {
        if (!item) return null;

        const currentPath = [...path, index];
        const stringPath = currentPath.join('.');
        const isFolderExpanded = expandedFolders[item.id];
        const isFolder = item.type === 'folder';

        return (
          <AnimatedListItem
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <StyledListItem
              button
              onClick={() => isFolder && toggleFolder(item.id)}
              style={{ paddingLeft: `${path.length * 16}px` }}
            >
              <ListItemIcon>
                {isFolder ? (
                  <FolderIcon style={{ color: '#FFFFFF' }} />
                ) : (
                  <FileIcon style={{ color: '#FFFFFF' }} />
                )}
              </ListItemIcon>
              <ListItemText primary={item.name} />
              {isFolder &&
                (isFolderExpanded ? (
                  <ExpandLess style={{ color: '#FFFFFF' }} />
                ) : (
                  <ExpandMore style={{ color: '#FFFFFF' }} />
                ))}
            </StyledListItem>

            {isFolder && isFolderExpanded && item.children && (
              <Collapse in={isFolderExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderFileStructure(item.children, currentPath)}
                </List>
              </Collapse>
            )}
          </AnimatedListItem>
        );
      });
    },
    [expandedFolders, toggleFolder]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <SidebarContainer>
        <TopBar>
          <NewFileButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewFile}
          >
            New File
          </NewFileButton>
          <FolderButton onClick={handleNewFolder}>
            <FolderIcon />
            <AddIcon
              style={{
                fontSize: '0.7em',
                position: 'absolute',
                right: '4px',
                bottom: '4px',
              }}
            />
          </FolderButton>
        </TopBar>
        <ContentArea>
          <AnimatedList>{renderFileStructure(fileStructure)}</AnimatedList>
        </ContentArea>
        {/* File Creation Dialog */}
        <Dialog
          open={openNewFileDialog}
          onClose={() => setOpenNewFileDialog(false)}
        >
          <DialogTitle>Create New File</DialogTitle>
          <DialogContent>
            <FileUploadTextField
              value={newFileName}
              onChange={setNewFileName}
              fileInputRef={fileInputRef}
              existingNames={files.map(f => f.name)}
              handleFileUpload={handleFileUpload} // Pass the handleFileUpload function
            />
            <TextField
              fullWidth
              margin="dense"
              label="File Name"
              value={newFileName}
              onChange={handleNewFileNameChange}
              error={!!fileNameError}
              helperText={fileNameError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNewFileDialog(false)}>Cancel</Button>
            <Button
              onClick={handleCreateNewFile}
              disabled={!newFileName || !!fileNameError}
            >
              {fileToUpload ? 'Upload' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openNewFolderDialog} onClose={handleCloseNewFolderDialog}>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogContent>
            <TextField
              // autoFocus
              margin="dense"
              label="Folder Name"
              fullWidth
              value={newFolderName}
              onChange={handleNewFolderNameChange}
              error={!!folderNameError}
              helperText={folderNameError}
            />
            <ErrorMessage error={folderNameError} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewFolderDialog}>Cancel</Button>
            <Button
              onClick={handleCreateNewFolder}
              disabled={!!folderNameError || !newFolderName}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </SidebarContainer>
    </DndProvider>
  );
};

export default FileManagementSidebar;
