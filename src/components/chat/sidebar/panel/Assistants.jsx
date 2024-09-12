import { Box, IconButton, Typography } from '@mui/material';
import { AssistantIcon } from 'assets/humanIcons';
import { RCTabs } from 'components/themed';
import { useMode } from 'hooks';
import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AssistantDisplay } from './items/assistant-items/AssistantDisplay';
import { AssistantTemplates } from './items/assistant-items/AssistantTemplates';
import { AssistantTools } from './items/assistant-items/AssistantTools';
import FileManagementSidebar from './items/sidebar-items/FileManager';

export const Assistants = props => {
  const { folders = [], data = {}, title = '', files = [] } = props;
  const [tab, setTab] = useState(0);
  const { assistants } = data;
  const { theme } = useMode();
  const tabs = [
    { label: 'List', value: 0 },
    { label: 'Display', value: 1 },
    { label: 'Templates', value: 2 },
    { label: 'Tools', value: 3 },
  ];
  const ErrorFallback = ({ error }) => (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
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
      <RCTabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        tabs={tabs}
        variant="darkMode"
      />
      <Box mt={2} display="flex" alignItems="center">
        {/* <SidebarCreateButtons contentType={'files'} hasData={data.length > 0} /> */}
        {tab === 0 && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FileManagementSidebar folders={folders} files={files} />
          </ErrorBoundary>
        )}
      </Box>
      {tab === 1 && <AssistantDisplay />}
      {tab === 2 && <AssistantTemplates />}
      {tab === 3 && <AssistantTools />}
    </>
  );
};

export default Assistants;
