import { Extension } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';
import tippy from 'tippy.js';
import CommandsView from './CommandsView';

export const allCommandsList = {
  heading: {
    title: 'Heading',
    attrs: { 'data-test-id': 'insert-heading1' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setNode('heading', { level: 1 })
        .run();
    },
  },
  subheading: {
    title: 'Subheading',
    attrs: { 'data-test-id': 'insert-heading2' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setNode('heading', { level: 2 })
        .run();
    },
  },
  paragraph: {
    title: 'Paragraph',
    attrs: { 'data-test-id': 'insert-paragraph' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setNode('paragraph')
        .run();
    },
  },
  bulletList: {
    title: 'Bullet List',
    attrs: { 'data-test-id': 'insert-bullet-list' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor.chain().focus().deleteRange({ from, to }).toggleBulletList().run();
    },
  },
  orderedList: {
    title: 'Ordered List',
    attrs: { 'data-test-id': 'insert-ordered-list' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .toggleOrderedList()
        .run();
    },
  },
  codeBlock: {
    title: 'Code Block',
    attrs: { 'data-test-id': 'insert-code-block' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor.chain().focus().deleteRange({ from, to }).setCodeBlock().run();
    },
  },
  quote: {
    title: 'Quote',
    attrs: { 'data-test-id': 'insert-quote' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor.chain().focus().deleteRange({ from, to }).setBlockquote().run();
    },
  },
  horizontalRule: {
    title: 'Horizontal Rule',
    attrs: { 'data-test-id': 'insert-horizontal-rule' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setHorizontalRule()
        .run();
    },
  },
  text: {
    title: 'Text',
    attrs: { 'data-test-id': 'insert-text' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setNode('paragraph')
        .run();
    },
  },
  code: {
    title: 'Code',
    attrs: { 'data-test-id': 'insert-code' },
    command: ({ editor }) => {
      const { from, to } = editor.state.selection;
      editor.chain().focus().deleteRange({ from, to }).setNode('code').run();
    },
  },
  markdown: {
    title: 'Markdown',
    attrs: { 'data-test-id': 'insert-markdown' },
    command: ({ editor }) => {
      // Add your markdown command here
    },
  },
  fileUpload: {
    title: 'File Upload',
    attrs: { 'data-test-id': 'insert-file-upload' },
    command: ({ editor }) => {
      // Add your file upload command here
    },
  },
  addWebsite: {
    title: 'Add Website',
    attrs: { 'data-test-id': 'insert-website' },
    command: ({ editor }) => {
      // Add your add website command here
    },
  },
};

const viewTypeConfigs = {
  default: [
    'heading',
    'subheading',
    'paragraph',
    'bulletList',
    'orderedList',
    'codeBlock',
    'quote',
    'horizontalRule',
  ],
  templateEditor: [
    'text',
    'code',
    'codeBlock',
    'markdown',
    'fileUpload',
    'addWebsite',
  ],
};

export const getCommands = viewType => {
  const viewConfig = viewTypeConfigs[viewType] || viewTypeConfigs.default;
  return viewConfig.map(commandKey => allCommandsList[commandKey]);
};

const CommandsPlugin = (viewType = 'default') => {
  return Extension.create({
    name: 'insertMenu',
    addProseMirrorPlugins() {
      return [
        Suggestion({
          editor: this.editor,
          char: '/',
          command: ({ editor, range, props }) => {
            props.command({ editor, range, props });
          },
          items: ({ query }) => {
            const commands = getCommands(viewType);
            return commands
              .filter(item =>
                item.title.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 10);
          },
          startOfLine: true,
          allow: ({ state }) =>
            state.selection.$from.node().textBetween(0, 1) === '/',
          render: () => {
            let component, popup;
            return {
              onStart: props => {
                component = new ReactRenderer(CommandsView, {
                  props,
                  editor: props.editor,
                });
                popup = tippy(props.editor.options.element, {
                  getReferenceClientRect: props.clientRect,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                });
              },
              onUpdate: props => {
                component.updateProps(props);
                popup.setProps({ getReferenceClientRect: props.clientRect });
              },
              onKeyDown: ({ event }) => {
                if (event.key === 'Escape') {
                  popup.hide();
                  return true;
                }
                return component.ref && component.ref.onKeyDown(event);
              },
              onExit: () => {
                component.destroy();
                popup.destroy();
              },
            };
          },
        }),
      ];
    },
  });
};

export default CommandsPlugin;

// // CommandsPlugin.js

// import { Extension } from '@tiptap/core';
// import { ReactRenderer } from '@tiptap/react';
// import Suggestion from '@tiptap/suggestion';
// import tippy from 'tippy.js';
// import CommandsView from './CommandsView';
// // Shared list of all commands
// const allCommandsList = {
//   heading: {
//     title: 'Heading',
//     attrs: { 'data-test-id': 'insert-heading1' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor
//         .chain()
//         .focus()
//         .deleteRange({ from, to })
//         .setNode('heading', { level: 1 })
//         .run();
//     },
//   },
//   subheading: {
//     title: 'Subheading',
//     attrs: { 'data-test-id': 'insert-heading2' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor
//         .chain()
//         .focus()
//         .deleteRange({ from, to })
//         .setNode('heading', { level: 2 })
//         .run();
//     },
//   },
//   paragraph: {
//     title: 'Paragraph',
//     attrs: { 'data-test-id': 'insert-paragraph' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor
//         .chain()
//         .focus()
//         .deleteRange({ from, to })
//         .setNode('paragraph')
//         .run();
//     },
//   },
//   bulletList: {
//     title: 'Bullet List',
//     attrs: { 'data-test-id': 'insert-bullet-list' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor.chain().focus().deleteRange({ from, to }).toggleBulletList().run();
//     },
//   },
//   orderedList: {
//     title: 'Ordered List',
//     attrs: { 'data-test-id': 'insert-ordered-list' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor
//         .chain()
//         .focus()
//         .deleteRange({ from, to })
//         .toggleOrderedList()
//         .run();
//     },
//   },
//   codeBlock: {
//     title: 'Code Block',
//     attrs: { 'data-test-id': 'insert-code-block' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor.chain().focus().deleteRange({ from, to }).setCodeBlock().run();
//     },
//   },
//   quote: {
//     title: 'Quote',
//     attrs: { 'data-test-id': 'insert-quote' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor.chain().focus().deleteRange({ from, to }).setBlockquote().run();
//     },
//   },
//   horizontalRule: {
//     title: 'Horizontal Rule',
//     attrs: { 'data-test-id': 'insert-horizontal-rule' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor
//         .chain()
//         .focus()
//         .deleteRange({ from, to })
//         .setHorizontalRule()
//         .run();
//     },
//   },
//   text: {
//     title: 'Text',
//     attrs: { 'data-test-id': 'insert-text' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor
//         .chain()
//         .focus()
//         .deleteRange({ from, to })
//         .setNode('paragraph')
//         .run();
//     },
//   },
//   code: {
//     title: 'Code',
//     attrs: { 'data-test-id': 'insert-code' },
//     command: ({ editor }) => {
//       const { from, to } = editor.state.selection;
//       editor.chain().focus().deleteRange({ from, to }).setNode('code').run();
//     },
//   },
//   markdown: {
//     title: 'Markdown',
//     attrs: { 'data-test-id': 'insert-markdown' },
//     command: ({ editor }) => {
//       // Add your markdown command here
//     },
//   },
//   fileUpload: {
//     title: 'File Upload',
//     attrs: { 'data-test-id': 'insert-file-upload' },
//     command: ({ editor }) => {
//       // Add your file upload command here
//     },
//   },
//   addWebsite: {
//     title: 'Add Website',
//     attrs: { 'data-test-id': 'insert-website' },
//     command: ({ editor }) => {
//       // Add your add website command here
//     },
//   },
// };
// // View type configurations
// const viewTypeConfigs = {
//   default: [
//     'heading',
//     'subheading',
//     'paragraph',
//     'bulletList',
//     'orderedList',
//     'codeBlock',
//     'quote',
//     'horizontalRule',
//   ],
//   templateEditor: [
//     'text',
//     'code',
//     'codeBlock',
//     'markdown',
//     'fileUpload',
//     'addWebsite',
//   ],
// };

// const getCommands = viewType => {
//   const viewConfig = viewTypeConfigs[viewType] || viewTypeConfigs.default;
//   return viewConfig.map(commandKey => allCommandsList[commandKey]);
// };

// const CommandsPlugin = (viewType = 'default') => {
//   return Extension.create({
//     name: 'insertMenu',
//     addProseMirrorPlugins() {
//       return [
//         Suggestion({
//           editor: this.editor,
//           char: '/',
//           command: ({ editor, range, props }) => {
//             props.command({ editor, range, props });
//           },
//           items: ({ query }) => {
//             const commands = getCommands(viewType);
//             return commands
//               .filter(item =>
//                 item.title.toLowerCase().startsWith(query.toLowerCase())
//               )
//               .slice(0, 10);
//           },
//           startOfLine: true,
//           allow: ({ state }) =>
//             state.selection.$from.node().textBetween(0, 1) === '/',
//           render: () => {
//             let component, popup;
//             return {
//               onStart: props => {
//                 component = new ReactRenderer(CommandsView, {
//                   props,
//                   editor: props.editor,
//                 });
//                 popup = tippy(props.editor.options.element, {
//                   getReferenceClientRect: props.clientRect,
//                   content: component.element,
//                   showOnCreate: true,
//                   interactive: true,
//                   trigger: 'manual',
//                   placement: 'bottom-start',
//                 });
//               },
//               onUpdate: props => {
//                 component.updateProps(props);
//                 popup.setProps({ getReferenceClientRect: props.clientRect });
//               },
//               onKeyDown: ({ event }) => {
//                 if (event.key === 'Escape') {
//                   popup.hide();
//                   return true;
//                 }
//                 return component.ref && component.ref.onKeyDown(event);
//               },
//               onExit: () => {
//                 component.destroy();
//                 popup.destroy();
//               },
//             };
//           },
//         }),
//       ];
//     },
//   });
// };

// export default CommandsPlugin;
// // const CommandsPlugin = Extension.create({
// //   name: 'insertMenu',
// //   addProseMirrorPlugins() {
// //     return [
// //       Suggestion({
// //         editor: this.editor,
// //         char: '/',
// //         command: ({ editor, range, props }) => {
// //           props.command({ editor, range, props });
// //         },
// //         items: ({ query }) => {
// //           const commands = [
// //             {
// //               title: 'Heading',
// //               attrs: { 'data-test-id': 'insert-heading1' },
// //               command: ({ editor }) => {
// //                 const { from, to } = editor.state.selection;
// //                 editor
// //                   .chain()
// //                   .focus()
// //                   .deleteRange({ from, to })
// //                   .setNode('heading', { level: 1 })
// //                   .run();
// //               },
// //             },
// //             {
// //               title: 'Subheading',
// //               attrs: { 'data-test-id': 'insert-heading2' },
// //               command: ({ editor }) => {
// //                 const { from, to } = editor.state.selection;
// //                 editor
// //                   .chain()
// //                   .focus()
// //                   .deleteRange({ from, to })
// //                   .setNode('heading', { level: 2 })
// //                   .run();
// //               },
// //             },
// //             {
// //               title: 'Paragraph',
// //               attrs: { 'data-test-id': 'insert-paragraph' },
// //               command: ({ editor }) => {
// //                 const { from, to } = editor.state.selection;
// //                 editor
// //                   .chain()
// //                   .focus()
// //                   .deleteRange({ from, to })
// //                   .setNode('paragraph')
// //                   .run();
// //               },
// //             },
// //             {
// //               title: 'Bullet List',
// //               attrs: { 'data-test-id': 'insert-bullet-list' },
// //               command: ({ editor }) => {
// //                 const { from, to } = editor.state.selection;
// //                 editor
// //                   .chain()
// //                   .focus()
// //                   .deleteRange({ from, to })
// //                   .toggleBulletList()
// //                   .run();
// //               },
// //             },
// //             {
// //               title: 'Ordered List',
// //               attrs: { 'data-test-id': 'insert-ordered-list' },
// //               command: ({ editor }) => {
// //                 const { from, to } = editor.state.selection;
// //                 editor
// //                   .chain()
// //                   .focus()
// //                   .deleteRange({ from, to })
// //                   .toggleOrderedList()
// //                   .run();
// //               },
// //             },
// //             {
// //               title: 'Code Block',
// //               attrs: { 'data-test-id': 'insert-code-block' },
// //               command: ({ editor }) => {
// //                 const { from, to } = editor.state.selection;
// //                 editor
// //                   .chain()
// //                   .focus()
// //                   .deleteRange({ from, to })
// //                   .setCodeBlock()
// //                   .run();
// //               },
// //             },
// //             {
// //               title: 'Blockquote',
// //               attrs: { 'data-test-id': 'insert-blockquote' },
// //               command: ({ editor }) => {
// //                 const { from, to } = editor.state.selection;
// //                 editor
// //                   .chain()
// //                   .focus()
// //                   .deleteRange({ from, to })
// //                   .toggleBlockquote()
// //                   .run();
// //               },
// //             },
// //             {
// //               title: 'Horizontal Rule',
// //               attrs: { 'data-test-id': 'insert-horizontal-rule' },
// //               command: ({ editor }) => {
// //                 editor.chain().focus().setHorizontalRule().run();
// //               },
// //             },
// //             {
// //               title: 'Hard Break',
// //               attrs: { 'data-test-id': 'insert-hard-break' },
// //               command: ({ editor }) => {
// //                 editor.chain().focus().setHardBreak().run();
// //               },
// //             },
// //           ];

// //           return commands
// //             .filter(item =>
// //               item.title.toLowerCase().startsWith(query.toLowerCase())
// //             )
// //             .slice(0, 10);
// //         },
// //         startOfLine: true,
// //         allow: ({ state }) =>
// //           state.selection.$from.node().textBetween(0, 1) === '/',
// //         render: () => {
// //           let component, popup;
// //           return {
// //             onStart: props => {
// //               component = new ReactRenderer(CommandsView, {
// //                 props,
// //                 editor: props.editor,
// //               });
// //               popup = tippy(props.editor.options.element, {
// //                 getReferenceClientRect: props.clientRect,
// //                 content: component.element,
// //                 showOnCreate: true,
// //                 interactive: true,
// //                 trigger: 'manual',
// //                 placement: 'bottom-start',
// //               });
// //             },
// //             onUpdate: props => {
// //               component.updateProps(props);
// //               popup.setProps({ getReferenceClientRect: props.clientRect });
// //             },
// //             onKeyDown: ({ event }) => {
// //               if (event.key === 'Escape') {
// //                 popup.hide();
// //                 return true;
// //               }
// //               return component.ref && component.ref.onKeyDown(event);
// //             },
// //             onExit: () => {
// //               component.destroy();
// //               popup.destroy();
// //             },
// //           };
// //         },
// //       }),
// //     ];
// //   },
// // });

// // export default CommandsPlugin;
