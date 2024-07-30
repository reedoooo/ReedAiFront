import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { debounce } from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useTipTapEditor from 'hooks/useTipTapEditor';
import { preprocessImage } from 'utils/files/main';
import FilePreview from './FilePreview';

export const TEXT_MIME_TYPES = [
  'text/plain',
  'text/csv',
  'text/html',
  'text/css',
  'text/javascript',
  'text/xml',
  'application/json',
  'text/markdown',
];
export const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];
export const SNIPPET_MARKERS = {
  begin: '----BEGIN-SNIPPET----',
  end: '----END-SNIPPET----',
};
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/plain',
];

export const insertTextAtCursorPosition = (editor, text) => {
  if (editor) {
    editor.commands.insertContent(text);
  }
};

export const handleTextFile = (file, editor) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const textContent = reader.result;
    const formattedText = `File: ${file.name}:\n${SNIPPET_MARKERS.begin}\n${textContent}\n${SNIPPET_MARKERS.end}\n`;
    insertTextAtCursorPosition(editor, formattedText);
    if (editor) {
      editor.commands.focus();
      editor.commands.setTextSelection(editor.state.doc.content.size);
    }
  };
  reader.onerror = errorEvent => {
    console.error('File reading error:', errorEvent.target?.error);
  };
  reader.readAsText(file);
};

export const handleImageFile = (file, fileDataRef, setUploadedFiles) => {
  if (fileDataRef.current.length >= 5) {
    // Show an error message that max 5 files are allowed
    return;
  }

  const fileData = {
    data: URL.createObjectURL(file),
    type: file.type,
    source: 'filename',
    filename: file.name,
  };
  fileDataRef.current = [...fileDataRef.current, fileData];
  setUploadedFiles(prevFiles => [...prevFiles, fileData]);
};

export const handleFiles = (files, editor, fileDataRef, setUploadedFiles) => {
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      handleImageFile(file, fileDataRef, setUploadedFiles);
    } else if (file.type.startsWith('text/')) {
      handleTextFile(file, editor);
    }
  });
};

export const FileUpload = ({ sessionId, showUploaderButton, iconStyle }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // const messageImages = [
  //   ...newMessageImages.filter(
  //     image =>
  //       !chatImages.some(chatImage => chatImage.messageId === image.messageId)
  //   ),
  // ];

  // const combinedChatFiles = [
  //   ...newMessageFiles.filter(
  //     file => !chatFiles.some(chatFile => chatFile.id === file.id)
  //   ),
  //   ...chatFiles,
  // ];

  const handleFileChange = useCallback(
    debounce(event => {
      const files = Array.from(event.target.files);
      const validFiles = files.filter(
        file =>
          file.size <= MAX_FILE_SIZE && ALLOWED_FILE_TYPES.includes(file.type)
      );
      setSelectedFiles(validFiles);
    }, 300),
    []
  );

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const response = await axios.post(
        '/api/upload/multi-type-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress({
              ...uploadProgress,
              [selectedFiles[0].name]: progress,
            });
          },
        }
      );

      if (response.status === 200) {
        setUploadedFiles([...uploadedFiles, ...selectedFiles]);
        setSelectedFiles([]);
        setUploadProgress({});
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  // const handleRemove = file => {
  //   console.log('remove', file);
  //   if (file.url) {
  //     const url = fileUrl(file);
  //     // Simulate file delete mutation
  //     request.delete(url).then(() => {
  //       setFileListData(fileListData.filter(f => f.url !== file.url));
  //     });
  //   }
  // };

  // const handleDownload = async file => {
  //   console.log('download', file);
  //   const url = fileUrl(file);
  //   const response = await request.get(url, {
  //     responseType: 'blob', // Important: set the response type to blob
  //   });
  //   const blob = new Blob([response.data], {
  //     type: 'application/octet-stream',
  //   });
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = file.name;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   return false; // Cancel original download
  // };

  // const fileUrl = file => {
  //   const file_id = file.url?.split('/').pop();
  //   const url = `/download/${file_id}`;
  //   return url;
  // };
  const handleRemove = file => {
    setSelectedFiles(prevFiles => prevFiles.filter(f => f !== file));
    setUploadedFiles(prevFiles => prevFiles.filter(f => f !== file));
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const previewFiles = useMemo(
    () =>
      selectedFiles.map(file => (
        <FilePreview
          key={file.name}
          file={file}
          onRemove={() => handleRemove(file)}
        />
      )),
    [selectedFiles]
  );

  const uploadedFilesList = useMemo(
    () => uploadedFiles.map(file => <div key={file.name}>{file.name}</div>),
    [uploadedFiles]
  );

  return (
    <>
      {showUploaderButton && (
        <IconButton onClick={handleClick} style={iconStyle}>
          <AttachFileIcon />
        </IconButton>
      )}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {previewFiles}

      {Object.keys(uploadProgress).length > 0 && (
        <div>
          <Typography variant="h6">Upload Progress:</Typography>
          {Object.keys(uploadProgress).map((fileName, index) => (
            <div key={index}>
              <Typography>{fileName}</Typography>
              <CircularProgress
                variant="determinate"
                value={uploadProgress[fileName]}
              />
            </div>
          ))}
        </div>
      )}
      {uploadedFiles.length > 0 && (
        <div>
          <h3>Uploaded Files:</h3>
          {uploadedFiles.map(file => (
            <div key={file.name}>{file.name}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default FileUpload;
