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
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

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
  // background: '#808080',
  // borderRadius: '14px',
  // width: '100%',
  // height: 'auto',
  // fontFamily: 'Inter, sans-serif',
  // display: 'flex',
  // flexDirection: 'row',
  // alignItems: 'center',
  // padding: '1rem',
  // '& .Mui-selected': {
  //   backgroundColor: '#000',
  //   color: '#fff',
  //   margin: '5px',
  //   borderRadius: '10px',
  // },
  // [theme.breakpoints.down('md')]: {
  //   flexDirection: 'column',
  //   height: 'auto',
  // },
}));

export const AnimatedTab = styled(motion(Tab))(({ theme }) => ({
  position: 'relative',
  listStyle: 'none',
  cursor: 'pointer',
  height: '50px',
  outline: 'none',
  backgroundColor: '#000',
  width: '25%',
  borderRadius: '10px',
  '&.MuiSelected': {
    backgroundColor: '#fff',
    color: '#000',
  },
  '&.ui-selected': {
    backgroundColor: '#fff',
    color: '#000',
  },
  // '& span': {
  //   position: 'absolute',
  //   left: '4px',
  //   right: 0,
  //   top: '6px',
  //   bottom: 0,
  //   zIndex: 1,
  //   userSelect: 'none',
  //   fontSize: '1rem',
  //   color: '#E8E8FD',
  // },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
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
export const MessageContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  maxWidth: '100%',
}));
// Define the Header component
export const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
