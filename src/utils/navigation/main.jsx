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
export const getActiveRoute = (routes, pathname) => {
  const route = findCurrentRoute(routes, pathname);
  return route?.name || 'Default Brand Text';
};
export const getActiveNavbar = (routes, pathname) => {
  const route = findCurrentRoute(routes, pathname);
  if (route?.secondary) return route?.secondary;
  else return false;
};
export const getActiveNavbarText = (routes, pathname) => {
  return getActiveRoute(routes, pathname) || false;
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

// export const checkARouterValue = () => {
//   const linkPaths = extractPaths(rootRoutes);
//   console.log(linkPaths);
//   console.log('ROUTES', routes);
//   console.log('ROUTER', Router);
// };

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

const extractValues = (rts, key) => {
  console.log('ROUTESSB', rts);
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
