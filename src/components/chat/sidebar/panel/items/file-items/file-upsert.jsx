import { Box, Card, Divider, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { attachmentsApi } from 'api/Ai/chat-sessions';
import { TextAreaAutosizeSection, TextFieldSection } from 'components/themed';
import { useUserStore } from 'contexts/UserProvider';

export function FileUpsert() {
  const {
    state: {
      user: { folders },
    },
  } = useUserStore();
  const fileFolder = folders.find(folder => folder.type === 'files');
  const [url, setUrl] = useState('');
  const [library, setLibrary] = useState('');
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  const reactUILibraries = [
    'Material-UI (MUI)',
    'ShadCn',
    'Chakra UI',
    'Ant Design',
    'React Bootstrap',
    'Semantic UI React',
    'Tailwind CSS',
    'Styled Components',
    'Rebass',
    'Reactstrap',
    'Blueprint',
  ];
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await attachmentsApi.upsertFileData({
        url,
        library,
        description,
        workspaceId: sessionStorage.getItem('workspaceId'),
        folderId: fileFolder._id,
      });
      console.log('RESPONSE:', response);
      setMessage(response);
    } catch (error) {
      console.error(error);
      setMessage('Error upserting documentation.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <div className="UpsertDocsForm">
        <h2>Upsert Documentation</h2>
        <form onSubmit={handleSubmit}>
          <TextFieldSection
            label="Library Component URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            variant="darkMode"
            fullWidth
          />
          <Divider sx={{ my: 2 }} />
          <TextField
            select
            label="Library"
            value={library}
            onChange={e => setLibrary(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            {reactUILibraries.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Divider sx={{ my: 2 }} />
          <TextAreaAutosizeSection
            label="File Content"
            minRows={3}
            maxRows={5}
            placeholder="File content..."
            variant="darkMode"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Divider sx={{ my: 2 }} />
          <button type="submit">Submit</button>
        </form>
      </div>
      {message && <p>{message}</p>}
    </Box>
  );
}

export default FileUpsert;
