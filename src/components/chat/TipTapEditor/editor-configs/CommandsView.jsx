import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const CommandsView = ({ items, command }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const onKeyDown = event => {
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
  };

  const upHandler = () => {
    setSelectedIndex(
      prevIndex => (prevIndex + items.length - 1) % items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex(prevIndex =>
      prevIndex === null ? 0 : (prevIndex + 1) % items.length
    );
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  const selectItem = index => {
    const item = items[index || 0];
    if (item) {
      command(item);
    }
  };

  return (
    <div
      className="insert-menu"
      onKeyDown={onKeyDown}
      role="menu"
      tabIndex={0}
      aria-orientation="vertical"
    >
      {items.map((item, index) => (
        <button
          type="button"
          className={index === selectedIndex ? 'active' : ''}
          {...item.attrs}
          key={index}
          onClick={() => selectItem(index)}
          role="menuitem"
          tabIndex={-1}
        >
          {item.element || item.title}
        </button>
      ))}
    </div>
  );
};

CommandsView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      attrs: PropTypes.object,
      element: PropTypes.element,
    })
  ).isRequired,
  command: PropTypes.func.isRequired,
};

export default CommandsView;
