import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaSave } from 'react-icons/fa';
import { RCTabs } from 'components/themed';
import { EditFile, FileInfo, FileUpsert } from './items';
import FileManagementSidebar from './items/sidebar-items/FileManager';

export const Files = props => {
  const { folders = [], folderId = '', title = '', files = [] } = props;
  const [tab, setTab] = useState(0);
  const [fileName, setFileName] = useState('example.txt');
  const [fileContent, setFileContent] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const tabs = [
    { label: 'List', value: 0 },
    { label: 'Edit File', value: 1 },
    { label: 'File Info', value: 2 },
    { label: 'File Upsert', value: 3 },
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
          Files
        </Typography>
        <IconButton>
          <FaSave style={{ float: 'right', cursor: 'pointer' }} />
        </IconButton>{' '}
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
            <FileManagementSidebar
              initialFolders={folders}
              initialFiles={files}
              space={title}
            />
          </ErrorBoundary>
        )}
      </Box>

      {tab === 1 && (
        <EditFile
          fileName={fileName}
          fileContent={fileContent}
          setFileName={setFileName}
          setFileContent={setFileContent}
        />
      )}
      {tab === 2 && (
        <FileInfo
          fileDescription={fileDescription}
          setFileDescription={setFileDescription}
        />
      )}
      {tab === 3 && <FileUpsert />}
    </>
  );
};
export default Files;
