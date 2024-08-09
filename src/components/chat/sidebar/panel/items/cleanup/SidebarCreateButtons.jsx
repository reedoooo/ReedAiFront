// const React = require('react');
// const { useContext, useState } = require('react');
// const styled = require('styled-components');
// const { Button, IconButton } = require('@material-ui/core');
// const { IconFolderPlus, IconPlus } = require('@tabler/icons-react');
// const { ChatbotUIContext } = require('@/context/context');
// const {
//   useChatHandler,
// } = require('@/components/chat/chat-hooks/use-chat-handler');
// const { createFolder } = require('@/db/folders');
// const { CreateAssistant } = require('./items/assistants/create-assistant');
// const { CreateCollection } = require('./items/collections/create-collection');
// const { CreateFile } = require('./items/files/create-file');
// const { CreateModel } = require('./items/models/create-model');
// const { CreatePreset } = require('./items/presets/create-preset');
// const { CreatePrompt } = require('./items/prompts/create-prompt');
// const { CreateTool } = require('./items/tools/create-tool');

// const ButtonContainer = styled.div`
//   display: flex;
//   width: 100%;
//   gap: 8px;
// `;

// const StyledButton = styled(Button)`
//   flex-grow: 1;
//   height: 36px;
// `;

// const StyledIconButton = styled(IconButton)`
//   padding: 8px;
//   height: 36px;
// `;

// const SidebarCreateButtons = ({ contentType, hasData }) => {
//   const { profile, selectedWorkspace, folders, setFolders } =
//     useContext(ChatbotUIContext);
//   const { handleNewChat } = useChatHandler();

//   const [isCreatingPrompt, setIsCreatingPrompt] = useState(false);
//   const [isCreatingPreset, setIsCreatingPreset] = useState(false);
//   const [isCreatingFile, setIsCreatingFile] = useState(false);
//   const [isCreatingCollection, setIsCreatingCollection] = useState(false);
//   const [isCreatingAssistant, setIsCreatingAssistant] = useState(false);
//   const [isCreatingTool, setIsCreatingTool] = useState(false);
//   const [isCreatingModel, setIsCreatingModel] = useState(false);

//   const handleCreateFolder = async () => {
//     if (!profile || !selectedWorkspace) return;

//     const createdFolder = await createFolder({
//       user_id: profile.user_id,
//       workspace_id: selectedWorkspace.id,
//       name: 'New Folder',
//       description: '',
//       type: contentType,
//     });
//     setFolders([...folders, createdFolder]);
//   };

//   const getCreateFunction = () => {
//     switch (contentType) {
//       case 'chats':
//         return handleNewChat;
//       case 'presets':
//         return () => setIsCreatingPreset(true);
//       case 'prompts':
//         return () => setIsCreatingPrompt(true);
//       case 'files':
//         return () => setIsCreatingFile(true);
//       case 'collections':
//         return () => setIsCreatingCollection(true);
//       case 'assistants':
//         return () => setIsCreatingAssistant(true);
//       case 'tools':
//         return () => setIsCreatingTool(true);
//       case 'models':
//         return () => setIsCreatingModel(true);
//       default:
//         return () => {};
//     }
//   };

//   return (
//     <ButtonContainer>
//       <StyledButton onClick={getCreateFunction()}>
//         <IconPlus className="mr-1" size={20} />
//         New {contentType.charAt(0).toUpperCase() + contentType.slice(1, -1)}
//       </StyledButton>
//       {hasData && (
//         <StyledIconButton onClick={handleCreateFolder}>
//           <IconFolderPlus size={20} />
//         </StyledIconButton>
//       )}
//       {isCreatingPrompt && (
//         <CreatePrompt
//           isOpen={isCreatingPrompt}
//           onOpenChange={setIsCreatingPrompt}
//         />
//       )}
//       {isCreatingPreset && (
//         <CreatePreset
//           isOpen={isCreatingPreset}
//           onOpenChange={setIsCreatingPreset}
//         />
//       )}
//       {isCreatingFile && (
//         <CreateFile isOpen={isCreatingFile} onOpenChange={setIsCreatingFile} />
//       )}
//       {isCreatingCollection && (
//         <CreateCollection
//           isOpen={isCreatingCollection}
//           onOpenChange={setIsCreatingCollection}
//         />
//       )}
//       {isCreatingAssistant && (
//         <CreateAssistant
//           isOpen={isCreatingAssistant}
//           onOpenChange={setIsCreatingAssistant}
//         />
//       )}
//       {isCreatingTool && (
//         <CreateTool isOpen={isCreatingTool} onOpenChange={setIsCreatingTool} />
//       )}
//       {isCreatingModel && (
//         <CreateModel
//           isOpen={isCreatingModel}
//           onOpenChange={setIsCreatingModel}
//         />
//       )}
//     </ButtonContainer>
//   );
// };

// module.exports = { SidebarCreateButtons };
