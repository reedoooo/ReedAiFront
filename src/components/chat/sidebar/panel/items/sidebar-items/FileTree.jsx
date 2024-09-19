// components/FileTree.js
import { Collapse, List } from '@mui/material';
import React, { useCallback } from 'react';
import { FileTreeItem } from './FileTreeItem';

const FileTree = ({
  fileStructure,
  expandedFolders,
  toggleFolder,
  hoveredItem,
  focusedItem,
  selectedItem,
  moveItem,
  onHoverFile,
  onFocusFile,
  onSelectFile,
  setSelectedItem,
}) => {
  const renderFileStructure = useCallback(
    (items, path = []) => {
      return items?.map((item, index) => {
        if (!item) return null;
        const isFolder = item.type === 'folder';
        const isFolderExpanded = expandedFolders[item.id];

        const currentPath = [...path, index];
        const stringPath = currentPath.join('.');

        const isSelected = selectedItem === stringPath;
        const isHovered = hoveredItem === stringPath;
        const handleClick = () => {
          setSelectedItem(stringPath);
        };

        return (
          <React.Fragment key={item.id}>
            <FileTreeItem
              item={item}
              path={stringPath}
              moveItem={moveItem}
              onHover={onHoverFile}
              onFocus={onFocusFile}
              onSelect={onSelectFile}
              isHovered={isHovered}
              isFocused={focusedItem === stringPath}
              isSelected={isSelected}
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
      onHoverFile,
      onFocusFile,
      onSelectFile,
      setSelectedItem,
    ]
  );

  return <>{renderFileStructure(fileStructure)}</>;
};

export default FileTree;
