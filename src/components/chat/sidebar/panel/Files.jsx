import { Box, IconButton, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { RCTabs } from 'components/themed';
import { EditFile, FileInfo, FileUpsert } from './items';
import { ReusableFolder } from './items/shared-items';

export const Files = props => {
  const { folders = [], data = {}, title = '' } = props;
  const [tab, setTab] = useState(0);
  const [fileName, setFileName] = useState('example.txt');
  const [fileContent, setFileContent] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const tabs = [
    { label: 'Edit File', value: 0 },
    { label: 'File Info', value: 1 },
    { label: 'File Upsert', value: 2 },
    { label: 'List', value: 3 },
  ];
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
      {tab === 0 && (
        <ReusableFolder
          title="Files"
          folders={folders}
          // files={files}
          // onUpdateFolder={updateFolder}
          // onDeleteFolder={deleteFolder}
          // onAddItem={handleAddItem}
          // onDragEnd={handleDragEnd}
          // selectedFolder={selectedFolder}
          // setSelectedFolder={setSelectedFolder}
          files={[]}
          onUpdateFolder={() => {}}
          onDeleteFolder={() => {}}
          onAddItem={() => {}}
          onDragEnd={() => {}}
          selectedFolder={null}
          setSelectedFolder={() => {}}
          placeholder="Search files..."
          addButtonLabel="New File"
        />
      )}
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
