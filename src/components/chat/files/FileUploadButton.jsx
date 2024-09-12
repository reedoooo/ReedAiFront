import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Input } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DarkIconBox } from 'assets/humanIcons/utils';
import { useChatStore } from 'contexts';
import { useFileProcesser } from 'hooks';
import { ChatMessageIconContainer } from '../styled';

export const FileUploadButton = props => {
  const theme = useTheme();
  const chatStore = useChatStore();
  const { handleSelectDeviceFile, fileInputRef, filesToAccept } =
    useFileProcesser();

  const handleFileChange = async event => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file && !props.files.find(f => f.name === file.name)) {
      await handleSelectDeviceFile(file, true);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <DarkIconBox
        icon={
          <ChatMessageIconContainer onClick={handleIconClick} theme={theme}>
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
        inputProps={{
          accept:
            '.pdf,.doc,.docx,.txt,.json,.jsx,.js,.png,text/jsx,application/javascript',
        }}
      />
    </>
  );
};

export default FileUploadButton;
