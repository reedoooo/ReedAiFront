import { Box, Typography, IconButton, Button } from '@mui/material';
import React, { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { ConversationCard, ExportOptions } from 'components/chat/styled';
import { ConversationMenu } from './ConversationMenu';

export const ConversationTab = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
  handleMenuClick,
  anchorEl,
  handleMenuClose,
  handleExportJSON,
  handleDeleteConversation,
}) => {
  return (
    <Box sx={{ padding: '1rem', flexGrow: 1, overflowY: 'auto' }}>
      {conversations?.map(conversation => (
        <ConversationCard
          key={conversation._id}
          onClick={() => setSelectedConversation(conversation)}
        >
          <Typography variant="h6">{conversation.name}</Typography>
          <IconButton onClick={event => handleMenuClick(event, conversation)}>
            <MdInfoOutline style={{ color: '#fff' }} />
          </IconButton>
        </ConversationCard>
      ))}
      <ConversationMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleExportJSON={handleExportJSON}
        handleDeleteConversation={() =>
          handleDeleteConversation(selectedConversation?._id)
        }
      />
      {selectedConversation && (
        <Box>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            {selectedConversation.name}
          </Typography>
          <Box
            sx={{
              padding: '10px',
              background: '#000',
              borderRadius: '5px',
            }}
          >
            {selectedConversation?.messages?.map((message, index) => (
              <Typography key={index} sx={{ color: '#fff' }}>
                {message.content}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
      <ExportOptions>
        <Button variant="contained" onClick={handleExportJSON}>
          Export All as JSON
        </Button>
      </ExportOptions>
    </Box>
  );
};

export default ConversationTab;
