// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Badge,
//   Tooltip,
//   IconButton,
//   Collapse,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import React, { useState } from 'react';
// import { FaGear, FaMessage } from 'react-icons/fa6';

// const Sidebar = styled(Box)(({ theme }) => ({
//   width: '300px',
//   height: '100vh',
//   backgroundColor: '#000000',
//   overflowY: 'auto',
//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//   },
// }));

// const ChatCard = styled(Card)(({ theme }) => ({
//   backgroundColor: '#ffffff',
//   color: '#000000',
//   margin: '16px',
//   transition: 'background-color 0.3s',
//   '&:hover': {
//     backgroundColor: '#f0f0f0',
//     cursor: 'pointer',
//   },
// }));

// const ModelBadge = styled(Badge)(({ theme }) => ({
//   position: 'absolute',
//   top: '8px',
//   right: '8px',
// }));

// const StatsSection = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   marginTop: '8px',
// }));

// export const ChatSessionCard = ({ session, onClick, isOpen }) => {
//   return (
//     <ChatCard onClick={onClick}>
//       <CardContent>
//         <Typography variant="h6" component="div">
//           {session.name}
//         </Typography>
//         <Collapse in={isOpen}>
//           <ModelBadge badgeContent={session.model} color="primary" />
//           <Typography variant="subtitle1" color="text.secondary">
//             {session.topic}
//           </Typography>
//           <Typography variant="body2">{session.summary}</Typography>
//           <StatsSection>
//             <Typography variant="body2">
//               <FaMessage /> {session.messages.length}
//             </Typography>
//             <Typography variant="body2">
//               {JSON.stringify(session.settings)}
//             </Typography>
//             <Typography variant="body2">
//               {session.langChainSettings && 'LC'}
//             </Typography>
//           </StatsSection>
//           <Tooltip title="Session Settings">
//             <IconButton
//               size="small"
//               sx={{ position: 'absolute', bottom: '8px', right: '8px' }}
//             >
//               <FaGear />
//             </IconButton>
//           </Tooltip>
//         </Collapse>
//       </CardContent>
//     </ChatCard>
//   );
// };
// export const ChatHistory = ({ sessions }) => {
//   const [openSessionId, setOpenSessionId] = useState(null);

//   const handleCardClick = sessionId => {
//     setOpenSessionId(openSessionId === sessionId ? null : sessionId);
//   };
//   return (
//     <Sidebar className="chat-history-sidebar">
//       {sessions.map(session => (
//         <ChatSessionCard
//           key={session.id}
//           session={session}
//           onClick={() => handleCardClick(session.id)}
//           isOpen={openSessionId === session.id}
//         />
//       ))}
//     </Sidebar>
//   );
// };
