/* eslint-disable no-unused-vars */
import {
  Box,
  alpha,
  Menu,
  Paper,
  IconButton,
  DialogTitle,
  TableHead,
  TableCell,
  Link,
  Avatar,
  AppBar,
  Toolbar,
  SvgIcon,
} from '@mui/material';
import { styled } from 'styled-components';

// --- MAIN UI COMPONENTS --- //
const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#2d2d34',
  borderRadius: '1rem',
  flexGrow: 1,
}));
const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const PaperCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  minWidth: '100%',
  overflowWrap: 'break-word',
  maxWidth: 'max-content',
  height: '100%',
  borderRadius: '20px',
  background: 'border-box rgb(255, 255, 255)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
  padding: theme.spacing(8),
}));
const StyledLogoIcon = styled(SvgIcon)(({ theme, hval }) => ({
  // width: hval || '50px',
  // height: hval || '50px',
  height: '2rem',
  width: '2rem',
  borderRadius: '50%',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  my: 'auto',
}));
const StyledIconContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.background.default}`,
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    // color: theme.palette.dark.main,
    backgroundColor: theme.palette.background.hover,
  },
}));
const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 24, // Increase icon size
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
    },
  },
}));
const ScrollablePaper = styled(Paper)(({ theme }) => ({
  maxHeight: 'calc(90vh - 96px)',
  marginRight: theme.spacing(2),
  height: '297mm',
  boxSizing: 'border-box',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflowY: 'auto',
  backgroundColor: '#fff',
}));
const EditorContainer = styled(Paper)(({ theme }) => ({
  minHeight: 'calc(80vh - 96px)',
  maxHeight: 'calc(80vh - 96px)',
  flexDirection: 'column',
}));
const PdfPreviewContainer = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));
const FormContainer = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&:selected': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));
const LeftSection = styled(Box)(({ theme }) => ({
  justifyContent: 'space-between',
  width: '200px',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const RightSection = styled(Box)(({ theme }) => ({
  justifyContent: 'space-between',
  width: '200px',
  backgroundColor: theme.palette.background.paper,
  borderLeft: `1px solid ${theme.palette.divider}`,
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.dark,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: theme.spacing(2),
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  textAlign: 'flex-start',
  height: '100%',
}));

const AspectRatioBox = styled(Box)({
  width: '60%', // Take the full width of its parent
  maxHeight: 500, // Maximum height of 80% of the viewport height
  maxWidth: 'calc(500px * 0.707)', // Maintain A4 aspect ratio (0.707 = 1 / √2)
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '1rem',
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    paddingTop: '141.4%', // Height is 141.4% of the width, maintaining A4 aspect ratio
  },
  '& > div': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    margin: 'auto',
  },
});

const MainWrapper = styled('div')(() => ({
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  flexGrow: 1,
  paddingBottom: '60px',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  background: theme.palette.background.paper,
  backdropFilter: 'blur(4px)',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export {
  StyledIconContainer,
  StyledIconButton,
  StyledMenu,
  ScrollablePaper,
  EditorContainer,
  PdfPreviewContainer,
  FormContainer,
  LeftSection,
  RightSection,
  StyledDialogTitle,
  StyledTableHead,
  StyledTableCell,
  StyledLink,
  StyledAvatar,
  StyledPaper,
  AspectRatioBox,
  // NAV
  MainWrapper,
  PageWrapper,
  AppBarStyled,
  ToolbarStyled,
  StyledLogoIcon,
  // MAIN UI COMPONENTS
  DashboardBox,
  FlexBetween,
  PaperCard,
};
