import { Close as IconX } from '@mui/icons-material'; // Use your specific icon import here
import {
  Button,
  IconButton,
  Grid,
  Card,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import Image from 'mui-image';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Close icon from a different library
import {
  FaFilePdf,
  FaFileCsv,
  FaFileWord,
  FaFileAlt,
  FaFileCode,
  FaFileMarkdown,
  FaSpinner,
} from 'react-icons/fa'; // Using react-icons for document type icons
import { attachmentsApi } from 'api/Ai/chat-sessions';
import { useChatStore } from 'contexts/ChatProvider';

export const ChatFilesDisplay = () => {
  const {
    state: {
      files: emiFiles,
      newMessageImages,
      newMessageFiles,
      showFilesDisplay,
      chatFiles,
      chatImages,
    },
    actions: {
      setNewMessageImages,
      setNewMessageFiles,
      setShowFilesDisplay,
      setChatImages,
      setChatFiles,
      setUseRetrieval,
    },
  } = useChatStore();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [files, setFiles] = useState(prev => prev.concat(emiFiles));
  const [loading, setLoading] = useState(true);
  const fileCache = useRef(new Map());

  const messageImages = useMemo(
    () =>
      newMessageImages.filter(
        image =>
          !chatImages.some(chatImage => chatImage.messageId === image.messageId)
      ),
    [newMessageImages, chatImages]
  );

  const combinedChatFiles = useMemo(
    () => [
      ...newMessageFiles.filter(
        file => !chatFiles.some(chatFile => chatFile.id === file.id)
      ),
      ...chatFiles,
    ],
    [newMessageFiles, chatFiles]
  );

  const getFileFromStorage = async filePath => {
    if (fileCache.current.has(filePath)) {
      return fileCache.current.get(filePath);
    }
    const response = await fetch(`/api/chat/files/${filePath}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    fileCache.current.set(filePath, url);
    return url;
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await attachmentsApi.getAllStorageFiles();
        setFiles(prev => [...prev, ...res.data]);
      } catch (err) {
        console.error('Error fetching files:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const getLinkAndView = async file => {
    const fileRecord = files.find(f => f._id === file._id);
    if (!fileRecord) return;
    try {
      const link = await getFileFromStorage(fileRecord.filePath);
      window.open(link, '_blank');
    } catch (error) {
      console.error('Error fetching the file: ', error);
      alert('There was an issue opening the file. Please try again later.');
    }
  };

  const getFileExtension = fileType => {
    return fileType.includes('/') ? fileType.split('/')[1] : fileType;
  };

  const renderFileIcon = fileType => {
    const extension = getFileExtension(fileType);
    switch (extension) {
      case 'pdf':
        return <FaFilePdf />;
      case 'markdown':
        return <FaFileMarkdown />;
      case 'txt':
        return <FaFileAlt />;
      case 'json':
        return <FaFileCode />;
      case 'csv':
        return <FaFileCsv />;
      case 'docx':
        return <FaFileWord />;
      default:
        return <FaFileAlt />;
    }
  };

  const FileItem = ({ file, onClick, onRemove }) => (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        height: 64,
        cursor: 'pointer',
        alignItems: 'center',
        gap: 4,
        borderRadius: 2,
        border: '2px solid',
        px: 4,
        py: 3,
        '&:hover': {
          opacity: 0.5,
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          backgroundColor: 'blue.500',
          p: 2,
          borderRadius: 1,
        }}
      >
        {renderFileIcon(file.type)}
      </Box>
      <Typography variant="body2" noWrap>
        {file.name}
      </Typography>
      <IconButton
        sx={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          backgroundColor: 'muted',
          border: '1px solid',
          borderColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'white',
            borderColor: 'red.500',
            color: 'red.500',
          },
        }}
        size="small"
        onClick={e => {
          e.stopPropagation();
          onRemove(file);
        }}
      >
        <IconX fontSize="small" />
      </IconButton>
    </Box>
  );

  if (!showFilesDisplay) return null;

  return (
    showFilesDisplay && (
      <Grid container spacing={2}>
        {showPreview && selectedImage && (
          <Dialog open={showPreview} onClose={() => setShowPreview(false)}>
            <DialogContent>
              <Image
                src={selectedImage.base64}
                alt="Preview"
                width={56}
                height={56}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowPreview(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}

        {showPreview && selectedFile && (
          <Dialog open={showPreview} onClose={() => setShowPreview(false)}>
            <DialogTitle>File Preview</DialogTitle>
            <DialogContent>{selectedFile.name}</DialogContent>
            <DialogActions>
              <Button onClick={() => setShowPreview(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}

        <Box sx={{ overflow: 'auto' }}>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            {messageImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Avatar
                  src={image.base64}
                  alt="File image"
                  sx={{ width: 56, height: 56 }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-6px',
                    backgroundColor: 'muted',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: 'red.500',
                    },
                  }}
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    setNewMessageImages(
                      newMessageImages.filter(
                        f => f.messageId !== image.messageId
                      )
                    );
                    setChatImages(
                      chatImages.filter(f => f.messageId !== image.messageId)
                    );
                  }}
                >
                  <IconX fontSize="small" />
                </IconButton>
              </Grid>
            ))}

            {combinedChatFiles.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FileItem
                  file={file}
                  onClick={() => getLinkAndView(file)}
                  onRemove={() =>
                    setNewMessageFiles(
                      newMessageFiles.filter(f => f.id !== file.id)
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    )
  );
};
