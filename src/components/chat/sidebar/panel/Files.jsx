import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaSave } from 'react-icons/fa';
import { RCTabs } from 'components/themed';
import { useTabManager } from 'hooks/chat/useTabManager';
import { EditFile, FileInfo, FileUpsert, useFileEditor } from './items';
import FileManagementSidebar from './items/sidebar-items/FileManager';

export const Files = props => {
  const { folders = [], folderId = '', title = '', files = [] } = props;
  const { activeTabs, selectedTab, selectTab } = useTabManager('files');
  const {
    fileName,
    fileContent,
    fileInfo,
    fileDescription,
    editingFile, // Method to set the file for editing
    selectedItem,
    setEditingFile,
    setFileName,
    setFileContent,
    setFileDescription,
    setFileInfo,
    setSelectedItem,
  } = useFileEditor();
  // const [editingFile, setEditingFile] = useState(null);
  // const [fileName, setFileName] = useState('example.txt');
  // const [fileContent, setFileContent] = useState('');
  // const [fileDescription, setFileDescription] = useState('');
  // const [fileInfo, setFileInfo] = useState({});

  const ErrorFallback = ({ error }) => (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );

  const handleEditFile = file => {
    setEditingFile(file);
    setFileName(file.name);
    setFileContent(file.content);
    setFileDescription(file.description);
    setFileInfo({
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    });
    selectTab(1); // Switch to the Edit tab
  };

  const handleSaveFile = async () => {
    console.log('Saving file:', { fileName, fileContent, fileDescription });
    // After saving, you might want to refresh the file list or update the file in the list
    setEditingFile(null);
    selectTab(0); // Return to list view
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FileManagementSidebar
              initialFolders={folders}
              initialFiles={files}
              space={title}
              onEditFile={handleEditFile}
            />
          </ErrorBoundary>
        );
      case 1:
        return (
          <EditFile
            fileName={fileName}
            fileContent={fileContent}
            setFileName={setFileName}
            setFileContent={setFileContent}
            onSave={handleSaveFile}
            selectedFile={editingFile}
          />
        );
      case 2:
        return (
          <FileInfo
            fileDescription={fileDescription}
            setFileDescription={setFileDescription}
            file={editingFile}
          />
        );
      case 3:
        return <FileUpsert />;
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
          Files
        </Typography>
        <IconButton onClick={handleSaveFile}>
          <FaSave style={{ float: 'right', cursor: 'pointer' }} />
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
export default Files;
