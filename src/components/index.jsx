// CUSTOM THEMED LIBRARY
// import RCAlert from './RCAlert';
import {
  RCBox,
  RCButton,
  RCCard,
  RCDialog,
  RCFlex,
  RCIconWrapper,
  RCInput,
  RCSnackbar,
  RCTypography,
} from './themed/index.jsx';
import {
  AppBarStyled,
  AspectRatioBox,
  EditorContainer,
  FormContainer,
  LeftSection,
  // NAV
  MainWrapper,
  PageWrapper,
  PdfPreviewContainer,
  RightSection,
  ScrollablePaper,
  StyledAvatar,
  StyledDialogTitle,
  StyledIconButton,
  StyledIconContainer,
  StyledLink,
  StyledMenu,
  StyledPaper,
  StyledTableCell,
  StyledTableHead,
  ToolbarStyled,
} from './themed/styled/index.jsx';
// PAGES

// OLD VERSIONS
// export { default as AuthDialog } from './AuthDialog.jsx';
// export { default as CoverLetterForm } from './CoverLetterForm.jsx';
// export { default as DraftTabs } from './DraftTabs.jsx';
// export { default as Generator } from './Generator.jsx';
// export { default as NotificationSystem } from './NotificationSystem.jsx';
// export { default as ResultAction } from './ResultAction.jsx';
// export { default as ResultPreview } from './ResultPreview.jsx';
// export { default as MainMenu } from './themedV2/menu/MainMenu.jsx';
// export { default as TransparentMenu } from './themedV2/menu/TransparentMenu.jsx';
// export { default as QuillMarkdown } from './TextEditor/test/quillMarkdown.jsx';

export { default as MiniCalendar } from './themed/calendar/MiniCalendar.jsx';

// ARCHITECTURAL COMPONENTS
export { default as DashboardBox } from './themed/basic/DashboardBox.jsx';
export { default as FlexBetween } from './themed/basic/FlexBetween.jsx';
export { default as PageLayout } from './themed/basic/PageLayout.jsx';
export { default as PaperCard } from './themed/basic/PaperCard.jsx';

// SURFACE COMPONENTS
export { default as Card } from './themed/card/Card.jsx';

// DATA DISPLAY COMPONENTS
export { default as MiniStatistics } from './themed/card/MiniStatistics.jsx';
export { default as BarChart } from './themed/charts/BarChart.jsx';

// DATA INPUT COMPONENTS
export { default as IconBox } from '../assets/humanIcons/utils/IconBox.jsx';

// TEXT EDITOR COMPONENTS
// export { default as TextEditor } from './TextEditor/index.jsx';

// OTHER COMPONENTS
export { default as ItemContent } from '../layouts/navigation/menu/ItemContent.jsx';
export { default as Mastercard } from './themed/card/Mastercard.jsx';
export { default as Member } from './themed/card/Member.jsx';
export { default as FixedPlugin } from './themed/fixedPlugin/FixedPlugin.jsx';
// export * from '../assets/humanIcons/custom/Icons.jsx/index.js';

// Export all components
export {
  // ARCHITECTURAL COMPONENTS
  AppBarStyled,
  AspectRatioBox,
  EditorContainer,
  FormContainer,
  LeftSection,
  MainWrapper,
  PageWrapper,
  PdfPreviewContainer,
  // RC COMPONENTS
  RCBox,
  RCButton,
  RCCard,
  RCDialog,
  RCFlex,
  RCIconWrapper,
  RCInput,
  RCSnackbar,
  RCTypography,
  // NAV COMPONENTS
  RightSection,
  ScrollablePaper,
  // Styled Components
  StyledAvatar,
  StyledDialogTitle,
  StyledIconButton,
  StyledIconContainer,
  StyledLink,
  StyledMenu,
  StyledPaper,
  StyledTableCell,
  StyledTableHead,
  ToolbarStyled,
};
