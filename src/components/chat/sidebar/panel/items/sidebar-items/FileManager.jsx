import _ from 'lodash';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { attachmentsApi } from 'api/Ai/chat-sessions';
import {
  AnimatedList,
  ContentArea,
  SidebarManagerContainer,
  TopBar,
} from 'components/chat/styled';
import { useChatStore } from 'contexts/ChatProvider';
import { useFileProcesser } from 'hooks/chat';
import useFileStructure from 'hooks/chat/useFileStructure';
import { useTabManager } from 'hooks/chat/useTabManager';
import { useDialog } from 'hooks/ui';
import { NewFileDialog, NewFolderDialog } from './file-manager-components';
import FileTree from './FileTree';
import { FileTreeItem } from './FileTreeItem';
import SidebarActions from './SidebarActions';
import useFileEditor from './useFileEditor';

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
  const {
    hoveredItem,
    focusedItem,
    selectedItem,
    setHoveredItem,
    setFocusedItem,
    setSelectedItem,
    onEditFile,
    onHoverFile,
    onFocusFile,
    onSelectFile,
    onStartDragging,
    onEndDragging,
    onDropItem,
    isDragging,
    draggedItem,
  } = useFileEditor(); // Use the hook's state and function

  const [expandedFolders, setExpandedFolders] = useState({});
  // const [hoveredItem, setHoveredItem] = useState(null);
  // const [focusedItem, setFocusedItem] = useState(null);
  // const [selectedItem, setSelectedItem] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [fileToUpload, setFileToUpload] = useState(null);
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

  // When file is clicked, update file content and file info
  // const handleFileClick = useCallback(
  //   file => {
  //     if (file.type === 'file') {
  //       onEditFile(file); // Call the prop to edit file
  //     }
  //   },
  //   [onEditFile]
  // );

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
          type: uploadedFile.type,
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

  const updateFileTreeStructure = useCallback(updatedStructure => {
    setFileStructure(prevStructure => {
      const newStructure = _.cloneDeep(prevStructure);
      _.merge(newStructure, updatedStructure);
      return newStructure;
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <SidebarManagerContainer>
        <SidebarActions
          handleNewFile={handleNewFile}
          handleNewFolder={handleNewFolder}
          space={space}
        />
        {/* File Structure */}
        <ContentArea>
          <AnimatedList>
            <FileTree
              fileStructure={fileStructure}
              expandedFolders={expandedFolders}
              toggleFolder={folderId =>
                setExpandedFolders(prev => ({
                  ...prev,
                  [folderId]: !prev[folderId],
                }))
              }
              hoveredItem={hoveredItem}
              focusedItem={focusedItem}
              selectedItem={selectedItem}
              moveItem={setFileStructure}
              onHoverFile={onHoverFile}
              onFocusFile={onFocusFile}
              onSelectFile={onSelectFile}
              setSelectedItem={setSelectedItem}
              onStartDragging={onStartDragging} // Added dragging logic
              onEndDragging={onEndDragging} // Added dragging logic
              onDropItem={onDropItem} // Added dropping logic
              isDragging={isDragging} // Added dragging state
            />
          </AnimatedList>
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
