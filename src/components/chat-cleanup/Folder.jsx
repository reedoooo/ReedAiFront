import {
  ExpandMore as IconCaretDown,
  ChevronRight as IconCaretRight,
  Check as IconCheck,
  Edit as IconPencil,
  Delete as IconTrash,
  Close as IconX,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from 'contexts/ChatProvider';

const Folder = ({ currentFolder, searchTerm, handleDrop, folderComponent }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleEnterDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRename();
    }
  };

  const handleRename = () => {
    // handleUpdateFolder(currentFolder.id, renameValue);
    setRenameValue('');
    setIsRenaming(false);
  };

  const dropHandler = e => {
    if (e.dataTransfer) {
      setIsOpen(true);
      handleDrop(e, currentFolder);
      e.target.style.background = 'none';
    }
  };

  const allowDrop = e => {
    e.preventDefault();
  };

  const highlightDrop = e => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = e => {
    e.target.style.background = 'none';
  };

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  useEffect(() => {
    if (searchTerm) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchTerm]);

  return (
    <>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {isRenaming ? (
          <Paper sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
            <IconCaretDown size="small" />
            <InputBase
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
              onKeyDown={handleEnterDown}
              sx={{ flex: 1, ml: 1 }}
            />
          </Paper>
        ) : (
          <Button
            onClick={() => setIsOpen(!isOpen)}
            onDrop={e => dropHandler(e)}
            onDragOver={allowDrop}
            onDragEnter={highlightDrop}
            onDragLeave={removeHighlight}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              textTransform: 'none',
              p: 1,
              backgroundColor: isOpen ? '#343541' : 'transparent',
              '&:hover': {
                backgroundColor: '#343541',
              },
            }}
          >
            {isOpen ? (
              <IconCaretDown size="small" />
            ) : (
              <IconCaretRight size="small" />
            )}
            <Typography variant="body2" sx={{ flex: 1, ml: 1 }}>
              {currentFolder.name}
            </Typography>
          </Button>
        )}

        {(isDeleting || isRenaming) && (
          <Box sx={{ position: 'absolute', right: 8, display: 'flex', gap: 1 }}>
            <Tooltip title="Confirm">
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  if (isDeleting) {
                    // handleDeleteFolder(currentFolder.id);
                  } else if (isRenaming) {
                    handleRename();
                  }
                  setIsDeleting(false);
                  setIsRenaming(false);
                }}
              >
                <IconCheck />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  setIsDeleting(false);
                  setIsRenaming(false);
                }}
              >
                <IconX />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {!isDeleting && !isRenaming && (
          <Box sx={{ position: 'absolute', right: 8, display: 'flex', gap: 1 }}>
            <Tooltip title="Rename">
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  setIsRenaming(true);
                  setRenameValue(currentFolder.name);
                }}
              >
                <IconPencil />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  setIsDeleting(true);
                }}
              >
                <IconTrash />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      {isOpen && folderComponent}
    </>
  );
};

export default Folder;
