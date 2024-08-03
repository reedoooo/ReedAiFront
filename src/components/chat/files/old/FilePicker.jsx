// import { Description, Folder } from '@mui/icons-material';
// import { Box, IconButton, Input, Typography } from '@mui/material';
// import usePromptAndCommand from 'hooks/usePromptAndCommand';
// import PropTypes from 'prop-types';
// import React, { useEffect, useRef } from 'react';
// import { AttachFileIcon } from 'assets/humanIcons';
// import { useChatStore } from 'contexts/ChatProvider';
// import { useSelectFileHandler } from 'hooks/chat/useSelectFileHandler';
// import useMode from 'hooks/useMode';

// const FilePicker = ({
//   isOpen,
//   searchQuery,
//   onOpenChange,
//   selectedFileIds,
//   selectedCollectionIds,
//   onSelectFile,
//   onSelectCollection,
//   isFocused,
// }) => {
//   const { files, collections, setIsFilePickerOpen } = useChatStore();
//   const { handleInputChange } = usePromptAndCommand();
//   const { filesToAccept, handleSelectDeviceFile } = useSelectFileHandler();
//   const { theme } = useMode();
//   const itemsRef = useRef([]);
//   const fileInputRef = useRef();
//   useEffect(() => {
//     if (isFocused && itemsRef.current[0]) {
//       itemsRef.current[0].focus();
//     }
//   }, [isFocused]);

//   const filteredFiles = files?.filter(
//     file =>
//       file.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !selectedFileIds.includes(file.id)
//   );

//   const filteredCollections = collections?.filter(
//     collection =>
//       collection.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !selectedCollectionIds.includes(collection.id)
//   );

//   const handleOpenChange = isOpen => {
//     onOpenChange(isOpen);
//   };

//   const handleSelectFile = file => {
//     onSelectFile(file);
//     handleOpenChange(false);
//   };

//   const handleSelectCollection = collection => {
//     onSelectCollection(collection);
//     handleOpenChange(false);
//   };

//   const getKeyDownHandler = (index, type, item) => e => {
//     if (e.key === 'Escape') {
//       e.preventDefault();
//       setIsFilePickerOpen(false);
//     } else if (e.key === 'Enter') {
//       e.preventDefault();
//       if (type === 'file') {
//         handleSelectFile(item);
//       } else {
//         handleSelectCollection(item);
//       }
//     } else if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       const nextIndex = (index + 1) % itemsRef.current.length;
//       itemsRef.current[nextIndex]?.focus();
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       const prevIndex =
//         (index - 1 + itemsRef.current.length) % itemsRef.current.length;
//       itemsRef.current[prevIndex]?.focus();
//     }
//   };

//   return (
//     <>
//       <IconButton
//         onClick={() => fileInputRef.current?.click()}
//         style={{ color: theme.palette.primary.main, fontSize: 20 }}
//       >
//         <AttachFileIcon />
//       </IconButton>
//       <Input
//         inputRef={fileInputRef}
//         type="file"
//         multiple
//         style={{ display: 'none' }}
//         // onChange={event => {
//         //   handleFileChange(event);
//         //   setFileInput(event.target.files);
//         // }}
//         onChange={e => {
//           if (!e.target.files) return;
//           handleSelectDeviceFile(e.target.files[0]);
//         }}
//         accept=".json,.txt,.jsx,.js,.png,text/jsx,application/javascript"
//       />
//       {isOpen && (
//         <Box className="bg-background flex flex-col space-y-1 rounded-xl border-2 p-2 text-sm">
//           {filteredFiles?.length === 0 && filteredCollections?.length === 0 ? (
//             <Typography
//               variant="body1"
//               className="text-md flex h-14 cursor-pointer items-center justify-center italic"
//             >
//               No matching files.
//             </Typography>
//           ) : (
//             [...filteredFiles, ...filteredCollections].map((item, index) => (
//               <Box
//                 key={item.id}
//                 ref={ref => (itemsRef.current[index] = ref)}
//                 tabIndex={0}
//                 role="button"
//                 className="hover:bg-accent focus:bg-accent flex cursor-pointer items-center rounded p-2 focus:outline-none"
//                 onClick={() => {
//                   if ('type' in item) {
//                     handleSelectFile(item);
//                   } else {
//                     handleSelectCollection(item);
//                   }
//                 }}
//                 onKeyDown={getKeyDownHandler(
//                   index,
//                   'type' in item ? 'file' : 'collection',
//                   item
//                 )}
//               >
//                 {'type' in item ? (
//                   <Description fontSize="large" />
//                 ) : (
//                   <Folder fontSize="large" />
//                 )}
//                 <Box className="ml-3 flex flex-col">
//                   <Typography variant="subtitle1" className="font-bold">
//                     {item.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     className="truncate text-sm opacity-80"
//                   >
//                     {item.description || 'No description.'}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))
//           )}
//         </Box>
//       )}
//     </>
//   );
// };

// FilePicker.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   searchQuery: PropTypes.string.isRequired,
//   onOpenChange: PropTypes.func.isRequired,
//   selectedFileIds: PropTypes.array.isRequired,
//   selectedCollectionIds: PropTypes.array.isRequired,
//   onSelectFile: PropTypes.func.isRequired,
//   onSelectCollection: PropTypes.func.isRequired,
//   isFocused: PropTypes.bool.isRequired,
// };

// export default FilePicker;
