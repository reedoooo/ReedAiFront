import {
  Check as IconCheck,
  Message as IconMessage,
  Edit as IconPencil,
  Delete as IconTrash,
  Close as IconX,
} from '@mui/icons-material';
import { IconButton, TextField, Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from 'contexts/ChatProvider';

const ConversationComponent = ({ conversation }) => {
  const {
    state: { selectedConversation, messageIsStreaming },
    handleSelectConversation,
    handleUpdateConversation,
    handleDeleteConversation,
  } = useContext(ChatContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  const handleEnterDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      selectedConversation && handleRename(selectedConversation);
    }
  };

  const handleDragStart = (e, conversation) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData('conversation', JSON.stringify(conversation));
    }
  };

  const handleRename = conversation => {
    if (renameValue.trim().length > 0) {
      handleUpdateConversation(conversation, {
        key: 'name',
        value: renameValue,
      });
      setRenameValue('');
      setIsRenaming(false);
    }
  };

  const handleConfirm = e => {
    e.stopPropagation();
    if (isDeleting) {
      handleDeleteConversation(conversation);
    } else if (isRenaming) {
      handleRename(conversation);
    }
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleCancel = e => {
    e.stopPropagation();
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleOpenRenameModal = e => {
    e.stopPropagation();
    setIsRenaming(true);
    selectedConversation && setRenameValue(selectedConversation.name);
  };

  const handleOpenDeleteModal = e => {
    e.stopPropagation();
    setIsDeleting(true);
  };

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {isRenaming && selectedConversation?.id === conversation.id ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1,
            backgroundColor: '#343541',
            borderRadius: 1,
            width: '100%',
          }}
        >
          <IconMessage fontSize="small" />
          <TextField
            value={renameValue}
            onChange={e => setRenameValue(e.target.value)}
            onKeyDown={handleEnterDown}
            fullWidth
            variant="standard"
            sx={{
              input: {
                color: 'white',
                backgroundColor: 'transparent',
                borderBottom: '1px solid #444654',
                '&:focus': {
                  borderColor: '#fff',
                },
              },
            }}
          />
        </Box>
      ) : (
        <Button
          onClick={() => handleSelectConversation(conversation)}
          disabled={messageIsStreaming}
          draggable
          onDragStart={e => handleDragStart(e, conversation)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1,
            width: '100%',
            textTransform: 'none',
            backgroundColor:
              selectedConversation?.id === conversation.id ? '#343541' : '',
            '&:hover': {
              backgroundColor: '#343541',
            },
          }}
        >
          <IconMessage fontSize="small" />
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {conversation.name}
          </Typography>
        </Button>
      )}

      {(isDeleting || isRenaming) &&
        selectedConversation?.id === conversation.id && (
          <Box
            sx={{
              position: 'absolute',
              right: 8,
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton onClick={handleConfirm}>
              <IconCheck fontSize="small" />
            </IconButton>
            <IconButton onClick={handleCancel}>
              <IconX fontSize="small" />
            </IconButton>
          </Box>
        )}

      {selectedConversation?.id === conversation.id &&
        !isDeleting &&
        !isRenaming && (
          <Box
            sx={{
              position: 'absolute',
              right: 8,
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton onClick={handleOpenRenameModal}>
              <IconPencil fontSize="small" />
            </IconButton>
            <IconButton onClick={handleOpenDeleteModal}>
              <IconTrash fontSize="small" />
            </IconButton>
          </Box>
        )}
    </Box>
  );
};

export default ConversationComponent;
