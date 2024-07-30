// import { ReactRenderer } from '@tiptap/react';
// import tippy from 'tippy.js';
// import SuggestionList from '../SuggestionList';

// const DOM_RECT_FALLBACK = {
//   bottom: 0,
//   height: 0,
//   left: 0,
//   right: 0,
//   top: 0,
//   width: 0,
//   x: 0,
//   y: 0,
//   toJSON() {
//     return {};
//   },
// };

// export const MentionSuggestions = {
//   items: async ({ query }) =>
//     Promise.resolve(
//       [
//         'Lea Thompson',
//         'Cyndi Lauper',
//         'Tom Cruise',
//         'Madonna',
//         'Jerry Hall',
//         'Joan Collins',
//         'Winona Ryder',
//         'Christina Applegate',
//         'Alyssa Milano',
//         'Molly Ringwald',
//         'Ally Sheedy',
//         'Debbie Harry',
//         'Olivia Newton-John',
//         'Elton John',
//         'Michael J. Fox',
//         'Axl Rose',
//         'Emilio Estevez',
//         'Ralph Macchio',
//         'Rob Lowe',
//         'Jennifer Grey',
//         'Mickey Rourke',
//         'John Cusack',
//         'Matthew Broderick',
//         'Justine Bateman',
//         'Lisa Bonet',
//         'Benicio Monserrate Rafael del Toro Sánchez',
//       ]
//         .map((name, index) => ({ mentionLabel: name, id: index.toString() }))
//         .filter(item =>
//           item.mentionLabel.toLowerCase().startsWith(query.toLowerCase())
//         )
//         .slice(0, 5)
//     ),

//   render: () => {
//     let component;
//     let popup;

//     return {
//       onStart: props => {
//         component = new ReactRenderer(SuggestionList, {
//           props,
//           editor: props.editor,
//         });

//         popup = tippy('body', {
//           getReferenceClientRect: () =>
//             props.clientRect?.() ?? DOM_RECT_FALLBACK,
//           appendTo: () => document.body,
//           content: component.element,
//           showOnCreate: true,
//           interactive: true,
//           trigger: 'manual',
//           placement: 'bottom-start',
//         })[0];
//       },

//       onUpdate(props) {
//         component?.updateProps(props);

//         popup?.setProps({
//           getReferenceClientRect: () =>
//             props.clientRect?.() ?? DOM_RECT_FALLBACK,
//         });
//       },

//       onKeyDown(props) {
//         if (props.event.key === 'Escape') {
//           popup?.hide();
//           return true;
//         }

//         if (!component?.ref) {
//           return false;
//         }

//         return component.ref.onKeyDown(props);
//       },

//       onExit() {
//         popup?.destroy();
//         component?.destroy();

//         popup = undefined;
//         component = undefined;
//       },
//     };
//   },
// };

// export default MentionSuggestions;
