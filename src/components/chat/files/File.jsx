import { Box, IconButton, Typography } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { FileIcon } from '@/lib/fileUtils';
import { useFileProcesser } from 'hooks';

export const File = props => {
  const { file, hidden } = props;
  console.log('File:', file);
  const { handleRemoveFile } = useFileProcesser();
  const isImage =
    file.type === 'image' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/gif' ||
    file.type === 'image/webp' ||
    file.type === 'image/svg+xml';
  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius={2}
      border={1}
      borderColor="grey.300"
      p={1}
      width="100%"
      position="relative" // Make the parent container position relative
      maxWidth={400}
      maxHeight={200}
      sx={{
        '&:hover .delete-button': {
          visibility: 'visible',
        },
      }}
    >
      {isImage ? (
        <Box
          component="img"
          src={file?.data}
          alt={file.name}
          sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }}
        />
      ) : (
        <Box flexGrow={1} flexDirection="row" display="flex">
          <FileIcon
            sx={{ fontSize: 40, color: 'grey.600', mr: 2 }}
            type={file.type}
            size={40}
            iconColor="grey.400"
          />
          <Box flexGrow={1} flexDirection="row">
            <Typography variant="body2">{file.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              {file.size}
            </Typography>
          </Box>
        </Box>
      )}
      <IconButton
        className="delete-button"
        onClick={() => handleRemoveFile(file.id)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          visibility: 'hidden',
          zIndex: 10,
        }}
      >
        <FiX />
      </IconButton>
    </Box>
  );
};

export default File;
