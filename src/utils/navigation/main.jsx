import routes from '@/routes/index';

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== 'undefined';
export const findCurrentRoute = (routes, pathname) => {
  for (let route of routes) {
    if (route.items) {
      const found = findCurrentRoute(route.items, pathname);
      if (found) return found;
    }
    if (pathname?.match(route.path) && route) {
      return route;
    }
  }
};
export const getCurrentRoute = (routes, pathname) => {
  const route = findCurrentRoute(routes, pathname);
  return route?.name || 'Default Brand Text';
};
// export const getActiveNavbar = (routes, pathname) => {
//   const route = findCurrentRoute(routes, pathname);
//   if (route?.secondary) return route?.secondary;
//   else return false;
// };
// export const getActiveNavbarText = (routes, pathname) => {
//   return getActiveRoute(routes, pathname) || false;
// };
export const getLayoutRoute = props => {
  const { layoutName } = props;
  return window.location.pathname !== `/${layoutName}/full-screen-maps`;
};
export const getActiveRoute = routes => {
  let activeRoute = 'Default Brand Text';
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse) {
      console.log('ROUTES', routes[i].items);
      let collapseActiveRoute = getActiveRoute(routes[i].items);
      if (collapseActiveRoute !== activeRoute) {
        return collapseActiveRoute;
      }
    } else if (routes[i].category) {
      let categoryActiveRoute = getActiveRoute(routes[i].items);
      if (categoryActiveRoute !== activeRoute) {
        return categoryActiveRoute;
      }
    } else {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
  }
  return activeRoute;
};
export const getActiveNavbar = routes => {
  let activeNavbar = false;
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse) {
      let collapseActiveNavbar = getActiveNavbar(routes[i].items);
      if (collapseActiveNavbar !== activeNavbar) {
        return collapseActiveNavbar;
      }
    } else if (routes[i].category) {
      let categoryActiveNavbar = getActiveNavbar(routes[i].items);
      if (categoryActiveNavbar !== activeNavbar) {
        return categoryActiveNavbar;
      }
    } else {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
  }
  return activeNavbar;
};
export const getActiveNavbarText = routes => {
  let activeNavbar = false;
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse) {
      let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
      if (collapseActiveNavbar !== activeNavbar) {
        return collapseActiveNavbar;
      }
    } else if (routes[i].category) {
      let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
      if (categoryActiveNavbar !== activeNavbar) {
        return categoryActiveNavbar;
      }
    } else {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].messageNavbar;
      }
    }
  }
  return activeNavbar;
};
export const getMenuItems = routes => {
  let menuItems = [];
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse) {
      menuItems.push(...getMenuItems(routes[i].items));
    } else if (routes[i].category) {
      menuItems.push(...getMenuItems(routes[i].items));
    } else {
      menuItems.push(routes[i]);
    }
  }
  return menuItems;
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
export const validateLinkPath = path => {
  const correctPaths = [
    '/',
    '/land',
    '/land/heroDocs',
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
export const extractValues = (rts, key) => {
  console.log(`RT TYPE, ${typeof rts}`);
  const values = [];
  const traverseRoutes = rts => {
    rts.forEach(route => {
      values.push({ [key]: route[key] });
      if (route.children) {
        traverseRoutes(route.children);
      }
    });
  };
  traverseRoutes(rts);
  return values;
};
export const extractValuesWithFilter = (rts, key, path) => {
  console.log(`RT, ${typeof rts}`, rts);
  const traverseRoutes = rts => {
    rts.forEach(route => {
      console.log(`RT, ${typeof route}`, route);
      if (route.path === path) {
        const routeValue = { [key]: route[key] };
        return routeValue;
      }
      if (route.children) {
        traverseRoutes(route.children);
      }
    });
  };
  return traverseRoutes(rts);
};
export const extractValueForPath = (routes, path, key) => {
  const routeValue = extractValuesWithFilter(routes, key, path);
  console.log(`Route ${key}.`, routeValue);

  if (routeValue) {
    return routeValue;
  } else {
    console.log(`Route ${path} not found.`);
    return null;
  }
};
export const findBreadcrumbs = (pathName, linkPaths) => {
  const pathParts = pathName.split('/').filter(Boolean);
  let fullPath = '';
  return pathParts?.map(part => {
    fullPath += `/${part}`;
    const matchingPath = linkPaths.find(p => p === fullPath);
    return { text: part, link: matchingPath || fullPath };
  });
};
export const formatCrumbsAndHeader = props => {
  const { pathName, linkPaths } = props;
  // const findPaths = (path, linkPaths) => {
  //   const pathParts = path.split('/').filter(Boolean);
  //   let fullPath = '';
  //   return pathParts?.map(part => {
  //     fullPath += `/${part}`;
  //     const matchingPath = linkPaths.find(p => p === fullPath);
  //     return { text: part, link: matchingPath || fullPath };
  //   });
  // };
  const crumbPaths = findBreadcrumbs(pathName, linkPaths);
  const formatPathsToCrumbs = () => {
    let crumbs = [];
    let header = '';
    crumbPaths?.forEach((crumb, index) => {
      if (index === crumbPaths.length - 1) {
        header = crumb.text;
      } else {
        crumbs.push(crumb);
      }
    });
    return { crumbs, header };
  };
  const { crumbs, header } = formatPathsToCrumbs();
  return { crumbs, header };
};
// Function to create an array of objects each possessing a single value for the name of the route
const fn1 = routes => extractValues(routes, 'name');

// Function to create an array of objects each possessing a single value for the path of the route
const fn2 = routes => extractValues(routes, 'path');

// Function to create an array of objects each possessing a single value for the icon of the route
const fn3 = routes => extractValues(routes, 'icon');

// Function to create an array of objects each possessing a single value for the collapse value of the route
const fn4 = routes => extractValues(routes, 'collapse');

const fn5 = routes => extractValues(routes, 'breadcrumb');

const routeDataFns = [fn1, fn2, fn3, fn4, fn5];
const targetDataFunctionMap = {
  name: fn1,
  path: fn2,
  icon: fn3,
  collapse: fn4,
  breadcrumb: fn5,
};

export const getRouteDataFns = () => routeDataFns;

export const getRouteData = (rts, tgt) => {
  const fn = targetDataFunctionMap[tgt];
  return fn(rts);
};

export const getLoadType = nav => {
  const isNormalLoad = nav.state === 'loading' && nav.formData == null;
  const isReloading =
    nav.state === 'loading' &&
    nav.formData != null &&
    nav.formAction === nav.location.pathname;
  const isRedirecting =
    nav.state === 'loading' &&
    nav.formData != null &&
    nav.formAction !== nav.location.pathname;

  return isNormalLoad || isReloading || isRedirecting ? 'normal' : 'lazy';
};
