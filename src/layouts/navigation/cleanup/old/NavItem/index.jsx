import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useMode from 'hooks/useMode';

const NavItem = ({ item, level, pathDirect, onClick }) => {
  const Icon = item.icon;
  const { theme } = useMode();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  console.log('ITEM', item);
  const ListItemStyled = styled(ListItem)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '8px 10px',
    borderRadius: '8px',
    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    color: theme.palette.text.secondary,
    paddingLeft: '10px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        // button
        component={item.external ? 'a' : NavLink}
        to={!item.external ? item.href : undefined}
        href={item.external ? item.href : undefined}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? '_blank' : undefined}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <Typography
          sx={{
            color: 'inherit',
          }}
        >
          {item.title}
        </Typography>
      </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  pathDirect: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default NavItem;
