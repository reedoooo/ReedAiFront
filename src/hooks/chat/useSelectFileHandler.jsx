// import mammoth from 'mammoth';
// import { useEffect, useState } from 'react';
// import { toast } from 'sonner';
// import constants from 'config/constants';
// import { useChatStore } from 'contexts/ChatProvider';
// import { useCreateFileHandler } from './useCreateFileHandler';
// export const ACCEPTED_FILE_TYPES = [
//   'text/csv',
//   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//   'application/json',
//   'text/markdown',
//   'application/pdf',
//   'text/plain',
// ].join(',');

// const { OPENAI_ACCEPTED_FILE_TYPES } = constants;

// export const useSelectFileHandler = () => {
//   const {
//     selectedWorkspace,
//     profile,
//     chatSettings,
//     setNewMessageImages,
//     setNewMessageFiles,
//     setShowFilesDisplay,
//     setFiles,
//     setUseRetrieval,
//   } = useChatStore();
//   const { createFile, createDocXFile } = useCreateFileHandler();
//   const [filesToAccept, setFilesToAccept] = useState(ACCEPTED_FILE_TYPES);

//   useEffect(() => {
//     handleFilesToAccept();
//   }, [chatSettings?.model]);

//   const handleFilesToAccept = () => {
//     const ACCEPTED_FILE_TYPES = [
//       ...OPENAI_ACCEPTED_FILE_TYPES.text,
//       ...OPENAI_ACCEPTED_FILE_TYPES.audio,
//       ...OPENAI_ACCEPTED_FILE_TYPES.video,
//     ];

//     ACCEPTED_FILE_TYPES.push(...OPENAI_ACCEPTED_FILE_TYPES.image, 'image/*');

//     setFilesToAccept(ACCEPTED_FILE_TYPES.join(','));
//   };

//   const handleSelectDeviceFile = async file => {
//     if (!profile || !selectedWorkspace || !chatSettings) return;

//     setShowFilesDisplay(true);
//     setUseRetrieval(true);

//     if (file) {
//       let simplifiedFileType = file.type.split('/')[1];

//       let reader = new FileReader();

//       if (file.type.includes('image')) {
//         reader.readAsDataURL(file);
//       } else if (ACCEPTED_FILE_TYPES.split(',').includes(file.type)) {
//         if (simplifiedFileType.includes('vnd.adobe.pdf')) {
//           simplifiedFileType = 'pdf';
//         } else if (
//           simplifiedFileType.includes(
//             'vnd.openxmlformats-officedocument.wordprocessingml.document'
//           ) ||
//           simplifiedFileType === 'docx'
//         ) {
//           simplifiedFileType = 'docx';
//         }

//         setNewMessageFiles(prev => [
//           ...prev,
//           {
//             id: 'loading',
//             name: file.name,
//             type: simplifiedFileType,
//             file: file,
//           },
//         ]);

//         if (simplifiedFileType === 'docx') {
//           const arrayBuffer = await file.arrayBuffer();
//           const result = await mammoth.extractRawText({ arrayBuffer });

//           const createdFile = await createDocXFile(
//             result.value,
//             file,
//             {
//               user_id: profile.user_id,
//               description: '',
//               file_path: '',
//               name: file.name,
//               size: file.size,
//               tokens: 0,
//               type: simplifiedFileType,
//             },
//             selectedWorkspace.id,
//             chatSettings.embeddingsProvider
//           );

//           setFiles(prev => [...prev, createdFile]);

//           setNewMessageFiles(prev =>
//             prev.map(item =>
//               item.id === 'loading'
//                 ? {
//                     id: createdFile.id,
//                     name: createdFile.name,
//                     type: createdFile.type,
//                     file: file,
//                   }
//                 : item
//             )
//           );

//           reader.onloadend = null;
//           return;
//         } else {
//           file.type.includes('pdf')
//             ? reader.readAsArrayBuffer(file)
//             : reader.readAsText(file);
//         }
//       } else {
//         throw new Error('Unsupported file type');
//       }

//       reader.onloadend = async function () {
//         try {
//           if (file.type.includes('image')) {
//             const imageUrl = URL.createObjectURL(file);

//             setNewMessageImages(prev => [
//               ...prev,
//               {
//                 messageId: 'temp',
//                 path: '',
//                 base64: reader.result,
//                 url: imageUrl,
//                 file,
//               },
//             ]);
//           } else {
//             const createdFile = await createFile(
//               file,
//               {
//                 user_id: profile.user_id,
//                 description: '',
//                 file_path: '',
//                 name: file.name,
//                 size: file.size,
//                 tokens: 0,
//                 type: simplifiedFileType,
//               },
//               selectedWorkspace.id,
//               chatSettings.embeddingsProvider
//             );

//             setFiles(prev => [...prev, createdFile]);

//             setNewMessageFiles(prev =>
//               prev.map(item =>
//                 item.id === 'loading'
//                   ? {
//                       id: createdFile.id,
//                       name: createdFile.name,
//                       type: createdFile.type,
//                       file: file,
//                     }
//                   : item
//               )
//             );
//           }
//         } catch (error) {
//           toast.error(`Failed to upload. ${error.message}`, {
//             duration: 10000,
//           });
//           setNewMessageImages(prev =>
//             prev.filter(img => img.messageId !== 'temp')
//           );
//           setNewMessageFiles(prev =>
//             prev.filter(file => file.id !== 'loading')
//           );
//         }
//       };
//     }
//   };

//   return {
//     handleSelectDeviceFile,
//     filesToAccept,
//   };
// };

// export default useSelectFileHandler;
