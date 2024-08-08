// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import {
//   Box,
//   CircularProgress,
//   IconButton,
//   Input,
//   styled,
//   Typography,
// } from '@mui/material';
// import React, { useCallback, useEffect, useRef, useState } from 'react';

// import { processFile } from '@/lib/fileUtils';
// import FilePreview from 'components/chat/files/FilePreview';
// import {
//   FileItemsPreviewContainer,
//   SelectedFileItemsContainer,
// } from 'components/chat/styled';
// import { useChatStore } from 'contexts/ChatProvider';

// export const FileUpload = ({ iconStyle, setFileInput, editor }) => {
//   const {
//     state: { isFilePickerOpen, selectedFiles, previewUrls, uploadedFiles },
//     actions: {
//       setIsFilePickerOpen,
//       setSelectedFiles,
//       setPreviewUrls,
//       setUploadedFiles,
//     },
//   } = useChatStore();
//   const fileInputRef = useRef();

//   // useEffect(() => {
//   //   if (!selectedFiles.length) {
//   //     return;
//   //   }
//   //   const reader = new FileReader();
//   //   reader.onloadend = () => {
//   //     console.log('Preview URL:', reader.result);
//   //     setPreviewUrls(prevUrls => [...prevUrls, reader.result]);
//   //   };
//   //   reader.readAsDataURL(selectedFiles[0]);
//   // }, [selectedFiles]);
//   // useEffect(() => {
//   //   if (!selectedFiles.length) {
//   //     return;
//   //   }
//   //   const reader = new FileReader();
//   //   reader.onloadend = () => {
//   //     // console.log('Preview URL:', reader.result);
//   //     // Instead of passing a function, directly dispatch the new array of URLs
//   //     const newPreviewUrls = [reader.result];
//   //     setPreviewUrls(newPreviewUrls); // Dispatch the action with the updated URLs
//   //   };
//   //   reader.readAsDataURL(selectedFiles[0]);
//   // }, [selectedFiles, previewUrls, setPreviewUrls]);

//   // const handleFileChange = async (
//   //   event,
//   //   editor,
//   //   fileDataRef,
//   //   setUploadedFiles
//   // ) => {
//   //   let files = Array.from(event.target.files);
//   //   if (!Array.isArray(files)) {
//   //     files = [files];
//   //   }
//   //   console.log('Selected files:', files);
//   //   // const validFiles = files.filter(file => {
//   //   //   const isAllowedType =
//   //   //     ALLOWED_FILE_TYPES.includes(file.type) ||
//   //   //     file.name.endsWith('.jsx') ||
//   //   //     file.name.endsWith('.js');
//   //   //   return file.size <= MAX_FILE_SIZE && isAllowedType;
//   //   // });
//   //   console.log('Valid files:', files);
//   //   setSelectedFiles(prevFiles => [...prevFiles, ...files]);
//   //   setUploadedFiles(prevFiles => [...prevFiles, ...files]);
//   //   for (const file of files) {
//   //     await processFile(file, editor, fileInputRef, setUploadedFiles);
//   //   }
//   // };
//   const handleFileChange = event => {
//     const files = Array.from(event.target.files);
//     setSelectedFiles(files);
//     setUploadedFiles(files);
//   };
//   const handleClick = () => {
//     if (fileInputRef.current) {
//       setIsFilePickerOpen(true);
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <>
//       <IconButton onClick={handleClick} style={iconStyle}>
//         <AttachFileIcon />
//       </IconButton>
//       <Input
//         inputRef={fileInputRef}
//         type="file"
//         multiple
//         style={{ display: 'none' }}
//         onChange={event => {
//           handleFileChange(event);
//           setFileInput(event.target.files);
//         }}
//         accept=".json,.txt,.jsx,.js,.png,text/jsx,application/javascript"
//       />
//       {/* {isFilePickerOpen && (
//         <SelectedFileItemsContainer>
//           {selectedFiles.length === 0 ? (
//             <Box
//               sx={{
//                 display: 'flex',
//                 height: '56px',
//                 cursor: 'pointer',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontStyle: 'italic',
//                 '&:hover': { opacity: 0.5 },
//               }}
//             >
//               <Typography variant="body1">No files selected.</Typography>
//             </Box>
//           ) : (
//             selectedFiles?.map((file, index) => (
//               <FileItemsPreviewContainer
//                 key={index}
//                 tabIndex={0}
//                 onClick={() => handleRemove(file)}
//               >
//                 <FilePreview file={file} />
//               </FileItemsPreviewContainer>
//             ))
//           )}
//         </SelectedFileItemsContainer>
//       )} */}

//       {/* {Object.keys(uploadProgress).length > 0 && (
//         <div>
//           <Typography variant="h6">Upload Progress:</Typography>
//           {Object.keys(uploadProgress).map((fileName, index) => (
//             <div key={index}>
//               <Typography>{fileName}</Typography>
//               <CircularProgress
//                 variant="determinate"
//                 value={uploadProgress[fileName]}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {uploadedFiles.length > 0 && (
//         <div>
//           <Typography variant="h6">Uploaded Files:</Typography>
//           {uploadedFiles.map(file => (
//             <div key={file.name}>{file.name}</div>
//           ))}
//         </div>
//       )} */}
//     </>
//   );
// };

// export default FileUpload;
