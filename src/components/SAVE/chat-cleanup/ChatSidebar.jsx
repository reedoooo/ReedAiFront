// import { Box, IconButton, Tooltip } from '@mui/material';
// import React from 'react';
// import {
//   AssistantIcon,
//   ChatIcon,
//   CollectionsIcon,
//   FilePresentIcon,
//   FolderIcon,
//   SettingsIcon,
// } from 'assets/humanIcons';
// import { ChatBotIcon } from 'assets/humanIcons/custom';
// const iconStyle = {
//   width: '32px',
//   height: '32px',
//   color: 'white',
// };
// const ChatSidebar = ({
//   handleMenuClick,
//   promptsMenu,
//   sidebarItemRef,
//   dialogRef,
//   workspaceMenu,
//   fileMenu,
//   foldersMenu,
//   // collectionsMenu,
//   settingsMenu,
//   assistantsMenu,
// }) => {
//   return (
//     <Box
//       ref={dialogRef}
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: '1rem',
//         backgroundColor: '#1C1C1C',
//         height: '100vh',
//         color: 'white',
//         borderRadius: '14px',
//         // justifyContent: 'space-between',
//       }}
//     >
//       <Tooltip title="Chats" placement="right" ref={sidebarItemRef}>
//         <IconButton onClick={event => workspaceMenu.handleMenuOpen(event)}>
//           <ChatIcon sx={iconStyle} />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Folders" placement="right" ref={sidebarItemRef}>
//         <IconButton onClick={event => foldersMenu.handleMenuOpen(event)}>
//           <FolderIcon sx={iconStyle} />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Files" placement="right" ref={sidebarItemRef}>
//         <IconButton onClick={event => fileMenu.handleMenuOpen(event)}>
//           <FilePresentIcon sx={iconStyle} />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Assistants" placement="right" ref={sidebarItemRef}>
//         <IconButton onClick={event => assistantsMenu.handleMenuOpen(event)}>
//           <AssistantIcon sx={iconStyle} />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Prompts" placement="right" ref={sidebarItemRef}>
//         <IconButton onClick={event => promptsMenu.handleMenuOpen(event)}>
//           <ChatBotIcon sx={iconStyle} />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Settings" placement="right" ref={sidebarItemRef}>
//         <IconButton onClick={event => settingsMenu.handleMenuOpen(event)}>
//           <SettingsIcon sx={iconStyle} />
//         </IconButton>
//       </Tooltip>
//     </Box>
//   );
// };

// export default ChatSidebar;
