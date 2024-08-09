import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import File from './File';

export const FileDisplay = props => {
  const { files, hidden } = props;
  return (
    <Box
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
        zIndex: hidden ? 1 : 'auto',
      }}
    >
      {files?.map((file, index) => (
        <Box key={index} display="flex" alignItems="center" color={'#BDBDBD'}>
          <File file={file} hidden={hidden} />
        </Box>
      ))}
    </Box>
  );
};

FileDisplay.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FileDisplay;
