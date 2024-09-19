// components/SidebarActions.js
import { Add as AddIcon, Folder as FolderIcon } from '@mui/icons-material';
import { NewFileButton, FolderButton, TopBar } from 'components/chat/styled';

export const SidebarActions = ({ handleNewFile, handleNewFolder, space }) => {
  // Remove the trailing 'S' if it exists
  const formattedSpace = space.replace(/s$/i, '');

  return (
    <TopBar>
      <NewFileButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleNewFile}
      >
        {'New ' + formattedSpace}
      </NewFileButton>
      <FolderButton onClick={handleNewFolder}>
        <FolderIcon />
        <AddIcon
          style={{
            fontSize: '0.7em',
            position: 'absolute',
            right: '4px',
            bottom: '4px',
          }}
        />
      </FolderButton>
    </TopBar>
  );
};
export default SidebarActions;
