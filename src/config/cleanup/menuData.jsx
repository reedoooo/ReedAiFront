const menuItems = [
  {
    name: 'Root',
    icon: 'homeicon',
    items: [
      {
        name: 'Docs',
        icon: 'homeicon',
        items: ['Home', 'Hero Docs'],
      },
      {
        name: 'Test',
        icon: 'dashboardicon',
        items: ['Test Home', 'Chat Test', 'Loaders Test'],
      },
      {
        name: 'Admin',
        icon: 'adminpanelsettingsroundedicon',
        items: [
          'Main Dashboard',
          'Data Tables',
          {
            name: 'Templates',
            icon: 'documentscannerroundedicon',
            items: [
              'Templates Home',
              'Original Chat Ai',
              'Blog Post Generator',
              'Code Converter',
              'Theme Generator',
              'Template Generator',
            ],
          },
          'Profile',
        ],
      },
      {
        name: 'Auth',
        icon: 'lockicon',
        items: ['Sign In', 'Sign Up', 'Logout'],
      },
    ],
  },
];

const linkItems = [
  {
    name: 'Root',
    icon: 'homeicon',
    link: '/',
    items: [
      {
        name: 'Docs',
        icon: 'homeicon',
        link: '/land',
        items: [
          { name: 'Home', icon: 'homeicon', link: '/land/landing' },
          {
            name: 'Hero Docs',
            icon: 'folderroundedicon',
            link: '/land/heroDocs',
          },
        ],
      },
      {
        name: 'Test',
        icon: 'dashboardicon',
        link: '/test',
        items: [
          { name: 'Test Home', icon: 'dashboardicon', link: '/test/test-home' },
          { name: 'Chat Test', icon: 'dashboardicon', link: '/test/chat-test' },
          {
            name: 'Loaders Test',
            icon: 'pendingicon',
            link: '/test/loaders-test',
          },
        ],
      },
      {
        name: 'Admin',
        icon: 'adminpanelsettingsroundedicon',
        link: '/admin',
        items: [
          {
            name: 'Main Dashboard',
            icon: 'dashboardicon',
            link: '/admin/dashboard',
          },
          {
            name: 'Data Tables',
            icon: 'tablecharticon',
            link: '/admin/data-tables',
          },
          {
            name: 'Templates',
            icon: 'documentscannerroundedicon',
            link: '/admin/templates',
            items: [
              {
                name: 'Templates Home',
                icon: 'homeicon',
                link: '/admin/templates/templates-home',
              },
              {
                name: 'Original Chat Ai',
                icon: 'chaticon',
                link: '/admin/templates/original-chat-ai',
              },
              {
                name: 'Blog Post Generator',
                icon: 'articleicon',
                link: '/admin/templates/blog-post',
              },
              {
                name: 'Code Converter',
                icon: 'codeicon',
                link: '/admin/templates/code-converter',
              },
              {
                name: 'Theme Generator',
                icon: 'colorlensicon',
                link: '/admin/templates/theme-generator',
              },
              {
                name: 'Template Generator',
                icon: 'noteaddicon',
                link: '/admin/templates/generate-template',
              },
            ],
          },
          { name: 'Profile', icon: 'personicon', link: '/admin/profile' },
        ],
      },
      {
        name: 'Auth',
        icon: 'lockicon',
        link: '/auth',
        items: [
          { name: 'Sign In', icon: 'lockicon', link: '/auth/sign-in' },
          { name: 'Sign Up', icon: 'personaddicon', link: '/auth/sign-up' },
          { name: 'Logout', icon: 'personaddicon', link: '/auth/logout' },
        ],
      },
    ],
  },
];
