import { Box } from '@mui/material';
import styled from 'styled-components';

const PaperCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  minWidth: '100%',
  overflowWrap: 'break-word',
  maxWidth: 'max-content',
  height: '100%',
  // padding: '20px 20px',
  borderRadius: '20px',
  background: 'border-box rgb(255, 255, 255)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
  // margin: theme.spacing(2),
  padding: theme.spacing(8),
  // background-clip: border-box;
}));

export default PaperCard;
