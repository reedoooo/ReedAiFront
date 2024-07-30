const error404Props = {
  statusText: '404',
  message: 'Oops! Page Not Found.',
  mainText: "The page you're looking for doesn't exist or has been moved.",
  letSubTextA: 'Failed Route: ',
  subTextB: ' ~ insert error details here ~ ',
};
const error500Props = {
  statusText: '500',
  message: 'Oops! Something went wrong.',
  mainText: 'An unexpected error has occurred. Our team has been notified.',
  subTextA: 'Routing Error: ',
  subTextB: ' ~ insert error details here ~ ',
};
export const errorProps = {
  errorTypes: {
    404: error404Props,
    500: error500Props,
  },
};

export const systemConfig = {
  errorProps,
};

export default systemConfig;
