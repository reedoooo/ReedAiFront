import { autocompletion } from '@codemirror/autocomplete';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { Node, mergeAttributes } from '@tiptap/core';

export const CodeMirrorExtension = Node.create({
  name: 'codeMirror',

  group: 'block',

  content: 'text*',

  parseHTML() {
    return [{ tag: 'pre' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['pre', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement('div');
      const editorView = new EditorView({
        state: EditorState.create({
          doc: node.textContent,
          extensions: [
            keymap.of(defaultKeymap),
            autocompletion(), // Add autocompletion support
            javascript(), // Enable JavaScript language support
            // You can add more CodeMirror extensions here
          ],
        }),
        parent: dom,
      });

      return {
        dom,
        contentDOM: dom,
        update: updatedNode => {
          if (updatedNode.type !== this.type) return false;
          editorView.update([
            {
              changes: {
                from: 0,
                to: editorView.state.doc.length,
                insert: updatedNode.textContent,
              },
            },
          ]);
          return true;
        },
        destroy: () => editorView.destroy(),
      };
    };
  },
});
