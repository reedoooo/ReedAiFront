/* eslint-disable no-empty */
/* eslint-disable no-constant-condition */
import { Tab, TabList } from '@headlessui/react';
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  Divider,
  Popover,
  styled,
  TextareaAutosize,
  TextField,
  useMediaQuery,
  Container,
  IconButton,
  Drawer,
  Avatar,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

/* --- CHAT - SIDEBAR --- */

export const SidebarContainer = styled('div')({
  background: '#000',
  color: '#fff',
  display: 'flex',
  fontFamily: 'Inter, Arial, sans-serif',
  borderRadius: '14px',
  maxHeight: 'calc(100% - 16px)',
});

export const SidebarPanel = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: '#1C1C1C',
  color: 'white',
  borderRadius: '14px',
  height: 'calc(100vh - 8px)',
});

export const TabContentHeaderContainer = styled(Box)({
  '&:hover': {
    backgroundColor: 'accent.main',
    opacity: 0.5,
  },
  display: 'flex',
  width: '100%',
  cursor: 'pointer',
  alignItems: 'center',
  borderRadius: '4px',
  padding: '8px',
  outline: 'none',
});

export const TabContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  color: 'white',
  borderRadius: '14px',
  background: '#1c1c1c', // Slightly different background for the panel to distinguish it
});

export const TabSectionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'space-between',
});

export const StyledTextField = styled(TextField)({
  margin: '10px 0',
  '& label': {
    color: '#fff',
    '&.Mui-focused': { color: 'grey' },
  },
  '& .MuiInputUnderline:after': { borderBottomColor: 'grey' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'grey' },
    '&:hover fieldset': { borderColor: 'grey' },
    '&.Mui-focused fieldset': { borderColor: 'grey' },
  },
  '& .MuiInputBase-input': { color: '#fff', background: '#000' },
});

export const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
  flex: '1 1 auto',
  width: '100%',
  resize: 'none',
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  fontSize: theme.typography.pxToRem(14),
  '&::placeholder': {
    color: theme.palette.text.disabled,
  },
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}));

export const StyledButton = styled(Button)({
  color: '#fff',
  borderColor: '#fff',
  margin: '10px 0',
});

export const StyledTabs = styled(TabList)(({ theme }) => ({
  background: '#808080',
  borderRadius: '14px',
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0.5rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}));

export const AnimatedTab = styled(motion(Tab))(({ theme }) => ({
  position: 'relative',
  listStyle: 'none',
  cursor: 'pointer',
  height: '50px',
  outline: 'none',
  backgroundColor: '#000',
  width: '33%',
  margin: '5px',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  overflow: 'hidden',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'capitalize',
  '&.selected': {
    backgroundColor: '#000',
    color: '#fff', // Text color for active tab
  },
  '&.notSelected': {
    backgroundColor: '#808080',
    color: '#fff',
  },
  '&:focus': {
    outline: 'none',
  },
  '& span': {
    zIndex: 1,
  },
  '&::after': {
    content: "''",
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#fff',
    transformOrigin: 'left',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
  '&:hover::after, &:focus::after': {
    transformOrigin: 'left',
    transform: 'scaleX(1)',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

/* --- CHAT - MAIN CHAT COMPONENT --- */

export const StyledChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#1C1C1C',
  width: '100%',
  height: '100%',
  borderRadius: '14px',
  overflow: 'auto', // Allow scrolling
}));

export const ChatWindow = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 8px)',
  width: `calc(100% - 60px)`,
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    height: '100vh',
    width: '100%',
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'transparent',
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  display: 'flex',
  flexDirection: 'row',
}));

/* --- CHAT - MESSAGE COMPONENTS --- */
export const MessageContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  maxWidth: '100%',
}));

export const ChatBubbleWrapper = styled(Box)(({ theme, sender }) => ({
  backgroundColor: sender === 'user' ? '#26242C' : '#26242C',
  margin: '10px',
  padding: '10px',
  borderRadius: '12px',
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  display: 'flex',
  // alignItems: 'flex-start',
  ml: sender === 'user' ? 'auto' : 0,
  justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
  flexDirection: sender === 'user' ? 'row-reverse' : 'row',
  maxWidth: '90%',
  flexGrow: 1,
}));

export const ChatBubbleAvatarWrapper = styled(Avatar)(({ theme, sender }) => ({
  width: 40,
  height: 40,
  marginRight: sender === 'assistant' ? 2 : 0,
  marginLeft: sender === 'user' ? 2 : 0,
  backgroundColor:
    sender === 'user'
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
}));

export const ChatBubbleTypographyWrapper = styled(Typography)({
  color: '#6b7280',
  fontSize: '0.875rem',
  flexGrow: 1,
  overflowWrap: 'break-word',
});

/*  --- CHAT - FILES --- */
export const FileItemsPreviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  '&:hover, &:focus': {
    backgroundColor: theme.palette.action.hover,
    outline: 'none',
  },
}));
export const SelectedFileItemsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  fontSize: theme.typography.fontSize,
}));
