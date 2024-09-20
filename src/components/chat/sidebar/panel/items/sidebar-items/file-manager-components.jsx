import { TextField, Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { RCDialog } from 'components/themed';

export const ErrorMessage = ({ error }) => (
  <AnimatePresence>
    {error && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        style={{ color: 'red', marginTop: '5px' }}
      >
        {error}
      </motion.div>
    )}
  </AnimatePresence>
);

export const FileUploadTextField = ({
  value,
  onChange,
  fileInputRef,
  existingNames,
  handleFileUpload,
}) => {
  const handleTextFieldClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <TextField
        fullWidth
        value={value}
        onClick={handleTextFieldClick}
        placeholder="Select a file"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <Button
              variant="contained"
              component="span"
              onClick={handleTextFieldClick}
            >
              Upload
            </Button>
          ),
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </>
  );
};
export const FileCreationContent = ({
  existingNames,
  setExistingNames,
  handleFileUpload,
  handleNameChange,
}) => {
  return (
    <TextField
      fullWidth
      margin="dense"
      label="File Name"
      placeholder="Enter file name"
      value={existingNames[0]}
      onChange={e => handleNameChange(e.target.value)}
    />
  );
};
export const AssistantCreationContent = ({
  assistantName,
  setAssistantName,
}) => {
  return (
    <TextField
      fullWidth
      margin="dense"
      label="Assistant Name"
      placeholder="Enter assistant name"
      value={assistantName}
      onChange={e => setAssistantName(e.target.value)}
    />
  );
};
export const PromptCreationContent = ({ promptText, setPromptText }) => {
  return (
    <TextField
      fullWidth
      margin="dense"
      label="Prompt Text"
      placeholder="Enter prompt text"
      value={promptText}
      onChange={e => setPromptText(e.target.value)}
    />
  );
};
export const ChatSessionCreationContent = ({
  chatSessionName,
  setChatSessionName,
}) => {
  return (
    <TextField
      fullWidth
      margin="dense"
      label="Chat Session Name"
      placeholder="Enter chat session name"
      value={chatSessionName}
      onChange={e => setChatSessionName(e.target.value)}
    />
  );
};
const ContentTextField = ({ label, value, onChange, placeholder }) => (
  <TextField
    fullWidth
    margin="dense"
    label={label}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);
export const NewFileDialog = ({
  newFileDialog,
  handleCloseNewFileDialog,
  newFileName,
  setNewFileName,
  fileInputRef,
  existingNames,
  handleFileUpload,
  handleNewFileNameChange,
  fileNameError,
  handleCreateNewFile,
  fileToUpload,
  space,
}) => {
  console.log(`NEW ${space} DIALOG`);
  const dialogConfig = {
    files: {
      title: 'Create New File',
      actionText: fileToUpload ? 'Upload' : 'Create',
      content: (
        <>
          <FileUploadTextField
            value={newFileName}
            onChange={setNewFileName}
            fileInputRef={fileInputRef}
            existingNames={existingNames}
            handleFileUpload={handleFileUpload}
          />
          <ContentTextField
            label="File Name"
            value={newFileName}
            onChange={handleNewFileNameChange}
            placeholder="Enter file name"
          />
        </>
      ),
    },
    assistants: {
      title: 'Create Assistant',
      actionText: 'Create Assistant',
      content: (
        <ContentTextField
          label="Assistant Name"
          value={newFileName}
          onChange={setNewFileName}
          placeholder="Enter assistant name"
        />
      ),
    },
    prompts: {
      title: 'Create Prompt',
      actionText: 'Create Prompt',
      content: (
        <ContentTextField
          label="Prompt Text"
          value={newFileName}
          onChange={setNewFileName}
          placeholder="Enter prompt text"
        />
      ),
    },
    'chat sessions': {
      title: 'Create Chat Session',
      actionText: 'Create Chat Session',
      content: (
        <ContentTextField
          label="Chat Session Name"
          value={newFileName}
          onChange={setNewFileName}
          placeholder="Enter chat session name"
        />
      ),
    },
  };
  const { title, actionText, content } = dialogConfig[space] || {
    title: 'Create Item',
    actionText: 'Create',
    content: <p>Unknown space type.</p>,
  };
  // switch (space) {
  //   case 'files':
  //     dialogTitle = 'Create New File';
  //     actionText = fileToUpload ? 'Upload' : 'Create';
  //     content = (
  //       <FileCreationContent
  //         newFileName={newFileName}
  //         setNewFileName={setNewFileName}
  //         fileInputRef={fileInputRef}
  //         existingNames={existingNames}
  //         handleFileUpload={handleFileUpload}
  //         handleNewFileNameChange={handleNewFileNameChange}
  //         fileNameError={fileNameError}
  //       />
  //     );
  //     break;

  //   case 'assistants':
  //     dialogTitle = 'Create Assistant';
  //     actionText = 'Create Assistant';
  //     content = (
  //       <AssistantCreationContent
  //         assistantName={assistantName}
  //         setAssistantName={setAssistantName}
  //       />
  //     );
  //     break;

  //   case 'prompts':
  //     dialogTitle = 'Create Prompt';
  //     actionText = 'Create Prompt';
  //     content = (
  //       <PromptCreationContent
  //         promptText={promptText}
  //         setPromptText={setPromptText}
  //       />
  //     );
  //     break;

  //   case 'chat sessions':
  //     dialogTitle = 'Create Chat Session';
  //     actionText = 'Create Chat Session';
  //     content = (
  //       <ChatSessionCreationContent
  //         chatSessionName={chatSessionName}
  //         setChatSessionName={setChatSessionName}
  //       />
  //     );
  //     break;

  //   default:
  //     dialogTitle = 'Create Item';
  //     actionText = 'Create';
  //     content = <p>Unknown space type.</p>;
  //     break;
  // }
  return (
    <RCDialog
      open={newFileDialog.open}
      onClose={handleCloseNewFileDialog}
      title="Create New File"
      content={
        <>
          <FileUploadTextField
            value={newFileName}
            onChange={setNewFileName}
            fileInputRef={fileInputRef}
            existingNames={existingNames}
            handleFileUpload={handleFileUpload}
          />
          <TextField
            fullWidth
            margin="dense"
            label="File Name"
            placeholder="Enter file name"
            // defaultValue={fileToUpload ? fileToUpload.name : ''}
            value={newFileName}
            onChange={handleNewFileNameChange}
            error={!!fileNameError}
            helperText={fileNameError}
          />
        </>
      }
      actions={
        <>
          <Button onClick={handleCloseNewFileDialog}>Cancel</Button>
          <Button
            onClick={handleCreateNewFile}
            disabled={!newFileName || !!fileNameError}
          >
            {fileToUpload ? 'Upload' : 'Create'}
          </Button>
        </>
      }
    />
  );
};

export const NewFolderDialog = ({
  newFolderDialog,
  handleCloseNewFolderDialog,
  newFolderName,
  handleNewFolderNameChange,
  folderNameError,
  handleCreateNewFolder,
}) => {
  return (
    <RCDialog
      open={newFolderDialog.open}
      onClose={handleCloseNewFolderDialog}
      title="Create New Folder"
      content={
        <>
          <TextField
            margin="dense"
            label="Folder Name"
            placeholder="Enter folder name"
            fullWidth
            value={newFolderName}
            onChange={handleNewFolderNameChange}
            error={!!folderNameError}
            helperText={folderNameError}
          />
          <ErrorMessage error={folderNameError} />
        </>
      }
      actions={
        <>
          <Button onClick={handleCloseNewFolderDialog}>Cancel</Button>
          <Button
            onClick={handleCreateNewFolder}
            disabled={!!folderNameError || !newFolderName}
          >
            Create
          </Button>
        </>
      }
    />
  );
};
