/* eslint-disable no-empty */
/* eslint-disable no-constant-condition */
import {
  Tab as RadixUiTab,
  TabList as RadixUiTabList,
} from '@headlessui/react';
import {
  Paper,
  Typography,
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Avatar,
  Tabs,
  styled,
  Slider,
  FormControlLabel,
  IconButton,
  Select,
  Switch,
  Card,
  ListItem,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { RCTooltip } from 'components/themed';
import { FileInfoTooltip } from '../sidebar/panel/items/sidebar-items/FileInfoTooltip';
/* --- CHAT - SIDEBAR --- */
export const SidebarContainer = styled('div')({
  background: '#000',
  color: '#fff',
  display: 'flex',
  fontFamily: 'Inter, Arial, sans-serif',
  borderRadius: '14px',
  maxHeight: 'calc(100% - 16px)',
});
export const PanelHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
export const PanelHeaderRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));
/* --- CHAT - SIDEBAR - FOLDERS --- */
/**
 * A styled ListItem component that uses the reusable RCTooltip to display file information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.file - The file object containing file details.
 * @param {boolean} props.isHovered - Whether the list item is hovered.
 * @param {boolean} props.isFocused - Whether the list item is focused.
 * @param {boolean} props.isSelected - Whether the list item is selected.
 * @returns {ReactNode} The styled list item component.
 */
export const StyledListItem = styled(
  ({ isHovered, isFocused, isSelected, file, ...other }) => (
    <RCTooltip
      display={<FileInfoTooltip file={file} />}
      trigger={<ListItem {...other} />}
      delayDuration={300} // You can customize delay duration if needed
      side="right" // Adjust the side of the tooltip if needed
    />
  )
)(({ theme, isHovered, isFocused, isSelected }) => ({
  cursor: 'pointer',
  backgroundColor: isSelected
    ? theme.palette.action.selected
    : isHovered
      ? theme.palette.action.hover
      : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  ...(isFocused && {
    backgroundColor: theme.palette.action.focus,
  }),
}));

StyledListItem.propTypes = {
  file: PropTypes.object.isRequired,
  isHovered: PropTypes.bool,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
};
export const FolderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1),
  border: '1px solid #ddd',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
}));
export const FolderHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
}));
export const WorkspaceCreatorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  pt: 2,
  // padding: '10px',
  borderRadius: '8px',
  width: '100%',
  // border: '1px solid rgba(255, 255, 255, 0.12)',
}));
export const PanelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '10px',
  borderRadius: '8px',
  // border: '1px solid rgba(255, 255, 255, 0.12)',
}));
export const AnimatedList = styled(motion.ul)({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const AnimatedListItem = styled(motion.li)({
  margin: 0,
  padding: 0,
});
export const SidebarManagerContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#000000',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  // width: '250px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const TopBar = styled('div')({
  display: 'flex',
  padding: '10px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

export const NewFileButton = styled(Button)({
  backgroundColor: '#FFFFFF',
  color: '#000000',
  borderRadius: '4px',
  flexGrow: 1,
  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#F0F0F0',
  },
});

export const FolderButton = styled(IconButton)({
  backgroundColor: '#FFFFFF',
  color: '#000000',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#F0F0F0',
  },
});

export const ContentArea = styled('div')({
  flexGrow: 1,
  overflowY: 'auto',
});
/* --- CHAT - FORMS --- */
export const StyledSelect = styled(Select)({
  color: '#ffffff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  // '& .MuiSelect-icon': {
  //   color: '#ffffff',
  // },
});
export const StyledSwitch = styled(Switch)({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#18b984 !important', // Ensure the thumb color is green when checked
    '&:hover': {
      backgroundColor: 'rgba(24, 185, 132, 0.08) !important', // Hover effect when checked
    },
  },
  '& .MuiSwitch-switchBase': {
    color: '#18b984 !important',
    '& .MuiSwitch-thumb': {
      color: '#18b984 !important',
      backgroundColor: '#18b984 !important',
    },
    '&:hover': {
      backgroundColor: 'rgba(24, 185, 132, 0.08)', // Hover effect when unchecked
    },
    '&.Mui-checked': {
      color: '#18b984 !important', // Ensure the thumb color is green when checked
      '&:hover': {
        backgroundColor: 'rgba(24, 185, 132, 0.08)', // Hover effect when checked
      },
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#ffffff !important', // Ensure the track color remains white
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#ffffff !important', // Ensure the track color remains white
    opacity: 1, // Ensure track color is visible
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    color: '#18b984 !important',
    backgroundColor: '#ffffff !important', // Track color when checked
  },
  '& .MuiSwitch-thumb': {
    color: '#18b984 !important',
  },
});
export const StyledSlider = styled(Slider)({
  color: '#ffffff',
  '& .MuiSlider-thumb': {
    color: '#18b984', // Slider button color
  },
  '& .MuiSlider-track': {
    color: 'white', // Slider track color
  },
  '& .MuiSlider-rail': {
    color: 'white', // Slider rail color
  },
});
export const StyledSwitchFormControlLabel = styled(FormControlLabel)({
  color: '#ffffff',
  fontSize: '0.875rem', // Directly targeting the label font size
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem', // Directly targeting the label font size
  },
  '& .MuiSwitch-root .Mui-checked': {
    color: '#ffffff',
  },
  // '&.MuiIconButton-root': {
  //   color: '#ffffff',
  // },
});
export const StyledTextField = styled(TextField)({
  margin: '10px 0',
  color: '#3d3d3d',
  '& label': 'none',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      color: '#fff',
      borderColor: 'grey',
      transition: 'border-color 0.2s',
    },
    '&:hover fieldset': { borderColor: '#fff' },
    '&.Mui-focused fieldset': { borderColor: '#18b984' },
    '&.Mui-focused': { color: '#fff' },
  },
  '& .MuiInputBase-input': {
    color: '#fff',
    background: '#000',
    '&.Mui-focused': { color: '#fff' },
  },
  '& .MuiInputBase-multiline': {
    padding: '1rem 1rem',
  },
  '& .MuiInputUnderline:after': { borderBottomColor: 'grey' },
});
export const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  margin: '10px 0',
  resize: 'none',
  background: '#000',
  color: '#fff',
  // border: '1px solid #dcdcdc',
  // padding: '10px',
  flex: '1 1 auto',
  padding: '16.5px 14px', // Matches TextField padding
  borderRadius: '4px',
  borderColor: 'grey',
  border: '1px solid transparent', // Start with transparent border
  outline: '1px solid grey', // Add outline to mimic TextField
  fontSize: theme.typography.pxToRem(14),
  '& .MuiInputUnderline:after': {
    borderBottomColor: 'grey',
  },
  '& .MuiInputBaseInput': {
    color: '#fff',
    background: '#000',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
  '&::placeholder': {
    color: theme.palette.text.disabled,
  },
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  borderColor: '#fff',
  margin: '10px 0',
  ' &.MuiButton-root': {
    p: 'unset !important',
  },
}));
/* --- CHAT - TABS --- */
export const TabContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  color: 'white',
  borderRadius: '14px',
  background: '#1c1c1c', // Slightly different background for the panel to distinguish it
});
export const StyledTabs = styled(RadixUiTabList)(({ theme }) => ({
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
export const StyledMuiTabs = styled(Tabs)({
  background: '#808080',
  borderRadius: '5px',
  '& .Mui-selected': {
    backgroundColor: '#000',
    color: '#fff',
    // padding: '10px',
    margin: '5px',
  },
});
export const AnimatedTab = styled(motion(RadixUiTab))(({ theme }) => ({
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
export const ConversationCard = styled(Card)({
  background: '#1c1c1c',
  color: '#fff',
  margin: '10px 0',
  padding: '10px',
  borderRadius: '5px',
});
export const ExportOptions = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  background: '#333',
  borderRadius: '5px',
  margin: '10px 0',
});
/* --- CHAT - MAIN CHAT COMPONENT --- */
export const Header = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxHeight: '70px',
  flexGrow: 1,
}));
/* --- CHAT - MESSAGE COMPONENTS --- */
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
export const ChatMessageActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center', // Align items vertically
  width: '100%', // Make sure it takes the full width
  flexGrow: 1,
}));
export const ChatMessageIconContainer = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 20,
  border: `1px solid ${theme.palette.tertiary.light}`,
  borderRadius: '5px',
  transition:
    'background-color 0.3s, border-color 0.3s, box-shadow 0.3s, color 0.3s', // Smooth transition
  '&:hover': {
    backgroundColor: theme.palette.primary.main, // Change background color on hover
    color: theme.palette.primary.contrastText, // Change icon color on hover for contrast
    borderColor: theme.palette.primary.main, // Keep border consistent
    boxShadow: '0 3px 15px 5px rgba(49, 97, 255, 0.2)', // Slightly stronger shadow on hover
  },
}));
export const ChatMessageEditorContentsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#333',
  borderRadius: '0.25rem',
  // p: 2,
  m: 1,
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  flexGrow: 1,
}));
