// import CheckIcon from '@mui/icons-material/Check'; // Similar to IconCheck
// import CloseIcon from '@mui/icons-material/Close'; // Similar to IconX
// import DeleteIcon from '@mui/icons-material/Delete'; // Similar to IconTrash
// import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Similar to IconBulbFilled
// import { Box, IconButton, Tooltip } from '@mui/material';
// import React, { useState, useContext, useEffect } from 'react';
// import PromptModal from './PromptModal'; // Assuming you've refactored this already

// const PromptComponent = ({ prompt }) => {
//   const { handleUpdatePrompt, handleDeletePrompt, dispatch } =
//     useContext(PromptbarContext);
//   const [showModal, setShowModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDelete = e => {
//     e.stopPropagation();
//     if (isDeleting) {
//       handleDeletePrompt(prompt);
//       dispatch({ field: 'searchTerm', value: '' });
//     }
//     setIsDeleting(false);
//   };

//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'center',
//         width: '100%',
//         p: 1,
//       }}
//     >
//       <IconButton sx={{ flexGrow: 1 }} onClick={() => setShowModal(true)}>
//         <LightbulbIcon />
//         <Box
//           sx={{
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap',
//           }}
//         >
//           {prompt.name}
//         </Box>
//       </IconButton>

//       {isDeleting ? (
//         <Box sx={{ position: 'absolute', right: 1, display: 'flex' }}>
//           <IconButton onClick={handleDelete}>
//             <CheckIcon />
//           </IconButton>
//           <IconButton onClick={() => setIsDeleting(false)}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
//       ) : (
//         <IconButton
//           onClick={() => setIsDeleting(true)}
//           sx={{ position: 'absolute', right: 1 }}
//         >
//           <DeleteIcon />
//         </IconButton>
//       )}

//       {showModal && (
//         <PromptModal
//           prompt={prompt}
//           onClose={() => setShowModal(false)}
//           onUpdatePrompt={handleUpdatePrompt}
//         />
//       )}
//     </Box>
//   );
// };

// export default PromptComponent;
