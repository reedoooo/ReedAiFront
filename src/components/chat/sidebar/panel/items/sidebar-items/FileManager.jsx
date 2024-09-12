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
import { foldersApi, workspacesApi } from 'api/workspaces';
import {
  AnimatedList,
  AnimatedListItem,
  ContentArea,
  FolderButton,
  NewFileButton,
  SidebarManagerContainer,
  TopBar,
} from 'components/chat/styled';
import { useChatStore } from 'contexts/ChatProvider';
import { useFileProcesser } from 'hooks/chat';
import useFileStructure from 'hooks/chat/useFileStructure';
import { useDialog } from 'hooks/ui';
import { NewFileDialog, NewFolderDialog } from './file-manager-components';

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

// const FileUploadTextField = ({
//   value,
//   onChange,
//   fileInputRef,
//   existingNames,
//   handleFileUpload,
// }) => {
//   const handleTextFieldClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <>
//       <TextField
//         fullWidth
//         value={value}
//         onClick={handleTextFieldClick}
//         placeholder="Select a file"
//         InputProps={{
//           readOnly: true,
//           endAdornment: (
//             <Button
//               variant="contained"
//               component="span"
//               onClick={handleTextFieldClick}
//             >
//               Upload
//             </Button>
//           ),
//         }}
//       />
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileUpload}
//         style={{ display: 'none' }}
//       />
//     </>
//   );
// };

export const FileManagementSidebar = props => {
  const { initialFolders, initialFiles, space } = props;
  const newFileDialog = useDialog();
  const newFolderDialog = useDialog();
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  // const [fileStructure, setFileStructure] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [folders, setFolders] = useState(initialFolders || []);
  const [files, setFiles] = useState(initialFiles || []);

  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [filesFromStorage, setFilesFromStorage] = useState([]);
  const { handleSelectDeviceFile, fileInputRef } = useFileProcesser();
  const {
    actions: { addNewMessageFile, updateNewMessageFile },
  } = useChatStore();
  const [fileNameError, setFileNameError] = useState('');
  const [folderNameError, setFolderNameError] = useState('');
  const {
    fileStructure,
    isLoading,
    error,
    refreshFileStructure,
    setFileStructure,
  } = useFileStructure(space);
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
    newFileDialog.handleOpen();
    setNewFileName('');
    setFileToUpload(null);
  };

  const handleNewFolder = () => {
    newFolderDialog.handleOpen();
  };

  const handleCloseNewFileDialog = () => {
    newFileDialog.handleClose();
    setNewFileName('');
  };

  const handleCloseNewFolderDialog = () => {
    newFolderDialog.handleClose();
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
        const firstFolder = fileStructure.find(item => item.type === 'folder');
        const folderId =
          selectedFolderId || (firstFolder ? firstFolder.id : null);
        const uploadedFile = await attachmentsApi.uploadFile(fileToUpload, {
          name: newFileName,
          userId: JSON.parse(sessionStorage.getItem('userId')),
          workspaceId: JSON.parse(sessionStorage.getItem('workspaceId')),
          folderId: folderId,
          fileId: 'local',
          space: space.toLowerCase(),
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

        newFolderDialog.handleClose();
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <SidebarManagerContainer>
        {/* Top Bar */}
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
        {/* File Structure */}
        <ContentArea>
          <AnimatedList>{renderFileStructure(fileStructure)}</AnimatedList>
        </ContentArea>
        {/* File Creation Dialog */}
        <NewFileDialog
          newFileDialog={newFileDialog}
          handleCloseNewFileDialog={handleCloseNewFileDialog}
          newFileName={newFileName}
          setNewFileName={setNewFileName}
          fileInputRef={fileInputRef}
          existingNames={files.map(f => f.name)}
          handleFileUpload={handleFileUpload}
          handleNewFileNameChange={handleNewFileNameChange}
          fileNameError={fileNameError}
          handleCreateNewFile={handleCreateNewFile}
          fileToUpload={fileToUpload}
        />
        {/* Folder Creation Dialog */}
        <NewFolderDialog
          newFolderDialog={newFolderDialog}
          handleCloseNewFolderDialog={handleCloseNewFolderDialog}
          newFolderName={newFolderName}
          handleNewFolderNameChange={handleNewFolderNameChange}
          folderNameError={folderNameError}
          handleCreateNewFolder={handleCreateNewFolder}
        />
      </SidebarManagerContainer>
    </DndProvider>
  );
};

export default FileManagementSidebar;
