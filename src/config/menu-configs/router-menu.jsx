import { uniqueId } from 'lodash';
import {
  AdminPanelSettingsRoundedIcon,
  ArticleIcon,
  BugReportIcon,
  ChatIcon,
  CodeIcon,
  ColorLensIcon,
  DashboardIcon,
  DocumentScannerRoundedIcon,
  FolderRoundedIcon,
  HomeIcon,
  LockIcon,
  NoteAddIcon,
  PendingIcon,
  PersonAddIcon,
  PersonIcon,
  TableChartIcon,
} from 'assets/humanIcons';

const base = `${window.location.origin}`;
// {
// 	id: uniqueId('templates-'),
// 	type: 'template',
// 	title: 'Code Converter',
// 	name: 'Code Converter',
// 	description: 'Code Converter Description',
// 	icon: <CodeIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,
// 	path: '/admin/templates/code-converter',
// 	route: `${base}/admin/templates/code-converter`,
// 	link: `${base}/admin/templates/code-converter`,
// 	a: `${host}/admin/templates/code-converter/*`,
// },
// Helper function to generate menu items
const generateMenuItems = (routes, basePath = '') => {
  return routes.map(route => {
    const fullLink = basePath + route.path;

    const menuItem = {
      name: route.name,
      title: route.title,
      id: uniqueId('menu-item-'),
      description: `${route.name} Description`,
      label: route.name,
      path: route.path,
      icon: route.icon,
      link: fullLink,
      items: route.items,
      children: route.children
        ? generateMenuItems(route.children, fullLink)
        : [],
    };

    return menuItem;
  });
};

// Define the routes
const baseRoutes = [
  {
    name: 'Docs',
    path: '/land',
    icon: <HomeIcon />,
    children: [
      {
        name: 'Hero Docs',
        path: 'heroDocs',
        icon: <FolderRoundedIcon />,
      },
    ],
  },
];

const testRoutes = [
  {
    name: 'Test',
    path: '/test',
    icon: <BugReportIcon />,
    children: [
      {
        name: 'Test Home',
        path: 'test-home',
        icon: <HomeIcon />,
      },
      {
        name: 'Chat Test',
        path: 'chat-test',
        icon: <ChatIcon />,
      },
      {
        name: 'Loaders Test',
        path: 'loaders-test',
        icon: <PendingIcon />,
      },
    ],
  },
];

const adminRoutes = [
  {
    name: 'Admin',
    path: '/admin',
    icon: <AdminPanelSettingsRoundedIcon />,
    children: [
      {
        name: 'Main Dashboard',
        path: 'dashboard',
        icon: <DashboardIcon />,
      },
      {
        name: 'Data Tables',
        path: 'data-tables',
        icon: <TableChartIcon />,
      },
      {
        name: 'Templates',
        path: 'templates',
        icon: <DocumentScannerRoundedIcon />,
        children: [
          {
            name: 'Templates Home',
            path: 'templates-home',
            icon: <HomeIcon />,
          },
          {
            name: 'Original Chat Ai',
            path: 'original-chat-ai',
            icon: <ChatIcon />,
            fullLink: `${base}/templates/original-chat-ai`,
          },
          {
            name: 'Template Generator',
            path: 'generate-template',
            icon: <NoteAddIcon />,
            fullLink: `${base}/templates/generate-template`,
          },
          // {
          //   name: 'Blog Post Generator',
          //   path: 'blog-post',
          //   icon: <ArticleIcon />,
          //   fullLink: `${base}/templates/blog-post`,
          // },
          // {
          //   name: 'Code Converter',
          //   path: 'code-converter',
          //   icon: <CodeIcon />,
          //   fullLink: `${base}/templates/code-converter`,
          // },
          // {
          //   name: 'Theme Generator',
          //   path: 'theme-generator',
          //   icon: <ColorLensIcon />,
          //   fullLink: `${base}/templates/theme-generator`,
          // },
          // {
          //   name: 'Template Editor',
          //   path: 'editor',
          //   icon: <NoteAddIcon />,
          //   fullLink: `${base}/templates/editor`,
          // },
        ],
      },
      {
        name: 'Profile',
        path: 'profile',
        icon: <PersonIcon />,
      },
    ],
  },
];

const authRoutes = [
  {
    name: 'Auth',
    path: '/auth',
    icon: <LockIcon />,
    children: [
      {
        name: 'Sign In',
        path: 'sign-in',
        icon: <LockIcon />,
      },
      {
        name: 'Sign Up',
        path: 'sign-up',
        icon: <PersonAddIcon />,
      },
      {
        name: 'Logout',
        path: 'logout',
        icon: <PersonAddIcon />,
      },
    ],
  },
];

const rootRoutes = [
  {
    name: 'Root',
    path: '/',
    children: [
      {
        path: '/',
        fullLink: `${base}/land/heroDocs`,
      },
      ...baseRoutes,
      ...testRoutes,
      ...adminRoutes,
      ...authRoutes,
    ],
  },
];

// Generate menu items for all routes
const routerMenuData = generateMenuItems(rootRoutes);

// Generate specific menu data
const baseMenuData = generateMenuItems(baseRoutes);
const testMenuData = generateMenuItems(testRoutes);
const adminMenuData = generateMenuItems(adminRoutes);
const authMenuData = generateMenuItems(authRoutes);

// Generate menu data specifically for templates
const templatesMenuData = generateMenuItems(
  adminRoutes[0].children.find(child => child.name === 'Templates').children
);

export {
  routerMenuData,
  baseMenuData,
  testMenuData,
  adminMenuData,
  authMenuData,
  templatesMenuData,
};

export default routerMenuData;
