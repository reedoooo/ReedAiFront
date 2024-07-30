// src/components/FileViewer.js
import React, { useState, useEffect } from 'react';
import fetchFile from 'api/utils';

const FileViewer = ({ filePath }) => {
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const url = await fetchFile(filePath);
        setFileUrl(url);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFileData();
  }, [filePath]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Display different content based on file type (image, PDF, etc.)
  if (
    filePath.endsWith('.png') ||
    filePath.endsWith('.jpg') ||
    filePath.endsWith('.jpeg')
  ) {
    return <img src={fileUrl} alt="File content" />;
  } else if (filePath.endsWith('.pdf')) {
    return (
      <iframe
        src={fileUrl}
        title="File content"
        width="100%"
        height="500px"
      ></iframe>
    );
  } else {
    return (
      <a href={fileUrl} download>
        Download File
      </a>
    );
  }
};

export default FileViewer;
