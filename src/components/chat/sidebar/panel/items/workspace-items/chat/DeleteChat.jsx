// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from '@mui/material';
// import { useRef, useState } from 'react';
// import { sessions as sessionApi } from 'api/chat';
// import { useChatStore } from 'contexts/ChatProvider';
// import { useChatLogic } from 'hooks/chat';
// import { useHotkey } from 'hooks/util';

// export const DeleteChat = ({ chatSession }) => {
//   useHotkey('Backspace', () => setShowChatDialog(true));
//   const chatStore = useChatStore();
//   const { setChatSessions } = chatStore.actions;
//   const { handleNewChat } = useChatLogic();
//   const buttonRef = useRef(null);
//   const [showChatDialog, setShowChatDialog] = useState(false);

//   const handleDeleteChat = async () => {
//     await sessionApi.delete(chatSession._id);
//     setChatSessions(prevState =>
//       prevState.filter(c => c.id !== chatSession._id)
//     );
//     setShowChatDialog(false);
//     handleNewChat();
//   };

//   const handleKeyDown = e => {
//     if (e.key === 'Enter') {
//       buttonRef.current?.click();
//     }
//   };

//   return (
//     <Dialog open={showChatDialog} onClose={() => setShowChatDialog(false)}>
//       <DialogTitle>Delete {chatSession.name}</DialogTitle>
//       <DialogContent onKeyDown={handleKeyDown}>
//         <div>Are you sure you want to delete this chat?</div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setShowChatDialog(false)}>Cancel</Button>
//         <Button ref={buttonRef} onClick={handleDeleteChat} color="error">
//           Delete
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
// export default DeleteChat;
