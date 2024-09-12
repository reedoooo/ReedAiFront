import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { DeleteFolder } from './delete-folder';
import { UpdateFolder } from '../folders/update-folder';

const FolderContainer = styled(Box)(({ theme, isDragOver }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isDragOver ? theme.palette.action.hover : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:focus': {
    outline: 'none',
    backgroundColor: theme.palette.action.hover,
  },
}));

const FolderHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.5,
  },
}));

const FolderContent = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2.5),
  marginTop: theme.spacing(1),
  borderLeft: `2px solid ${theme.palette.divider}`,
  paddingLeft: theme.spacing(2),
}));

const Folder = ({ folder, contentType, children, onUpdateFolder }) => {
  const itemRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleDragEnter = e => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragOver(false);
    const itemId = e.dataTransfer.getData('text/plain');
    onUpdateFolder(itemId, folder.id);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      itemRef.current?.click();
    }
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <FolderContainer
      ref={itemRef}
      id="folder"
      isDragOver={isDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <FolderHeader onClick={handleClick}>
        <Box display="flex" alignItems="center">
          <IconButton size="small">
            {isExpanded ? <IoChevronDownCircleOutline /> : <ChevronRightIcon />}
          </IconButton>
          <Typography>{folder.name}</Typography>
        </Box>
        {isHovering && (
          <Box
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
            display="flex"
          >
            <UpdateFolder folder={folder} />
            <DeleteFolder folder={folder} contentType={contentType} />
          </Box>
        )}
      </FolderHeader>
      {isExpanded && <FolderContent>{children}</FolderContent>}
    </FolderContainer>
  );
};

export default Folder;
