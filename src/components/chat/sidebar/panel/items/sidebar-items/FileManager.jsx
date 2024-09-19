import {
  Add as AddIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import _ from 'lodash';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { attachmentsApi } from 'api/Ai/chat-sessions';
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
import { useTabManager } from 'hooks/chat/useTabManager';
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

const DraggableItem = React.memo(
  ({
    item,
    path,
    moveItem,
    onHover,
    onFocus,
    onSelect,
    isHovered,
    isFocused,
    isSelected,
    toggleFolder,
    expandedFolders,
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
      <div
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
        onClick={() =>
          item.type === 'folder' ? toggleFolder(item.id) : onSelect(path)
        }
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-pressed={isSelected}
      >
        <StyledListItem
          isHovered={isHovered}
          isFocused={isFocused}
          isSelected={isSelected}
        >
          <ListItemIcon>
            {item.type === 'folder' ? <FolderIcon /> : <FileIcon />}
          </ListItemIcon>
          <ListItemText primary={item.name} />
          {item.type === 'folder' && (
            <IconButton
              onClick={e => {
                e.stopPropagation();
                toggleFolder(item.id);
              }}
            >
              {expandedFolders[item.id] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </StyledListItem>
      </div>
    );
  }
);

DraggableItem.displayName = 'DraggableItem';

export const FileManagementSidebar = props => {
  const { initialFolders, initialFiles, space } = props;
  const {
    fileStructure,
    isLoading,
    error,
    refreshFileStructure,
    setFileStructure,
  } = useFileStructure(space);
  const { activeSpace, selectedTab, tabs, changeSpace, selectTab } =
    useTabManager(space);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [fileToUpload, setFileToUpload] = useState(null);
  const [editingFile, setEditingFile] = useState(null);
  const newFileDialog = useDialog();
  const newFolderDialog = useDialog();
  const [files, setFiles] = useState(initialFiles || []);

  const [selectedFolderId, setSelectedFolderId] = useState('');
  const { handleSelectDeviceFile, fileInputRef } = useFileProcesser();
  const {
    actions: { addNewMessageFile, updateNewMessageFile },
  } = useChatStore();
  const [fileNameError, setFileNameError] = useState('');
  const [folderNameError, setFolderNameError] = useState('');
  const validateName = useCallback(
    (name, type) => {
      const existingNames = fileStructure.map(item => item.name.toLowerCase());
      return existingNames.includes(name.toLowerCase())
        ? `A ${type} with this name already exists.`
        : '';
    },
    [fileStructure]
  );

  const handleNewFileNameChange = e => {
    const value = e.target.value;
    setNewFileName(value);
    setFileNameError(
      value ? validateName(value, 'file') : 'File name is required'
    );
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

  const handleFileClick = useCallback(
    file => {
      setEditingFile(file);
      changeSpace(file.space);
      selectTab(1); // Assuming 1 is the 'Edit' tab for all spaces
    },
    [changeSpace, selectTab]
  );

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
        } else if (Array.isArray(structure)) {
          const index = parseInt(path[path.length - 1]);
          structure.splice(index, 1);
        }
      };

      const insertItemAtPath = (structure, path, item) => {
        const parent = getItemAtPath(structure, path.slice(0, -1));
        if (parent) {
          if (!parent.children) parent.children = [];
          const index = parseInt(path[path.length - 1]);
          parent.children.splice(index, 0, item);
        } else if (Array.isArray(structure)) {
          const index = parseInt(path[path.length - 1]);
          structure.splice(index, 0, item);
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

        refreshFileStructure();
        newFileDialog.handleClose();
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
        children: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: JSON.parse(sessionStorage.getItem('userId')),
        workspaceId: JSON.parse(sessionStorage.getItem('workspaceId')),
        space: space.toLowerCase(),
        path: `/${newFolderName}`,
        level: 0,
      };
      setFileStructure(prev => [...prev, newFolder]);
      newFolderDialog.handleClose();
      setNewFolderName('');
    }
  };

  const renderFileStructure = useCallback(
    (items, path = []) => {
      return items.map((item, index) => {
        if (!item) return null;
        const isFolder = item.type === 'folder';
        const isFolderExpanded = expandedFolders[item.id];

        const currentPath = [...path, index];
        const stringPath = currentPath.join('.');

        return (
          <React.Fragment key={item.id}>
            <DraggableItem
              item={item}
              path={stringPath}
              moveItem={moveItem}
              onHover={setHoveredItem}
              onFocus={setFocusedItem}
              onSelect={setSelectedItem}
              isHovered={hoveredItem === stringPath}
              isFocused={focusedItem === stringPath}
              isSelected={selectedItem === stringPath}
              toggleFolder={toggleFolder}
              expandedFolders={expandedFolders}
            />
            {isFolder && isFolderExpanded && item.children && (
              <Collapse in={isFolderExpanded} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                  style={{ paddingLeft: 16 }}
                >
                  {renderFileStructure(item.children, currentPath)}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      });
    },
    [
      expandedFolders,
      hoveredItem,
      focusedItem,
      selectedItem,
      moveItem,
      toggleFolder,
    ]
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
