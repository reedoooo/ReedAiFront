import { createBrowserHistory } from 'history';
import React, { lazy } from 'react';
import { Navigate, createBrowserRouter, redirect } from 'react-router-dom';
import {
  AdminPanelSettingsRoundedIcon,
  AiIcon,
  BugReportIcon,
  ChatIcon,
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
const BlankLayout = Loadable(
  lazy(() => import('layouts/generic-layouts/blank'))
);
const AdminLayout = Loadable(lazy(() => import('layouts/admin')));
const AuthLayout = Loadable(lazy(() => import('layouts/auth')));
const ChatLayout = Loadable(lazy(() => import('layouts/chat')));
/* *** Views *** */
const HeroDocs = Loadable(lazy(() => import('views/land/heroDocs')));

const Test = Loadable(lazy(() => import('views/test')));

const SignInCentered = Loadable(lazy(() => import('views/auth/signIn')));
const SignUpCentered = Loadable(lazy(() => import('views/auth/signUp')));

const MainDashboard = Loadable(lazy(() => import('views/admin/default')));
const UserProfile = Loadable(lazy(() => import('views/admin/profile')));

const ChatBot = Loadable(lazy(() => import('views/admin/chat')));
const Templates = Loadable(lazy(() => import('views/admin/templates')));

// Create a custom history object
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
    element: <BlankLayout />,
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
// Test Routes
// =========================================================
// =========================================================
// Admin Routes
// =========================================================
const adminRoutes = [
  {
    name: 'Admin',
    title: 'Admin',
    path: '/admin',
    breadcrumb: 'Admin',
    element: <AdminLayout />,
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
        element: <ChatLayout />,
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
        name: 'Templates Home',
        title: 'TemplatesHome',
        path: 'templates-home',
        breadcrumb: 'Templates Home',
        element: <BlankLayout />,
        icon: <DocumentScannerRoundedIcon />,
        collapse: true,
        children: [
          {
            name: 'Templates',
            title: 'Templates',
            path: 'templates',
            breadcrumb: 'Templates',
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
    element: <AuthLayout />,
    errorElement: <RootErrorBoundary />,
    icon: <LockIcon />,
    collapse: true,
    children: [
      {
        index: true,
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
    element: <BlankLayout />,
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
const extractPropertyValues = (routes, property) => {
  const values = [];
  routes.forEach(route => {
    if (route[property]) {
      values.push(route[property]);
    }
    if (route.children) {
      values.push(...extractPropertyValues(route.children, property));
    }
  });
  return values;
};

export const extractPaths = (routes, basePath = '') => {
  const paths = [];
  routes.forEach(route => {
    if (route.path) {
      const fullPath =
        basePath === '/' ? `/${route.path}` : `${basePath}${route.path}`;
      paths.push(fullPath);
      if (route.children) {
        paths.push(
          ...extractPaths(
            route.children,
            fullPath === '/' ? '' : `${fullPath}/`
          )
        );
      }
    } else if (route.index) {
      const fullPath = basePath.endsWith('/')
        ? basePath.slice(0, -1)
        : basePath;
      paths.push(fullPath);
    }
  });
  return paths;
};
const addItemsToRoutes = routes => {
  const routeLinks = extractPaths(routes);
  routes.forEach((route, index) => {
    const linkPath = routeLinks[index];
    console.log(`[LINK PATH @ ${route?.name}] `, linkPath);
    if (route.collapse) {
      route.items = route.children.map(child => ({
        ...child,
        link: linkPath,
      }));
    }
    if (route.children) {
      addItemsToRoutes(route.children);
    }
  });
};
addItemsToRoutes(routes);

export const Router = createBrowserRouter(routes, { history: customHistory });

export const checkARouterValue = () => {
  const linkPaths = extractPaths(rootRoutes);
  console.log(linkPaths);
  console.log('ROUTES', routes);
  console.log('ROUTER', Router);
};

export const validateLinkPath = path => {
  const correctPaths = [
    '/',
    '/land',
    '/land/heroDocs',
    '/test',
    '/test/test-home',
    '/test/chat-test',
    '/admin',
    '/admin/dashboard',
    '/admin/templates',
    '/admin/profile',
    '/admin/templates/templates-home',
    '/admin/templates/original-chat-ai',
    '/admin/templates/generate-template',
    '/auth',
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/logout',
    '/404',
  ];
  if (correctPaths.includes(path)) {
    return true;
  } else {
    console.log('Invalid Path:', path);
    return false;
  }
};

export const getRoutesPropertyValues = property => {
  return extractPropertyValues(routes, property);
};

export default routes;
