import { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { setupInterceptors } from '@/lib/api';
// import { useUserStore } from 'contexts/UserProvider';

export const RouterLayout = props => {
  const { ...rest } = props;
  // const {
  //   state: {
  //     accessToken,
  //     refreshToken,
  //     expiresIn,
  //     // authSession: { accessToken, refreshToken, expiresIn },
  //   },
  //   actions: { handleRefreshAccessToken },
  // } = useUserStore();

  useEffect(() => {
    setupInterceptors();
  }, []);

  return (
    <>
      <Outlet {...rest} />
    </>
  );
};

export default RouterLayout;
