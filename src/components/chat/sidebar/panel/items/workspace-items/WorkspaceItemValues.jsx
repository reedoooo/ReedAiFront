import { Box, Typography } from '@mui/material';
import { StyledButton } from 'components/chat/styled';

export const WorkspaceItemValues = (
  workspaces,
  chatSessions,
  modelNames,
  presets,
  prompts,
  models,
  collections,
  files,
  assistants,
  tools
) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Name</Typography>
        {/* <DisplayDropdownMenus
          workspaces={workspaces}
          chatSessions={chatSessions}
          modelNames={modelNames}
          presets={presets}
          prompts={prompts}
          models={models}
          collections={collections}
          files={files}
          assistants={assistants}
          tools={tools}
          handleSelectChange={() =>
            console.log('Handle select change', workspaces)
          }
        /> */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <StyledButton
            variant="outlined"
            onClick={() => console.log('Clicked on Cancel')}
          >
            Cancel
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => console.log('Clicked on Save')}
          >
            Save
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkspaceItemValues;
