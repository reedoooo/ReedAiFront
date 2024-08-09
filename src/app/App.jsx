// App.jsx
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import { Providers } from 'contexts/Providers';
import { NotFoundPage } from 'views/error';
import { Router } from '../routes';

function ErrorFallback(props) {
  return (
    <div className={'error-page'}>
      <NotFoundPage {...props} />
      <p>{props.error.message}</p>
      <button onClick={props.resetErrorBoundary}>Try again</button>
    </div>
  );
}
// =========================================================
// [App] | This code provides the app with the router and renders it
// =========================================================
const App = () => {
  const [someKey, setSomeKey] = React.useState(null);

  if (import.meta.hot) {
    import.meta.hot.dispose(() => Router.dispose());
  }

  return (
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          console.log('reloading the page...');
          window.location.reload();
        }}
        resetKeys={[someKey]} // Reset error boundary when someKey changes
        onError={(error, errorInfo) => {
          console.log('Error caught!');
          console.error(error);
          console.error(errorInfo);
        }}
      >
        <Providers>
          <RouterProvider router={Router} />
        </Providers>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
