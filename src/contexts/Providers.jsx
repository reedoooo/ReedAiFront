import ContextErrorBoundary from 'utils/app/ContextErrorBoundary';
import * as providers from './index';

const providerList = [
  providers.AuthProvider,
  providers.AppProvider,
  providers.UserProvider,
  providers.ChatProvider,
  // providers.PromptProvider,
  // StyledEngineProvider,
];

const ProviderWrapper = ({ children }) => {
  return providerList.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export const Providers = ({ children }) => {
  return (
    <ContextErrorBoundary>
      <ProviderWrapper>{children}</ProviderWrapper>
    </ContextErrorBoundary>
  );
};

export default Providers;
