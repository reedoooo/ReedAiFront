import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';

import RCBox from '../RCBox';
import RCTypography from '../RCTypography';
import RCSnackbarIconRoot from './RCSnackbarIconRoot';

export function RCSnackbar({
  color = 'info',
  icon = <Icon />,
  title = 'Default Title',
  dateTime = 'Just now',
  content = <RCTypography />,
  close = () => {},
  bgWhite = false,
  ...rest
}) {
  const darkMode = false;
  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = 'dark';
    dividerColor = false;
  } else if (color === 'light') {
    titleColor = darkMode ? 'inherit' : 'dark';
    dateTimeColor = darkMode ? 'inherit' : 'text';
  } else {
    titleColor = 'white';
    dateTimeColor = 'white';
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      {...rest}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={close}
        >
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <RCBox
        variant={bgWhite ? 'contained' : 'gradient'}
        bgColor={bgWhite ? '#fff' : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
        sx={{
          backgroundColor: ({ palette }) =>
            darkMode
              ? palette.background.card
              : palette[color] || palette.white.main,
        }}
      >
        <RCBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}
        >
          <RCBox display="flex" alignItems="center" lineHeight={0}>
            <RCSnackbarIconRoot
              fontSize="small"
              ownerState={{ color, bgWhite }}
            >
              {icon}
            </RCSnackbarIconRoot>
            <RCTypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </RCTypography>
          </RCBox>
          <RCTypography variant="caption" color={dateTimeColor}>
            {dateTime}
          </RCTypography>
          <Icon
            sx={{
              color: ({ palette: { dark, white } }) =>
                (bgWhite && !darkMode) || color === 'light'
                  ? dark.main
                  : white.main,
              fontWeight: ({ typography: { fontWeightBold } }) =>
                fontWeightBold,
              cursor: 'pointer',
              marginLeft: 2,
              transform: 'translateY(-1px)',
            }}
            onClick={close}
          >
            close
          </Icon>
        </RCBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <RCTypography
          sx={{
            fontSize: ({ typography: { size } }) => size.sm,
            color: ({ palette: { white, text } }) => {
              let colorValue =
                bgWhite || color === 'light' ? text.main : white.main;
              if (darkMode) {
                colorValue = color === 'light' ? 'inherit' : white.main;
              }
              return colorValue;
            },
          }}
        >
          {content}
        </RCTypography>
      </RCBox>
    </Snackbar>
  );
}

RCSnackbar.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
    'light',
  ]),
  icon: PropTypes.node,
  title: PropTypes.string,
  dateTime: PropTypes.string,
  content: PropTypes.node,
  close: PropTypes.func,
  bgWhite: PropTypes.bool,
};

export default RCSnackbar;
