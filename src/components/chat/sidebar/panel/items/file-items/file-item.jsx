import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { FileIcon } from '@/lib/fileUtils';
import constants from 'config';
import SidebarItem from '../sidebar-items/sidebar-display-item';
import { getFileFromStorage } from '../storage/files';
const { FILE_DESCRIPTION_MAX, FILE_NAME_MAX, ACCEPTED_FILE_TYPES } = constants;

export const FileItem = ({ file }) => {
  const [name, setName] = useState(file.name);
  const [isTyping, setIsTyping] = useState(false);
  const [description, setDescription] = useState(file.description);

  const getLinkAndView = async () => {
    const link = await getFileFromStorage(file.file_path);
    window.open(link, '_blank');
  };

  return (
    <SidebarItem
      item={file}
      isTyping={isTyping}
      contentType="files"
      icon={<FileIcon type={file.type} size={30} />}
      updateState={{ name, description }}
      renderInputs={() => (
        <>
          <Button
            variant="text"
            onClick={getLinkAndView}
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',
              ':hover': { opacity: 0.5 },
            }}
          >
            View {file.name}
          </Button>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div>{file.type}</div>
            <div>{formatFileSize(file.size)}</div>
            <div>{file.tokens.toLocaleString()} tokens</div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <InputLabel>Name</InputLabel>
            <TextField
              fullWidth
              placeholder="File name..."
              value={name}
              onChange={e => setName(e.target.value)}
              inputProps={{ maxLength: FILE_NAME_MAX }}
              variant="outlined"
              sx={{ marginTop: 1 }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <InputLabel>Description</InputLabel>
            <TextField
              fullWidth
              placeholder="File description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              inputProps={{ maxLength: FILE_DESCRIPTION_MAX }}
              variant="outlined"
              sx={{ marginTop: 1 }}
            />
          </div>
        </>
      )}
    />
  );
};

export const formatFileSize = sizeInBytes => {
  let size = sizeInBytes;
  let unit = 'bytes';

  if (size >= 1024) {
    size /= 1024;
    unit = 'KB';
  }

  if (size >= 1024) {
    size /= 1024;
    unit = 'MB';
  }

  if (size >= 1024) {
    size /= 1024;
    unit = 'GB';
  }

  return `${size.toFixed(2)} ${unit}`;
};

export default FileItem;
