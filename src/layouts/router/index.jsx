import { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { setupInterceptors } from '@/lib/api';
import { useAuthStore } from 'contexts/AuthProvider';
import { useUserStore } from 'contexts/UserProvider';

export const RouterLayout = props => {
  const { ...rest } = props;
  const {
    state: {
      accessToken,
      refreshToken,
      expiresIn,
      // authSession: { accessToken, refreshToken, expiresIn },
    },
  } = useUserStore();
  const {
    actions: { handleRefreshAccessToken },
  } = useAuthStore();

  useEffect(() => {
    setupInterceptors(
      () => accessToken,
      () => refreshToken,
      () => expiresIn,
      handleRefreshAccessToken
    );
  }, [accessToken, refreshToken, expiresIn, handleRefreshAccessToken]);

  return (
    <>
      <Outlet {...rest} />
    </>
  );
};

export default RouterLayout;
