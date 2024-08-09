import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Input } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DarkIconBox } from 'assets/humanIcons/utils';
import { useFileProcesser } from 'hooks/chat';
import { ChatMessageIconContainer } from '../styled';

export const FileUploadButton = () => {
  const { handleSelectDeviceFile, fileInputRef } = useFileProcesser();
  const theme = useTheme();

  const handleOpenFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = event => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    handleSelectDeviceFile(file);
  };

  return (
    <>
      <DarkIconBox
        icon={
          <ChatMessageIconContainer
            onClick={handleOpenFileSelector}
            theme={theme}
          >
            <AttachFileIcon />
          </ChatMessageIconContainer>
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
