import { Box, Card } from '@mui/material';
import { useState } from 'react';
import { chatFiles } from 'api/chat';

export function FileUpsert() {
  const [url, setUrl] = useState('');
  const [library, setLibrary] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await chatFiles.upsertData({ url, library });
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
      <Card style={{ width: '100%', borderRadius: '5px' }}>
        <div className="UpsertDocsForm">
          <h2>Upsert Documentation</h2>
          <form onSubmit={handleSubmit}>
            <label>
              URL:
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </label>
            <br />
            <label>
              Library:
              <input
                type="text"
                value={library}
                onChange={e => setLibrary(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </Card>
    </Box>
  );
}

export default FileUpsert;
