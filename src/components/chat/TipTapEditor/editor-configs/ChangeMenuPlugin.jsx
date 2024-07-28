import { Extension, posToDOMRect } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import tippy from 'tippy.js';

export class ChangeMenuView {
  constructor({ editor, element, view, tippyOptions = {}, shouldShow }) {
    this.editor = editor;
    this.element = element;
    this.view = view;
    this.preventHide = false;
    this.tippyOptions = tippyOptions;

    if (shouldShow) {
      this.shouldShow = shouldShow;
    }

    this.element.addEventListener('mousedown', this.mousedownHandler, {
      capture: true,
    });
    this.editor.on('focus', this.focusHandler);
    this.editor.on('blur', this.blurHandler);
    this.element.remove();
    this.element.style.visibility = 'visible';
  }

  mousedownHandler = () => {
    this.preventHide = true;
  };

  focusHandler = () => {
    setTimeout(() => this.update(this.editor.view));
  };

  blurHandler = ({ event }) => {
    if (this.preventHide) {
      this.preventHide = false;
      return;
    }

    if (
      event?.relatedTarget &&
      this.element.parentNode?.contains(event.relatedTarget)
    ) {
      return;
    }

    this.hide();
  };

  tippyBlurHandler = event => {
    this.blurHandler({ event });
  };

  createTooltip() {
    const { element: editorElement } = this.editor.options;
    const editorIsAttached = !!editorElement.parentElement;

    if (this.tippy || !editorIsAttached) {
      return;
    }

    this.tippy = tippy(editorElement, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: 'manual',
      placement: 'right-start',
      ...this.tippyOptions,
    });

    if (this.tippy.popper.firstChild) {
      this.tippy.popper.firstChild.addEventListener(
        'blur',
        this.tippyBlurHandler
      );
    }
  }

  update(view, oldState) {
    const { state } = view;
    const { doc, selection } = state;
    const isSame =
      oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);

    if (isSame) {
      return;
    }

    this.createTooltip();

    const shouldShow = this.shouldShow?.({
      editor: this.editor,
      view,
      state,
      oldState,
    });

    if (!shouldShow) {
      this.hide();
      return;
    }

    this.tippy?.setProps({
      getReferenceClientRect:
        this.tippyOptions?.getReferenceClientRect ||
        (() => {
          const from = selection.$from.posAtIndex(0);
          const boundaries = posToDOMRect(view, 1, 1);
          const nodeRect = posToDOMRect(view, from, from);
          return {
            ...nodeRect,
            left: boundaries.left,
            right: boundaries.right,
          };
        }),
    });

    this.show();
  }

  show() {
    this.tippy?.show();
  }

  hide() {
    this.tippy?.hide();
  }

  destroy() {
    if (this.tippy?.popper.firstChild) {
      this.tippy.popper.firstChild.removeEventListener(
        'blur',
        this.tippyBlurHandler
      );
    }
    this.tippy?.destroy();
    this.element.removeEventListener('mousedown', this.mousedownHandler, {
      capture: true,
    });
    this.editor.off('focus', this.focusHandler);
    this.editor.off('blur', this.blurHandler);
  }
  shouldShow = true;
  // shouldShow = ({ view, state }) => {
  //   const { selection } = state;
  //   const { $anchor } = selection;
  //   const disabledContents = [
  //     'imageNode',
  //     'imagePlaceholder',
  //     'videoNode',
  //     'videoPlaceholder',
  //   ];
  //   let isDisabled = false;
  //   if ($anchor && $anchor.node(1)) {
  //     const node = $anchor.node(1);
  //     const contents = node.content ? node.content.toJSON() || [] : [];
  //     isDisabled = contents.find(c => disabledContents.includes(c.type));
  //   }
  //   const isRootDepth = $anchor.depth === 1;
  //   const isEmptyTextBlock =
  //     $anchor.parent.isTextblock &&
  //     !$anchor.parent.type.spec.code &&
  //     !$anchor.parent.textContent;

  //   if (!view.hasFocus() || isDisabled || !this.editor.isEditable) {
  //     return false;
  //   }

  //   return true;
  // };
}

/**
 * @param {Object} options
 * @param {Editor} options.editor
 * @param {HTMLElement} options.element
 * @param {Function} options.shouldShow
 * @param {Object} options.tippyOptions
 * @param {String} options.pluginKey
 * @returns {Plugin}
 */
const ChangeMenuPlugin = options => {
  return new Plugin({
    key:
      typeof options.pluginKey === 'string'
        ? new PluginKey(options.pluginKey)
        : options.pluginKey,
    view: view => new ChangeMenuView({ view, ...options }),
  });
};

export const ChangeMenuReact = Extension.create({
  name: 'changeMenu',
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: 'changeMenu',
      shouldShow: null,
    };
  },
  addProseMirrorPlugins() {
    return [
      ChangeMenuPlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow,
      }),
    ];
  },
});

export default ChangeMenuPlugin;

// // ChangeMenuPlugin.js

// import { Extension } from '@tiptap/core';
// import { posToDOMRect } from '@tiptap/core';
// import { Plugin, PluginKey } from 'prosemirror-state'; // Corrected import
// import tippy from 'tippy.js';

// export class ChangeMenuView {
//   constructor({ editor, element, view, tippyOptions = {}, shouldShow }) {
//     this.editor = editor;
//     this.element = element;
//     this.view = view;
//     this.preventHide = false;
//     this.tippyOptions = tippyOptions;

//     if (shouldShow) {
//       this.shouldShow = shouldShow;
//     }

//     this.element.addEventListener('mousedown', this.mousedownHandler, {
//       capture: true,
//     });
//     this.editor.on('focus', this.focusHandler);
//     this.editor.on('blur', this.blurHandler);
//     this.element.remove();
//     this.element.style.visibility = 'visible';
//   }

//   mousedownHandler = () => {
//     this.preventHide = true;
//   };

//   focusHandler = () => {
//     setTimeout(() => this.update(this.editor.view));
//   };

//   blurHandler = ({ event }) => {
//     if (this.preventHide) {
//       this.preventHide = false;
//       return;
//     }

//     if (
//       event?.relatedTarget &&
//       this.element.parentNode?.contains(event.relatedTarget)
//     ) {
//       return;
//     }

//     this.hide();
//   };

//   tippyBlurHandler = event => {
//     this.blurHandler({ event });
//   };

//   createTooltip() {
//     const { element: editorElement } = this.editor.options;
//     const editorIsAttached = !!editorElement.parentElement;

//     if (this.tippy || !editorIsAttached) {
//       return;
//     }

//     this.tippy = tippy(editorElement, {
//       duration: 0,
//       getReferenceClientRect: null,
//       content: this.element,
//       interactive: true,
//       trigger: 'manual',
//       placement: 'right-start',
//       ...this.tippyOptions,
//     });

//     if (this.tippy.popper.firstChild) {
//       this.tippy.popper.firstChild.addEventListener(
//         'blur',
//         this.tippyBlurHandler
//       );
//     }
//   }

//   update(view, oldState) {
//     const { state } = view;
//     const { doc, selection } = state;
//     const isSame =
//       oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);

//     if (isSame) {
//       return;
//     }

//     this.createTooltip();

//     const shouldShow = this.shouldShow?.({
//       editor: this.editor,
//       view,
//       state,
//       oldState,
//     });

//     if (!shouldShow) {
//       this.hide();
//       return;
//     }

//     this.tippy?.setProps({
//       getReferenceClientRect:
//         this.tippyOptions?.getReferenceClientRect ||
//         (() => {
//           const from = selection.$from.posAtIndex(0);
//           const boundaries = posToDOMRect(view, 1, 1);
//           const nodeRect = posToDOMRect(view, from, from);
//           return {
//             ...nodeRect,
//             left: boundaries.left,
//             right: boundaries.right,
//           };
//         }),
//     });

//     this.show();
//   }

//   show() {
//     this.tippy?.show();
//   }

//   hide() {
//     this.tippy?.hide();
//   }

//   destroy() {
//     if (this.tippy?.popper.firstChild) {
//       this.tippy.popper.firstChild.removeEventListener(
//         'blur',
//         this.tippyBlurHandler
//       );
//     }
//     this.tippy?.destroy();
//     this.element.removeEventListener('mousedown', this.mousedownHandler, {
//       capture: true,
//     });
//     this.editor.off('focus', this.focusHandler);
//     this.editor.off('blur', this.blurHandler);
//   }

//   shouldShow = ({ view, state }) => {
//     const { selection } = state;
//     const { $anchor } = selection;
//     const disabledContents = [
//       'imageNode',
//       'imagePlaceholder',
//       'videoNode',
//       'videoPlaceholder',
//     ];
//     let isDisabled = false;
//     if ($anchor && $anchor.node(1)) {
//       const node = $anchor.node(1);
//       const contents = node.content ? node.content.toJSON() || [] : [];
//       isDisabled = contents.find(c => disabledContents.includes(c.type));
//     }
//     const isRootDepth = $anchor.depth === 1;
//     const isEmptyTextBlock =
//       $anchor.parent.isTextblock &&
//       !$anchor.parent.type.spec.code &&
//       !$anchor.parent.textContent;

//     if (!view.hasFocus() || isDisabled || !this.editor.isEditable) {
//       return false;
//     }

//     return true;
//   };
// }

// const ChangeMenuPlugin = options => {
//   return new Plugin({
//     key:
//       typeof options.pluginKey === 'string'
//         ? new PluginKey(options.pluginKey)
//         : options.pluginKey,
//     view: view => new ChangeMenuView({ view, ...options }),
//   });
// };

// export const ChangeMenuReact = Extension.create({
//   name: 'changeMenu',
//   addOptions() {
//     return {
//       element: null,
//       tippyOptions: {},
//       pluginKey: 'changeMenu',
//       shouldShow: null,
//     };
//   },
//   addProseMirrorPlugins() {
//     return [
//       ChangeMenuPlugin({
//         pluginKey: this.options.pluginKey,
//         editor: this.editor,
//         element: this.options.element,
//         tippyOptions: this.options.tippyOptions,
//         shouldShow: this.options.shouldShow,
//       }),
//     ];
//   },
// });

// export default ChangeMenuPlugin;
