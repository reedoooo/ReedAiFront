import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AssistantIcon } from 'assets/humanIcons';
import { RCTabs } from 'components/themed';
import { useMode } from 'hooks';
import { useTabManager } from 'hooks/chat/useTabManager';
import { AssistantDisplay } from './items/assistant-items/AssistantDisplay';
import { AssistantTemplates } from './items/assistant-items/AssistantTemplates';
import { AssistantTools } from './items/assistant-items/AssistantTools';
import FileManagementSidebar from './items/sidebar-items/FileManager';

export const Assistants = props => {
  const { folders = [], data = {}, title = '', files = [] } = props;
  const { activeTabs, selectedTab, selectTab } = useTabManager('assistants');

  const ErrorFallback = ({ error }) => (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FileManagementSidebar
              initialFolders={folders}
              initialFiles={files}
              space={title}
            />
          </ErrorBoundary>
        );
      case 1:
        return <AssistantDisplay />;
      case 2:
        return <AssistantTemplates />;
      case 3:
        return <AssistantTools />;
      default:
        return null;
    }
  };

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
        value={selectedTab}
        onChange={(e, newValue) => selectTab(newValue)}
        tabs={activeTabs}
        variant="darkMode"
      />
      <Box mt={2} display="flex" alignItems="center">
        {renderContent()}
      </Box>
    </>
  );
};

export default Assistants;
