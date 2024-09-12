import {
  Button,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AnimatedTabs = styled(motion(Tabs))({
  background: '#808080',
  borderRadius: '5px',
  '& .Mui-selected': {
    backgroundColor: '#000',
    color: '#fff',
    // padding: '10px',
    margin: '5px',
  },
});
const AnimatedTab = styled(motion(Tab))({
  color: '#fff',
  borderRadius: '5px',
});
const StyledTextField = styled(TextField)({
  margin: '10px 0',
  '& label': {
    color: '#fff',
    '&.Mui-focused': { color: 'grey' },
  },
  '& .MuiInput-underline:after': { borderBottomColor: 'grey' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'grey' },
    '&:hover fieldset': { borderColor: 'grey' },
    '&.Mui-focused fieldset': { borderColor: 'grey' },
  },
  '& .MuiInputBase-input': { color: '#fff', background: '#000' },
});
const StyledButton = styled(Button)({
  color: '#fff',
  borderColor: '#fff',
  margin: '10px 0',
});
const StyledTextareaAutosize = styled(TextareaAutosize)({
  width: '100%',
  padding: 8,
  borderRadius: '5px',
  borderColor: '#fff',
});
const CurrentPromptRenderer = ({ prompt }) => (
  <motion.div
    initial="initial"
    animate="enter"
    exit="exit"
    variants={{
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    }}
    transition={{ duration: 0.3 }}
  >
    <Typography variant="subtitle2">{prompt.title}</Typography>
    <p className="mt-2 text-sm text-gray-500">{prompt.description}</p>
  </motion.div>
);
export {
  AnimatedTabs,
  AnimatedTab,
  StyledTextField,
  StyledButton,
  StyledTextareaAutosize,
  CurrentPromptRenderer,
};
