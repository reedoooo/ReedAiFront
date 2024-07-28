import { Fade } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

import RCBox from '../RCBox';
import RCAlertCloseIcon from './RCAlertCloseIcon';
import RCAlertRoot from './RCAlertRoot';
function RCAlert({ color = 'info', dismissible = true, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState('mount');
  const handleAlertStatus = () => setAlertStatus('fadeOut');
  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <RCAlertRoot ownerState={{ color }} {...rest}>
        <RCBox display="flex" alignItems="center" color="white">
          {children}
        </RCBox>
        {dismissible ? (
          <RCAlertCloseIcon onClick={mount ? handleAlertStatus : null}>
            &times;
          </RCAlertCloseIcon>
        ) : null}
      </RCAlertRoot>
    </Fade>
  );
  switch (true) {
    case alertStatus === 'mount':
      return alertTemplate();
    case alertStatus === 'fadeOut':
      setTimeout(() => setAlertStatus('unmount'), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }
  return null;
}
// Typechecking props of the RCAlert
RCAlert.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
export default RCAlert;
