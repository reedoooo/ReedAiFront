import { useState } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorPage from 'views/error/NotFound';

export function RootBoundary() {
  const error = useRouteError();
  const [errorInfo, setErrorInfo] = useState(null);
  if (isRouteErrorResponse(error)) {
    const {
      status,
      errorStatus,
      statusText,
      data,
      stack,
      path,
      name,
      message,
      componentStack,
      cause,
    } = error;
    setErrorInfo({
      status,
      errorStatus,
      statusText,
      data,
      stack,
      path,
      name,
      message,
      componentStack,
      cause,
    });
    console.log(errorInfo);
    if (error.status === 404) {
      return <div>Page not found</div>;
    }

    if (error.status === 401) {
      return <div>You are not authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <ErrorPage error={error} errorInfo={errorInfo} />;
}

export default RootBoundary;
