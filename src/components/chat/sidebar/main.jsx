import { Avatar, Box, Drawer, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import {
  AccountCircleRoundedIcon,
  AiIcon,
  AssistantIcon,
  ChatIcon,
  FilePresentIcon,
  FingerprintIcon,
  HomeIcon,
  KeyIcon,
  SettingsIcon,
} from 'assets/humanIcons';

import { ChatBotIcon } from 'assets/humanIcons/custom';
import ValidationIcon from 'components/styled/ValidationIcon';
import { useAuthStore } from 'contexts/AuthProvider';
import { useChatStore } from 'contexts/ChatProvider';
import { useUserStore } from 'contexts/UserProvider';
import useMode from 'hooks/useMode';
import useRouter from 'hooks/useRouter';
import { SidebarContainer, SidebarPanel } from '../styled';
import Assistants from './panel/Assistants';
import Chat from './panel/Chat';
import Files from './panel/Files';
import Prompts from './panel/Prompts';
import User from './panel/User';
import Workspace from './panel/Workspace';

const sidebarIconStyle = {
  width: '32px',
  height: '32px',
  color: 'white',
};

export const ChatSidebar = () => {
  const {
    state: { user, isAuthenticated },
  } = useUserStore();
  const {
    state: { apiKey },
  } = useChatStore();
  const { theme } = useMode();
  const { navigate } = useRouter();
  const [tab, setTab] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const sideBarWidthRef = React.useRef(null);
  const isValidApiKey = Boolean(apiKey);
  React.useEffect(() => {
    if (sideBarWidthRef.current) {
      console.log('Sidebar width:', sideBarWidthRef.current.offsetWidth);
    }
  }, []);

  const handleSidebarOpen = index => {
    setTab(index);
    setShowSidebar(true);
  };
  const handleSidebarClose = () => {
    setShowSidebar(false);
    setTab(null);
  };
  const renderContent = () => {
    switch (tab) {
      case 0:
        return <User />;
      case 1:
        return <Workspace />;
      case 2:
        return <Chat />;
      case 3:
        return <Prompts />;
      case 4:
        return <Assistants />;
      case 5:
        return <Files />;
      default:
        return <DefaultTab />;
    }
  };
  // const renderSidebarDataContainer = (contentType, data, folders?) => {
  //   return (
  //     <DummySidebarContent
  //       contentType={contentType}
  //       data={data}
  //       folders?={folders?}
  //     />
  //   );
  // };

  return (
    <SidebarContainer>
      <SidebarPanel ref={sideBarWidthRef}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: theme.palette.primary.main,
            marginBottom: '0.5rem',
          }}
        >
          <AiIcon sx={{ fontSize: 32, color: theme.palette.common.white }} />
        </Avatar>
        <Tooltip title="User Settings" placement="right">
          <IconButton onClick={() => handleSidebarOpen(0)}>
            <AccountCircleRoundedIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Workspaces" placement="right">
          <IconButton onClick={() => handleSidebarOpen(1)}>
            <SettingsIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chats" placement="right">
          <IconButton onClick={() => handleSidebarOpen(2)}>
            <ChatIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Prompts" placement="right">
          <IconButton onClick={() => handleSidebarOpen(3)}>
            <ChatBotIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Assistants" placement="right">
          <IconButton onClick={() => handleSidebarOpen(4)}>
            <AssistantIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Files" placement="right">
          <IconButton onClick={() => handleSidebarOpen(5)}>
            <FilePresentIcon sx={sidebarIconStyle} />
          </IconButton>
        </Tooltip>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#1C1C1C',
          }}
        >
          <Tooltip title="UserId" placement="right">
            <IconButton onClick={() => handleSidebarOpen(6)}>
              <ValidationIcon
                IconComponent={FingerprintIcon}
                isValid={isAuthenticated}
              />{' '}
            </IconButton>
          </Tooltip>{' '}
          <Tooltip title="Api Key" placement="right">
            <IconButton onClick={() => handleSidebarOpen(6)}>
              <ValidationIcon IconComponent={KeyIcon} isValid={isValidApiKey} />{' '}
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#1C1C1C',
            alignSelf: 'flex-end',
            pt: '100%',
            mt: 'auto',
          }}
        >
          <Tooltip title="Home" placement="right">
            <IconButton onClick={() => navigate('/admin/dashboard')}>
              <HomeIcon sx={sidebarIconStyle} />
            </IconButton>
          </Tooltip>{' '}
        </Box>
      </SidebarPanel>
      <Drawer
        anchor="left"
        open={tab !== null}
        onClose={() => handleSidebarClose()}
        PaperProps={{
          sx: {
            color: 'white',
            padding: '20px',
            background: '#000',
            minWidth: showSidebar ? `35vw` : '0px',
            maxWidth: showSidebar ? `35vw` : '0px',
            width: showSidebar ? `35vw` : '0px',
            borderRight: '1px solid #333', // Adds a border to the right side
          },
        }}
      >
        {renderContent()}
      </Drawer>
    </SidebarContainer>
  );
};

const DefaultTab = () => <div style={{ color: 'white' }}></div>;
// const DummySidebarContent = ({ contentType, data, folders? }) => {
//   const propTypes = {
//     contentType,
//     data,
//     folders?,
//   };
//   const dataListTypes = {
//     collections: [],
//     chats: [],
//     presets: [],
//     prompts: [],
//     files: [],
//     assistants: [],
//     tools: [],
//     models: [],
//   };
//   const dataListMap = {};
//   // --- Test Func/UI Props ---
//   const [searchTerm, setSearchTerm] = useState('');
//   const defaultData = dataListTypes['prompts'];
//   const defaultfolders? = [];
//   const filteredData = data.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const hasData = false;
//   const isCreatingPrompt = false;
//   const createFolder = propts => defaultfolders?.push(propts);
//   const handleCreateFolder = async () => {
//     const createdFolder = await createFolder({
//       user_id: 'profile.user_id',
//       workspace_id: 'selectedWorkspace.id',
//       name: 'New Folder',
//       description: '',
//       type: 'prompts',
//     });
//     return createdFolder;
//     // setfolders?([...folders?, createdFolder]);
//   };
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         maxHeight: 'calc(100% - 50px)',
//         flexGrow: 1,
//         flexDirection: 'column',
//       }}
//     >
//       <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
//         <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
//           <Button
//             variant="contained"
//             sx={{ flexGrow: 1, height: 36 }}
//             onClick={() => console.log('defaultData', defaultData)}
//             startIcon={<FaPlus />}
//           >
//             New{' '}
//             {contentType.charAt(0).toUpperCase() +
//               contentType.slice(1, contentType.length - 1)}
//           </Button>

//           {hasData && (
//             <Button
//               variant="contained"
//               sx={{ minWidth: 36, width: 36, height: 36, padding: 1 }}
//               onClick={handleCreateFolder}
//             >
//               <FaFolderPlus />
//             </Button>
//           )}
//           {isCreatingPrompt && (
//             <CreatePrompt isOpen={isCreatingPrompt} onOpenChange={() => {}} />
//           )}
//         </Box>
//       </Box>

//       <Box sx={{ mt: 2 }}>
//         {/* <SidebarSearch
//           contentType={contentType}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//         /> */}
//       </Box>

//       {/* <SidebarDataList
//         contentType={'prompts'}
//         data={filteredData}
//         folders?={defaultfolders?}
//       /> */}
//     </Box>
//   );
// };
export default ChatSidebar;
