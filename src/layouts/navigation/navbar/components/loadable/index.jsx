import React, { Suspense } from 'react';
import { LoadingIndicator } from 'utils/app/LoadingIndicator';

/**
 * Wraps a component with a higher-order component that adds lazy loading functionality.
 *
 * @param {React.Component} Component - The component to be wrapped.
 * @returns {React.Component} - The wrapped component.
 */
export const Loadable = Component => {
  const WrappedComponent = props => (
    <Suspense fallback={<LoadingIndicator />}>
      <Component {...props} />
    </Suspense>
  );
  WrappedComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};

Loadable.displayName = 'Loadable';

export default Loadable;
