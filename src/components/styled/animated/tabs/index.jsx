import { LayoutGroup, motion } from 'framer-motion';
import React from 'react';
import { Wrapper, Tab } from './wrapper';
// import './scene.css';

const Tabs = ({ id }) => {
  const [focused, setFocused] = React.useState(null);
  const [selected, setSelected] = React.useState('Item 1');
  const tabs = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <LayoutGroup id={id}>
      <Wrapper onMouseLeave={() => setFocused(null)}>
        {' '}
        {tabs.map(item => (
          <Tab
            key={item}
            onClick={() => setSelected(item)}
            onKeyDown={(event = { key: '' }) =>
              event.key === 'Enter' ? setSelected(item) : null
            }
            onFocus={() => setFocused(item)}
            onMouseEnter={() => setFocused(item)}
            tabIndex={0}
          >
            <span>{item}</span>
            {focused === item ? (
              <motion.div
                transition={{
                  layout: {
                    duration: 0.2,
                    ease: 'easeOut',
                  },
                }}
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: '-10px',
                  right: 0,
                  width: '140%',
                  height: '110%',
                  background: '#23272F',
                  borderRadius: '8px',
                  zIndex: 0,
                }}
                layoutId="highlight"
              />
            ) : null}
            {selected === item ? (
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '0px',
                  right: 0,
                  height: '4px',
                  background: '#5686F5',
                  borderRadius: '8px',
                  zIndex: 0,
                }}
                layoutId="underline"
              />
            ) : null}
          </Tab>
        ))}
      </Wrapper>
    </LayoutGroup>
  );
};

export default Tabs;
