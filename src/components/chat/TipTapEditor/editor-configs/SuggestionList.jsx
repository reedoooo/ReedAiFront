import { List, ListItem, ListItemButton, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const SuggestionList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = index => {
    if (index >= props.items.length) {
      return;
    }

    const suggestion = props.items[index];

    const mentionItem = {
      id: suggestion.id,
      label: suggestion.mentionLabel,
    };

    props.command(mentionItem);
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return props.items.length > 0 ? (
    <Paper elevation={5}>
      <List
        dense
        sx={{
          overflow: 'hidden',
        }}
      >
        {props.items.map((item, index) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={index === selectedIndex}
              onClick={() => selectItem(index)}
            >
              {item.mentionLabel}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  ) : null;
});

SuggestionList.displayName = 'SuggestionList';

SuggestionList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mentionLabel: PropTypes.string.isRequired,
    })
  ).isRequired,
  command: PropTypes.func.isRequired,
};

export default SuggestionList;
