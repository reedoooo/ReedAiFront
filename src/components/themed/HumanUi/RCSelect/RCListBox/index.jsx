import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import React from 'react';
import RCListBoxRoot from './RCListBoxRoot';

/**
 * RCListbox component.
 * @param {object} props - Component props.
 * @param {React.Ref} ref - Reference to the component.
 * @returns {React.Element} - Rendered component.
 * @throws {Error} - If the component is rendered outside a Popup component.
 */
export const RCListBox = React.forwardRef(function CustomListbox(props, ref) {
  const popupContext = React.useContext(PopupContext);

  if (!popupContext) {
    throw new Error(
      'The `CustomListbox` component cannot be rendered outside a `Popup` component'
    );
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <RCListBoxRoot {...props} ref={ref} />
    </CssTransition>
  );
});

export default RCListBox;
