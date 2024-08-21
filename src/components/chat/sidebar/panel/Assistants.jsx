import { Box, IconButton, Tab, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AssistantIcon } from 'assets/humanIcons';
import { StyledMotionTabs } from 'components/chat/styled';
import { useMode } from 'hooks';
import { AssistantDisplay } from './items/assistant-items/AssistantDisplay';
import { AssistantTemplates } from './items/assistant-items/AssistantTemplates';
import { AssistantTools } from './items/assistant-items/AssistantTools';

export const Assistants = props => {
  const { title, data, folders } = props;
  const [tab, setTab] = useState(0);
  const { assistants } = data;
  const { theme } = useMode();
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            mx: '12px',
          }}
        >
          Assistants
        </Typography>
        <IconButton>
          <AssistantIcon style={{ float: 'right', cursor: 'pointer' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          color: 'white',
          borderRadius: '14px',
          background: '#1c1c1c',
        }}
      >
        <StyledMotionTabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          indicatorColor="#fff"
        >
          <Tab
            label="Assistants"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab
            label="Templates"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab label="Tools" style={{ color: '#fff', borderRadius: '5px' }} />
        </StyledMotionTabs>
      </Box>

      {tab === 0 && <AssistantDisplay />}
      {tab === 1 && <AssistantTemplates />}
      {tab === 2 && <AssistantTools />}
    </>
  );
};

export default Assistants;
