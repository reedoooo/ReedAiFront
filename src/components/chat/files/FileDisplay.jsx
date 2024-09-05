import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import File from './File';

export const FileDisplay = props => {
  const { files, hidden } = props;
  const [validFiles, setValidFiles] = useState([]);

  // Effect to filter valid files
  useEffect(() => {
    const filteredFiles = files.filter(file => file && file.name && file.data);
    setValidFiles(filteredFiles);
  }, [files]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {validFiles.map(file => (
        <File key={file.name} file={file} hidden={hidden} />
      ))}
    </Box>
  );
};

FileDisplay.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FileDisplay;
