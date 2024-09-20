import React, { useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import ToastProvider from 'contexts/ToastProvider';
import { LoadingIndicator } from 'utils/app';

export const RouterLayout = props => {
  const { ...rest } = props;
  const prevPathRef = React.useRef(null);
  const navigation = useNavigation();
  const location = useLocation();
  const params = useParams();
  const HistoryTracker = () => {
    React.useEffect(() => {
      const previousPath = prevPathRef.current;
      prevPathRef.current = previousPath;
      const currentPath = location.pathname;
      console.log(
        `Navigated to ${currentPath}, previous path: ${previousPath}`
      );
      toast.success(`Navigated to ${currentPath}`);
    }, [location]);

    return null;
  };
  if (navigation.state === 'loading') {
    console.log('navigation:', navigation);
    localStorage.setItem('NavHistory', JSON.stringify(navigation.history));
    return <LoadingIndicator />;
  }
  // const {
  //   state: {
  //     accessToken,
  //     refreshToken,
  //     expiresIn,
  //     // authSession: { accessToken, refreshToken, expiresIn },
  //   },
  //   actions: { handleRefreshAccessToken },
  // } = useUserStore();

  // useEffect(() => {
  //   setupInterceptors();
  // }, []);

  return (
    <>
      <HistoryTracker />
      <Toaster />
      <ToastProvider>
        <Outlet {...rest} />
      </ToastProvider>{' '}
    </>
  );
};

export default RouterLayout;
