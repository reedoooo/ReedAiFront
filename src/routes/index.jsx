import { createBrowserHistory } from 'history';
import React, { lazy, Suspense } from 'react';
import {
  Navigate,
  Outlet,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import {
  AdminPanelSettingsRoundedIcon,
  AiIcon,
  DashboardIcon,
  DocumentScannerRoundedIcon,
  FolderRoundedIcon,
  HomeIcon,
  LockIcon,
  PersonAddIcon,
  PersonIcon,
} from 'assets/humanIcons';
import { Loadable } from 'layouts/navigation/shared/loadable';
import { dispatch, setField } from 'store/index';

/* *** Error Utils *** */
const RootErrorBoundary = Loadable(
  lazy(() => import('utils/app/RouterErrorBoundary.jsx'))
);
/* *** Layouts *** */
const BlankLayout = Loadable(lazy(() => import('layouts/blank')));
const AdminLayout = Loadable(lazy(() => import('layouts/admin')));
const AuthLayout = Loadable(lazy(() => import('layouts/auth')));
const ChatLayout = Loadable(lazy(() => import('layouts/chat')));
const RouterLayout = Loadable(lazy(() => import('layouts/router')));
/* *** Views *** */
const HeroDocs = Loadable(lazy(() => import('views/land/heroDocs')));

const SignInCentered = Loadable(lazy(() => import('views/auth/signIn')));
const SignUpCentered = Loadable(lazy(() => import('views/auth/signUp')));

const MainDashboard = Loadable(lazy(() => import('views/admin/default')));
const UserProfile = Loadable(lazy(() => import('views/admin/profile')));

const ChatBot = Loadable(lazy(() => import('views/admin/chat')));
const Templates = Loadable(lazy(() => import('views/admin/templates')));

export const customHistory = createBrowserHistory();

customHistory.listen((location, action) => {
  console.log(`[History]: ${action} - ${location.pathname}`);
});

// =========================================================
// Base Routes
// =========================================================
const baseRoutes = [
  {
    name: 'Docs',
    title: 'Docs',
    path: '/land',
    breadcrumb: 'Docs',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BlankLayout />
      </Suspense>
    ),
    errorElement: <RootErrorBoundary />,
    icon: <HomeIcon />,
    collapse: true,
    invisible: false,
    items: ['Hero Docs'],
    children: [
      {
        name: 'Hero Docs',
        title: 'HeroDocs',
        path: 'heroDocs',
        breadcrumb: 'Hero Docs',
        element: <HeroDocs />,
        icon: <FolderRoundedIcon />,
        invisible: false,
        collapse: false,
      },
    ],
  },
];
// =========================================================
// Admin Routes
// =========================================================
const adminRoutes = [
  {
    name: 'Admin',
    title: 'Admin',
    path: '/admin',
    breadcrumb: 'Admin',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLayout />
      </Suspense>
    ),
    errorElement: <RootErrorBoundary />,
    icon: <AdminPanelSettingsRoundedIcon />,
    collapse: true,
    children: [
      {
        index: true,
        name: 'Main Dashboard',
        title: 'MainDashboard',
        path: 'dashboard',
        breadcrumb: 'Main Dashboard',
        element: <MainDashboard />,
        icon: <DashboardIcon />,
        description: 'Main Dashboard',
        collapse: false,
      },
      {
        name: 'Profile',
        title: 'Profile',
        path: 'profile',
        breadcrumb: 'Profile',
        element: <UserProfile />,
        icon: <PersonIcon />,
        collapse: false,
      },
      {
        name: 'Chat',
        title: 'Chat',
        path: 'chat',
        breadcrumb: 'Chat',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ChatLayout />
          </Suspense>
        ),
        icon: <AiIcon />,
        collapse: true,
        children: [
          {
            index: true,
            name: 'Chat Home',
            title: 'ChatHome',
            path: 'chat-home',
            breadcrumb: 'Chat Home',
            element: <ChatBot />,
            icon: <HomeIcon />,
            description: 'Chat Bot',
            functionalStatus: true,
            collapse: false,
          },
        ],
      },
      {
        name: 'Templates',
        title: 'Templates',
        path: 'templates',
        breadcrumb: 'Templates',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BlankLayout />
          </Suspense>
        ),
        icon: <DocumentScannerRoundedIcon />,
        collapse: true,
        children: [
          {
            index: true,
            name: 'Templates Home',
            title: 'TemplatesHome',
            path: 'templates-home',
            breadcrumb: 'Templates Home',
            element: <Templates />,
            icon: <HomeIcon />,
            description: 'Templates',
            functionalStatus: true,
            collapse: false,
          },
        ],
      },
    ],
  },
];
// =========================================================
// Auth Routes
// =========================================================
const authRoutes = [
  {
    type: 'layout',
    name: 'Auth',
    title: 'Auth',
    path: '/auth',
    breadcrumb: 'Auth',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthLayout />
      </Suspense>
    ),
    errorElement: <RootErrorBoundary />,
    icon: <LockIcon />,
    collapse: true,
    children: [
      {
        index: true,
        element: <Navigate to="sign-in" replace />,
      },
      {
        name: 'Sign In',
        title: 'SignIn',
        path: 'sign-in',
        breadcrumb: 'Sign In',
        element: <SignInCentered />,
        icon: <LockIcon />,
        collapse: false,
        onLoginSuccess: (token, userData) => {
          console.log('AUTH_DATA', token, userData);
          localStorage.setItem('userToken', token);
          localStorage.setItem('user', JSON.stringify(userData));
          dispatch(setField({ field: 'isAuthenticated', value: true }));
        },
      },
      {
        name: 'Sign Up',
        title: 'SignUp',
        path: 'sign-up',
        breadcrumb: 'Sign Up',
        element: <SignUpCentered />,
        icon: <PersonAddIcon />,
        collapse: false,
        onSignupSuccess: (token, userData) => {
          console.log('AUTH_DATA', token, userData);
          localStorage.setItem('userToken', token);
          localStorage.setItem('user', JSON.stringify(userData));
          dispatch(setField({ field: 'isAuthenticated', value: true }));
        },
      },
      {
        name: 'Logout',
        title: 'Logout',
        path: 'logout',
        breadcrumb: 'Logout',
        element: <Navigate to="/" />,
        collapse: false,
        icon: <PersonAddIcon />,
        async action() {
          return redirect('/');
        },
      },
    ],
  },
];
// =========================================================
// Root Routes
// =========================================================
const rootRoutes = [
  {
    type: 'root',
    name: 'Root',
    title: 'Root',
    path: '/',
    element: <RouterLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/land/heroDocs" />,
      },
      ...baseRoutes,
      ...adminRoutes,
      ...authRoutes,
    ],
  },
];
const routes = [...rootRoutes];

export const Router = createBrowserRouter(routes, { history: customHistory });

export default routes;
