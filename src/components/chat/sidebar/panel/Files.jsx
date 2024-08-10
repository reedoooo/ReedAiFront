import { Tab, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { StyledMuiTabs } from 'components/chat/styled';
import { EditFile, FileInfo, FileUpsert } from './items';

const Files = () => {
  const [tab, setTab] = useState(0);
  const [fileName, setFileName] = useState('example.txt');
  const [fileContent, setFileContent] = useState('');
  const [fileDescription, setFileDescription] = useState('');

  return (
    <>
      <Typography variant="h6" style={{ color: '#fff' }}>
        File Editor
        <FaSave style={{ float: 'right', cursor: 'pointer' }} />
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          color: 'white',
          borderRadius: '14px',
          background: '#1c1c1c', // Slightly different background for the panel to distinguish it
        }}
      >
        <StyledMuiTabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          indicatorColor="#fff"
        >
          <Tab
            label="Edit File"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab
            label="File Info"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab
            label="Upsert Docs"
            style={{ color: '#fff', borderRadius: '5px' }}
          />
          <Tab label="List" style={{ color: '#fff', borderRadius: '5px' }} />
        </StyledMuiTabs>
      </Box>
      {tab === 0 && (
        <EditFile
          fileName={fileName}
          fileContent={fileContent}
          setFileName={setFileName}
          setFileContent={setFileContent}
        />
      )}
      {tab === 1 && (
        <FileInfo
          fileDescription={fileDescription}
          setFileDescription={setFileDescription}
        />
      )}
      {tab === 2 && <FileUpsert />}
    </>
  );
};
export default Files;
