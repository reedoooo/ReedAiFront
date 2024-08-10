import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { FlexBetween } from 'components/index';
// import { RCButton } from 'components/themed';
import { FlexBetween } from 'components/index';
import { buttonsData, errorProps } from 'config/data';
import { useMode } from 'hooks';

const returnErrText = ({
  variant,
  color,
  fontWeight,
  fontSize,
  lineHeight,
  textAlign,
  gutterBottom,
  styles,
  content,
}) => (
  <Typography
    variant={variant}
    color={color}
    fontWeight={fontWeight}
    sx={{
      ...styles,
      fontSize: fontSize,
      lineHeight: lineHeight,
      textAlign: textAlign,
      gutterBottom: gutterBottom,
    }}
    gutterBottom={gutterBottom}
  >
    {content}
  </Typography>
);
const renderError = ({
  theme,
  statusText,
  message,
  mainText,
  subTextA,
  subTextB,
}) => {
  return (
    <>
      {returnErrText({
        variant: 'h1',
        fontWeight: 700,
        fontSize: '6rem',
        gutterBottom: true,
        content: statusText,
      })}
      {returnErrText({ variant: 'h4', gutterBottom: true, content: message })}
      {returnErrText({
        variant: 'subtitle1',
        styles: {
          mb: 4,
          textAlign: 'center',
          color: theme.palette.text.primary,
        },
        content: mainText,
      })}
      <FlexBetween
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
        }}
      >
        {returnErrText({
          variant: 'subtitle1',
          styles: { textAlign: 'center', color: theme.palette.text.tertiary },
          content: subTextA,
        })}
        {returnErrText({
          variant: 'subtitle1',
          fontWeight: 700,
          styles: { ml: 1, color: theme.palette.error.main },
          content: subTextB,
        })}
      </FlexBetween>
    </>
  );
};

const ActionButton = ({
  startIcon,
  variant,
  color,
  component,
  to,
  sx,
  children,
}) => (
  <Button
    startIcon={startIcon}
    variant={variant}
    color={color}
    component={component}
    to={to}
    sx={sx}
  >
    {children}
  </Button>
);

const renderButtonStack = ({ buttonsData }) => {
  return buttonsData.map(
    ({ startIcon, variant, color, component, to, sx, children }) => (
      <ActionButton
        key={children}
        startIcon={startIcon}
        variant={variant}
        color={color}
        component={component}
        to={to}
        sx={sx}
      >
        {children}
      </ActionButton>
    )
  );
};
const NotFoundPage = props => {
  const { theme } = useMode();
  // const navigation = useNavigation();
  const navigate = useNavigate();
  const clickHandlers = {
    goHome: '/',
    goBack: () => navigate(-1),
    retry: () => window.location.reload(),
    copy: () => navigator.clipboard.writeText(window.location.href),
    refresh: () => window.location.reload(),
  };

  const buttonProps = buttonsData.map(btn => ({
    ...btn,
    component:
      btn.handler === 'goHome'
        ? NavLink
        : btn.handler === 'goBack' ||
            btn.handler === 'retry' ||
            btn.handler === 'copy' ||
            btn.handler === 'refresh'
          ? 'button'
          : NavLink,
    to: btn.handler === 'goHome' ? clickHandlers[btn.handler] : undefined,
    onClick:
      btn.handler === 'retry' ||
      btn.handler === 'copy' ||
      btn.handler === 'refresh'
        ? clickHandlers[btn.handler]
        : btn.handler === 'goBack'
          ? clickHandlers[btn.handler]
          : undefined,
  }));
  let errType = errorProps?.errorTypes[props.error.status];
  const activeErrProps = {
    theme: theme,
    statusText: errType?.statusText,
    message: errType?.message,
    mainText: errType?.mainText,
    subTextA: errType?.subTextA,
    subTextB: props.error?.path,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 3, // Apply some padding for smaller screens
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {renderError(activeErrProps)}
      {renderButtonStack({ buttonsData: buttonProps })}
      {props.resetErrorBoundary && (
        <div>
          <button className={'retry-button'} onClick={props.resetErrorBoundary}>
            🔄 Try Again!
          </button>
        </div>
      )}
    </Box>
  );
};
// =========================================================
// Exports: RootErrorBoundary, NotFoundPage
// =========================================================
export const ErrorFallBack = props => {
  return <NotFoundPage {...props} />;
};

export default NotFoundPage;
