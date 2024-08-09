// import { Box } from '@mui/material';
// import React, { useContext } from 'react';
// import Folder from '@/components/Folder'; // Ensure this is using Material-UI
// import PromptComponent from '@/components/PromptComponent'; // Ensure this is refactored
// import HomeContext from '@/context/HomeContext'; // Adjust the import path

// const PromptFolders = () => {
//   const { folders } = useContext(HomeContext);
//   const { searchTerm, filteredPrompts, handleUpdatePrompt } =
//     useContext(PromptbarContext);

//   const handleDrop = (e, folder) => {
//     e.preventDefault();
//     const prompt = JSON.parse(e.dataTransfer.getData('prompt'));
//     handleUpdatePrompt({ ...prompt, folderId: folder.id });
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
//       {folders
//         .filter(folder => folder.type === 'prompt')
//         .sort((a, b) => a.name.localeCompare(b.name))
//         .map((folder, index) => (
//           <Folder
//             key={index}
//             searchTerm={searchTerm}
//             currentFolder={folder}
//             handleDrop={handleDrop}
//             folderComponent={filteredPrompts
//               .filter(p => p.folderId === folder.id)
//               .map((prompt, idx) => (
//                 <Box key={idx} sx={{ ml: 5, borderLeft: 1, pl: 2 }}>
//                   <PromptComponent prompt={prompt} />
//                 </Box>
//               ))}
//           />
//         ))}
//     </Box>
//   );
// };

// export default PromptFolders;
