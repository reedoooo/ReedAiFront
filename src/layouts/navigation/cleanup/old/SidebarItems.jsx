import { Box, List } from '@mui/material';
import { uniqueId } from 'lodash';
import React from 'react';
import { useLocation } from 'react-router';
import routes from '@/routes/index';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';

const SidebarItems = () => {
  const transformRoutesToMenuItems = (routes, base = '') => {
    return routes?.map(route => {
      const menuItem = {
        id: uniqueId(),
        title: route.name,
        icon: route.icon,
        href: `${base}${route.path}`,
      };

      if (route.children) {
        menuItem.subitems = transformRoutesToMenuItems(
          route.children,
          `${base}${route.path}/`
        );
      }

      return menuItem;
    });
  };

  // Transform the routes into menu items
  const Menuitems = transformRoutesToMenuItems(routes);
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map(item => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
