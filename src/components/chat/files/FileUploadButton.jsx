import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton, Input } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { uniqueId } from 'lodash';
import React, { useRef } from 'react';
import IconBox from 'assets/humanIcons/utils/IconBox';
import { useFileProcesser } from 'hooks/chat/useFileProcesser';

export const FileUploadButton = ({ files, setFiles }) => {
  const { handleSelectDeviceFile, fileInputRef } = useFileProcesser();
  const theme = useTheme();

  const handleOpenFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = event => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    handleSelectDeviceFile(file);
    // console.log('FILE CHANGED: ', file);
    // setFiles(prev => [...prev, event.target.files[0]]);
    // const newFile = {
    //   id: uniqueId(file),
    //   name: event.target.files[0].name,
    //   type: event.target.files[0].type,
    //   size: `${(file.size / 1024).toFixed(1)} KB`,
    //   // content: file,
    // };
    // setFiles([...files, newFile]);
    // setFiles(prev => [
    //   ...prev,
    // ]);
  };

  return (
    <>
      <IconBox
        icon={
          <IconButton
            onClick={handleOpenFileSelector}
            style={{ color: theme.palette.primary.main, fontSize: 20 }}
          >
            <AttachFileIcon />
          </IconButton>
        }
      />

      <Input
        inputRef={fileInputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".json,.txt,.jsx,.js,.png,text/jsx,application/javascript"
      />
    </>
  );
};

export default FileUploadButton;
