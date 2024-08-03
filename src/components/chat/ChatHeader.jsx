import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Fade,
} from '@mui/material';
import React, { useCallback } from 'react';
import IconBox from 'assets/humanIcons/utils/IconBox';
import { useChatStore } from 'contexts/ChatProvider';
import useMode from 'hooks/useMode';
import { Header } from './styled';

export const ChatHeader = props => {
  const { theme } = useMode();
  const { state: chatState, actions: chatActions } = useChatStore();
  const {
    apiKey,
    workspaceId,
    sessionId,
    selectedFiles,
    activeSession,
    activeWorkspace,
  } = chatState;
  const { setSessionId, setActiveSession, setActiveWorkspace } = chatActions;
  const [expanded, setExpanded] = React.useState(false);
  const { name, handleOpen } = props;
  const handleExpansion = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };
  return (
    <Header className="chatbot-header" theme={theme}>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          bgcolor: '#1C1C1C',
          color: '#fff',
          flexGrow: 1,
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': {
            display: expanded ? 'block' : 'none',
          },
        }}
      >
        <AccordionSummary
          // expandIcon={<IconBox icon={<ExpandMoreIcon />} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <IconBox icon={<ExpandMoreIcon />} />{' '}
            <Typography
              variant="body2"
              sx={{
                bgcolor: 'inherit',
                color: '#fff',
                ml: 2, // Margin left to space the text from the icon
              }}
            >
              Topic:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                bgcolor: 'inherit',
                color: '#fff',
                ml: 2, // Margin left to space the text from the icon
              }}
            >
              {`${name || 'None'}`}
            </Typography>
          </Box>
          {/* <Typography variant="h6">
            <Box display="flex" alignItems="center">
              <Typography
                variant="body1"
                sx={{
                  bgcolor: 'inherit',
                  color: '#fff',
                }}
              >
                {`Active Chat Session: ${name.name || 'None'}`}
              </Typography>
            </Box>
          </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="textSecondary">
            Discuss your queries and get assistance
          </Typography>
          <Box
            mt={2}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <IconButton
              color="primary"
              onClick={handleOpen}
              aria-label="start new session"
            >
              <AddIcon />
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              Discuss your queries and get assistance
            </Typography>
            {/* Add other icon buttons here if needed */}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Header>
  );
};
export default ChatHeader;
