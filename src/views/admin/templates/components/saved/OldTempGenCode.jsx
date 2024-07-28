// 'use client';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Tooltip,
//   Avatar,
//   Collapse,
//   Paper,
//   ClickAwayListener,
//   Tabs,
//   Tab,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Button,
//   Popper,
//   DialogTitle,
//   DialogContent,
//   Grow,
//   DialogActions,
//   Dialog,
// } from '@mui/material';
// import SvgIcon from '@mui/material/SvgIcon';
// import { motion } from 'framer-motion';
// import React, { useState, useEffect, useRef } from 'react';
// import { MdLock } from 'react-icons/md';
// import {
//   getAssistants,
//   createAssistant,
//   updateAssistant,
//   deleteAssistant,
// } from 'api';
// import {
//   AssistantIcon,
//   ChatIcon,
//   CollectionsIcon,
//   DeleteIcon,
//   FilePresentIcon,
//   FingerprintIcon,
//   FolderIcon,
//   KeyIcon,
//   SettingsIcon,
// } from 'assets/humanIcons';
// import { ChatApp } from 'components/chat';
// import ChatSidebar from 'components/chat/sidebar/ChatSidebar';
// import ReusableDialog from 'components/chat/sidebar/menu/ReusableDialog';
// import ReusableWorkspaceDialog from 'components/chat/sidebar/menu/WorkSpacesMenu';
// import { usePromptStore } from 'contexts/PromptProvider';
// import useMenu from 'hooks/useMenu';
// import useMode from 'hooks/useMode';
// import ChatHeader from './ChatHeader';
// import ValidationIcon from './ValidationIcon'; // Adjust the path as needed

// const dialogVariants = {
//   hidden: { width: 0 },
//   visible: { width: '60vw', transition: { duration: 1 } },
// };

// export const TemplateGenerator = () => {
//   const { theme } = useMode();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isApiKeyValid, setIsApiKeyValid] = useState(false);
//   const promptsMenu = useMenu();
//   const promptsTemplateMenu = useMenu();
//   const assistantsMenu = useMenu();
//   const workspaceMenu = useMenu();
//   const fileMenu = useMenu();
//   const foldersMenu = useMenu();
//   const collectionsMenu = useMenu();
//   const settingsMenu = useMenu();
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [newPrompt, setNewPrompt] = useState({ name: '', content: '' });
//   const [newTemplate, setNewTemplate] = useState({ name: '', content: '' });
//   const [newWorkspace, setNewWorkspace] = useState({
//     name: '',
//     description: '',
//   });
//   const [newFile, setNewFile] = useState({ fileName: '', fileContent: '' });

//   const [currentTemplate, setCurrentTemplate] = useState({
//     templateName: '',
//     templateText: '',
//     tags: [],
//   });
//   const {
//     promptList,
//     templateList,
//     createPrompt,
//     updatePrompt,
//     deletePrompt,
//     createTemplate,
//     updateTemplate,
//     deleteTemplate,
//   } = usePromptStore();
//   const dialogRef = useRef(null);
//   const sidebarItemRef = useRef(null);
//   const checkUser = () => {
//     return !!localStorage.getItem('user');
//   };

//   const checkApiKey = () => {
//     return !!localStorage.getItem('apiKey');
//   };

//   const checkStatusUpdates = () => {
//     setIsLoggedIn(checkUser());
//     setIsApiKeyValid(checkApiKey());
//   };

//   useEffect(() => {
//     checkStatusUpdates(); // Initial check when the component mounts

//     // Function to handle storage events
//     const handleStorageChange = () => {
//       checkStatusUpdates();
//     };

//     // Add event listener for localStorage changes
//     window.addEventListener('storage', handleStorageChange);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const handleMenuClick = (event, menu) => {
//     if (menu === 'prompts') {
//       promptsMenu.handleMenuOpen(event);
//     } else {
//       promptsMenu.handleMenuClose();
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const handleWorkspaceChange = event => {
//     const { name, value } = event.target;
//     setNewWorkspace(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCreateWorkspace = () => {
//     // createWorkspace(newWorkspace);
//     promptsMenu.handleMenuClose();
//   };

//   const handleFileChange = event => {
//     const { name, value } = event.target;
//     setNewFile(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCreateFile = () => {
//     // createFile(newFile);
//     promptsTemplateMenu.handleMenuClose();
//   };

//   const handlePromptChange = event => {
//     const { name, value } = event.target;
//     setNewPrompt(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCreatePrompt = () => {
//     createPrompt(newPrompt);
//     promptsMenu.handleMenuClose();
//   };
//   const handleTemplateChange = e => {
//     setCurrentTemplate({ ...currentTemplate, [e.target.name]: e.target.value });
//   };

//   const handleCreateTemplate = () => {
//     createTemplate(currentTemplate);
//     promptsTemplateMenu.handleMenuClose();
//   };
//   useEffect(() => {
//     if (promptsMenu.isOpen && sidebarItemRef.current) {
//       const sidebarItemRect = sidebarItemRef.current.getBoundingClientRect();
//       const dialogRect = dialogRef.current.getBoundingClientRect();

//       const leftPosition = sidebarItemRect.right + 32; // 2rem margin
//       const topPosition =
//         sidebarItemRect.top -
//         dialogRect.height / 2 +
//         sidebarItemRect.height / 2;

//       dialogRef.current.style.left = `${leftPosition}px`;
//       dialogRef.current.style.top = `${topPosition}px`;
//     }
//   }, [promptsMenu.isOpen]);
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100vh',
//         flexGrow: 1,
//       }}
//     >
//       <ChatHeader
//         isLoggedIn={isLoggedIn}
//         isApiKeyValid={isApiKeyValid}
//         title={newWorkspace.name}
//       />

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           height: '100%',
//         }}
//       >
//         <ChatSidebar
//           handleMenuClick={handleMenuClick}
//           promptsMenu={promptsMenu}
//           sidebarItemRef={sidebarItemRef}
//           dialogRef={dialogRef}
//           workspaceMenu={workspaceMenu}
//           fileMenu={fileMenu}
//           foldersMenu={foldersMenu}
//           collectionsMenu={collectionsMenu}
//           settingsMenu={settingsMenu}
//           assistantsMenu={assistantsMenu}
//           sx={{ maxWidth: '700px', width: '100%' }}
//         />
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             flexGrow: 1,
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             px: 1,
//           }}
//         >
//           <Dialog
//             open={promptsMenu.isOpen}
//             TransitionComponent={motion.div}
//             initial="hidden"
//             animate={promptsMenu.isOpen ? 'visible' : 'hidden'}
//             variants={dialogVariants}
//             keepMounted
//             onClose={promptsMenu.handleMenuClose}
//             aria-labelledby="alert-dialog-slide-title"
//             aria-describedby="alert-dialog-slide-description"
//             PaperProps={{
//               ref: dialogRef,
//               sx: {
//                 maxHeight: '50vh',
//                 margin: '0',
//                 position: 'absolute',
//                 transformOrigin: 'right center',
//                 display: 'flex',
//                 flexDirection: 'row',
//               },
//             }}
//           >
//             <Tabs
//               orientation="vertical"
//               value={selectedTab}
//               onChange={handleTabChange}
//               sx={{ borderRight: 1, borderColor: 'divider' }}
//             >
//               <Tab label="Prompts" />
//               <Tab label="Prompt Templates" />
//             </Tabs>
//             <DialogContent>
//               <Box sx={{ flexGrow: 1, p: 2 }}>
//                 {selectedTab === 0 && (
//                   <Box>
//                     <List>
//                       {promptList.map((snippet, index) => (
//                         <ListItem key={index}>
//                           <ListItemText
//                             primary={snippet.promptText}
//                             // secondary={snippet.metadata}
//                           />
//                           <IconButton
//                             edge="end"
//                             onClick={() => deletePrompt(snippet._id)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </ListItem>
//                       ))}
//                     </List>
//                     <Box sx={{ mt: 2 }}>
//                       <TextField
//                         label="Key"
//                         name="key"
//                         value={newPrompt.key}
//                         onChange={handlePromptChange}
//                         fullWidth
//                       />
//                       <TextField
//                         label="Value"
//                         name="value"
//                         value={newPrompt.value}
//                         onChange={handlePromptChange}
//                         fullWidth
//                         sx={{ mt: 2 }}
//                       />
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleCreatePrompt}
//                         sx={{ mt: 2 }}
//                       >
//                         Add Prompt
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}
//                 {selectedTab === 1 && (
//                   <Box>
//                     <List>
//                       {templateList.map((template, index) => (
//                         <ListItem key={index}>
//                           <ListItemText
//                             primary={template.templateName}
//                             secondary={template.templateText}
//                           />
//                           <IconButton
//                             edge="end"
//                             onClick={() => deleteTemplate(template._id)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </ListItem>
//                       ))}
//                     </List>
//                     <Box sx={{ mt: 2 }}>
//                       <TextField
//                         label="Template Name"
//                         name="templateName"
//                         value={newTemplate.name}
//                         onChange={handleTemplateChange}
//                         fullWidth
//                       />
//                       <TextField
//                         label="Template Text"
//                         name="templateText"
//                         value={newTemplate.content}
//                         onChange={handleTemplateChange}
//                         fullWidth
//                         sx={{ mt: 2 }}
//                       />
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleCreateTemplate}
//                         sx={{ mt: 2 }}
//                       >
//                         Add Template
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={promptsMenu.handleMenuClose} color="primary">
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//           <ReusableWorkspaceDialog
//             isOpen={workspaceMenu.isOpen}
//             handleClose={workspaceMenu.handleMenuClose}
//             selectedTab={selectedTab}
//             setSelectedTab={setSelectedTab}
//             workspaceList={[]}
//             fileList={[]}
//             handleWorkspaceChange={handleWorkspaceChange}
//             handleCreateWorkspace={handleCreateWorkspace}
//             handleFileChange={handleFileChange}
//             handleCreateFile={handleCreateFile}
//             deleteWorkspace={() => {}}
//             deleteItem={() => {}}
//             dialogRef={dialogRef}
//             newWorkspace={newWorkspace}
//             newFile={newFile}
//           />
//           <ReusableDialog
//             isOpen={fileMenu.isOpen}
//             handleClose={fileMenu.handleMenuClose}
//             selectedTab={selectedTab}
//             setSelectedTab={setSelectedTab}
//             itemList={[]}
//             newItem={newFile}
//             handleItemChange={handleFileChange}
//             handleCreateItem={handleCreateFile}
//             deleteItem={() => {}}
//             dialogRef={dialogRef}
//             itemType="File"
//           />
//           <ReusableDialog
//             isOpen={foldersMenu.isOpen}
//             handleClose={foldersMenu.handleMenuClose}
//             selectedTab={selectedTab}
//             setSelectedTab={setSelectedTab}
//             itemList={[]}
//             newItem={newWorkspace}
//             handleItemChange={handleWorkspaceChange}
//             handleCreateItem={handleCreateWorkspace}
//             deleteItem={() => {}}
//             dialogRef={dialogRef}
//             itemType="Folder"
//           />
//           <ReusableDialog
//             isOpen={collectionsMenu.isOpen}
//             handleClose={collectionsMenu.handleMenuClose}
//             selectedTab={selectedTab}
//             setSelectedTab={setSelectedTab}
//             itemList={[]}
//             newItem={newWorkspace}
//             handleItemChange={handleWorkspaceChange}
//             handleCreateItem={handleCreateWorkspace}
//             deleteItem={() => {}}
//             dialogRef={dialogRef}
//             itemType="Collection"
//           />
//           <ReusableDialog
//             isOpen={settingsMenu.isOpen}
//             handleClose={settingsMenu.handleMenuClose}
//             selectedTab={selectedTab}
//             setSelectedTab={setSelectedTab}
//             itemList={[]}
//             newItem={newWorkspace}
//             handleItemChange={handleWorkspaceChange}
//             handleCreateItem={handleCreateWorkspace}
//             deleteItem={() => {}}
//             dialogRef={dialogRef}
//             itemType="Setting"
//           />
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               flexGrow: 1,
//               width: '100%',
//               backgroundColor: '#1C1C1C',
//               borderRadius: '14px',
//               px: 2,
//             }}
//           >
//             <ChatApp />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default TemplateGenerator;
