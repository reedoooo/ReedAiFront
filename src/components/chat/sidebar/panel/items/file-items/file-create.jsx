import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import constants from 'config';
import { useChatStore } from 'contexts/ChatProvider';
import SidebarCreateItem from '../sidebar-items/sidebar-create-item';
const { FILE_DESCRIPTION_MAX, FILE_NAME_MAX, ACCEPTED_FILE_TYPES } = constants;
// import { ACCEPTED_FILE_TYPES } from '@/components/chat/chat-hooks/use-select-file-handler';
// import { SidebarCreateItem } from '@/components/sidebar/items/all/sidebar-create-item';
// import { useChatStore } from '@/context';

export const CreateFile = ({ isOpen, onOpenChange }) => {
  const { profile, selectedWorkspace } = useChatStore();

  const [name, setName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectedFile = async e => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    const fileNameWithoutExtension = file.name
      .split('.')
      .slice(0, -1)
      .join('.');
    setName(fileNameWithoutExtension);
  };

  if (!profile) return null;
  if (!selectedWorkspace) return null;

  return (
    <SidebarCreateItem
      contentType="files"
      createState={{
        file: selectedFile,
        user_id: profile.user_id,
        name,
        description,
        file_path: '',
        size: selectedFile?.size || 0,
        tokens: 0,
        type: selectedFile?.type || 0,
      }}
      isOpen={isOpen}
      isTyping={isTyping}
      onOpenChange={onOpenChange}
      renderInputs={() => (
        <>
          <div style={{ marginBottom: '16px' }}>
            <InputLabel>File</InputLabel>
            <Button variant="contained" component="label" sx={{ marginTop: 1 }}>
              Upload File
              <input
                type="file"
                hidden
                onChange={handleSelectedFile}
                accept={ACCEPTED_FILE_TYPES}
              />
            </Button>
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

export default CreateFile;
