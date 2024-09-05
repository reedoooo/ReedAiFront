'use client';

/* eslint-disable no-unused-vars */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Card,
  Link,
  Modal,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  MdAutoAwesome,
  MdBolt,
  MdCode,
  MdEdit,
  MdFileUpload,
  MdLink,
  MdPerson,
  MdTag,
  MdVpnKey,
  MdLock,
} from 'react-icons/md';
import { ApiIcon } from 'assets/humanIcons';
import { ApiModal } from 'components/chat';
import { MessageBox } from 'components/chat/messages';
import constants from 'config/constants';
import { useMode } from 'hooks';
const { API_URL, OPENAI_API_KEY } = constants;

export default function Chat(props) {
  const { theme } = useMode();
  const [inputOnSubmit, setInputOnSubmit] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [apiKey, setApiKey] = useState(
    sessionStorage.getItem('apiKey') || OPENAI_API_KEY
  );
  const [modelData, setModelData] = useState({
    apiKey: apiKey,
    model: model,
    inputCode: '', // as message
    maxTokens: 100,
    temperature: 0.5,
    topP: 1,
    topK: 40,
    presencePenalty: 0,
    frequencyPenalty: 0,
    n: 1,
    stream: false,
    stop: '',
    echo: false,
  });

  const [loading, setLoading] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState(apiKey ? 'Set' : 'Not Set');

  const borderColor = '#e3e8ef';
  const inputColor = '#1B254B';
  const iconColor = '#18b984';
  const bgIcon = 'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)';

  const brandColor = '#18b984';
  const buttonBg = '#fff';
  const gray = '#697586';
  const buttonShadow = '14px 27px 45px rgba(112, 144, 176, 0.2)';

  const textColor = '#1B254B';
  const placeholderColor = '#697586';
  const handleTranslate = async () => {
    let apiKey = process.env.OPENAI_API_KEY;
    // console.log('!!! --- apiKey --- !!!', apiKey);
    setInputOnSubmit(message);
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 700 : 700;

    if (!apiKey?.includes('sk-')) {
      alert('Please enter an API key.');
      return;
    }
    if (!message) {
      alert('Please enter your message.');
      return;
    }
    if (message.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${response.length} characters.`
      );
      return;
    }

    setResponse(' ');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('message', message);
      formData.append('modelData', modelData);
      formData.append('apiKey', apiKey);

      // const data = await getGeneralChatResponse(formData);
      const data = {};
      setResponse(data);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      alert(
        'Something went wrong when fetching from the API. Make sure to use a valid API key.'
      );
    } finally {
      setLoading(false);
    }
  };
  const handleChange = event => {
    setMessage(event.target.value);
  };

  // Context Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleContextMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleContextMenuClose = () => {
    setAnchorEl(null);
  };

  // API Key Modal State
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const handleApiModalOpen = () => {
    setIsApiModalOpen(true);
  };
  const handleApiModalClose = () => {
    setIsApiModalOpen(false);
  };

  useEffect(() => {
    setApiKeyStatus(apiKey ? 'Set' : 'Not Set');
  }, [apiKey]);

  return (
    <Paper sx={{ overflow: 'hidden', flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
          Original Chat AI
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        />
        <Tooltip title={`API Key: ${apiKeyStatus}`} arrow>
          <ClickAwayListener onClickAway={handleContextMenuClose}>
            <IconButton
              onClick={handleContextMenuOpen}
              aria-controls={open ? 'context-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <ExpandMoreIcon />
            </IconButton>
          </ClickAwayListener>
        </Tooltip>
        <Menu
          id="context-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleContextMenuClose}
          MenuListProps={{
            'aria-labelledby': 'context-menu-button',
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <MdLink fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Website Link</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MdFileUpload fontSize="small" />
            </ListItemIcon>
            <ListItemText>Upload File</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MdCode fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Code Snippet</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MdTag fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Tags</ListItemText>
          </MenuItem>
          {!apiKey && (
            <MenuItem onClick={handleApiModalOpen}>
              <ListItemIcon>
                <MdVpnKey fontSize="small" />
              </ListItemIcon>
              <ListItemText>Set API Key</ListItemText>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
      <Box component={Grid} container spacing={2} sx={{ padding: '16px' }}>
        <Box
          sx={{
            width: '100%',
            pt: { xs: '70px', md: '0px' },
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              mx: 'auto',
              width: { xs: '100%', md: '100%', xl: '100%' },
              minHeight: { xs: '75vh', xl: '85vh' },
              maxWidth: '1000px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ width: '100%', mb: response ? '20px' : 'auto' }}>
              <Box
                sx={{
                  display: 'flex',
                  mx: 'auto',
                  zIndex: 2,
                  width: 'max-content',
                  mb: '20px',
                  borderRadius: '60px',
                }}
              >
                <Button
                  onClick={() => setModel('gpt-3.5-turbo')}
                  sx={{
                    cursor: 'pointer',
                    transition: '0.3s',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background:
                      model === 'gpt-3.5-turbo' ? buttonBg : 'transparent',
                    width: '174px',
                    height: '70px',
                    boxShadow:
                      model === 'gpt-3.5-turbo' ? buttonShadow : 'none',
                    borderRadius: '14px',
                    color: textColor,
                    fontSize: '18px',
                    fontWeight: '700',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 'full',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: bgIcon,
                      marginRight: '10px',
                      height: '39px',
                      width: '39px',
                    }}
                  >
                    <MdAutoAwesome
                      style={{
                        width: '20px',
                        height: '20px',
                        color: iconColor,
                      }}
                    />
                  </Box>
                  GPT-3.5
                </Button>
                <Button
                  onClick={() => setModel('gpt-4')}
                  sx={{
                    cursor: 'pointer',
                    transition: '0.3s',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: model === 'gpt-4' ? buttonBg : 'transparent',
                    width: '164px',
                    height: '70px',
                    boxShadow: model === 'gpt-4' ? buttonShadow : 'none',
                    borderRadius: '14px',
                    color: textColor,
                    fontSize: '18px',
                    fontWeight: '700',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 'full',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: bgIcon,
                      marginRight: '10px',
                      height: '39px',
                      width: '39px',
                    }}
                  >
                    <MdBolt
                      style={{
                        width: '20px',
                        height: '20px',
                        color: iconColor,
                      }}
                    />
                  </Box>
                  GPT-4
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: response ? 'flex' : 'none',
                flexDirection: 'column',
                width: '100%',
                mx: 'auto',
                mb: 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  mb: '10px',
                }}
              >
                <Box
                  sx={{
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: '1px solid',
                    borderColor: borderColor,
                    mr: '20px',
                    height: '40px',
                    minHeight: '40px',
                    minWidth: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    component={MdPerson}
                    sx={{
                      width: '20px',
                      height: '20px',
                      color: brandColor,
                    }}
                  />
                </Box>
                <Paper
                  sx={{
                    p: '22px',
                    width: '100%',
                    zIndex: 2,
                    backgroundColor: 'white',
                    borderRadius: '14px',
                    boxShadow: buttonShadow,
                  }}
                >
                  <Typography
                    color={textColor}
                    fontWeight="600"
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight={{ base: '24px', md: '26px' }}
                  >
                    {inputOnSubmit}
                  </Typography>
                </Paper>
                <IconButton
                  sx={{
                    cursor: 'pointer',
                    color: gray,
                    width: '20px',
                    height: '20px',
                  }}
                  onClick={() => {
                    //
                  }}
                >
                  <Icon component={MdEdit} />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    borderRadius: 'full',
                    background:
                      'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40px',
                    minWidth: '40px',
                    marginRight: '20px',
                    display: 'flex',
                  }}
                >
                  <MdAutoAwesome
                    style={{ width: '20px', height: '20px', color: 'white' }}
                  />
                </Box>
                <MessageBox output={response} />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                mt: '20px',
                justifyContent: 'flex-end',
                alignItems: 'center',
                ms: { base: '0px', xl: '60px' },
              }}
            >
              <TextField
                variant="outlined"
                fullWidth
                sx={{
                  minHeight: '54px',
                  height: '100%',
                  border: '1px solid',
                  borderColor: borderColor,
                  borderRadius: '45px',
                  padding: '15px 20px',
                  mr: '10px',
                  fontSize: 'sm',
                  fontWeight: '500',
                  '& .MuiOutlinedInput-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: borderColor,
                      borderRadius: '45px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: borderColor,
                      borderRadius: '45px',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: borderColor,
                      borderRadius: '45px',
                    },
                  },
                  '& .MuiInputBase-root': {
                    color: inputColor,
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: placeholderColor,
                  },
                }}
                placeholder="Type your message here..."
                onChange={handleChange}
              />
              <Button
                variant="contained"
                sx={{
                  py: '20px',
                  px: '16px',
                  ms: 'auto',
                  width: { base: '160px', md: '210px' },
                  height: '54px',
                  background:
                    'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                  boxShadow: buttonShadow,
                  '&:hover': {
                    boxShadow:
                      '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                    background:
                      'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                  },
                  '&:disabled': {
                    background:
                      'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                  },
                }}
                onClick={handleTranslate}
                disabled={loading}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <ApiModal
        open={isApiModalOpen}
        onClose={handleApiModalClose}
        setApiKey={setApiKey}
      />
    </Paper>
  );
}
