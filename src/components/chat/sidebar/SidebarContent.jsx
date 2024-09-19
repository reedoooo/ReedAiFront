import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  Workspace,
  ChatSession,
  Assistants,
  Prompts,
  Files,
  User,
} from './panel';

const SidebarContent = ({
  tab,
  user,
  isAuthenticated,
  chatSessions,
  workspaces,
  prompts,
  files,
  assistants,
  navigate,
  folders,
}) => {
  const getFoldersBySpace = useCallback(
    space => user.folders?.filter(folder => folder.space === space) || [],
    [user.folders]
  );
  const renderContent = useCallback(() => {
    switch (tab) {
      case 0:
        return (
          <Workspace title="Workspaces" data={workspaces} folders={folders} />
        );
      case 1:
        return (
          <ChatSession
            title="ChatSessions"
            data={chatSessions}
            folders={getFoldersBySpace('chatSessions')}
            files={files}
          />
        );
      case 2:
        return (
          <Assistants
            title="Assistants"
            data={assistants}
            folders={getFoldersBySpace('assistants')}
            files={files}
          />
        );
      case 3:
        return (
          <Prompts
            title="Prompts"
            data={prompts}
            folders={getFoldersBySpace('prompts')}
            files={files}
          />
        );
      case 4:
        return (
          <Files
            title="Files"
            data={files}
            folderId={getFoldersBySpace('files')._id}
            folders={getFoldersBySpace('files')}
            files={files}
          />
        );
      case 5:
        return <User title="User" data={user} />;
      default:
        return <DefaultTab />;
    }
  }, [
    tab,
    workspaces,
    folders,
    chatSessions,
    getFoldersBySpace,
    files,
    assistants,
    prompts,
    user,
  ]);

  return renderContent();
};
export const DefaultTab = () => <div style={{ color: 'white' }}></div>;
// Add PropTypes for SidebarContent
SidebarContent.propTypes = {
  tab: PropTypes.number.isRequired, // Tab should be a number
  user: PropTypes.shape({
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        space: PropTypes.string.isRequired, // space inside folders should be a string
      })
    ),
  }).isRequired, // user is required and has a folders array
  isAuthenticated: PropTypes.bool.isRequired, // isAuthenticated is a boolean
  chatSessions: PropTypes.array.isRequired, // chatSessions is an array
  workspaces: PropTypes.array.isRequired, // workspaces is an array
  prompts: PropTypes.array.isRequired, // prompts is an array
  files: PropTypes.array.isRequired, // files is an array
  assistants: PropTypes.array.isRequired, // assistants is an array
  navigate: PropTypes.func.isRequired, // navigate is a function
  folders: PropTypes.array.isRequired, // folders is an array
};

export default SidebarContent;
