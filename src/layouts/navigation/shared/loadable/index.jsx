import React, { Suspense } from 'react';
import LoadingIndicator from 'utils/app/LoadingIndicator';

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
