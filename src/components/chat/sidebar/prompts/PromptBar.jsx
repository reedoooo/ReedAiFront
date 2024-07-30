// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { Box, Drawer, IconButton, Tooltip } from '@mui/material';
// import React, { useContext, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { v4 as uuidv4 } from 'uuid';
// import Sidebar from '../Sidebar'; // Refactor this as necessary for Material-UI
// import PromptFolders from './components/PromptFolders'; // Ensure these are refactored for Material-UI
// import Prompts from './components/Prompts'; // Ensure these are refactored for Material-UI
// import PromptbarContext, { useCreateReducer } from './PromptBar.context'; // Adjust import paths as necessary
// import initialState from './Promptbar.state'; // Adjust import paths as necessary
// import HomeContext from '@/context/HomeContext'; // Adjust import paths as necessary
// import { OpenAIModels } from '@/types/openai'; // Adjust import paths as necessary
// import { Prompt } from '@/types/prompt'; // Adjust import paths as necessary
// import { savePrompts } from '@/utils/app/prompts'; // Adjust import paths as necessary

// const Promptbar = () => {
//   const { t } = useTranslation('promptbar');
//   const { state, dispatch: homeDispatch } = useContext(HomeContext);
//   const promptBarContextValue = useCreateReducer({ initialState });

//   const { prompts, defaultModelId, showPromptbar } = state;
//   const { dispatch: promptDispatch, handleUpdatePrompt } =
//     promptBarContextValue;

//   const handleTogglePromptbar = () => {
//     const newShowPromptbar = !showPromptbar;
//     homeDispatch({ field: 'showPromptbar', value: newShowPromptbar });
//     localStorage.setItem('showPromptbar', JSON.stringify(newShowPromptbar));
//   };

//   const handleCreatePrompt = () => {
//     if (defaultModelId) {
//       const newPrompt = {
//         id: uuidv4(),
//         name: `Prompt ${prompts.length + 1}`,
//         description: '',
//         content: '',
//         model: OpenAIModels[defaultModelId],
//         folderId: null,
//       };
//       const updatedPrompts = [...prompts, newPrompt];
//       homeDispatch({ field: 'prompts', value: updatedPrompts });
//       savePrompts(updatedPrompts);
//     }
//   };

//   const handleDeletePrompt = prompt => {
//     const updatedPrompts = prompts.filter(p => p.id !== prompt.id);
//     homeDispatch({ field: 'prompts', value: updatedPrompts });
//     savePrompts(updatedPrompts);
//   };

//   const handleDrop = e => {
//     e.preventDefault();
//     const prompt = JSON.parse(e.dataTransfer.getData('prompt'));
//     const updatedPrompt = { ...prompt, folderId: e.target.dataset.folderId };
//     handleUpdatePrompt(updatedPrompt);
//   };

//   useEffect(() => {
//     const newFilteredPrompts = prompts.filter(prompt => {
//       const searchable =
//         `${prompt.name} ${prompt.description} ${prompt.content}`.toLowerCase();
//       return searchable.includes(searchTerm.toLowerCase());
//     });
//     promptDispatch({ field: 'filteredPrompts', value: newFilteredPrompts });
//   }, [searchTerm, prompts]);

//   return (
//     <PromptbarContext.Provider
//       value={{
//         ...promptBarContextValue,
//         handleCreatePrompt,
//         handleDeletePrompt,
//         handleUpdatePrompt,
//       }}
//     >
//       <Drawer
//         variant="persistent"
//         anchor="right"
//         open={showPromptbar}
//         onClose={handleTogglePromptbar}
//       >
//         <Box sx={{ width: 250, p: 2 }}>
//           <Tooltip title={t('New prompt')}>
//             <IconButton onClick={handleCreatePrompt}>
//               <AddCircleOutlineIcon />
//             </IconButton>
//           </Tooltip>
//           <Prompts prompts={prompts.filter(prompt => !prompt.folderId)} />
//           <PromptFolders />
//         </Box>
//       </Drawer>
//     </PromptbarContext.Provider>
//   );
// };

// export default Promptbar;
