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
      }}
    >
      {files?.map((file, index) => (
        <File key={file.name} file={file} hidden={hidden} />
      ))}
    </Box>
  );
};

FileDisplay.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FileDisplay;
