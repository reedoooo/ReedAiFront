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
    if (!error.status) {
      return console.log('No status');
    }
    if (error.status === 500) {
      return console.log('418');
    }
    if (error.status === 404) {
      return console.log('404');
    }

    if (error.status === 401) {
      return console.log('401');
    }

    if (error.status === 503) {
      return console.log('503');
    }

    if (error.status === 418) {
      return console.log('418');
    }
  }

  return <ErrorPage error={error} errorInfo={errorInfo} />;
}

export default RootBoundary;
