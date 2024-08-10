import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Input } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DarkIconBox } from 'assets/humanIcons/utils';
import { useChatStore } from 'contexts';
import { useFileProcesser } from 'hooks';
import { ChatMessageIconContainer } from '../styled';

export const FileUploadButton = () => {
  const theme = useTheme();
  const chatStore = useChatStore();
  const { files, showFilesDisplay } = chatStore.state;
  const { setFiles, setShowFilesDisplay } = chatStore.actions;
  const { handleSelectDeviceFile, fileInputRef } = useFileProcesser();

  const handleOpenFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async event => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file && !files.find(f => f.name === file.name)) {
      await handleSelectDeviceFile(file);
    }
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
