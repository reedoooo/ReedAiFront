import PropTypes from 'prop-types';
import { PluginKey } from 'prosemirror-state';
import React, { useState, useEffect } from 'react';
import ChangeMenuPlugin from './ChangeMenuPlugin';
import { allCommandsList, getCommands } from './CommandsPlugin';

export const ChangeMenu = ({
  editor,
  containerRef,
  className,
  tippyOptions,
  shouldShow,
  viewType = 'default', // Add viewType prop
}) => {
  const [element, setElement] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (!element || editor.isDestroyed) {
      return;
    }

    const pluginKey = new PluginKey('changeMenu');
    const plugin = ChangeMenuPlugin({
      editor,
      element,
      pluginKey,
      shouldShow,
      tippyOptions,
    });

    editor.registerPlugin(plugin);

    return () => {
      editor.unregisterPlugin(pluginKey);
    };
  }, [editor, element, tippyOptions, shouldShow]);

  const menus = getCommands(viewType); // Get commands based on viewType

  const handleKeyDown = (event, command) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      command();
    }
  };

  return (
    <div
      ref={setElement}
      className={className}
      data-test-id="change-block"
      style={{ visibility: 'hidden' }}
      role="menu"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => setShowList(!showList)}
        aria-expanded={showList}
        aria-controls="block-menu"
      >
        Change
      </button>
      {showList ? (
        <div id="block-menu" className="block-menu" role="menu">
          {menus.map(({ attrs, title, command }) => (
            <div
              key={title}
              className="menu-item"
              {...attrs}
              role="menuitem"
              tabIndex={0}
              onClick={() => {
                setShowList(false);
                command({ editor });
              }}
              onKeyDown={event =>
                handleKeyDown(event, () => {
                  setShowList(false);
                  command({ editor });
                })
              }
            >
              {title}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

ChangeMenu.propTypes = {
  editor: PropTypes.object.isRequired,
  containerRef: PropTypes.object.isRequired,
  className: PropTypes.string,
  tippyOptions: PropTypes.object,
  shouldShow: PropTypes.func,
  viewType: PropTypes.string, // Add PropType for viewType
};

export default ChangeMenu;

// import PropTypes from 'prop-types';
// import { PluginKey } from 'prosemirror-state';
// import React, { useState, useEffect } from 'react';
// import ChangeMenuPlugin from './ChangeMenuPlugin';

// export const ChangeMenu = ({
//   editor,
//   containerRef,
//   className,
//   tippyOptions,
//   shouldShow,
//   viewType = 'default', // Add viewType prop
// }) => {
//   const [element, setElement] = useState(null);
//   const [showList, setShowList] = useState(false);

//   useEffect(() => {
//     if (!element || editor.isDestroyed) {
//       return;
//     }

//     const pluginKey = new PluginKey('changeMenu');
//     const plugin = ChangeMenuPlugin({
//       editor,
//       element,
//       pluginKey,
//       shouldShow,
//       tippyOptions,
//     });

//     editor.registerPlugin(plugin);

//     return () => {
//       editor.unregisterPlugin(pluginKey);
//     };
//   }, [editor, element, tippyOptions, shouldShow]);

//   const menus = [
//     // --- ChangeMenu.jsx ---
//     // --- menu items ---
//     // ---|
//     //    | title: 'Paragraph',
//     {
//       title: 'Paragraph',
//       attrs: {
//         'data-test-id': 'set-paragraph',
//       },
//       command: ({ editor }) => {
//         editor.chain().focus().setParagraph().run();
//       },
//     },
//     // ---|
//     //		| title: 'Heading 1',
//     {
//       title: 'Heading 1',
//       attrs: {
//         'data-test-id': 'set-heading1',
//       },
//       command: ({ editor }) => {
//         editor.chain().focus().toggleHeading({ level: 1 }).run();
//       },
//     },
//     // ---|
//     // 		| title: 'Heading 2',
//     {
//       title: 'Heading 2',
//       attrs: {
//         'data-test-id': 'set-heading2',
//       },
//       command: ({ editor }) => {
//         editor.chain().focus().toggleHeading({ level: 2 }).run();
//       },
//     },
//     // ---|
//     // 		| title: 'Heading 3',
//     {
//       title: 'Heading 3',
//       attrs: {
//         'data-test-id': 'set-heading3',
//       },
//       command: ({ editor }) => {
//         editor.chain().focus().toggleHeading({ level: 3 }).run();
//       },
//     },
//     // ---|
//     // 		| title: 'Bullet List',
//     {
//       title: 'Bullet List',
//       attrs: {
//         'data-test-id': 'set-bullet-list',
//       },
//       command: ({ editor }) => {
//         editor.chain().focus().toggleBulletList().run();
//       },
//     },
//     // ---|
//     // 		| title: 'Ordered List',
//     {
//       title: 'Ordered List',
//       attrs: {
//         'data-test-id': 'set-ordered-list',
//       },
//       command: ({ editor }) => {
//         editor.chain().focus().toggleOrderedList().run();
//       },
//     },
//     // ---|
//     // 		| title: 'Code Block',
//     {
//       title: 'Code Block',
//       attrs: {
//         'data-test-id': 'set-code',
//       },
//       command: ({ editor }) => {
//         editor.chain().focus().setCodeBlock().run();
//       },
//     },
//     // ---|
//     // 		| title: 'Blockquote',
//     {
//       title: 'Blockquote',
//       attrs: {
//         'data-test-id': 'set-quote',
//       },
//       command: ({ editor }) => {
//         editor.chain().focus().toggleBlockquote().run();
//       },
//     },
//   ];

//   const handleKeyDown = (event, command) => {
//     if (event.key === 'Enter' || event.key === ' ') {
//       event.preventDefault();
//       command();
//     }
//   };

//   return (
//     <div
//       ref={setElement}
//       className={className}
//       data-test-id="change-block"
//       style={{ visibility: 'hidden' }}
//       role="menu"
//       tabIndex={0}
//       onKeyDown={handleKeyDown}
//     >
//       <button
//         onClick={() => setShowList(!showList)}
//         aria-expanded={showList}
//         aria-controls="block-menu"
//       >
//         Change
//       </button>
//       {showList ? (
//         <div id="block-menu" className="block-menu" role="menu">
//           {menus.map(({ attrs, title, command }) => (
//             <div
//               key={title}
//               className="menu-item"
//               {...attrs}
//               role="menuitem"
//               tabIndex={0}
//               onClick={() => {
//                 setShowList(false);
//                 const { selection } = editor.state;
//                 const $anchor = selection.$anchor;
//                 const range = {
//                   from: $anchor.posAtIndex(0),
//                   to: $anchor.posAtIndex(1),
//                 };
//                 command({ editor, range });
//               }}
//               onKeyDown={event =>
//                 handleKeyDown(event, () => {
//                   setShowList(false);
//                   const { selection } = editor.state;
//                   const $anchor = selection.$anchor;
//                   const range = {
//                     from: $anchor.posAtIndex(0),
//                     to: $anchor.posAtIndex(1),
//                   };
//                   command({ editor, range });
//                 })
//               }
//             >
//               {title}
//             </div>
//           ))}
//         </div>
//       ) : null}
//     </div>
//   );
// };

// ChangeMenu.propTypes = {
//   editor: PropTypes.object.isRequired,
//   containerRef: PropTypes.object.isRequired,
//   className: PropTypes.string,
//   tippyOptions: PropTypes.object,
//   shouldShow: PropTypes.func,
// };

// export default ChangeMenu;
