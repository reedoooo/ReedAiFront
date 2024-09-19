import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { StyledListItem } from 'components/chat/styled';

/**
 * Represents a draggable file or folder item in a file tree.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.item - The item object containing file/folder details.
 * @param {string} props.path - The path of the item in the file structure.
 * @param {Function} props.moveItem - Callback to move the item.
 * @param {Function} props.onHover - Callback for hovering.
 * @param {Function} props.onFocus - Callback for focusing.
 * @param {Function} props.onSelect - Callback for selecting the item.
 * @param {boolean} props.isHovered - Whether the item is hovered.
 * @param {boolean} props.isFocused - Whether the item is focused.
 * @param {boolean} props.isSelected - Whether the item is selected.
 * @param {Function} props.toggleFolder - Callback to toggle folder expansion.
 * @param {Object} props.expandedFolders - Object representing expanded folders.
 * @returns {ReactNode} The rendered file or folder item.
 */
export const FileTreeItem = ({
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
      if (draggedItem.path !== path) {
        moveItem(draggedItem.path, path);
      }
    },
  });

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      // pass the item and the path of the item
      onSelect(item, path);
      // onSelect(path);
    }
  };
  console.log('FileTreeItem', item, path);
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
        item.type === 'folder' ? toggleFolder(item.id) : onSelect(item, path)
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
        file={item.type === 'file' ? item : null}
      >
        <ListItemIcon>
          {item.type === 'folder' ? <FolderIcon /> : <FileIcon />}
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {/* <ListItemText
          primary={
            item.metadata.originalName ? item.metadata.originalName : item.name
          }
        /> */}
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
};

FileTreeItem.propTypes = {
  item: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  moveItem: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggleFolder: PropTypes.func.isRequired,
  expandedFolders: PropTypes.object.isRequired,
};

export default React.memo(FileTreeItem);
