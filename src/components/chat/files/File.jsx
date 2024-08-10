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
      position="relative" // Make the parent container position relative
      color={'#BDBDBD'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItem: hidden ? 'flex-start' : 'center', // Align items differently based on state
        p: hidden ? 0.5 : 1,
        width: hidden ? 'auto' : '100%',
        maxWidth: hidden ? 'auto' : 400,
        maxHeight: hidden ? 'auto' : 200,
        ml: hidden ? '-48px' : 0,
        '&:hover .delete-button': {
          visibility: 'visible',
        },
        borderRadius: 2,
        zIndex: hidden ? 1 : 'auto',
        border: '1px solid #BDBDBD',
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
          {!hidden && (
            <Box flexGrow={1} flexDirection="row" height={20}>
              <Typography variant="body2">{file.name}</Typography>
              {/* <Typography variant="caption" color="textSecondary">
                {file.size}
              </Typography> */}
            </Box>
          )}
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
