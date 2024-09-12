import PropTypes from 'prop-types';
import React from 'react';
import { RCTab, RCTabsRoot } from './RCTabsRoot';

/**
 * The StyledTabs component is a styled wrapper around the Material-UI Tabs.
 *
 * @component StyledTabs
 * @param {Object} props - The component props.
 * @param {number} [props.value] - The current selected tab index.
 * @param {function} [props.onChange] - The function to call when the tab changes.
 * @param {Array} [props.tabs] - The array of tab objects with labels.
 * @param {string} [props.variant] - The variant of the tabs (fullWidth, scrollable, or standard).
 * @returns {React.Element} The rendered StyledTabs component.
 */

export const RCTabs = React.forwardRef(
  ({ value = 0, onChange, tabs = [], variant = 'default', ...rest }, ref) => {
    const MUI_VARIANT = variant === 'darkMode' ? 'scrollable' : variant;

    return (
      <RCTabsRoot
        ref={ref}
        value={value}
        onChange={onChange}
        variant={MUI_VARIANT}
        scrollButtons="auto" // Enables scroll buttons to appear when needed
        allowScrollButtonsMobile
        // centered
        aria-label="wrapped label tabs example"
        {...rest} // Spread other props to avoid passing unnecessary props to the DOM
      >
        {tabs.map((tab, index) => (
          <RCTab key={index} label={tab.label} />
        ))}
      </RCTabsRoot>
    );
  }
);

RCTabs.displayName = 'RCTabs';

RCTabs.propTypes = {
  value: PropTypes.number,
  variant: PropTypes.oneOf(['standard', 'fullWidth', 'scrollable', 'darkMode']),
  onChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RCTabs;
