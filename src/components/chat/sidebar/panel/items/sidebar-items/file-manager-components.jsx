import { TextField, Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { RCDialog } from 'components/themed';

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
}) => {
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
