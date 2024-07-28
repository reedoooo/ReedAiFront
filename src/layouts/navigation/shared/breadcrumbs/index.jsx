// BreadcrumbsComponent.js
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { uniqueId } from 'lodash';
import React from 'react';
import { extractPaths } from '@/routes/index';
import constants from 'config/constants';

const findBreadcrumbs = (path, linkPaths) => {
  const pathParts = path.split('/').filter(Boolean);
  let fullPath = '';
  return pathParts.map(part => {
    fullPath += `/${part}`;
    const matchingPath = linkPaths.find(p => p === fullPath);
    return { text: part, link: matchingPath || fullPath };
  });
};

export const BreadcrumbsComponent = ({ pathName, brandText, routes }) => {
  const { PUBLIC_URL } = constants;
  const linkPaths = extractPaths(routes);
  const breadcrumbs = findBreadcrumbs(pathName, linkPaths);
  let crumbs = [];
  let header = '';
  breadcrumbs.forEach((crumb, index) => {
    if (index === breadcrumbs.length - 1) {
      header = crumb.text;
    } else {
      crumbs.push(crumb);
    }
  });

  const mainText = '#1B254B';

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          href={`${process.env.PUBLIC_URL}/`}
          color="inherit"
          sx={{ fontSize: 'sm', marginBottom: '5px' }}
        >
          Pages
        </Link>
        {crumbs.map((breadcrumb, index) => (
          <Link
            key={uniqueId()}
            href={`${PUBLIC_URL}${breadcrumb.link}`}
            color="inherit"
            sx={{ fontSize: 'sm', marginBottom: '5px' }}
          >
            {breadcrumb.text}
          </Link>
        ))}
      </Breadcrumbs>
      <Link
        href="/"
        color={mainText}
        sx={{
          bg: 'inherit',
          borderRadius: 'inherit',
          fontWeight: 'bold',
          fontSize: '34px',
          '&:hover': { color: mainText },
          '&:active': {
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          },
          '&:focus': {
            boxShadow: 'none',
          },
        }}
      >
        {header.length === 0 ? brandText : header}
      </Link>
    </Box>
  );
};

export default BreadcrumbsComponent;
